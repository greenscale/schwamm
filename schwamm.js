#!/usr/bin/node

"use strict";

var _fs = require("fs");
var _child_process = require("child_process");

function main(args) {
	let getarg = (def) => ((args.length >= 1) ? args.shift() : def);
	let command = getarg("help");
	switch (command) {
		case "help": {
			console.info("SYNOPSIS");
			console.info("\tlinklist create [-i <include>]* [-a <groupname>:<path>]*");
			console.info("\tlinklist read <file> <groupname>");
			console.info("\tlinklist apply <file> [-o <groupname>:<path>]*");
			return {"successfull": true};
			// break;
		}
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
			let state = {
				"label": "default",
				"includes": [],
				"adhoc": {},
			};
			args.forEach(
				symbol => {
					switch (state.label) {
						case "default": {
							switch (symbol) {
								case "-i": {
									state.label = "read_include";
									break;
								}
								case "-a": {
									state.label = "read_adhoc";
									break;
								}
								default: {
									throw (new Error("unexpected"));
									break;
								}
							}
							break;
						}
						case "read_include": {
							state.includes.push(symbol);
							state.label = "default";
							break;
						}
						case "read_adhoc": {
							let regexp = new RegExp("(\\w+):(\\S+)", "g");
							let matching = regexp.exec(symbol);
							if (matching == null) {
								throw (new Error(`invalid adhoc-entry '${symbol}'`));
							}
							else {
								let group = matching[1];
								let value = matching[2];
								if (! (group in state.adhoc)) {
									state.adhoc[group] = [];
								}
								state.adhoc[group].push(value);
								state.label = "default";
							}
							break;
						}
					}
				}
			);
			let groups = {};
			state.includes.forEach(
				include => {
					let folder = include.split("/").slice(0, -1).join("/");
					let content = _fs.readFileSync(include);
					let data = JSON.parse(content);
					/*
					Object.keys(data).forEach(
						groupname => {
							data[groupname] = data[groupname].map(member => [folder, member].join("/"));
						}
					);
					 */
					merge(groups, data);
				}
			);
			merge(groups, state.adhoc);
			console.info(JSON.stringify(groups, undefined, "\t"));
			return {"successfull": true};
			// break;
		}
		case "read": {
			let group = getarg();
			let path = getarg();
			let content = _fs.readFileSync(path);
			let data = JSON.parse(content);
			data[group].forEach(member => console.info(member));
			return {"successfull": true};
			// break;
		}
		case "apply": {
			let path = getarg();
			let state = {
				"label": "default",
				"outputs": {},
			};
			args.forEach(
				symbol => {
					switch (state.label) {
						case "default": {
							switch (symbol) {
								case "-o": {
									state.label = "read_output";
									break;
								}
								default: {
									throw (new Error("unhandled"));
									break;
								}
							}
						}
						case "read_output": {
							let regexp = new RegExp("(\\w+):(\\S+)");
							let matching = regexp.exec(symbol);
							if (matching == null) {
							}
							else {
								let groupname = matching[1];
								let path_ = matching[2];
								state.label = "default";
								state.outputs[groupname] = path_;
							}
							break;
						}
					}
				}
			);
			let content = _fs.readFileSync(path);
			let data = JSON.parse(content);
			Object.keys(state.outputs).forEach(
				groupname => {
					let command = `cat ${data[groupname].join(" ")} > ${state.outputs[groupname]}`;
					_child_process.execSync(command);
				}
			);
			return {"successfull": true};
			break;
		}
		default: {
			return {"successfull": false, "message": `unhandled action ${command}`};
			// break;
		}
	}
}

try {
	let result = main(process.argv.slice(2));
	if (result.successfull) {
		process.exit(0);
	}
	else {
		console.error(result.message);
		process.exit(-1);
	}
}
catch (exception) {
	console.error(exception);
	process.exit(-1);
}

