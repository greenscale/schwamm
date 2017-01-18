declare type int = number;
declare type float = number;
declare var process: any;
declare var require: any;
declare var java: any;
declare module lib_base {
    /**
     * @author frac
     */
    function environment(): string;
}
/**
 * @author fenris
 */
declare var instance_verbosity: int;
/**
 * @author fenris
 */
interface interface_collatable<type_value> {
    /**
     * @author fenris
     */
    _collate(value: type_value): boolean;
}
/**
 * @author fenris
 */
declare function instance_collate<type_value>(value1: type_value, value2: type_value): boolean;
/**
 * @author fenris
 */
interface interface_cloneable<type_value> {
    /**
     * @author fenris
     */
    _clone(): type_value;
}
/**
 * @author fenris
 */
declare function instance_clone<type_value>(value: type_value): type_value;
/**
 * @author fenris
 */
interface interface_hashable {
    /**
     * @author fenris
     */
    _hash(): string;
}
/**
 * @author fenris
 */
declare function instance_hash<type_value>(value: type_value): string;
/**
 * @author fenris
 */
interface interface_showable {
    /**
     * @author fenris
     */
    _show(): string;
}
/**
 * @author fenris
 */
declare function instance_show<type_value>(value: type_value): string;
/**
 * @author frac
 */
interface interface_decorator<type_core> {
    /**
     * @author frac
     */
    core: type_core;
}
/**
 * @author frac
 */
declare class class_observer {
    /**
     * @author frac
     */
    protected counter: int;
    /**
     * @author frac
     */
    protected actions: {
        [id: string]: (information: Object) => void;
    };
    /**
     * @author frac
     */
    protected buffer: Array<Object>;
    /**
     * @author frac
     */
    constructor();
    /**
     * @author frac
     */
    empty(): boolean;
    /**
     * @author frac
     */
    flush(): void;
    /**
     * @author frac
     */
    set(id: string, action: (information: Object) => void): void;
    /**
     * @author frac
     */
    del(id: string): void;
    /**
     * @author frac
     */
    add(action: (information: Object) => void): void;
    /**
     * @author frac
     */
    notify(information?: Object, delayed?: boolean): void;
    /**
     * @author frac
     */
    rollout(): void;
}
declare var ExceptionAbstract: any;
/**
 * @author frac
 */
declare class class_maybe<type_value> {
    /**
     * @desc whether the wrapper is nothing
     * @author frac
     */
    is_nothing(): boolean;
    /**
     * @desc whether the wrapper is just
     * @author frac
     */
    is_just(): boolean;
    /**
     * @desc return the value, stored in the maybe-wrapper
     * @author frac
     */
    cull(): type_value;
    /**
     * @author frac
     */
    distinguish(action_just: (value?: type_value) => void, action_nothing?: (reason?: string) => void): void;
    /**
     * @author frac
     */
    propagate<type_value_>(action: (value: type_value) => class_maybe<type_value_>): class_maybe<type_value_>;
}
/**
 * @author frac
 */
declare class class_nothing<type_value> extends class_maybe<type_value> {
    /**
     * @author frac
     */
    private reason;
    /**
     * @author frac
     */
    constructor(reason?: string);
    /**
     * @author frac
     */
    is_nothing(): boolean;
    /**
     * @author frac
     */
    is_just(): boolean;
    /**
     * @author frac
     */
    cull(): type_value;
    /**
     * @author frac
     */
    distinguish(action_just: (value?: type_value) => void, action_nothing?: (reason?: string) => void): void;
    /**
     * @author frac
     */
    propagate<type_value_>(action: (value: type_value) => class_maybe<type_value_>): class_maybe<type_value_>;
}
/**
 * @author frac
 */
declare class class_just<type_value> extends class_maybe<type_value> {
    /**
     * @author frac
     */
    private value;
    /**
     * @author frac
     */
    constructor(value: type_value);
    /**
     * @author frac
     */
    is_nothing(): boolean;
    /**
     * @author frac
     */
    is_just(): boolean;
    /**
     * @author frac
     */
    cull(): type_value;
    /**
     * @author frac
     */
    distinguish(action_just: (value?: type_value) => void, action_nothing?: (reason?: string) => void): void;
    /**
     * @author frac
     */
    propagate<type_value_>(action: (value: type_value) => class_maybe<type_value_>): class_maybe<type_value_>;
}
/**
 * @author frac
 */
