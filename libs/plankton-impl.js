var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
// module lib_base {
// }
var lib_base;
(function (lib_base) {
    /**
     * @author frac
     */
    function environment() {
        var entries = [
            {
                "id": "web",
                "name": "Web",
                "predicate": function () { return (typeof (document) !== "undefined"); }
            },
            {
                "id": "node",
                "name": "Node.js",
                "predicate": function () { return (typeof (process) !== "undefined"); }
            },
            {
                "id": "rhino",
                "name": "Rhino",
                "predicate": function () { return (typeof (java) !== "undefined"); }
            },
        ];
        var id;
        var found = entries.some(function (entry) {
            if (entry.predicate()) {
                id = entry.id;
                return true;
            }
            else {
                return false;
            }
        });
        if (found) {
            return id;
        }
        else {
            throw (new Error("unknown environment"));
        }
    }
    lib_base.environment = environment;
})(lib_base || (lib_base = {}));
/**
 * @author fenris
 */
var instance_verbosity = 0;
/**
 * @author fenris
 */
function instance_collate(value1, value2) {
    if (typeof (value1) === "object") {
        if ("_collate" in value1) {
            return value1["_collate"](value2);
        }
        else {
            throw (new Error("[collate]" + " " + "object has no such method"));
        }
    }
    else {
        if (instance_verbosity >= 1) {
            console.warn("[collate]" + " " + "primitive value; using default implementation");
        }
        return (value1 === value2);
    }
}
/**
 * @author fenris
 */
function instance_clone(value) {
    if (typeof (value) === "object") {
        if ("_clone" in value) {
            return value["_clone"]();
        }
        else {
            throw (new Error("[clone]" + " " + "object has no such method"));
        }
    }
    else {
        if (instance_verbosity >= 1) {
            console.warn("[clone]" + " " + "primitive value; using default implementation");
        }
        return value;
    }
}
/**
 * @author fenris
 */
function instance_hash(value) {
    if (typeof (value) === "object") {
        if ("_hash" in value) {
            return value["_hash"]();
        }
        else {
            throw (new Error("[hash]" + " " + "object has no such method"));
        }
    }
    else {
        if (instance_verbosity >= 1) {
            console.warn("[hash]" + " " + "primitive value; using default implementation");
        }
        return String(value);
    }
}
/**
 * @author fenris
 */
function instance_show(value) {
    if (typeof (value) === "object") {
        if ("_show" in value) {
            return value["_show"]();
        }
        else {
            throw (new Error("[show]" + " " + "object has no such method"));
        }
    }
    else {
        if (instance_verbosity >= 1) {
            console.warn("[show]" + " " + "primitive value; using default implementation");
        }
        return String(value);
    }
}
/**
 * @author frac
 */
var class_observer = (function () {
    /**
     * @author frac
     */
    function class_observer() {
        this.counter = 0;
        this.actions = {};
        this.buffer = [];
    }
    /**
     * @author frac
     */
    class_observer.prototype.empty = function () {
        return (Object.keys(this.actions).length == 0);
    };
    /**
     * @author frac
     */
    class_observer.prototype.flush = function () {
        this.actions = {};
    };
    /**
     * @author frac
     */
    class_observer.prototype.set = function (id, action) {
        this.actions[id] = action;
    };
    /**
     * @author frac
     */
    class_observer.prototype.del = function (id) {
        delete this.actions[id];
    };
    /**
     * @author frac
     */
    class_observer.prototype.add = function (action) {
        this.set((this.counter++).toString(), action);
    };
    /**
     * @author frac
     */
    class_observer.prototype.notify = function (information, delayed) {
        var _this = this;
        if (information === void 0) { information = {}; }
        if (delayed === void 0) { delayed = false; }
        if (delayed) {
            this.buffer.push(information);
        }
        else {
            Object.keys(this.actions).forEach(function (id) { return _this.actions[id](information); });
        }
    };
    /**
     * @author frac
     */
    class_observer.prototype.rollout = function () {
        var _this = this;
        this.buffer.forEach(function (information) { return _this.notify(information, false); });
        this.buffer = [];
    };
    return class_observer;
}());
/**
 * @author frac
 */
/*
export interface interface_readable<type_value> {

    |**
     * @author frac
     *|
    read() : type_executor<type_value, Error>;

}
 */
/**
 * @author frac
 */
/*
export interface interface_writeable<type_value> {

    |**
     * @author frac
     *|
    write(value : type_value) : type_executor<void, Error>;

}
 */
/**
 * @author frac
 */
/*export*/ var class_maybe = (function () {
    function class_maybe() {
    }
    /**
     * @desc whether the wrapper is nothing
     * @author frac
     */
    class_maybe.prototype.is_nothing = function () {
        throw (new Error("not implemented: class_maybe.is_nothing"));
    };
    /**
     * @desc whether the wrapper is just
     * @author frac
     */
    class_maybe.prototype.is_just = function () {
        throw (new Error("not implemented: class_maybe.is_just"));
    };
    /**
     * @desc return the value, stored in the maybe-wrapper
     * @author frac
     */
    class_maybe.prototype.cull = function () {
        throw (new Error("not implemented: class_maybe.cull"));
    };
    /**
     * @author frac
     */
    class_maybe.prototype.distinguish = function (action_just, action_nothing) {
        if (action_nothing === void 0) { action_nothing = function () { }; }
        throw (new Error("not implemented: class_maybe.distinguish"));
    };
    /**
     * @author frac
     */
    class_maybe.prototype.propagate = function (action) {
        throw (new Error("not implemented: class_maybe.propagate"));
    };
    return class_maybe;
}());
/**
 * @author frac
 */
/*export*/ var class_nothing = (function (_super) {
    __extends(class_nothing, _super);
    /**
     * @author frac
     */
    function class_nothing(reason) {
        if (reason === void 0) { reason = null; }
        _super.call(this);
        this.reason = reason;
    }
    /**
     * @author frac
     */
    class_nothing.prototype.is_nothing = function () {
        return true;
    };
    /**
     * @author frac
     */
    class_nothing.prototype.is_just = function () {
        return false;
    };
    /**
     * @author frac
     */
    class_nothing.prototype.cull = function () {
        return null;
    };
    /**
     * @author frac
     */
    class_nothing.prototype.distinguish = function (action_just, action_nothing) {
        if (action_nothing === void 0) { action_nothing = function () { }; }
        action_nothing(this.reason);
    };
    /**
     * @author frac
     */
    class_nothing.prototype.propagate = function (action) {
        return (new class_nothing(this.reason));
    };
    return class_nothing;
}(class_maybe));
/**
 * @author frac
 */
/*export*/ var class_just = (function (_super) {
    __extends(class_just, _super);
    /**
     * @author frac
     */
    function class_just(value) {
        _super.call(this);
        this.value = value;
    }
    /**
     * @author frac
     */
    class_just.prototype.is_nothing = function () {
        return false;
    };
    /**
     * @author frac
     */
    class_just.prototype.is_just = function () {
        return true;
    };
    /**
     * @author frac
     */
    class_just.prototype.cull = function () {
        return this.value;
    };
    /**
     * @author frac
     */
    class_just.prototype.distinguish = function (action_just, action_nothing) {
        if (action_nothing === void 0) { action_nothing = function () { }; }
        action_just(this.value);
    };
    /**
     * @author frac
     */
    class_just.prototype.propagate = function (action) {
        return action(this.value);
    };
    return class_just;
}(class_maybe));
/**
 * @author frac
 */
