
/**
 * @author fenris
 */
type type_schwamm = {
	paths : {[domain : string] : Array<string>};
}


/**
 * @author fenris
 */
function suck(
	includes : Array<string>;
	inputs : {[domain : string] : Array<string>};
) : Promise<type_schwamm, Error>
{
	let schwamm : type_schwamm = {"paths": {}};
	lib_call.executor_condense(includes.map(include => lib_file.read_json(include)))(
		contents => {
		}
	);
	return schwamm;
}


/**
 * @author fenris
 */
function squeeze(
	schwamm : type_schwamm,
) : Promise<void, Error>
{
}

