
declare var process;


/**
 * @author fenris
 */
type type_schwamm = {
	paths : {[domain : string] : Array<string>};
}


/**
 * @author fenris
 */
var globalvars = {
	"meta": {
		"version": "0.2.0",
		"name": "schwamm",
		"author": "Fenris Wolf <fenris@greenscale.de>",
		"description": "a tiny tool for linking",
	},
	"configuration": {
	}
};


/**
 * @author fenris
 */
function suck(
	includes : Array<string>,
	inputs : {[domain : string] : Array<string>}
) : Promise<type_schwamm, Error>
{
	let add : (schwamm : type_schwamm, domain : string, path : string)=>void = (schwamm, domain, path) => {
		if (! (domain in schwamm.paths)) {
			schwamm.paths[domain] = [];
		}
		if (! (path in schwamm.paths[domain])) {
			schwamm.paths[domain].push(path);
		}
	};
	return Promise.resolve<void, Error>(undefined)
		// initialize empty schwamm
		.then<type_schwamm, Error>(
			_ => new Promise<type_schwamm, Error>(
				(resolve, reject) => {
					let schwamm : type_schwamm = {"paths": {}};
					resolve(schwamm);
				}
			)
		)
		// includes
		.then<type_schwamm, Error>(
			schwamm => new Promise<type_schwamm, Error>(
				(resolve, reject) => {
					lib_call.executor_condense(includes.map(include => lib_file.read_json(include)))(
						contents => {
							contents.forEach(
								content => {
									Object.keys(content).forEach(
										domain => {
											content[domain].forEach(
												path => {
													add(schwamm, domain, path);
												}
											);
										}
									);
								}
							);
							resolve(schwamm);
						},
						reject
					);
				}
			)
		)
		// inputs
		.then<type_schwamm, Error>(
			schwamm => new Promise<type_schwamm, Error>(
				(resolve, reject) => {
					Object.keys(inputs).forEach(
						domain => {
							inputs[domain].forEach(
								path => {
									add(schwamm, domain, path);
								}
							);
						}
					);
					resolve(schwamm);
				}
			)
		)
	;
}


/**
 * @author fenris
 */
function squeeze(
	schwamm : type_schwamm,
	output : {kind : string; parameters ?: Object;}
) : Promise<void, Error>
{
	return (
		new Promise<void, Error>(
			(resolve, reject) => {
				switch (output.kind) {
					case "native": {
						let message : string = JSON.stringify(schwamm.paths, undefined, "\t");
						console.info(message);
						resolve(undefined);
						break;
					}
					case "list": {
						let domain : string = output.parameters["domain"];
						if (! (domain in schwamm.paths)) {
							reject(new Error(`schwamm has no entries for domain '${domain}'`));
						}
						else {
							let message = schwamm.paths[domain].join("\n");
							console.info(message);
							resolve(undefined);
						}
						break;
					}
					case "dump": {
						let domain : string = output.parameters["domain"];
						if (! (domain in schwamm.paths)) {
							reject(new Error(`schwamm has no entries for domain '${domain}'`));
						}
						else {
							lib_call.executor_condense(schwamm.paths[domain].map(path => lib_file.read(path)))(
								contents => {
									let message : string = contents.reduce((x, y) => (x + y), "");
									console.info(message);
									resolve(undefined);
								},
								reject
							);
						}
						break;
					}
					default: {
						reject(new Error(`unhandled output kind '${output.kind}'`));
						break;
					}
				}
			}
		)
	);
}


/**
 * @author fenris
 */
