// #!/usr/bin/node

"use strict";

function main(args) {
	/**
	 * @todo check if target exists
	 */
	let convert = (dir, structure) => {
		let structure_ = {};
		structure.forEach(
			entry => {
				let regexp = new RegExp("(\\w+):(\\S+)");
				let matching = regexp.exec(entry);
				if (matching == null) {
					console.warn(`can't read '${entry}'`);
				}
				else {
					let groupname = matching[1];
					let path = matching[2];
					if (! (groupname in structure_)) {
						structure_[groupname] = [];
					}
					let filepointer = lib_path.filepointer_read(path);
					let filepointer_ = new lib_path.class_filepointer(
						new lib_path.class_location(
							null,
							lib_path.location_read(dir).chain.invert()
						).extend(filepointer.location.chain),
						filepointer.filename
					);
					structure_[groupname].push(filepointer_.toString());
				}
			}
		);
		return structure_;
	};
	let arghandler = new lib_args.class_handler(
		[
			new lib_args.class_argument(
				{
					"name": "command",
					"type": "string",
					"default": null,
					"kind": "positional",
				}
			),
			new lib_args.class_argument(
				{
					"name": "includes",
					"type": "string",
					"default": [],
					"mode": "accumulate",
					"kind": "volatile",
					"parameters": {
						"indicators_long": ["include"],
						"indicators_short": ["i"],
					},
				}
			),
			new lib_args.class_argument(
				{
					"name": "adhocs",
					"type": "string",
					"default": [],
					"mode": "accumulate",
					"kind": "volatile",
					"parameters": {
						"indicators_long": ["adhoc"],
						"indicators_short": ["a"],
					},
				}
			),
			new lib_args.class_argument(
				{
					"name": "file",
					"type": "string",
					"default": null,
					"mode": "replace",
					"kind": "volatile",
					"parameters": {
						"indicators_long": ["file"],
						"indicators_short": ["f"],
					},
				}
			),
			new lib_args.class_argument(
				{
					"name": "outputs",
					"type": "string",
					"default": [],
					"mode": "accumulate",
					"kind": "volatile",
					"parameters": {
						"indicators_long": ["output"],
						"indicators_short": ["o"],
					},
				}
			),
			new lib_args.class_argument(
				{
					"name": "dir",
					"type": "string",
					"default": ".",
					"mode": "replace",
					"kind": "volatile",
					"parameters": {
						"indicators_long": ["dir"],
						"indicators_short": ["d"],
					},
				}
			),
		]
	);
	let argdata = arghandler.read("cli", args.join(" "));
	switch (argdata.command) {
		case "create": {
			let add = (groups, groupname, members) => {
				if (! (groupname in groups)) {
					groups[groupname] = [];
				}
				let group = groups[groupname];
				members.forEach(
					member => {
						if (group.indexOf(member) < 0) {
							group.push(member);
						}
					}
				);
			};
			let merge = (groups, input) => {
				Object.keys(input).forEach(groupname => add(groups, groupname, input[groupname]));
			};
			let includes = argdata["includes"].map(entry => lib_path.filepointer_read(entry));
			let adhocs = convert(argdata["dir"], argdata["adhocs"]);
			let groups = {};
			return (
				(resolve, reject) => {
					lib_call.executor_chain(
						undefined,
						includes.map(
							include => _ => (resolve_, reject_) => {
								lib_file.read_json(include.toString())(
									data => {
										let data_ = lib_object.map(
											data,
											group => group.map(
												member => {
													let filepointer = lib_path.filepointer_read(member);
													let filepointer_ = new lib_path.class_filepointer(
														new lib_path.class_location(
															null,
															lib_path.location_read(argdata["dir"]).chain.invert()
																.extend(include.location.chain)
																.extend(filepointer.location.chain)
														),
														filepointer.filename
													);
													return filepointer_.toString();
												}
											)
										);
										merge(groups, data_);
										resolve_(undefined);
									},
									reject_
								);
							}
						)
					)(
						_ => {
							merge(groups, adhocs);
							console.info(JSON.stringify(groups, undefined, "\t"));
							resolve(undefined);
						},
						reject
					);
				}
			);
			break;
		}
		case "apply": {
			let outputs = convert(argdata["dir"], argdata["outputs"]);
			let file_ = lib_path.filepointer_read(argdata["file"]);
			return (
				(resolve, reject) => {
					lib_file.read_json(argdata["file"].toString())(
						data => {
							lib_object.to_array(outputs).forEach(
								pair => {
									let list = data[pair.key].map(
										entry => {
											return file_.foo(lib_path.filepointer_read(entry)).toString();
										}
									);
									let command = `cat ${list.join(" ")} > ${pair.value}`;
									try {
										let _child_process = require("child_process");
										_child_process.execSync(command);
										resolve(undefined);
									}
									catch (exception) {
										reject(exception);
									}
								}
							);
						},
						reject
					);
				}
			);
			break;
		}
		default: {
			return (
				(resolve, reject) => {
					reject(new Error(`unhandled command "${argdata.command}"`));
				}
			);
			break;
		}
	}
}

main(process.argv.slice(2))(
	_ => {
		process.exit(0);
	},
	error => {
		console.error(error);
		process.exit(-1);
	}
);

