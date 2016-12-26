// #!/usr/bin/node

"use strict";

function decompose(entry) {
	let regexp = new RegExp("([^:]+):(\\S+)");
	let matching = regexp.exec(entry);
	if (matching == null) {
		return null;
	}
	else {
		return {"groupname": matching[1], "path": matching[2]};
	}
}

function absolutify(path) {
	let cwd = lib_path.class_location.current();
	let filepointer = lib_path.filepointer_read(path);
	let filepointer_ = new lib_path.class_filepointer(
		cwd.extend(filepointer.location.chain),
		filepointer.filename
	);
	let path_ = filepointer_.toString();
	return path_;
}

function convert(structure) {
	let structure_ = {};
	structure.forEach(
		entry => {
			let pair = decompose(entry);
			let path = absolutify(pair.path);
			if (! (pair.groupname in structure_)) {
				structure_[pair.groupname] = [];
			}
			structure_[pair.groupname].push(path);
		}
	);
	return structure_;
}

function create(includes, adhocs) {
	return (
		(resolve, reject) => {
			let merge = (groups, input) => {
				Object.keys(input).forEach(
					groupname => {
						if (! (groupname in groups)) {
							groups[groupname] = [];
						}
						let group = groups[groupname];
						input[groupname].forEach(
							member => {
								if (group.indexOf(member) < 0) {
									group.push(member);
								}
							}
						);
					}
				);
			};
			lib_call.executor_chain(
				{},
				(
					[]
					.concat(
						includes.map(
							include => groups => (resolve_, reject_) => {
								lib_file.read_json(include)(
									data => {
										merge(groups, data);
										resolve_(groups);
									},
									reject_
								);
							}
						)
					)
					.concat(
						[
							groups => (resolve_, reject_) => {
								merge(groups, adhocs);
								resolve_(groups);
							}
						]
					)
				)
			)(
				groups => {
					console.info(JSON.stringify(groups, undefined, "\t"));
					resolve(undefined);
				},
				reject
			);
		}
	);
}

function apply_(file, outputs) {
	return (
		(resolve, reject) => {
			if (file == null) {
				reject(new Error("you must specify a source file via '--file=...'"));
			}
			else {
				lib_file.read_json(file)(
					data => {
						lib_object.to_array(outputs).forEach(
							pair => {
								let list = data[pair.key];
								let command = (((list == undefined) || (list.length == 0)) ? `touch ${pair.value}` : `cat ${list.join(" ")} > ${pair.value}`);
								try {
									let _child_process = require("child_process");
									_child_process.execSync(command);
								}
								catch (exception) {
									reject(exception);
								}
							}
						);
						resolve(undefined);
					},
					reject
				);
			}
		}
	);
}

function main(args) {
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
			return create(
				argdata["includes"],
				convert(argdata["adhocs"])
			);
			break;
		}
		case "apply": {
			return apply_(
				argdata["file"],
				convert(argdata["outputs"])
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