function main(
	args : Array<string>
) : Promise<void, Error>
{
	let arghandler : lib_args.class_handler = new lib_args.class_handler(
		[
			new lib_args.class_argument(
				{
					"name": "includes",
					"type": "string",
					"default": [],
					"mode": "accumulate",
					"kind": "volatile",
					"parameters": {
						"indicators_long": ["include"],
						"indicators_short": ["c"],
					},
					"info": "adds a schwamm-file, which is to be included",
				}
			),
			new lib_args.class_argument(
				{
					"name": "inputs",
					"type": "string",
					"default": [],
					"mode": "accumulate",
					"kind": "volatile",
					"parameters": {
						"indicators_long": ["input"],
						"indicators_short": ["i"],
					},
					"info": "adds an adhoc-input; specify as '<domain>:<path>' (e.g. 'foo:bar.txt')",
				}
			),
			new lib_args.class_argument(
				{
					"name": "output",
					"type": "string",
					"default": "native",
					"mode": "replace",
					"kind": "volatile",
					"parameters": {
						"indicators_long": ["output"],
						"indicators_short": ["o"],
					},
					"info": "sets the output-action; valid values are 'native', 'list:<domain>', 'dump:<domain>'",
				}
			),
			new lib_args.class_argument(
				{
					"name": "version",
					"type": "boolean",
					"default": false,
					"mode": "replace",
					"kind": "volatile",
					"parameters": {
						"indicators_long": ["version"],
						"indicators_short": ["v"],
					},
					"info": "display version info and exit",
				}
			),
			new lib_args.class_argument(
				{
					"name": "help",
					"type": "boolean",
					"default": false,
					"mode": "replace",
					"kind": "volatile",
					"parameters": {
						"indicators_long": ["help"],
						"indicators_short": ["h"],
					},
					"info": "display this help and exit",
				}
			),
		]
	);
	let argdata : {[id : string] : any} = arghandler.read("cli", args.join(" "));
	if (argdata["help"]) {
		let message : string = arghandler.generate_help(
			{
				"programname": globalvars["meta"]["name"],
				"author": globalvars["meta"]["author"],
				"description": globalvars["meta"]["description"],
				"executable": "schwamm",
			}
		);
		console.info(message);
		return Promise.resolve<void, Error>(undefined);
	}
	else if (argdata["version"]) {
		let message : string = globalvars["meta"]["version"];
		console.info(message);
		return Promise.resolve<void, Error>(undefined);
	}
	else {
		let includes : Array<string> = argdata["includes"];
		let inputs : {[domain : string] : Array<string>} = {};
		argdata["inputs"].forEach(
			input_raw => {
				let regexp : RegExp = new RegExp("([^:]*):([^:]*)");
				let matching : any = regexp.exec(input_raw);
				if (matching == null) {
					console.error("couldn't read input definition '" + input_raw + "'");
					// return null;
				}
				else {
					let domain : string = matching[1];
					let path : string = matching[2];
					if (! (domain in inputs)) {
						inputs[domain] = [];
					}
					inputs[domain].push(path);
				}
			}
		);
		let output : {kind : string; parameters ?: Object} =
			(
				output_raw => {
					let regexp : RegExp = new RegExp("([^:]*)(?::([^:]*))?");
					let matching : any = regexp.exec(output_raw);
					if (matching == null) {
						console.error(`couldn't read output definition '${output_raw}'`);
						return null;
					}
					else {
						let kind : string = matching[1];
						let domain : string = matching[2];
						if ((kind != "native") && (domain == undefined)) {
							console.error("no domain for output specified");
							return null;
						}
						else {
							return {
								"kind": kind,
								"parameters": {
									"domain": domain,
								},
							};
						}
					}
				}
			) (argdata["output"])
		;
		if (output == null) {
			return Promise.reject<void, Error>(new Error("invalid output"));
		}
		else {
			return Promise.resolve<void, Error>(undefined)
				.then<type_schwamm, Error>(_ => suck(includes, inputs))
				.then<void, Error>(schwamm => squeeze(schwamm, output))
			;
		}
	}
}


/**
 * @author fenris
 */
main(process.argv.slice(2))
	.then(
		result => {
			// console.info("done", result);
		},
		reason => {
			console.error("failed", reason);
			process.exit(-1);
		}
	)
;

