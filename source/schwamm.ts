
declare var process;


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
function absolutify(
	path : string
) : string
{
	return ((path[0] == "/") ? path : (process.cwd() + "/" + path));
}


/**
 * @author fenris
 */
type type_schwamm = {[domain : string] : Array<string>};


/**
 * @author fenris
 */
function schwamm_create(
) : type_schwamm {
	return {};
}


/**
 * @author fenris
 */
function schwamm_has(
	schwamm : type_schwamm,
	domain : string,
	path : string
) : boolean
{
	if (! (domain in schwamm)) {
		return false;
	}
	else {
		return schwamm[domain].some(path_ => (path == path_));
	}
}


/**
 * @author fenris
 */
function schwamm_add(
	schwamm : type_schwamm,
	domain : string,
	path : string
) : void
{
	let path_ : string = absolutify(path);
	if (! (domain in schwamm)) {
		schwamm[domain] = new Array<string>();
	}
	if (! schwamm_has(schwamm, domain, path_)) {
		schwamm[domain].push(path_);
	}
}


/**
 * @author fenris
 */
function schwamm_suck(
	schwamm : type_schwamm,
	includes : Array<string>,
	inputs : {[domain : string] : Array<string>}
) : Promise<void, Error>
{
	return Promise.resolve<void, Error>(undefined)
		// includes
		.then<void, Error>(
			_ => new Promise<type_schwamm, Error>(
				(resolve, reject) => {
					Promise.all(includes.map(include => new Promise<any, Error>(lib_file.read_json(include))))
						.then(
							contents => {
								contents.forEach(
									content => {
										Object.keys(content).forEach(
											domain => {
												content[domain].forEach(
													path => {
														schwamm_add(schwamm, domain, path);
													}
												);
											}
										);
									}
								);
								resolve(undefined);
							},
							reject
						)
					;
				}
			)
		)
		// inputs
		.then<void, Error>(
			_ => new Promise<type_schwamm, Error>(
				(resolve, reject) => {
					Object.keys(inputs).forEach(
						domain => {
							inputs[domain].forEach(
								path => {
									schwamm_add(schwamm, domain, path);
								}
							);
						}
					);
					resolve(undefined);
				}
			)
		)
	;
}


/**
 * @author fenris
 */
function schwamm_squeeze(
	schwamm : type_schwamm,
	output : {kind : string; parameters ?: Object;}
) : Promise<void, Error>
{
	return (
		new Promise<void, Error>(
			(resolve, reject) => {
				switch (output.kind) {
					case "native": {
						let message : string = JSON.stringify(schwamm, undefined, "\t");
						console.info(message);
						resolve(undefined);
						break;
					}
					case "list": {
						let domain : string = output.parameters["domain"];
						if (! (domain in schwamm)) {
							reject(new Error(`schwamm has no entries for domain '${domain}'`));
						}
						else {
							let message = schwamm[domain].join("\n");
							console.info(message);
							resolve(undefined);
						}
						break;
					}
					case "dump": {
						let domain : string = output.parameters["domain"];
						if (! (domain in schwamm)) {
							reject(new Error(`schwamm has no entries for domain '${domain}'`));
						}
						else {
							Promise.all(schwamm[domain].map(path => new Promise<string, Error>(lib_file.read(path))))
								.then(
									contents => {
										let message : string = contents.reduce((x, y) => (x + y), "");
										console.info(message);
										resolve(undefined);
									},
									reject
								)
							;
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
						"indicators_short": ["r"],
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
					console.error(`couldn't read input definition '${input_raw}'`);
					// return null;
				}
				else {
					let path : string = matching[1];
					let domain : string = matching[2];
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
			let schwamm : type_schwamm = schwamm_create();
			return Promise.resolve<void, Error>(undefined)
				.then<void, Error>(
					_ => schwamm_suck(schwamm, includes, inputs)
				)
				.then<void, Error>(
					_ => schwamm_squeeze(schwamm, output)
				)
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