declare class class_error extends Error {
    /**
     * @author frac
     */
    protected suberrors: Array<Error>;
    /**
     * @author frac
     */
    protected mess: string;
    /**
     * @author frac
     */
    constructor(message: string, suberrors?: Array<Error>);
    /**
     * @override
     * @author frac
     */
    toString(): string;
}
/// <reference path="../../base/build/logic-decl.d.ts" />
declare module lib_call {
    /**
     * @desc this is kind of an ugly hack; the motivation is, that the JS-interpreter of many Gecko-based browsers
     *    (e.g. Firefox) won't accept a larger number of stack-frames, which come up when using executor-chains often.
     *    This can be circumvented by deferring inner calls, such that they are moved outside the own stack-frame. This
     *    is possible due to the asynchronous nature of executors. However this does also significantly increase the
     *    overall-time for a long executor-chain (or rather executor-tree) to finish. Therefore it is not recommended
     *    to do this by default.
     * @author frac
     */
    var default_deferred: boolean;
    /**
     * @author fenris
     */
    function schedule(function_: () => void, deferred?: boolean): void;
}
declare module lib_call {
    /**
     * @author frac
     * @todo could possibly be replaced by Promise-system
     */
    abstract class class_wait {
        /**
         * @author frac
         */
        abstract run(): void;
    }
    /**
     * @author frac
     * @todo could possibly be replaced by Promise-system
     */
    class class_wait_sequential extends class_wait {
        /**
         * @author frac
         */
        protected dependencies: Array<(ready: () => void) => void>;
        /**
         * @author frac
         */
        protected action: () => void;
        /**
         * @author frac
         */
        constructor(dependencies: Array<(ready: () => void) => void>, action?: () => void);
        /**
         * @author frac
         */
        protected run_(dependencies: Array<(ready: () => void) => void>): void;
        /**
         * @author frac
         */
        run(): void;
    }
    /**
     * @author frac
     * @todo could possibly be replaced by Promise-system
     */
    class class_wait_parallel extends class_wait {
        /**
         * @author frac
         */
        protected index: int;
        /**
         * @author frac
         */
        protected dependencies: {
            [id: string]: (ready: () => void) => void;
        };
        /**
         * @author frac
         */
        protected action: () => void;
        /**
         * @author frac
         */
        constructor(dependencies: Array<(ready: () => void) => void>, action?: () => void);
        /**
         * @author frac
         */
        protected add_dependency(dependency: (ready: () => void) => void): void;
        /**
         * @author frac
         */
        protected remove_dependency(id: string): void;
        /**
         * @author frac
         */
        run(): void;
    }
}
declare module lib_call {
    /**
     * @desc a definition for a value being "defined"
     * @author neuc
     */
    function is_def<type_value>(obj: type_value, null_is_valid?: boolean): boolean;
    /**
     * @desc returns the value if set and, when a type is specified, if the type is corret, if not return default_value
     * @author neuc
     */
    function def_val(value: any, default_value: any, type?: string, null_is_valid?: boolean): any;
    /**
     * @desc just the empty function; useful for some callbacks etc.
     * @author frac
     */
    function nothing(): void;
    /**
     * @desc just the identity; useful for some callbacks etc.
     * @author frac
     */
    function id<type_value>(x: type_value): type_value;
    /**
     * @author frac
     */
    function use<type_input, type_output>(input: type_input, function_: (input: type_input) => type_output): type_output;
    /**
     * @desc outputs
     * @author frac
     */
    function output(x: any): void;
    /**
     * @desc converts the "arguments"-map into an array
     * @param {Object} args
     * @author frac
     */
    function args2list(args: any): Array<any>;
    /**
     * @desc provides the call for an attribute of a class as a regular function
     * @param {string} name the name of the attribute
     * @return {*}
     * @author frac
     */
    function attribute<type_object, type_attribute>(name: string): (object: type_object) => type_attribute;
    /**
     * @desc provides a method of a class as a regular function
     * @param {string} name the name of the method
     * @return {function}
     * @author frac
     */
    function method<type_object, type_output>(name: string): (object: type_object) => type_output;
    /**
     * @desc composes two functions (i.e. returns a function that return the result of the successive execution of both input-functions)
     * @param {function} function_f
     * @param {function} function_g
     * @author frac
     */
    function compose<type_x, type_y, type_z>(function_f: (type_x) => type_y, function_g: (type_y) => type_z): (value: type_x) => type_z;
    /**
     * @desc transforms a function with sequential input into a function with leveled input; example: add(2,3) = curryfy(add)(2)(3)
     * @param {function} f
     * @param {int} n (don't set manually)
     * @return {function} the currified version of the in put function
     * @author frac
     */
    function curryfy(f: Function, n?: int): Function;
    /**
     * @desc adapter for old syntax
     * @author frac
     */
    function wait(dependencies: Array<(ready: () => void) => void>, action?: () => void, parallel?: boolean): void;
    /**
     * returns a function which goes through a process step by step
     * a process is an array of objects like { func : {function}, state : {string}}
     * trigger the start of the process by calling the returned function with one argument
     * which represents the parameters of the first function which is in the process
     * @param {Array<object>} _process
     * @param {function} on_stateChange called before the next function is called
     * @returns {function}
     */
    function simple_process(_process: any, on_stateChange?: (msg: any) => void, on_progress?: (msg: any, pos: any, max: any) => void): Function;
}
declare module lib_call {
    /**
     * @author frac
     */
    type type_executor<type_result, type_reason> = ((resolve: (result?: type_result) => void, reject?: (reason?: type_reason) => void) => void);
    /**
     * @author frac
     */
    function executor_resolve<type_result, type_reason>(result: type_result): type_executor<type_result, type_reason>;
    /**
     * @author frac
     */
    function executor_reject<type_result, type_reason>(reason: type_reason): type_executor<type_result, type_reason>;
    /**
     * @author frac
     */
    function executor_transform<type_result_from, type_error_from, type_result_to, type_error_to>(executor: type_executor<type_result_from, type_error_from>, transform_result: (result_from: type_result_from) => type_result_to, transform_reason: (error_from: type_error_from) => type_error_to): type_executor<type_result_to, type_error_to>;
    /**
     * @author frac
     */
    function executor_transform_default<type_result_from, type_result_to>(executor: type_executor<type_result_from, Error>, transform_result: (result_from: type_result_from) => type_result_to, wrap_string?: string): type_executor<type_result_to, Error>;
    /**
     * @author frac
     */
    function executor_compose_sequential<type_result_first, type_result_second, type_reason>(first: type_executor<type_result_first, type_reason>, second: (result: type_result_first) => type_executor<type_result_second, type_reason>, deferred?: boolean): type_executor<type_result_second, type_reason>;
    /**
     * @author frac
     */
    function executor_chain<type_state, type_error>(state: type_state, executors: Array<(state: type_state) => type_executor<type_state, type_error>>, deferred?: boolean): type_executor<type_state, type_error>;
    /**
     * @author frac
     */
    function executor_first<type_result, type_reason>(executors: Array<type_executor<type_result, type_reason>>): type_executor<type_result, Array<type_reason>>;
    /**
     * @author frac
     */
    function executor_condense<type_element>(executors: Array<type_executor<type_element, Error>>): type_executor<Array<type_element>, Error>;
    /**
     * @author frac
     * @deprecated use condense
     */
    function executor_filter<type_element>(executors: Array<type_executor<type_element, Error>>, predicate: (element: type_element) => boolean): type_executor<Array<type_element>, Error>;
    /**
     * @author frac
     * @deprecated use condense
     */
    function executor_map<type_element1, type_element2>(executors: Array<type_executor<type_element1, Error>>, transformator: (element1: type_element1) => type_element2): type_executor<Array<type_element2>, Error>;
    /**
     * @author frac
     * @deprecated use condense
     */
    function executor_reduce<type_element, type_result>(executors: Array<type_executor<type_element, Error>>, initial: type_result, accumulator: (result: type_result, element: type_element) => type_result): type_executor<type_result, Error>;
}
declare module lib_call {
    /**
     * @author fenris
     */
    function knot_loglevel_get(): int;
    /**
     * @author fenris
     */
    function knot_loglevel_push(loglevel: int): void;
    /**
     * @author fenris
     */
    function knot_loglevel_pop(): void;
    /**
     * @author fenris
     */
    type type_knot<type_input, type_output, type_error> = ((input?: type_input) => (resolve: (output?: type_output) => void, reject?: (error?: type_error) => void) => void);
    /**
     * @author fenris
     */
    function knot_resolver<type_input, type_output, type_error>(output: type_output): type_knot<type_input, type_output, type_error>;
    /**
     * @author fenris
     */
    function knot_id<type_input, type_error>(): type_knot<type_input, type_input, type_error>;
    /**
     * @author fenris
     */
    function knot_rejector<type_input, type_output, type_error>(error: type_error): type_knot<type_input, type_output, type_error>;
    /**
     * @author fenris
     */
    function knot_from_function<type_input, type_output, type_error>(function_: (input: type_input) => type_output): type_knot<type_input, type_output, type_error>;
    /**
     * @author fenris
     */
    function knot_wrap<type_input_inner, type_output_inner, type_error_inner, type_input_outer, type_output_outer, type_error_outer>(inner: type_knot<type_input_inner, type_output_inner, type_error_inner>, convert_input: (input_outer: type_input_outer) => type_input_inner, convert_output: (output_inner: type_output_inner) => type_output_outer, convert_error: (error_inner: type_error_inner) => type_error_outer): type_knot<type_input_outer, type_output_outer, type_error_outer>;
    /**
     * @author fenris
     */
    function knot_wrap_log<type_input, type_output, type_error>(inner: type_knot<type_input, type_output, type_error>): type_knot<type_input, type_output, type_error>;
    /**
     * @author fenris
     */
    function knot_compose_sequential<type_input, type_between, type_output, type_error>(first: type_knot<type_input, type_between, type_error>, second: type_knot<type_between, type_output, type_error>): type_knot<type_input, type_output, type_error>;
    /**
     * @author fenris
     */
    function knot_chain<type_error>(knots: Array<type_knot<any, any, type_error>>, log?: boolean): type_knot<any, any, type_error>;
    /**
     * @author fenris
     */
    /**
     * @author fenris
     */
    function knot_bunch<type_input, type_error>(knots: {
        [id: string]: type_knot<type_input, any, type_error>;
    }): type_knot<type_input, {
        [id: string]: any;
    }, type_error>;
    /**
     * @author fenris
     */
    function knot_condense<type_input, type_output, type_error>(knots: Array<type_knot<type_input, type_output, type_error>>): type_knot<type_input, Array<type_output>, type_error>;
    /**
     * @author fenris
     */
    function knot_first<type_input, type_output, type_error>(knots: Array<type_knot<type_input, type_output, type_error>>): type_knot<type_input, type_output, Array<type_error>>;
    /**
     * @author fenris
     */
    function knot_repeat<type_input, type_output, type_error>(knot: type_knot<type_input, type_output, type_error>, attempts?: int, delay?: (attempt: int) => int): type_knot<type_input, type_output, Array<type_error>>;
    /**
     * @author fenris
     */
    class class_knot_initializer<type_input, type_output, type_error> {
        /**
         * @desc the actual action to be performed
         * @author fenris
         */
        protected fetcher: type_knot<type_input, type_output, type_error>;
        /**
         * @author fenris
         * 0 : initial
         * 1 : waiting
         * 2 : done, successful
         * 3 : done, failed
         */
        protected state: int;
        /**
         * @author fenris
         */
        protected queue: Array<{
            resolve: (output?: type_output) => void;
            reject: (error?: type_error) => void;
        }>;
        /**
         * @author fenris
         */
        protected output: type_output;
        /**
         * @author fenris
         */
        protected error: type_error;
        /**
         * @author fenris
         */
        constructor(fetcher: type_knot<type_input, type_output, type_error>);
        /**
         * @author fenris
         */
        protected actuate(): void;
        /**
         * @author fenris
         */
        get(input: type_input): type_knot<void, type_output, type_error>;
    }
}
/**
 * @author fenris
 */