var class_error = (function (_super) {
    __extends(class_error, _super);
    /**
     * @author frac
     */
    function class_error(message, suberrors) {
        if (suberrors === void 0) { suberrors = []; }
        _super.call(this, message);
        this.suberrors = suberrors;
        this.mess = message;
    }
    /**
     * @override
     * @author frac
     */
    class_error.prototype.toString = function () {
        return (this.mess + " " + ("[" + this.suberrors.map(function (x) { return x.toString(); }).join(",") + "]"));
    };
    return class_error;
}(Error));
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var lib_call;
(function (lib_call) {
    /**
     * @desc this is kind of an ugly hack; the motivation is, that the JS-interpreter of many Gecko-based browsers
     *    (e.g. Firefox) won't accept a larger number of stack-frames, which come up when using executor-chains often.
     *    This can be circumvented by deferring inner calls, such that they are moved outside the own stack-frame. This
     *    is possible due to the asynchronous nature of executors. However this does also significantly increase the
     *    overall-time for a long executor-chain (or rather executor-tree) to finish. Therefore it is not recommended
     *    to do this by default.
     * @author frac
     */
    lib_call.default_deferred = ((typeof (navigator) === "undefined") ? false : (navigator.userAgent.indexOf("Firefox") >= 0));
    /**
     * @author fenris
     */
    function schedule(function_, deferred) {
        if (deferred === void 0) { deferred = lib_call.default_deferred; }
        if (!deferred) {
            function_();
        }
        else {
            setTimeout(function_, 0);
        }
    }
    lib_call.schedule = schedule;
})(lib_call || (lib_call = {}));
///<reference path="../../base/build/logic-decl.d.ts"/>
var lib_call;
(function (lib_call) {
    /**
     * @author frac
     * @todo could possibly be replaced by Promise-system
     */
    var class_wait = (function () {
        function class_wait() {
        }
        return class_wait;
    }());
    lib_call.class_wait = class_wait;
    /**
     * @author frac
     * @todo could possibly be replaced by Promise-system
     */
    var class_wait_sequential = (function (_super) {
        __extends(class_wait_sequential, _super);
        /**
         * @author frac
         */
        function class_wait_sequential(dependencies, action) {
            if (action === void 0) { action = function () { console.log("all done"); }; }
            var _this = _super.call(this) || this;
            _this.dependencies = dependencies;
            _this.action = action;
            return _this;
        }
        /**
         * @author frac
         */
        class_wait_sequential.prototype.run_ = function (dependencies) {
            var _this = this;
            if (dependencies.length > 0) {
                dependencies[0](function () { return _this.run_(dependencies.slice(1)); });
            }
            else {
                this.action();
            }
        };
        /**
         * @author frac
         */
        class_wait_sequential.prototype.run = function () {
            this.run_(this.dependencies);
        };
        return class_wait_sequential;
    }(class_wait));
    lib_call.class_wait_sequential = class_wait_sequential;
    /**
     * @author frac
     * @todo could possibly be replaced by Promise-system
     */
    var class_wait_parallel = (function (_super) {
        __extends(class_wait_parallel, _super);
        /**
         * @author frac
         */
        function class_wait_parallel(dependencies, action) {
            if (action === void 0) { action = function () { console.log("all done"); }; }
            var _this = _super.call(this) || this;
            _this.index = 0;
            _this.dependencies = {};
            _this.action = action;
            dependencies.forEach(function (dependency) { return _this.add_dependency(dependency); });
            return _this;
        }
        /**
         * @author frac
         */
        class_wait_parallel.prototype.add_dependency = function (dependency) {
            this.dependencies["dependency_" + this.index.toString()] = dependency;
            this.index += 1;
        };
        /**
         * @author frac
         */
        class_wait_parallel.prototype.remove_dependency = function (id) {
            if (!(id in this.dependencies)) {
                throw (new Error("dependency does not exist"));
            }
            else {
                delete this.dependencies[id];
                if (Object.keys(this.dependencies).length == 0) {
                    this.action();
                }
            }
        };
        /**
         * @author frac
         */
        class_wait_parallel.prototype.run = function () {
            var that = this;
            if (Object.keys(this.dependencies).length == 0) {
                this.action();
            }
            else {
                Object.keys(this.dependencies).forEach(function (id) {
                    var dependency = that.dependencies[id];
                    dependency(function () {
                        that.remove_dependency(id);
                    });
                });
            }
        };
        return class_wait_parallel;
    }(class_wait));
    lib_call.class_wait_parallel = class_wait_parallel;
})(lib_call || (lib_call = {}));
///<reference path="../../base/build/logic-decl.d.ts"/>
var lib_call;
(function (lib_call) {
    /**
     * @desc a definition for a value being "defined"
     * @author neuc
     */
    function is_def(obj, null_is_valid) {
        if (null_is_valid === void 0) { null_is_valid = false; }
        return (!((typeof (obj) === "undefined") || (!null_is_valid && (obj === null))));
    }
    lib_call.is_def = is_def;
    /**
     * @desc returns the value if set and, when a type is specified, if the type is corret, if not return default_value
     * @author neuc
     */
    function def_val(value, default_value, type, null_is_valid) {
        if (type === void 0) { type = null; }
        if (null_is_valid === void 0) { null_is_valid = false; }
        if (is_def(value, null_is_valid) && (is_def(type) ? ((typeof value === type) || ((value === null) && null_is_valid)) : true)) {
            return value;
        }
        else {
            return default_value;
        }
    }
    lib_call.def_val = def_val;
    ;
    /**
     * @desc just the empty function; useful for some callbacks etc.
     * @author frac
     */
    function nothing() {
    }
    lib_call.nothing = nothing;
    /**
     * @desc just the identity; useful for some callbacks etc.
     * @author frac
     */
    function id(x) {
        return x;
    }
    lib_call.id = id;
    /**
     * @author frac
     */
    function use(input, function_) {
        return function_(input);
    }
    lib_call.use = use;
    /**
     * @desc outputs
     * @author frac
     */
    function output(x) {
        console["_info"].apply(console, arguments);
    }
    lib_call.output = output;
    /**
     * @desc converts the "arguments"-map into an array
     * @param {Object} args
     * @author frac
     */
    function args2list(args) {
        return Object.keys(args).map(function (key) { return args[key]; });
    }
    lib_call.args2list = args2list;
    /**
     * @desc provides the call for an attribute of a class as a regular function
     * @param {string} name the name of the attribute
     * @return {*}
     * @author frac
     */
    function attribute(name) {
        return (function (object) { return object[name]; });
    }
    lib_call.attribute = attribute;
    /**
     * @desc provides a method of a class as a regular function
     * @param {string} name the name of the method
     * @return {function}
     * @author frac
     */
    function method(name) {
        return (function (object) { return object[name].apply(object, args2list(arguments).slice(1)); });
    }
    lib_call.method = method;
    /**
     * @desc composes two functions (i.e. returns a function that return the result of the successive execution of both input-functions)
     * @param {function} function_f
     * @param {function} function_g
     * @author frac
     */
    function compose(function_f, function_g) {
        return (function (x) {
            // return function_g(function_f(x));
            return function_g(function_f.apply(function_f, args2list(arguments)));
        });
    }
    lib_call.compose = compose;
    /**
     * @desc transforms a function with sequential input into a function with leveled input; example: add(2,3) = curryfy(add)(2)(3)
     * @param {function} f
     * @param {int} n (don't set manually)
     * @return {function} the currified version of the in put function
     * @author frac
     */
    function curryfy(f, n) {
        if (n === void 0) { n = f.length; }
        switch (n) {
            case 0: {
                throw (new Error("[curryfy] impossible"));
            }
            case 1: {
                return f;
            }
            default: {
                return (function (x) {
                    return (curryfy(function () { return f.apply(f, [x].concat(args2list(arguments))); }, n - 1));
                });
            }
        }
    }
    lib_call.curryfy = curryfy;
    /**
     * @desc adapter for old syntax
     * @author frac
     */
    function wait(dependencies, action, parallel) {
        if (action === void 0) { action = function () { console.log("all done"); }; }
        if (parallel === void 0) { parallel = true; }
        var wait = (parallel ? (new lib_call.class_wait_parallel(dependencies, action)) : (new lib_call.class_wait_sequential(dependencies, action)));
        wait.run();
    }
    lib_call.wait = wait;
    /**
     * returns a function which goes through a process step by step
     * a process is an array of objects like { func : {function}, state : {string}}
     * trigger the start of the process by calling the returned function with one argument
     * which represents the parameters of the first function which is in the process
     * @param {Array<object>} _process
     * @param {function} on_stateChange called before the next function is called
     * @returns {function}
     */
    function simple_process(_process, on_stateChange, on_progress) {
        if (on_stateChange === void 0) { on_stateChange = function (msg) { console.info("State changed " + msg); }; }
        if (on_progress === void 0) { on_progress = function (msg, pos, max) { console.info("Progress '" + msg + "' " + pos + "/" + max); }; }
        var data_hashmap = {};
        var _orchestrate = function (data, pos) {
            if (pos === void 0) { pos = 0; }
            if (is_def(data)) {
                // data_hashmap[pos] = object_merge_objects({}, data, ["parents", "parent", "children"]);
                data_hashmap[pos] = {};
                Object.keys(data).filter(function (key) { return (["parents", "parent", "children"].indexOf(key) < 0); }).forEach(function (key) { return (data_hashmap[pos][key] = data[key]); });
            }
            else {
                if (is_def(data_hashmap[pos]) && is_def(data_hashmap[pos].processed)) {
                    data = data_hashmap[pos];
                }
            }
            if (pos < _process.length) {
                var _func;
                if (typeof (_process[pos]) !== "undefined") {
                    _func = _process[pos].func;
                }
                if (pos === 0) {
                    data = { processed: data };
                }
                if (_process[pos]) {
                    on_stateChange(_process[pos].state);
                }
                return (_func(data, function (processed_data) {
                    setTimeout(_orchestrate({ "processed": processed_data }, pos + 1), 0);
                }, on_progress));
            }
            else {
                console.error("o.O.");
            }
        };
        return _orchestrate;
    }
    lib_call.simple_process = simple_process;
})(lib_call || (lib_call = {}));
///<reference path="../../base/build/logic-decl.d.ts"/>
"use strict";
var lib_call;
(function (lib_call) {
    /**
     * @author frac
     */
    function executor_resolve(result) {
        return (function (resolve, reject) { return resolve(result); });
    }
    lib_call.executor_resolve = executor_resolve;
    /**
     * @author frac
     */
    function executor_reject(reason) {
        return (function (resolve, reject) { return reject(reason); });
    }
    lib_call.executor_reject = executor_reject;
    /**
     * @author frac
     */
    function executor_transform(executor, transform_result, transform_reason) {
        return (function (resolve, reject) {
            executor(function (result) { return resolve(transform_result(result)); }, function (reason) { return reject(transform_reason(reason)); });
        });
    }
    lib_call.executor_transform = executor_transform;
    /**
     * @author frac
     */
    function executor_transform_default(executor, transform_result, wrap_string) {
        if (wrap_string === void 0) { wrap_string = null; }
        var transform_reason = (function (error) { return ((wrap_string == null) ? error : new class_error(wrap_string, [error])); });
        return (executor_transform(executor, transform_result, transform_reason));
    }
    lib_call.executor_transform_default = executor_transform_default;
    /**
     * @author frac
     */
    function executor_compose_sequential(first, second, deferred) {
        if (deferred === void 0) { deferred = undefined; }
        return (function (resolve, reject) {
            first(function (result) {
                lib_call.schedule(function () { return second(result)(resolve, reject); }, deferred);
            }, function (reason) {
                reject(reason);
            });
        });
    }
    lib_call.executor_compose_sequential = executor_compose_sequential;
    /**
     * @author frac
     */
    function executor_chain(state, executors, deferred) {
        if (deferred === void 0) { deferred = lib_call.default_deferred; }
        return (function (resolve, reject) {
            if (executors.length == 0) {
                return resolve(state);
            }
            else {
                return executors[0](state)(function (result) {
                    /*
                    schedule(
                        () => executor_chain(result, executors.slice(1))(resolve, reject)
                    );
                     */
                    /*
                    setTimeout(
                        () => executor_chain(result, executors.slice(1))(resolve, reject),
                        0
                    );
                     */
                    executor_chain(result, executors.slice(1))(resolve, reject);
                }, reject);
            }
        });
        /*
         */
        /*
        if (executors.length == 0) {
            return executor_resolve<type_state, type_error>(state);
        }
        else if (executors.length == 1) {
            return executors[0](state);
        }
        else {
            return (
                executor_chain<type_state, type_error>(
                    state,
                    [
                        state => (resolve, reject) => executors[0](state)(result => executors[1](result)(resolve, reject), reject)
                    ].concat(executors.slice(2))
                )
            );
        }
         */
        /*
        return (
            executors.reduce(
                (chain, current) => executor_compose_sequential<type_state, type_state, type_error>(chain, current, deferred),
                executor_resolve<type_state, type_error>(state)
            )
        );
         */
    }
    lib_call.executor_chain = executor_chain;
    /**
     * @author frac
     */
    function executor_first(executors) {
        /*
        return (
            (resolve, reject) => {
                if (executors.length == 0) {
                    reject(new Error("all failed"));
                }
                else {
                    executors[0](
                        result => {
                            resolve(result);
                        },
                        reason => {
                            executor_first<type_result, type_reason>(executors.slice(1))(resolve, reject);
                        }
                    )
                }
            }
        );
         */
        return (function (resolve, reject) {
            executor_chain([], executors.map(function (executor) { return function (reasons) { return function (resolve_, reject_) {
                executor(function (result) { return reject_(result); }, function (reason) { return resolve_(reasons.concat([reason])); });
            }; }; }))(function (errors) { return reject(errors); }, function (result) { return resolve(result); });
        });
    }
    lib_call.executor_first = executor_first;
    /**
     * @author frac
     */
    function executor_condense(executors) {
        return (executor_chain([], executors.map(function (executor) { return function (result) { return function (resolve, reject) {
            executor(function (element) { return resolve(result.concat([element])); }, reject);
        }; }; })));
    }
    lib_call.executor_condense = executor_condense;
    /**
     * @author frac
     * @deprecated use condense
     */
    function executor_filter(executors, predicate) {
        return (executor_chain([], executors.map(function (executor) { return function (result) { return function (resolve, reject) {
            executor(function (element) { return resolve(predicate(element) ? result.concat([element]) : result); }, reject);
        }; }; })));
    }
    lib_call.executor_filter = executor_filter;
    /**
     * @author frac
     * @deprecated use condense
     */
    function executor_map(executors, transformator) {
        return (executor_chain([], executors.map(function (executor) { return function (result) { return function (resolve, reject) {
            executor(function (element1) { return resolve(result.concat([transformator(element1)])); }, reject);
        }; }; })));
    }
    lib_call.executor_map = executor_map;
    /**
     * @author frac
     * @deprecated use condense
     */
    function executor_reduce(executors, initial, accumulator) {
        return (executor_chain(initial, executors.map(function (executor) { return function (result) { return function (resolve, reject) {
            executor(function (element) { return resolve(accumulator(result, element)); }, reject);
        }; }; })));
    }
    lib_call.executor_reduce = executor_reduce;
})(lib_call || (lib_call = {}));
var lib_call;
(function (lib_call) {
    /**
     * @author fenris
     */
    var knot_loglevel_stack = [0];
    /**
     * @author fenris
     */
    function knot_loglevel_get() {
        return knot_loglevel_stack.slice(-1)[0];
    }
    lib_call.knot_loglevel_get = knot_loglevel_get;
    /**
     * @author fenris
     */
    function knot_loglevel_push(loglevel) {
        knot_loglevel_stack.push(loglevel);
    }
    lib_call.knot_loglevel_push = knot_loglevel_push;
    /**
     * @author fenris
     */
    function knot_loglevel_pop() {
        knot_loglevel_stack.pop();
    }
    lib_call.knot_loglevel_pop = knot_loglevel_pop;
    /**
     * @author fenris
     */
    function knot_resolver(output) {
        return (function (input) { return function (resolve, reject) { return resolve(output); }; });
    }
    lib_call.knot_resolver = knot_resolver;
    /**
     * @author fenris
     */
    function knot_id() {
        return (function (input) { return function (resolve, reject) { return resolve(input); }; });
    }
    lib_call.knot_id = knot_id;
    /**
     * @author fenris
     */
    function knot_rejector(error) {
        return (function (input) { return function (resolve, reject) { return reject(error); }; });
    }
    lib_call.knot_rejector = knot_rejector;
    /**
     * @author fenris
     */
    function knot_from_function(function_) {
        return (function (input) { return function (resolve, reject) {
            try {
                var output_1 = function_(input);
                resolve(output_1);
            }
            catch (exception) {
                reject((exception));
            }
        }; });
    }
    lib_call.knot_from_function = knot_from_function;
    /**
     * @author fenris
     */
    function knot_wrap(inner, convert_input, convert_output, convert_error) {
        return (function (input_outer) { return function (resolve, reject) {
            var input_inner = convert_input(input_outer);
            inner(input_inner)(function (output_inner) {
                var output_outer = convert_output(output_inner);
                return resolve(output_outer);
            }, function (error_inner) {
                var error_outer = convert_error(error_inner);
                return reject(error_outer);
            });
        }; });
    }
    lib_call.knot_wrap = knot_wrap;
    /**
     * @author fenris
     */
    function knot_wrap_log(inner) {
        return (knot_wrap(inner, function (input) {
            console.error("--", "input:", JSON.stringify(input));
            return input;
        }, function (output) {
            console.error("--", "output:", JSON.stringify(output));
            return output;
        }, function (error) {
            console.error("--", "error:", JSON.stringify(error));
            return error;
        }));
    }
    lib_call.knot_wrap_log = knot_wrap_log;
    /**
     * @author fenris
     */
    function knot_compose_sequential(first, second) {
        var second_ = ((knot_loglevel_get() >= 1)
            ? knot_wrap_log(second)
            : second);
        return (function (input) { return function (resolve, reject) {
            first(input)(function (between) { return lib_call.schedule(function () { return second_(between)(resolve, reject); }); }, reject);
        }; });
    }
    lib_call.knot_compose_sequential = knot_compose_sequential;
    /**
     * @author fenris
     */
    function knot_chain(knots, log) {
        if (log === void 0) { log = false; }
        /*
        return (
            knots.reduce<type_knot<type_input, type_output, type_error>>(
                knot_compose_sequential,
                knot_id<any, type_error>()
            )
        );
         */
        var knots_ = (log
            ? knots
            : knots.map(knot_wrap_log));
        if (knots_.length == 0) {
            return (function (input) { return function (resolve, reject) {
                resolve(input);
            }; });
        }
        else {
            return (function (input) { return function (resolve, reject) {
                return knots_[0](input)(function (result) {
                    return knot_chain(knots_.slice(1))(result)(resolve, reject);
                }, function (error) {
                    return reject(error);
                });
            }; });
        }
    }
    lib_call.knot_chain = knot_chain;
    /**
     * @author fenris
     */
    /*
    export function knot_compose_parallel<>(
        upper : type_knot<type_input, type_output_upper, type_error_upper>,
        lower : type_knot<type_input, type_output_lower, type_error_lower>
    ) {
        return (
            input => (resolve, reject) => {
                upper(input)(
                )
                lower(input)(
                )
            }
        );
    }
     */
    /**
     * @author fenris
     */
    function knot_bunch(knots) {
        return (function (input) { return function (resolve, reject) {
            var done = false;
            var master_output = {};
            var ready = {};
            var master_resolve = function (id, output) {
                if (!done) {
                    master_output[id] = output;
                    ready[id] = true;
                    if (Object.keys(knots).every(function (id) { return (id in ready); })) {
                        done = true;
                        resolve(master_output);
                    }
                    else {
                    }
                }
                else {
                }
            };
            var master_reject = function (id, error) {
                if (!done) {
                    done = true;
                    reject(error);
                }
                else {
                }
            };
            Object.keys(knots).forEach(function (id) {
                knots[id](input)(function (output) { return master_resolve(id, output); }, function (error) { return master_reject(id, error); });
            });
        }; });
    }
    lib_call.knot_bunch = knot_bunch;
    /**
     * @author fenris
     */
    function knot_condense(knots) {
        /*
        return (
            input => knot_chain<Array<type_output>, Array<type_output>, type_error>(
                knots.map<type_knot<Array<type_output>, Array<type_output>, type_error>>(
                    knot => list => (resolve, reject) => {
                        knot(input)(
                            element => resolve(list.concat([element])),
                            reject
                        );
                    }
                )
            )([])
        );
         */
        if (knots.length == 0) {
            return (function (input) { return function (resolve, reject) {
                resolve([]);
            }; });
        }
        else {
            return (function (input) { return function (resolve, reject) {
                knots[0](input)(function (element) {
                    knot_condense(knots.slice(1))(input)(function (restlist) {
                        resolve([element].concat(restlist));
                    }, reject);
                }, function (error) {
                    reject(error);
                });
            }; });
        }
    }
    lib_call.knot_condense = knot_condense;
    /**
     * @author fenris
     */
    function knot_first(knots) {
        return (function (input) { return function (resolve, reject) {
            knot_condense(knots.map(function (knot) { return function (input_) { return function (resolve_, reject_) { return knot(input)(reject_, resolve_); }; }; }))(input)(reject, resolve);
        }; });
    }
    lib_call.knot_first = knot_first;
    /**
     * @author fenris
     */
    function knot_repeat(knot, attempts, delay) {
        if (attempts === void 0) { attempts = 5; }
        if (delay === void 0) { delay = (function (attempt) { return 250; }); }
        var seq = (function (n) { return ((n == 0) ? [] : seq(n - 1).concat([n - 1])); });
        return (knot_first(seq(attempts).map(function (_, attempt) { return function (input) { return function (resolve, reject) { return knot(input)(resolve, function (error) {
            setTimeout(function () { return reject(error); }, delay(attempt));
        }); }; }; })));
    }
    lib_call.knot_repeat = knot_repeat;
    /**
     * @author fenris
     */
    var class_knot_initializer = (function () {
        /**
         * @author fenris
         */
        function class_knot_initializer(fetcher) {
            /**
             * @author fenris
             * 0 : initial
             * 1 : waiting
             * 2 : done, successful
             * 3 : done, failed
             */
            this.state = 0;
            /**
             * @author fenris
             */
            this.output = null;
            /**
             * @author fenris
             */
            this.error = null;
            this.fetcher = fetcher;
            this.state = 0;
            this.queue = [];
            this.output = null;
            this.error = null;
        }
        /**
         * @author fenris
         */
        class_knot_initializer.prototype.actuate = function () {
            var _this = this;
            switch (this.state) {
                case 2: {
                    this.queue.forEach(function (entry) { return entry.resolve(_this.output); });
                    break;
                }
                case 3: {
                    this.queue.forEach(function (entry) { return entry.reject(_this.error); });
                    break;
                }
                default: {
                    throw (new Error("unhandled state " + this.state));
                    break;
                }
            }
        };
        /**
         * @author fenris
         */
        class_knot_initializer.prototype.get = function (input) {
            var _this = this;
            switch (this.state) {
                case 0: {
                    this.state = 1;
                    return (function (_) { return function (resolve, reject) {
                        _this.fetcher(input)(function (output) {
                            _this.state = 2;
                            _this.output = output;
                            resolve(output);
                            _this.actuate();
                        }, function (error) {
                            _this.state = 3;
                            _this.error = error;
                            reject(error);
                            _this.actuate();
                        });
                    }; });
                    break;
                }
                case 1: {
                    return (function (_) { return function (resolve, reject) { return _this.queue.push({ "resolve": resolve, "reject": reject }); }; });
                    break;
                }
                case 2: {
                    return knot_resolver(this.output);
                    break;
                }
                case 3: {
                    return knot_rejector(this.error);
                    break;
                }
                default: {
                    throw (new Error("unhandled state " + this.state));
                    break;
                }
            }
        };
        return class_knot_initializer;
    }());
    lib_call.class_knot_initializer = class_knot_initializer;
})(lib_call || (lib_call = {}));
var lib_call;
(function (lib_call) {
    /**
     * @author fenris
     */
    function promise_chain(microprograms) {
        return (function (input) { return microprograms.reduce /*<Promise<type_value, type_error>, type_microprogram<type_value, type_value, type_error>>*/(function (x, y) { return x.then(y); }, Promise.resolve(input)); });
    }
    lib_call.promise_chain = promise_chain;
})(lib_call || (lib_call = {}));
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path="../../base/build/logic-decl.d.ts"/>
var lib_structures;
(function (lib_structures) {
    /**
     * @author fenris
     */
    var class_pair = (function () {
        /**
         * @author fenris
         */
        function class_pair(first, second) {
            this.first = first;
            this.second = second;
        }
        /**
         * @desc [accessor] [getter]
         * @author fenris
         */
        class_pair.prototype.first_get = function () {
            return this.first;
        };
        /**
         * @desc [accessor] [getter]
         * @author fenris
         */
        class_pair.prototype.second_get = function () {
            return this.second;
        };
        /**
         * @desc [mutator] [setter]
         * @author fenris
         */
        class_pair.prototype.first_set = function (first) {
            this.first = first;
        };
        /**
         * @desc [mutator] [setter]
         * @author fenris
         */
        class_pair.prototype.second_set = function (second) {
            this.second = second;
        };
        /**
         * @desc [accessor]
         * @author fenris
         */
        class_pair.prototype.swap = function () {
            return (new class_pair(this.second, this.first));
        };
        /**
         * @desc [accessor]
         * @author fenris
         */
        class_pair.prototype.transform = function (transform_first, transform_second) {
            return (new class_pair(transform_first(this.first), transform_second(this.second)));
        };
        /**
         * @desc [accessor] [implementation]
         * @author fenris
         */
        class_pair.prototype._clone = function () {
            return (new class_pair(instance_clone(this.first), instance_clone(this.second)));
        };
        /**
         * @desc [accessor] [implementation]
         * @author fenris
         */
        class_pair.prototype._hash = function () {
            return ("pair_" + instance_hash(this.first) + "_" + instance_hash(this.second) + "");
        };
        /**
         * @desc [accessor] [implementation]
         * @author fenris
         */
        class_pair.prototype._collate = function (pair) {
            return (instance_collate(this.first, pair.first)
                &&
                    instance_collate(this.second, pair.second));
        };
        /**
         * @desc [accessor] [implementation]
         * @author fenris
         */
        class_pair.prototype._show = function () {
            return ("(" + instance_show(this.first) + "," + instance_show(this.second) + ")");
        };
        return class_pair;
    }());
    lib_structures.class_pair = class_pair;
})(lib_structures || (lib_structures = {}));
///<reference path="../../base/build/logic-decl.d.ts"/>
var lib_structures;
(function (lib_structures) {
    /**
     * @author fenris
     */
    var class_set = (function () {
        /**
         * @author fenris
         */
        function class_set(elements_, equality /*<type_element>*/) {
            if (elements_ === void 0) { elements_ = []; }
            if (equality === void 0) { equality = instance_collate; } /*<type_element>*/
            var _this = this;
            this.elements = [];
            this.equality = equality;
            elements_.forEach(function (element) { return _this.add(element); });
        }
        /**
         * @desc [accessor]
         * @author fenris
         */
        class_set.prototype.size = function () {
            return this.elements.length;
        };
        /**
         * @desc [accessor]
         * @author fenris
         */
        class_set.prototype.has = function (element) {
            var _this = this;
            return this.elements.some(function (element_) { return _this.equality(element, element_); });
        };
        /**
         * @desc [mutator]
         * @author fenris
         */
        class_set.prototype.add = function (element) {
            if (!this.has(element)) {
                this.elements.push(element);
            }
        };
        /**
         * @desc [mutator]
         * @author fenris
         */
        class_set.prototype.pop = function () {
            if (this.elements.length == 0) {
                return (new class_nothing());
            }
            else {
                return (new class_just(this.elements.pop()));
            }
        };
        /**
         * @desc [accessor]
         * @author fenris
         */
        class_set.prototype.forEach = function (function_) {
            this.elements.forEach(function (element) { return function_(element); });
        };
        /**
         * @desc [accessor]
         * @author fenris
         */
        class_set.prototype.map = function (transformator) {
            return (new class_set(this.elements.map(transformator)));
        };
        /**
         * @desc [accessor]
         * @author fenris
         */
        class_set.prototype.filter = function (predicate) {
            return (new class_set(this.elements.filter(predicate)));
        };
        /**
         * @desc [accessor]
         * @author fenris
         */
        class_set.prototype.dump = function () {
            return this.elements;
        };
        /**
         * @desc [accessor]
         * @author fenris
         */
        class_set.prototype.subset = function (set) {
            var _this = this;
            return set.elements.every(function (element) { return _this.has(element); });
        };
        /**
         * @desc [accessor]
         * @author fenris
         */
        class_set.prototype.superset = function (set) {
            return this.elements.every(function (element) { return set.has(element); });
        };
        /**
         * @desc [accessor]
         * @author fenris
         */
        class_set.prototype.equals = function (set) {
            return (this.subset(set) && this.superset(set));
            ;
        };
        /**
         * @desc [accessor]
         * @author fenris
         */
        class_set.prototype.toString = function () {
            return ("{" + this.elements.map(instance_show /*<type_element>*/).join(",") + "}");
        };
        /**
         * @desc [accessor]
         * @author fenris
         */
        class_set.prototype.empty = function () {
            return (this.elements.length == 0);
        };
        /**
         * @desc [accessor]
         * @author fenris
         */
        class_set.prototype.union = function (set) {
            var set_ = new class_set();
            this.elements.forEach(function (element) { return set_.add(element); });
            set.elements.forEach(function (element) { return set_.add(element); });
            return set_;
        };
        /**
         * @desc [accessor]
         * @author fenris
         */
        class_set.prototype.intersection = function (set) {
            var set_ = new class_set();
            this.elements
                .filter(function (element) { return set.has(element); })
                .forEach(function (element) { return set_.add(element); });
            return set_;
        };
        /**
         * @desc [accessor]
         * @author fenris
         */
        class_set.prototype.difference = function (set) {
            var set_ = new class_set();
            this.elements
                .filter(function (element) { return !set.has(element); })
                .forEach(function (element) { return set_.add(element); });
            return set_;
        };
        /**
         * @desc [accessor] [implementation]
         * @author fenris
         */
        class_set.prototype._collate = function (set) {
            return this.equals(set);
        };
        /**
         * @desc [accessor] [implementation]
         * @author fenris
         */
        class_set.prototype._show = function () {
            return this.toString();
        };
        return class_set;
    }());
    lib_structures.class_set = class_set;
})(lib_structures || (lib_structures = {}));
var lib_structures;
(function (lib_structures) {
    /**
     * @author fenris
     */
    var class_map_abstract = (function () {
        function class_map_abstract() {
        }
        /**
         * @desc [mutator] [syntactic sugar]
         * @author fenris
         */
        class_map_abstract.prototype.del = function (key) {
            return this["delete"](key);
        };
        /**
         * @desc [accessor]
         * @author fenris
         */
        class_map_abstract.prototype.forEach = function (function_) {
            throw (new Error("not implemented"));
        };
        /**
         * @desc [accessor]
         * @author fenris
         */
        class_map_abstract.prototype.map = function (transformator) {
            throw (new Error("not implemented"));
        };
        /**
         * @desc [accessor]
         * @author fenris
         */
        class_map_abstract.prototype.filter = function (predicate) {
            throw (new Error("not implemented"));
        };
        /**
         * @desc [accessor]
         * @author fenris
         */
        class_map_abstract.prototype.pairs = function () {
            throw (new Error("not implemented"));
        };
        /**
         * @desc [accessor]
         * @author fenris
         */
        class_map_abstract.prototype.keys = function () {
            throw (new Error("not implemented"));
        };
        /**
         * @desc [accessor]
         * @author fenris
         */
        class_map_abstract.prototype.values = function () {
            throw (new Error("not implemented"));
        };
        return class_map_abstract;
    }());
    lib_structures.class_map_abstract = class_map_abstract;
    /**
     * @author fenris
     */
    var class_map_simple = (function (_super) {
        __extends(class_map_simple, _super);
        /**
         * @author fenris
         */
        function class_map_simple() {
            var _this = _super.call(this) || this;
            _this.object = {};
            return _this;
        }
        /**
         * @desc [accessor]
         * @author fenris
         */
        class_map_simple.from_object = function (object) {
            var map = new class_map_simple();
            Object.keys(object).forEach(function (key) { return map.set(key, object[key]); });
            return map;
        };
        /**
         * @override
         * @author fenris
         */
        class_map_simple.prototype.has = function (key) {
            return (key in this.object);
        };
        /**
         * @override
         * @author fenris
         */
        class_map_simple.prototype.get = function (key, strict, fallback) {
            if (this.has(key)) {
                return this.object[key];
            }
            else {
                if (strict) {
                    throw (new Error("key not found"));
                }
                else {
                    return fallback;
                }
            }
        };
        /**
         * @override
         * @author fenris
         */
        class_map_simple.prototype.set = function (key, value) {
            this.object[key] = value;
        };
        /**
         * @override
         * @author fenris
         */
        class_map_simple.prototype.clear = function () {
            this.object = {};
        };
        /**
         * @override
         * @author fenris
         */
        class_map_simple.prototype["delete"] = function (key) {
            delete this.object[key];
        };
        /**
         * @override
         * @author fenris
         */
        class_map_simple.prototype.forEach = function (function_) {
            var _this = this;
            Object.keys(this.object).forEach(function (key) {
                var value = _this.object[key];
                function_(value, key);
            });
        };
        /**
         * @override
         * @author fenris
         */
        class_map_simple.prototype.map = function (transformator) {
            var map_ = new class_map_simple();
            this.forEach(function (value, key) {
                var value_ = transformator(value);
                map_.set(key, value_);
            });
            return map_;
        };
        /**
         * @override
         * @author fenris
         */
        class_map_simple.prototype.filter = function (predicate) {
            var map_ = new class_map_simple();
            this.forEach(function (value, key) {
                if (predicate(value)) {
                    map_.set(key, value);
                }
            });
            return map_;
        };
        /**
         * @override
         * @author fenris
         */
        class_map_simple.prototype.pairs = function () {
            var _this = this;
            return (new lib_structures.class_set(Object.keys(this.object).map(function (key) {
                var value = _this.object[key];
                return (new lib_structures.class_pair(key, value));
            })));
        };
        /**
         * @override
         * @author fenris
         */
        class_map_simple.prototype.keys = function () {
            return this.pairs().map(function (pair) { return pair.first_get(); });
        };
        /**
         * @override
         * @author fenris
         */
        class_map_simple.prototype.values = function () {
            return this.pairs().map(function (pair) { return pair.second_get(); });
        };
        /**
         * @desc [accessor]
         * @author fenris
         * @todo implement
         */
        /*
        public equals(map : class_map_simple<type_value>) : boolean {
            
        }
         */
        /**
         * @desc [accessor]
         * @author fenris
         */
        class_map_simple.prototype.toString = function () {
            return ("{" + this.pairs().map(function (pair) { return instance_show(pair.first_get()) + " -> " + instance_show(pair.second_get()); }).dump().join(", ") + "}");
        };
        /**
         * @desc [accessor] [implementation]
         * @author fenris
         */
        class_map_simple.prototype._clone = function () {
            return this.map(function (value) { return instance_clone(value); });
        };
        /**
         * @desc [accessor] [implementation]
         * @author fenris
         */
        class_map_simple.prototype._show = function () {
            return this.toString();
        };
        return class_map_simple;
    }(class_map_abstract));
    lib_structures.class_map_simple = class_map_simple;
    /**
     * @author fenris
     */
    var class_map_equality = (function (_super) {
        __extends(class_map_equality, _super);
        /**
         * @author fenris
         */
        function class_map_equality(collate /*<type_key>*/) {
            if (collate === void 0) { collate = instance_collate; } /*<type_key>*/
            var _this = _super.call(this) || this;
            _this.pairs_ = [];
            _this.collate = collate;
            return _this;
        }
        /**
         * @override
         * @author fenris
         */
        class_map_equality.prototype.has = function (key) {
            var _this = this;
            return this.pairs_.some(function (pair) { return _this.collate(pair.first_get(), key); });
        };
        /**
         * @override
         * @author fenris
         */
        class_map_equality.prototype.get = function (key, strict, fallback) {
            var _this = this;
            if (strict === void 0) { strict = false; }
            if (fallback === void 0) { fallback = null; }
            var value;
            var found = this.pairs_.some(function (pair) {
                if (_this.collate(pair.first_get(), key)) {
                    value = pair.second_get();
                    return true;
                }
                else {
                    return false;
                }
            });
            if (!found) {
                if (strict) {
                    throw (new Error("key not found"));
                }
                else {
                    value = fallback;
                }
            }
            return value;
        };
        /**
         * @override
         * @author fenris
         */
        class_map_equality.prototype.set = function (key, value) {
            var _this = this;
            var found = this.pairs_.some(function (pair) {
                if (_this.collate(pair.first_get(), key)) {
                    pair.second_set(value);
                    return true;
                }
                else {
                    return false;
                }
            });
            if (!found) {
                this.pairs_.push(new lib_structures.class_pair(key, value));
            }
        };
        /**
         * @override
         * @author fenris
         */
        class_map_equality.prototype.clear = function () {
            this.pairs_ = [];
        };
        /**
         * @override
         * @author fenris
         */
        class_map_equality.prototype["delete"] = function (key) {
            var _this = this;
            var index;
            var found = this.pairs_.some(function (pair, index_) {
                if (_this.collate(pair.first_get(), key)) {
                    index = index_;
                    return true;
                }
                else {
                    return false;
                }
            });
            if (found) {
                this.pairs_.splice(index, 1);
            }
        };
        return class_map_equality;
    }(class_map_abstract));
    lib_structures.class_map_equality = class_map_equality;
    /**
     * @author fenris
     */
    var class_map = (function (_super) {
        __extends(class_map, _super);
        function class_map() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return class_map;
    }(class_map_equality));
    lib_structures.class_map = class_map;
})(lib_structures || (lib_structures = {}));
///<reference path="../../base/build/logic-decl.d.ts"/>
var lib_structures;
(function (lib_structures) {
    /**
     * @author fenris
     */
    var class_store = (function () {
        function class_store() {
        }
        return class_store;
    }());
    lib_structures.class_store = class_store;
})(lib_structures || (lib_structures = {}));
///<reference path="../../base/build/logic-decl.d.ts"/>
var lib_structures;
(function (lib_structures) {
    /**
     * @author fenris
     */
    var class_stack = (function (_super) {
        __extends(class_stack, _super);
        /**
         * @author fenris
         */
        function class_stack() {
            var _this = _super.call(this) || this;
            _this.elements = [];
            return _this;
        }
        /**
         * @override
         * @author fenris
         */
        class_stack.prototype.size = function () {
            return this.elements.length;
        };
        /**
         * @override
         * @author fenris
         */
        class_stack.prototype.scan = function () {
            if (this.size() == 0) {
                throw (new Error("empty"));
            }
            else {
                return this.elements[this.elements.length - 1];
            }
        };
        /**
         * @override
         * @author fenris
         */
        class_stack.prototype.give = function (element) {
            this.elements.push(element);
        };
        /**
         * @override
         * @author fenris
         */
        class_stack.prototype.take = function () {
            var element = this.scan();
            this.elements.pop();
            return element;
        };
        return class_stack;
    }(lib_structures.class_store));
    lib_structures.class_stack = class_stack;
})(lib_structures || (lib_structures = {}));
///<reference path="../../base/build/logic-decl.d.ts"/>
var lib_structures;
(function (lib_structures) {
    /**
     * @author fenris
     */
    var class_queue = (function (_super) {
        __extends(class_queue, _super);
        /**
         * @author fenris
         */
        function class_queue() {
            var _this = _super.call(this) || this;
            _this.elements = [];
            return _this;
        }
        /**
         * @override
         * @author fenris
         */
        class_queue.prototype.size = function () {
            return this.elements.length;
        };
        /**
         * @override
         * @author fenris
         */
        class_queue.prototype.scan = function () {
            if (this.size() == 0) {
                throw (new Error("empty"));
            }
            else {
                return this.elements[0];
            }
        };
        /**
         * @override
         * @author fenris
         */
        class_queue.prototype.give = function (element) {
            this.elements.push(element);
        };
        /**
         * @override
         * @author fenris
         */
        class_queue.prototype.take = function () {
            var element = this.scan();
            this.elements.shift();
            return element;
        };
        return class_queue;
    }(lib_structures.class_store));
    lib_structures.class_queue = class_queue;
})(lib_structures || (lib_structures = {}));
///<reference path="../../base/build/logic-decl.d.ts"/>
///<reference path="../../call/build/logic-decl.d.ts"/>
var lib_file;
(function (lib_file) {
    /**
     * @author fenris
     * @todo move to a dedicated lib (e.g. "http", "transport", etc.)
     */
    function ajax(_a) {
        var target = _a["target"], _b = _a["data"], data /*: {[key : string] : string}*/ = _b === void 0 ? null : _b, _c = _a["method"], method /* : string*/ = _c === void 0 ? "GET" : _c;
        method = method.toLowerCase();
        return (function (resolve, reject) {
            var datastring = ((data == null) ? null : Object.keys(data).map(function (key) { return (key + "=" + data[key]); }).join("&"));
            var suffix = ((method == "get") ? ("?" + datastring) : "");
            var sending = ((method == "get") ? null : datastring);
            var request = new XMLHttpRequest();
            request.open(method.toUpperCase(), target + suffix, true);
            request.onreadystatechange = function () {
                if (request.readyState === 4) {
                    if (request.status === 200) {
                        resolve(request.responseText);
                    }
                    else {
                        reject(new Error("XMLHttpRequest failed"));
                    }
                }
            };
            request.send(sending);
        });
    }
    lib_file.ajax = ajax;
    /**
     * @author maspr
     */
    function determine_handler(path) {
        if (/^https?:\/\//.test(path)) {
            return "http";
        }
        else {
            return "file";
        }
    }
    /**
     * @desc reads a file
     * @author fenris
     */
    function read(path, skip_error) {
        if (skip_error === void 0) { skip_error = false; }
        var environment = lib_base.environment();
        switch (environment) {
            case "web": {
                return (function (resolve, reject) {
                    ajax({
                        "target": path,
                        "method": "GET",
                    })(resolve, function (reason) { return (skip_error ? resolve(null) : reject(reason)); });
                });
                break;
            }
            case "node": {
                switch (determine_handler(path)) {
                    case "file":
                        {
                            var _fs_1 = require("fs");
                            return (function (resolve, reject) {
                                _fs_1.readFile(path, {
                                    "encoding": "utf8",
                                    "flag": "r",
                                }, function (error, content) {
                                    if (error == null) {
                                        resolve(content);
                                    }
                                    else {
                                        reject(error);
                                    }
                                });
                            });
                        }
                        break;
                    case "http":
                        {
                            return function (resolve, reject) {
                                var _http = require("http");
                                var _https = require("https");
                                var _url = require("url");
                                var parsed_url = _url.parse(path, false, true);
                                var client = (parsed_url.protocol == "https:") ? _https : _http;
                                var default_port = (parsed_url.protocol == "https:") ? 443 : 80;
                                var options = {
                                    hostname: parsed_url.hostname,
                                    port: parsed_url.port || default_port,
                                    path: parsed_url.path,
                                    method: "GET"
                                };
                                var req = client.request(options, function (res) {
                                    var data = ""; // @todo
                                    res.on("data", function (chunk) {
                                        data += chunk;
                                    });
                                    res.on("end", function () {
                                        resolve(data);
                                    });
                                });
                                req.end();
                                req.on("error", function (error) {
                                    reject(error);
                                });
                            };
                        }
                        break;
                    default: {
                        return (function (resolve, reject) { return reject(new Error("unhandled protocol")); });
                    }
                }
                break;
            }
            default: {
                return (function (resolve, reject) { return reject(new Error("unhandled environment")); });
                break;
            }
        }
    }
    lib_file.read = read;
    /**
     * @desc reads a json file
     * @author fenris
     */
    function read_json(path) {
        return (function (resolve, reject) {
            lib_call.executor_chain({}, [
                function (state) { return function (resolve_, reject_) {
                    read(path)(function (content) {
                        state.content = content;
                        resolve_(state);
                    }, reject_);
                }; },
                function (state) { return function (resolve_, reject_) {
                    var error;
                    try {
                        state.data = JSON.parse(state.content);
                        error = null;
                    }
                    catch (exception) {
                        error = new class_error("invalid json", [exception]);
                    }
                    if (error == null) {
                        resolve_(state);
                    }
                    else {
                        reject_(error);
                    }
                }; },
            ])(function (state) { return resolve(state.data); }, reject);
        });
    }
    lib_file.read_json = read_json;
    /**
     * @desc writes a file
     * @author fenris
     */
    function write(path, content) {
        var environment = lib_base.environment();
        switch (environment) {
            case "web": {
                return (function (resolve, reject) {
                    reject(new Error("not implemented / not possible"));
                });
                break;
            }
            case "node": {
                var _fs_2 = require("fs");
                return (function (resolve, reject) {
                    _fs_2.writeFile(path, content, {
                        "encoding": "utf8",
                        "flag": "w",
                    }, function (error) {
                        if (error == null) {
                            resolve(undefined);
                        }
                        else {
                            reject(error);
                        }
                    });
                });
                break;
            }
            default: {
                return (function (resolve, reject) { return reject(new Error("unhandled environment")); });
                break;
            }
        }
    }
    lib_file.write = write;
    /**
     * @desc writes a json file
     * @author fenris
     */
    function write_json(path, data) {
        return write(path, JSON.stringify(data, undefined, "\t"));
    }
    lib_file.write_json = write_json;
})(lib_file || (lib_file = {}));
var lib_args;
(function (lib_args) {
    /**
     * @author fenris
     */
    var class_argument = (function () {
        /**
         * @author fenris
         */
        function class_argument(_a) {
            var name = _a["name"], _b = _a["type"], type = _b === void 0 ? "string" : _b, _c = _a["default"], default_ = _c === void 0 ? null : _c, _d = _a["info"], info = _d === void 0 ? null : _d, _e = _a["mode"], mode = _e === void 0 ? "replace" : _e, _f = _a["kind"], kind = _f === void 0 ? "positional" : _f, _g = _a["parameters"], parameters = _g === void 0 ? {} : _g, _h = _a["hidden"], hidden = _h === void 0 ? false : _h;
            this.name = name;
            this.type = type;
            this.default_ = default_;
            this.info = info;
            this.mode = mode;
            this.kind = kind;
            this.parameters = parameters;
            this.hidden = hidden;
            if (!this.check()) {
                throw (new Error("invalid argument-setup"));
            }
        }
        /**
         * @author fenris
         */
        class_argument.prototype.check = function () {
            var _this = this;
            return [
                function () { return ((!(_this.kind == "volatile")) || (("indicators_long" in _this.parameters) && (_this.parameters["indicators_long"].length >= 0))); },
            ].every(function (condition) { return condition(); });
        };
        /**
         * @author fenris
         */
        class_argument.prototype.name_get = function () {
            return this.name;
        };
        /**
         * @author fenris
         */
        class_argument.prototype.type_get = function () {
            return this.type;
        };
        /**
         * @author fenris
         */
        class_argument.prototype.default_get = function () {
            return this.default_;
        };
        /**
         * @author fenris
         */
        class_argument.prototype.kind_get = function () {
            return this.kind;
        };
        /**
         * @author fenris
         */
        class_argument.prototype.parameters_get = function () {
            return this.parameters;
        };
        /**
         * @author fenris
         */
        class_argument.prototype.hidden_get = function () {
            return this.hidden;
        };
        /**
         * @author fenris
         */
        class_argument.prototype.toString = function () {
            return "<" + this.name + ">";
        };
        /**
         * @author fenris
         */
        class_argument.prototype.indicator_main = function () {
            if (this.kind == "volatile") {
                return this.parameters["indicators_long"][0];
            }
            else {
                return null;
            }
        };
        /**
         * @author fenris
         */
        class_argument.prototype.pattern_value = function () {
            switch (this.type) {
                case "boolean": {
                    return "false|true";
                    break;
                }
                case "int": {
                    return "[0-9]+";
                    break;
                }
                case "float": {
                    return "\\d*(?:\\.\\d+)?";
                    break;
                }
                case "string": {
                    return "\\S+";
                    break;
                }
                default: {
                    throw (new Error("unhandled type " + this.type));
                    break;
                }
            }
        };
        /**
         * @author fenris
         */
        class_argument.prototype.extract = function (raw) {
            switch (this.type) {
                case "boolean": {
                    return (raw != "false");
                    break;
                }
                case "int": {
                    return parseInt(raw);
                    break;
                }
                case "float": {
                    return parseFloat(raw);
                    break;
                }
                case "string": {
                    return raw;
                    break;
                }
                default: {
                    throw (new Error("unhandled type " + this.type));
                    break;
                }
            }
        };
        /**
         * @author fenris
         */
        class_argument.prototype.assign = function (data, raw) {
            var value = this.extract(raw);
            switch (this.mode) {
                case "replace": {
                    data[this.name] = value;
                    break;
                }
                case "accumulate": {
                    /*
                    if (! (this.name in data)) {
                        data[this.name] = [];
                    }
                     */
                    data[this.name].push(value);
                    break;
                }
                default: {
                    throw (new Error("unhandled mode " + this.mode));
                }
            }
        };
        /**
         * @author fenris
         */
        class_argument.prototype.make = function (data) {
            var value = data[this.name];
            return value.toString();
        };
        /**
         * @author fenris
         */
        class_argument.prototype.generate_help = function () {
            var output = "";
            {
                var line = "";
                line += "\t";
                line += "<" + this.name + ">";
                line += "\n";
                output += line;
            }
            {
                var line = "";
                line += "\t\t";
                var infotext = ((this.info == null) ? "(no info available)" : this.info);
                line += infotext;
                if ((this.type != "boolean") && (this.default_ != null)) {
                    line += "; default: " + this.default_.toString();
                }
                line += "\n";
                output += line;
            }
            return output;
        };
        return class_argument;
    }());
    lib_args.class_argument = class_argument;
})(lib_args || (lib_args = {}));
///<reference path="../../base/build/logic-decl.d.ts"/>
var lib_args;
(function (lib_args) {
    /**
     * @author fenris
     */
    var settings = {
        "environment": {
            "cli": {
                "symbols": {
                    "delimiter": " ",
                    "prefix": "--",
                    "assignment": "="
                }
            },
            "url": {
                "symbols": {
                    "delimiter": "&",
                    "prefix": "",
                    "assignment": "="
                }
            }
        }
    };
    /**
     * @author fenris
     */
    lib_args.verbosity = 0;
    /**
     * @author fenris
     * @todo check validity
     */
    var class_handler = (function () {
        /**
         * @author fenris
         */
        function class_handler(arguments_) {
            this.arguments_ = arguments_;
        }
        /**
         * @author fenris
         */
        class_handler.prototype.filter = function (kind) {
            return this.arguments_.filter(function (argument) { return (argument.kind_get() == kind); });
        };
        /**
         * @author fenris
         */
        class_handler.prototype.read = function (environment, input, data) {
            var _this = this;
            if (data === void 0) { data = {}; }
            switch (environment) {
                case "cli":
                case "url": {
                    // default values
                    {
                        this.arguments_.forEach(function (argument) {
                            data[argument.name_get()] = argument.default_get();
                        });
                    }
                    // preprocessing
                    {
                        // short indicators (lil hacky ...)
                        {
                            if (environment == "cli") {
                                this.filter("volatile").forEach(function (argument) {
                                    // console.info(argument.parameters_get()["indicators_short"].join("|"));
                                    var pattern_from = "";
                                    {
                                        pattern_from += "(?:^|" + settings["environment"][environment]["symbols"]["delimiter"] + ")";
                                        pattern_from += "-" + argument.parameters_get()["indicators_short"].join("|");
                                        pattern_from += "(?:$|" + settings["environment"][environment]["symbols"]["delimiter"] + ")";
                                    }
                                    var pattern_to = "";
                                    {
                                        pattern_to += settings["environment"][environment]["symbols"]["delimiter"];
                                        pattern_to += settings["environment"][environment]["symbols"]["prefix"];
                                        pattern_to += argument.indicator_main();
                                        if (argument.type_get() != "boolean") {
                                            pattern_to += settings["environment"][environment]["symbols"]["assignment"];
                                        }
                                    }
                                    var result = input.replace(new RegExp(pattern_from, "g"), pattern_to);
                                    if (lib_args.verbosity >= 3)
                                        console.info("--", "replacing \"" + pattern_from + "\" by \"" + pattern_to + "\" in \"" + input + "\" to \"" + result + "\"");
                                    input = result;
                                });
                            }
                        }
                        if (lib_args.verbosity >= 3)
                            console.info("--", "input is now \"" + input + "\"");
                    }
                    // parsing
                    {
                        var parts = input
                            .split(settings["environment"][environment]["symbols"]["delimiter"])
                            .filter(function (x) { return (x != ""); });
                        var index_expected_1 = 0;
                        parts.forEach(function (part) {
                            if (lib_args.verbosity >= 2)
                                console.info("--", "analyzing \"" + part + "\"");
                            var found = [
                                function () {
                                    if (lib_args.verbosity >= 3)
                                        console.info("--", "probing as volatile");
                                    return (_this.filter("volatile")
                                        .some(function (argument) {
                                        if (lib_args.verbosity >= 4)
                                            console.info("--", "trying as " + argument.toString());
                                        var pattern = "";
                                        {
                                            var pattern_front = "";
                                            pattern_front += "" + settings["environment"][environment]["symbols"]["prefix"];
                                            pattern_front += "(?:" + argument.parameters_get()["indicators_long"].join("|") + ")";
                                            pattern += pattern_front;
                                        }
                                        {
                                            var pattern_back = "";
                                            pattern_back += "" + settings["environment"][environment]["symbols"]["assignment"];
                                            pattern_back += "(" + argument.pattern_value() + ")";
                                            if (argument.type_get() == "boolean") {
                                                pattern_back = "(?:" + pattern_back + ")?";
                                            }
                                            pattern += pattern_back;
                                        }
                                        if (lib_args.verbosity >= 5)
                                            console.info("--", "pattern: \"" + pattern + "\"");
                                        var regexp = new RegExp(pattern);
                                        var matching = regexp.exec(part);
                                        if (lib_args.verbosity >= 5)
                                            console.info("--", "matching:", matching);
                                        if (matching == null) {
                                            return false;
                                        }
                                        else {
                                            argument.assign(data, matching[1]);
                                            return true;
                                        }
                                    }));
                                },
                                function () {
                                    if (lib_args.verbosity >= 3)
                                        console.info("--", "probing as positional");
                                    var positional = _this.filter("positional");
                                    if (index_expected_1 >= positional.length) {
                                        if (lib_args.verbosity >= 4)
                                            console.info("--", "no positional arguments left");
                                        return false;
                                    }
                                    else {
                                        var argument = positional[index_expected_1];
                                        if (lib_args.verbosity >= 4)
                                            console.info("--", "trying as " + argument.toString());
                                        var pattern = "";
                                        {
                                            var pattern_back = "";
                                            pattern_back += "(" + argument.pattern_value() + ")";
                                            pattern += pattern_back;
                                        }
                                        if (lib_args.verbosity >= 5)
                                            console.info("--", "pattern: \"" + pattern + "\"");
                                        var regexp = new RegExp(pattern);
                                        var matching = regexp.exec(part);
                                        if (lib_args.verbosity >= 5)
                                            console.info("--", "matching:", matching);
                                        if (matching == null) {
                                            return false;
                                        }
                                        else {
                                            argument.assign(data, matching[1]);
                                            index_expected_1 += 1;
                                            return true;
                                        }
                                    }
                                },
                            ].some(function (x) { return x(); });
                            if (!found) {
                                if (lib_args.verbosity >= 1)
                                    console.warn("--", "couldn't parse \"" + part + "\"");
                            }
                        });
                    }
                    return data;
                    break;
                }
                default: {
                    throw (new Error("unhandled environment " + environment));
                    break;
                }
            }
        };
        /**
         * @author fenris
         * @todo handle if the data object doesn't have the required field or the type is wrong or sth.
         */
        class_handler.prototype.write = function (environment, data) {
            switch (environment) {
                case "cli":
                case "url": {
                    return (([]
                        .concat(this.filter("volatile").map(function (argument) {
                        var raw = "";
                        {
                            var raw_front = "";
                            raw_front += settings["environment"][environment]["symbols"]["prefix"];
                            raw_front += argument.parameters_get()["indicators_long"][0];
                            raw += raw_front;
                        }
                        {
                            var raw_back = "";
                            raw_back += settings["environment"][environment]["symbols"]["assignment"];
                            raw_back += argument.make(data);
                            raw += raw_back;
                        }
                        return raw;
                    }))
                        .concat(this.filter("positional").map(function (argument) {
                        var raw = "";
                        {
                            var raw_back = "";
                            raw_back += argument.make(data);
                            raw += raw_back;
                        }
                        return raw;
                    })))
                        .join(settings["environment"][environment]["symbols"]["delimiter"]));
                    break;
                }
                default: {
                    throw (new Error("unhandled environment " + environment));
                    break;
                }
            }
        };
        /**
         * @desc manpage-like info-sheet
         * @author fenris
         */
        class_handler.prototype.generate_help = function (_a) {
            var _b = _a["programname"], programname = _b === void 0 ? null : _b, _c = _a["author"], author = _c === void 0 ? null : _c, _d = _a["description"], description = _d === void 0 ? null : _d, _e = _a["executable"], executable = _e === void 0 ? null : _e;
            var environment = "cli";
            var output = "";
            {
                var section = "";
                {
                    var line = "";
                    line += "";
                    line += "INFO";
                    line += "\n";
                    section += line;
                }
                {
                    var line = "";
                    line += "\t";
                    line += programname + " -- " + description;
                    line += "\n";
                    section += line;
                }
                section += "\n";
                output += section;
            }
            {
                if (author != null) {
                    var section = "";
                    {
                        var line = "";
                        line += "";
                        line += "AUTHOR";
                        line += "\n";
                        section += line;
                    }
                    {
                        var line = "";
                        line += "\t";
                        line += "" + author;
                        line += "\n";
                        section += line;
                    }
                    section += "\n";
                    output += section;
                }
            }
            {
                var section = "";
                {
                    var line = "";
                    line += "";
                    line += "SYNOPSIS";
                    line += "\n";
                    section += line;
                }
                {
                    var line = "";
                    line += "\t";
                    line += executable;
                    line += settings["environment"][environment]["symbols"]["delimiter"];
                    line += this.filter("positional")
                        .map(function (argument) {
                        var part = "";
                        part += "<" + argument.name_get() + ">";
                        return part;
                    })
                        .join(settings["environment"][environment]["symbols"]["delimiter"]);
                    line += settings["environment"][environment]["symbols"]["delimiter"];
                    line += this.filter("volatile")
                        .filter(function (argument) { return (!argument.hidden_get()); })
                        .map(function (argument) {
                        var part = "";
                        part += settings["environment"][environment]["symbols"]["prefix"];
                        part += argument.parameters_get()["indicators_long"][0];
                        if (argument.type_get() != "boolean") {
                            part += settings["environment"][environment]["symbols"]["assignment"];
                            part += "<" + argument.name_get() + ">";
                        }
                        part = "[" + part + "]";
                        return part;
                    })
                        .join(settings["environment"][environment]["symbols"]["delimiter"]);
                    line += "\n";
                    section += line;
                }
                section += "\n";
                output += section;
            }
            {
                var section = "";
                {
                    var line = "";
                    line += "";
                    line += "OPTIONS";
                    line += "\n";
                    section += line;
                }
                {
                    section += (this.arguments_
                        .filter(function (argument) { return (!argument.hidden_get()); })
                        .map(function (argument) { return argument.generate_help(); })
                        .join("\n"));
                }
                section += "\n";
                output += section;
            }
            return output;
        };
        return class_handler;
    }());
    lib_args.class_handler = class_handler;
})(lib_args || (lib_args = {}));