declare class Promise<type_result, type_reason> {
    /**
     * @author fenris
     */
    constructor(executor: lib_call.type_executor<type_result, type_reason>);
    /**
     * @author fenris
     */
    then<type_result_, type_reason_>(onFulfilled: (result: type_result) => any, onRejected?: (reason: type_reason) => any): Promise<type_result_, type_reason_>;
    /**
     * @author fenris
     */
    catch<type_result_, type_reason_>(onRejected: (reason: type_reason) => any): Promise<type_result_, type_reason_>;
    /**
     * @author fenris
     */
    static resolve<type_result, type_reason>(result: type_result): Promise<type_result, type_reason>;
    /**
     * @author fenris
     */
    static reject<type_result, type_reason>(reason: type_reason): Promise<type_result, type_reason>;
    /**
     * @author fenris
     */
    static all(promises: Array<Promise<any, any>>): Promise<Array<any>, any>;
}
declare module lib_call {
    /**
     * @author fenris
     */
    type type_microprogram<type_input, type_output, type_error> = (input: type_input) => Promise<type_output, type_error>;
    /**
     * @author fenris
     */
    function promise_chain<type_value, type_error>(microprograms: Array<type_microprogram<type_value, type_value, type_error>>): type_microprogram<type_value, type_value, type_error>;
}
/// <reference path="../../base/build/logic-decl.d.ts" />
declare module lib_structures {
    /**
     * @author fenris
     */
    class class_pair<type_first, type_second> implements interface_cloneable<class_pair<type_first, type_second>>, interface_collatable<class_pair<type_first, type_second>>, interface_hashable, interface_showable {
        /**
         * @author fenris
         */
        protected first: type_first;
        /**
         * @author fenris
         */
        protected second: type_second;
        /**
         * @author fenris
         */
        constructor(first: type_first, second: type_second);
        /**
         * @desc [accessor] [getter]
         * @author fenris
         */
        first_get(): type_first;
        /**
         * @desc [accessor] [getter]
         * @author fenris
         */
        second_get(): type_second;
        /**
         * @desc [mutator] [setter]
         * @author fenris
         */
        first_set(first: type_first): void;
        /**
         * @desc [mutator] [setter]
         * @author fenris
         */
        second_set(second: type_second): void;
        /**
         * @desc [accessor]
         * @author fenris
         */
        swap(): class_pair<type_second, type_first>;
        /**
         * @desc [accessor]
         * @author fenris
         */
        transform<type_first_, type_second_>(transform_first: (first: type_first) => type_first_, transform_second: (second: type_second) => type_second_): class_pair<type_first_, type_second_>;
        /**
         * @desc [accessor] [implementation]
         * @author fenris
         */
        _clone(): class_pair<type_first, type_second>;
        /**
         * @desc [accessor] [implementation]
         * @author fenris
         */
        _hash(): string;
        /**
         * @desc [accessor] [implementation]
         * @author fenris
         */
        _collate(pair: class_pair<type_first, type_second>): boolean;
        /**
         * @desc [accessor] [implementation]
         * @author fenris
         */
        _show(): string;
    }
}
declare module lib_structures {
    /**
     * @author fenris
     */
    class class_set<type_element> implements interface_collatable<class_set<type_element>>, interface_showable {
        /**
         * @author fenris
         */
        protected elements: Array<type_element>;
        /**
         * @author fenris
         */
        protected equality: (element1: type_element, element2: type_element) => boolean;
        /**
         * @author fenris
         */
        constructor(elements_?: Array<type_element>, equality?: (element1: type_element, element2: type_element) => boolean);
        /**
         * @desc [accessor]
         * @author fenris
         */
        size(): int;
        /**
         * @desc [accessor]
         * @author fenris
         */
        has(element: type_element): boolean;
        /**
         * @desc [mutator]
         * @author fenris
         */
        add(element: type_element): void;
        /**
         * @desc [mutator]
         * @author fenris
         */
        pop(): class_maybe<type_element>;
        /**
         * @desc [accessor]
         * @author fenris
         */
        forEach(function_: (element: type_element) => void): void;
        /**
         * @desc [accessor]
         * @author fenris
         */
        map<type_element_>(transformator: (element: type_element) => type_element_): class_set<type_element_>;
        /**
         * @desc [accessor]
         * @author fenris
         */
        filter(predicate: (element: type_element) => boolean): class_set<type_element>;
        /**
         * @desc [accessor]
         * @author fenris
         */
        dump(): Array<type_element>;
        /**
         * @desc [accessor]
         * @author fenris
         */
        subset(set: class_set<type_element>): boolean;
        /**
         * @desc [accessor]
         * @author fenris
         */
        superset(set: class_set<type_element>): boolean;
        /**
         * @desc [accessor]
         * @author fenris
         */
        equals(set: class_set<type_element>): boolean;
        /**
         * @desc [accessor]
         * @author fenris
         */
        toString(): string;
        /**
         * @desc [accessor]
         * @author fenris
         */
        empty(): boolean;
        /**
         * @desc [accessor]
         * @author fenris
         */
        union(set: class_set<type_element>): class_set<type_element>;
        /**
         * @desc [accessor]
         * @author fenris
         */
        intersection(set: class_set<type_element>): class_set<type_element>;
        /**
         * @desc [accessor]
         * @author fenris
         */
        difference(set: class_set<type_element>): class_set<type_element>;
        /**
         * @desc [accessor] [implementation]
         * @author fenris
         */
        _collate(set: class_set<type_element>): boolean;
        /**
         * @desc [accessor] [implementation]
         * @author fenris
         */
        _show(): string;
    }
}
declare module lib_structures {
    /**
     * @author fenris
     */
    abstract class class_map_abstract<type_key, type_value> {
        /**
         * @desc [accessor]
         * @author fenris
         */
        abstract has(key: type_key): boolean;
        /**
         * @desc [accessor]
         * @author fenris
         */
        abstract get(key: type_key, strict?: boolean, fallback?: type_value): type_value;
        /**
         * @desc [mutator]
         * @author fenris
         */
        abstract set(key: type_key, value: type_value): void;
        /**
         * @desc [mutator]
         * @author fenris
         */
        abstract clear(): void;
        /**
         * @desc [mutator]
         * @author fenris
         */
        abstract delete(key: type_key): void;
        /**
         * @desc [mutator] [syntactic sugar]
         * @author fenris
         */
        del(key: type_key): void;
        /**
         * @desc [accessor]
         * @author fenris
         */
        forEach(function_: (value?: type_value, key?: type_key) => void): void;
        /**
         * @desc [accessor]
         * @author fenris
         */
        map<type_value_>(transformator: (value?: type_value, key?: type_key) => type_value_): class_map_abstract<type_key, type_value>;
        /**
         * @desc [accessor]
         * @author fenris
         */
        filter(predicate: (value?: type_value, key?: type_key) => boolean): class_map_abstract<type_key, type_value>;
        /**
         * @desc [accessor]
         * @author fenris
         */
        pairs(): class_set<class_pair<type_key, type_value>>;
        /**
         * @desc [accessor]
         * @author fenris
         */
        keys(): class_set<type_key>;
        /**
         * @desc [accessor]
         * @author fenris
         */
        values(): class_set<type_value>;
    }
    /**
     * @author fenris
     */
    class class_map_simple<type_value> extends class_map_abstract<string, type_value> implements interface_cloneable<class_map_simple<type_value>>, interface_showable {
        /**
         * @author fenris
         */
        protected object: {
            [key: string]: type_value;
        };
        /**
         * @author fenris
         */
        constructor();
        /**
         * @desc [accessor]
         * @author fenris
         */
        static from_object<type_value>(object: {
            [key: string]: type_value;
        }): class_map_simple<type_value>;
        /**
         * @override
         * @author fenris
         */
        has(key: string): boolean;
        /**
         * @override
         * @author fenris
         */
        get(key: string, strict?: boolean, fallback?: type_value): type_value;
        /**
         * @override
         * @author fenris
         */
        set(key: string, value: type_value): void;
        /**
         * @override
         * @author fenris
         */
        clear(): void;
        /**
         * @override
         * @author fenris
         */
        delete(key: string): void;
        /**
         * @override
         * @author fenris
         */
        forEach(function_: (value?: type_value, key?: string) => void): void;
        /**
         * @override
         * @author fenris
         */
        map<type_value_>(transformator: (value?: type_value, key?: string) => type_value_): class_map_simple<type_value_>;
        /**
         * @override
         * @author fenris
         */
        filter(predicate: (value?: type_value, key?: string) => boolean): class_map_simple<type_value>;
        /**
         * @override
         * @author fenris
         */
        pairs(): class_set<class_pair<string, type_value>>;
        /**
         * @override
         * @author fenris
         */
        keys(): class_set<string>;
        /**
         * @override
         * @author fenris
         */
        values(): class_set<type_value>;
        /**
         * @desc [accessor]
         * @author fenris
         * @todo implement
         */
        /**
         * @desc [accessor]
         * @author fenris
         */
        toString(): string;
        /**
         * @desc [accessor] [implementation]
         * @author fenris
         */
        _clone(): class_map_simple<type_value>;
        /**
         * @desc [accessor] [implementation]
         * @author fenris
         */
        _show(): string;
    }
    /**
     * @author fenris
     */
    class class_map_equality<type_key, type_value> extends class_map_abstract<type_key, type_value> {
        /**
         * @author fenris
         */
        protected pairs_: Array<class_pair<type_key, type_value>>;
        /**
         * @author fenris
         */
        protected collate: (key1: type_key, key2: type_key) => boolean;
        /**
         * @author fenris
         */
        constructor(collate?: (key1: type_key, key2: type_key) => boolean);
        /**
         * @override
         * @author fenris
         */
        has(key: type_key): boolean;
        /**
         * @override
         * @author fenris
         */
        get(key: type_key, strict?: boolean, fallback?: type_value): type_value;
        /**
         * @override
         * @author fenris
         */
        set(key: type_key, value: type_value): void;
        /**
         * @override
         * @author fenris
         */
        clear(): void;
        /**
         * @override
         * @author fenris
         */
        delete(key: type_key): void;
    }
    /**
     * @author fenris
     */
    class class_map<type_key, type_value> extends class_map_equality<type_key, type_value> {
    }
}
declare module lib_structures {
    /**
     * @author fenris
     */
    abstract class class_store<type_element> {
        /**
         * @desc [accessor] the number of elements
         * @author fenris
         */
        abstract size(): int;
        /**
         * @desc [accessor] reads the takeable element
         * @author fenris
         */
        abstract scan(): type_element;
        /**
         * @desc [mutator] inserts an element
         * @author fenris
         */
        abstract give(element: type_element): void;
        /**
         * @desc [mutator] removes an element and returns it
         * @author fenris
         */
        abstract take(): type_element;
    }
}
declare module lib_structures {
    /**
     * @author fenris
     */
    abstract class class_stack<type_element> extends class_store<type_element> {
        /**
         * @author fenris
         */
        protected elements: Array<type_element>;
        /**
         * @author fenris
         */
        constructor();
        /**
         * @override
         * @author fenris
         */
        size(): int;
        /**
         * @override
         * @author fenris
         */
        scan(): type_element;
        /**
         * @override
         * @author fenris
         */
        give(element: type_element): void;
        /**
         * @override
         * @author fenris
         */
        take(): type_element;
    }
}
declare module lib_structures {
    /**
     * @author fenris
     */
    abstract class class_queue<type_element> extends class_store<type_element> {
        /**
         * @author fenris
         */
        protected elements: Array<type_element>;
        /**
         * @author fenris
         */
        constructor();
        /**
         * @override
         * @author fenris
         */
        size(): int;
        /**
         * @override
         * @author fenris
         */
        scan(): type_element;
        /**
         * @override
         * @author fenris
         */
        give(element: type_element): void;
        /**
         * @override
         * @author fenris
         */
        take(): type_element;
    }
}
/// <reference path="../../base/build/logic-decl.d.ts" />
/// <reference path="../../call/build/logic-decl.d.ts" />
declare module lib_file {
    /**
     * @author fenris
     * @todo move to a dedicated lib (e.g. "http", "transport", etc.)
     */
    function ajax({"target": target, "data": data, "method": method}: {
        target: any;
        data?: null;
        method?: string;
    }): lib_call.type_executor<string, Error>;
    /**
     * @desc reads a file
     * @author fenris
     */
    function read(path: string, skip_error?: boolean): lib_call.type_executor<string, Error>;
    /**
     * @desc reads a json file
     * @author fenris
     */
    function read_json(path: string): lib_call.type_executor<Object, Error>;
    /**
     * @desc writes a file
     * @author fenris
     */
    function write(path: string, content: string): lib_call.type_executor<void, Error>;
    /**
     * @desc writes a json file
     * @author fenris
     */
    function write_json(path: string, data: Object): lib_call.type_executor<void, Error>;
}
/// <reference path="../../base/build/logic-decl.d.ts" />
declare module lib_args {
    /**
     * @author fenris
     */
    class class_argument {
        /**
         * @author fenris
         */
        protected name: string;
        /**
         * @author fenris
         */
        protected type: string;
        /**
         * @desc {"replace"|"accumulate"}
         * @author fenris
         */
        protected mode: string;
        /**
         * @author fenris
         */
        protected default_: any;
        /**
         * @author fenris
         */
        protected info: string;
        /**
         * @desc {"positional"|"volatile"}
         * @author fenris
         */
        protected kind: string;
        /**
         * @author fenris
         */
        protected parameters: Object;
        /**
         * @author fenris
         */
        protected hidden: boolean;
        /**
         * @author fenris
         */
        constructor({"name": name, "type": type, "default": default_, "info": info, "mode": mode, "kind": kind, "parameters": parameters, "hidden": hidden}: {
            name: string;
            type?: string;
            default?: any;
            info?: string;
            mode?: string;
            kind?: string;
            parameters?: Object;
            hidden?: boolean;
        });
        /**
         * @author fenris
         */
        check(): boolean;
        /**
         * @author fenris
         */
        name_get(): string;
        /**
         * @author fenris
         */
        type_get(): string;
        /**
         * @author fenris
         */
        default_get(): any;
        /**
         * @author fenris
         */
        kind_get(): string;
        /**
         * @author fenris
         */
        parameters_get(): Object;
        /**
         * @author fenris
         */
        hidden_get(): boolean;
        /**
         * @author fenris
         */
        toString(): string;
        /**
         * @author fenris
         */
        indicator_main(): string;
        /**
         * @author fenris
         */
        pattern_value(): string;
        /**
         * @author fenris
         */
        extract(raw: string): any;
        /**
         * @author fenris
         */
        assign(data: Object, raw: string): void;
        /**
         * @author fenris
         */
        make(data: Object): string;
        /**
         * @author fenris
         */
        generate_help(): string;
    }
}
declare module lib_args {
    /**
     * @author fenris
     */
    var verbosity: int;
    /**
     * @author fenris
     * @todo check validity
     */
    class class_handler {
        /**
         * @author fenris
         */
        protected arguments_: Array<class_argument>;
        /**
         * @author fenris
         */
        constructor(arguments_: Array<class_argument>);
        /**
         * @author fenris
         */
        filter(kind: string): Array<class_argument>;
        /**
         * @author fenris
         */
        read(environment: string, input: string, data?: Object): Object;
        /**
         * @author fenris
         * @todo handle if the data object doesn't have the required field or the type is wrong or sth.
         */
        write(environment: string, data: Object): string;
        /**
         * @desc manpage-like info-sheet
         * @author fenris
         */
        generate_help({"programname": programname, "author": author, "description": description, "executable": executable}: {
            programname?: string;
            author?: string;
            description?: string;
            executable?: string;
        }): string;
    }
}

