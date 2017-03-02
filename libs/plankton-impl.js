var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
// module lib_base {
// }
;
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
 * @desc the ability to generate a string out of the element, which identifies it to a high degree
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
 * @desc the ability to map the element to a textual representation (most likely not injective)
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
 * @author fenris
 */
/*export*/ var class_maybe = (function () {
    function class_maybe() {
    }
    /**
     * @desc whether the wrapper is nothing
     * @author fenris
     */
    class_maybe.prototype.is_nothing = function () {
        throw (new Error("not implemented: class_maybe.is_nothing"));
    };
    /**
     * @desc whether the wrapper is just
     * @author fenris
     */
    class_maybe.prototype.is_just = function () {
        throw (new Error("not implemented: class_maybe.is_just"));
    };
    /**
     * @desc return the value, stored in the maybe-wrapper
     * @author fenris
     */
    class_maybe.prototype.cull = function () {
        throw (new Error("not implemented: class_maybe.cull"));
    };
    /**
     * @author fenris
     */
    class_maybe.prototype.toString = function () {
        throw (new Error("not implemented: class_maybe.cull"));
    };
    /**
     * @author fenris
     */
    class_maybe.prototype.distinguish = function (action_just, action_nothing) {
        if (action_nothing === void 0) { action_nothing = function () { }; }
        throw (new Error("not implemented: class_maybe.distinguish"));
    };
    /**
     * @author fenris
     */
    class_maybe.prototype.propagate = function (action) {
        throw (new Error("not implemented: class_maybe.propagate"));
    };
    /**
     * @desc [implementation]
     * @author fenris
     */
    class_maybe.prototype._show = function () {
        return this.toString();
    };
    return class_maybe;
}());
/**
 * @author fenris
 */
/*export*/ var class_nothing = (function (_super) {
    __extends(class_nothing, _super);
    /**
     * @author fenris
     */
    function class_nothing(reason) {
        if (reason === void 0) { reason = null; }
        var _this = _super.call(this) || this;
        _this.reason = reason;
        return _this;
    }
    /**
     * @author fenris
     */
    class_nothing.prototype.is_nothing = function () {
        return true;
    };
    /**
     * @author fenris
     */
    class_nothing.prototype.is_just = function () {
        return false;
    };
    /**
     * @author fenris
     */
    class_nothing.prototype.cull = function () {
        var message = "you shouldn't cull a nothing-value …";
        console.warn(message);
        return null;
    };
    /**
     * @author fenris
     */
    class_nothing.prototype.toString = function () {
        return "<\u00B7>";
    };
    /**
     * @author fenris
     */
    class_nothing.prototype.reason_get = function () {
        var content = ((this.reason == null) ? "·" : this.reason);
        return "<- " + content + " ->";
    };
    /**
     * @author fenris
     */
    class_nothing.prototype.distinguish = function (action_just, action_nothing) {
        if (action_nothing === void 0) { action_nothing = function () { }; }
        action_nothing(this.reason);
    };
    /**
     * @author fenris
     */
    class_nothing.prototype.propagate = function (action) {
        return (new class_nothing(this.reason));
    };
    return class_nothing;
}(class_maybe));
/**
 * @author fenris
 */
/*export*/ var class_just = (function (_super) {
    __extends(class_just, _super);
    /**
     * @author fenris
     */
    function class_just(value) {
        var _this = _super.call(this) || this;
        _this.value = value;
        return _this;
    }
    /**
     * @author fenris
     */
    class_just.prototype.is_nothing = function () {
        return false;
    };
    /**
     * @author fenris
     */
    class_just.prototype.is_just = function () {
        return true;
    };
    /**
     * @author fenris
     */
    class_just.prototype.cull = function () {
        return this.value;
    };
    /**
     * @author fenris
     */
    class_just.prototype.toString = function () {
        var content = instance_show(this.value);
        return "<+ " + content + " +>";
    };
    /**
     * @author fenris
     */
    class_just.prototype.distinguish = function (action_just, action_nothing) {
        if (action_nothing === void 0) { action_nothing = function () { }; }
        action_just(this.value);
    };
    /**
     * @author fenris
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
        var _this = _super.call(this, message) || this;
        _this.suberrors = suberrors;
        _this.mess = message;
        return _this;
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
     * @author fenris
     */
    function executor_resolve(result) {
        return (function (resolve, reject) { return resolve(result); });
    }
    lib_call.executor_resolve = executor_resolve;
    /**
     * @author fenris
     */
    function executor_reject(reason) {
        return (function (resolve, reject) { return reject(reason); });
    }
    lib_call.executor_reject = executor_reject;
    /**
     * @author fenris
     */
    function executor_transform(executor, transform_result, transform_reason) {
        return (function (resolve, reject) {
            executor(function (result) { return resolve(transform_result(result)); }, function (reason) { return reject(transform_reason(reason)); });
        });
    }
    lib_call.executor_transform = executor_transform;
    /**
     * @author fenris
     */
    function executor_transform_default(executor, transform_result, wrap_string) {
        if (wrap_string === void 0) { wrap_string = null; }
        var transform_reason = (function (error) { return ((wrap_string == null) ? error : new class_error(wrap_string, [error])); });
        return (executor_transform(executor, transform_result, transform_reason));
    }
    lib_call.executor_transform_default = executor_transform_default;
    /**
     * @author fenris
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
     * @author fenris
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
     * @author fenris
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
     * @author fenris
     */
    function executor_condense(executors) {
        return (executor_chain([], executors.map(function (executor) { return function (result) { return function (resolve, reject) {
            executor(function (element) { return resolve(result.concat([element])); }, reject);
        }; }; })));
    }
    lib_call.executor_condense = executor_condense;
    /**
     * @author fenris
     * @deprecated use condense
     */
    function executor_filter(executors, predicate) {
        return (executor_chain([], executors.map(function (executor) { return function (result) { return function (resolve, reject) {
            executor(function (element) { return resolve(predicate(element) ? result.concat([element]) : result); }, reject);
        }; }; })));
    }
    lib_call.executor_filter = executor_filter;
    /**
     * @author fenris
     * @deprecated use condense
     */
    function executor_map(executors, transformator) {
        return (executor_chain([], executors.map(function (executor) { return function (result) { return function (resolve, reject) {
            executor(function (element1) { return resolve(result.concat([transformator(element1)])); }, reject);
        }; }; })));
    }
    lib_call.executor_map = executor_map;
    /**
     * @author fenris
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
    function knot_chain(knots, logging) {
        if (logging === void 0) { logging = false; }
        /*
        return (
            knots.reduce<type_knot<type_input, type_output, type_error>>(
                knot_compose_sequential,
                knot_id<any, type_error>()
            )
        );
         */
        var knots_ = (logging
            ? knots.map(knot_wrap_log)
            : knots);
        if (knots_.length == 0) {
            return (function (input) { return function (resolve, reject) {
                resolve(input);
            }; });
        }
        else {
            return (function (input) { return function (resolve, reject) {
                return knots_[0](input)(function (result) {
                    return knot_chain(knots_.slice(1), false)(result)(resolve, reject);
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
var plain_text_to_html = function (text) {
    var ret = text;
    ret = ret.replace(/  /g, "&nbsp;&nbsp;"); // convert multiple whitespace to forced ones
    ret = ret.split("\n").join("<br/>");
    return ret;
};
/**
 * @desc makes a valid
 */
var format_sentence = function (str, rtl, caseSense) {
    if (rtl === void 0) { rtl = false; }
    if (caseSense === void 0) { caseSense = true; }
    if (str === "") {
        return str;
    }
    else {
        var marks = {
            ".": true,
            "?": true,
            "!": true
        };
        var default_mark = ".";
        var ret = str.split("");
        if (!rtl) {
            ret[0] = ret[0].toLocaleUpperCase();
            if (!(ret[ret.length - 1] in marks)) {
                ret.push(default_mark);
            }
        }
        else {
            ret[ret.length - 1] = ret[ret.length - 1].toLocaleUpperCase();
            if (!(ret[0] in marks)) {
                ret.unshift(default_mark);
            }
        }
        return ret.join("");
    }
};
var fill_string_template = function (template_string, object, fabric, delimiter, default_string) {
    if (fabric === void 0) { fabric = function (object, key) { return object[key]; }; }
    if (delimiter === void 0) { delimiter = "%"; }
    if (default_string === void 0) { default_string = null; }
    function get_tags(str) {
        var r = new RegExp(delimiter + "[^\\s^" + delimiter + "]+" + delimiter, "gi");
        return ((str.match(r) || []).map(function (e) {
            return e.slice(delimiter.length, e.length - delimiter.length);
        }));
    }
    function replace_tag(str, tag, value) {
        var r = new RegExp(delimiter + tag + delimiter, "gi");
        return str.replace(r, value);
    }
    function replace_tags(str, obj) {
        return (get_tags(str).reduce(function (ret, key) {
            var value = "";
            try {
                value = fabric(obj, key);
                if (value === void 0) {
                    value = default_string;
                }
            }
            catch (e) {
                console.warn("invalid placeholder " + key);
                value = default_string;
            }
            return replace_tag(ret, key, value);
        }, str));
    }
    return replace_tags(template_string, object);
};
var make_string_template = function (_template, _fabrics) {
    if (_fabrics === void 0) { _fabrics = {}; }
    function replace_tag(str, tag, value) {
        var r = new RegExp("%" + tag + "%", "gi");
        return str.replace(r, value);
    }
    function replace_tags(str, obj) {
        return (Object.keys(obj).reduce(function (ret, key) {
            return replace_tag(ret, key, _fabrics[key] || obj[key]);
        }, str));
    }
    return (function (tags) {
        return replace_tags(_template, tags);
    });
};
var make_eml_header = (function () {
    var _template = "";
    _template += "From: %from%\n";
    _template += "To: %recipient%\n";
    _template += "Subject: %subject%\n";
    _template += "X-Mailer: greenscale-plankton.emlgen\n";
    return make_string_template(_template);
})();
var make_eml_body = (function () {
    var exports = {};
    exports["simple_body"] = make_string_template("Content-Type: %contenttype%\n\n%body%\n\n");
    // very basic implementation
    // parts = [{contenttype:"text/html; charset=UTF-8", body: "<h1>foo</h1>" }, {...}]
    exports["body_boundrary"] = function (parts, boundrary) {
        var _template = "";
        _template += "--%boundrary%\n";
        _template += "Content-Type: %contenttype%\n\n%body%\n\n";
        //_template += "--%boundrary%--\n\n";
        var maker = make_string_template(_template);
        return (parts.reduce(function (prev, curr) {
            curr.boundrary = boundrary;
            return [prev, maker(curr)].join("");
        }, ""));
    };
    // body must be base64 encoded!
    exports["attachment_boundrary"] = function (parts, boundrary) {
        var _template = "";
        _template += "--%boundrary%\n";
        _template += "Content-Type: %contenttype%\n";
        _template += "Content-Transfer-Encoding: base64\n";
        _template += "Content-Disposition: %disposition%; filename=\"%name%\"\n\n";
        _template += "%body%\n\n";
        //_template += "--%boundrary%--\n\n";
        var maker = make_string_template(_template);
        return (parts.reduce(function (prev, curr) {
            curr.boundrary = boundrary;
            if (curr.disposition === void 0)
                curr.disposition = "inline";
            return [prev, maker(curr)].join("");
        }, ""));
    };
    exports["gen_boundrary"] = function () {
        return ("xxxxxxxxxxxxxxxxxxxxxx".replace(/[xy]/g, function (c) {
            var r = crypto.getRandomValues(new Uint8Array(1))[0] % 16 | 0, v = c == "x" ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        }));
    };
    // simple implementation without alternatives (old rfc)
    exports["complete_boundrary"] = function (bodyparts, attachments) {
        var ret = "";
        var boundrary = exports["gen_boundrary"]();
        ret += exports["body_boundrary"](bodyparts, boundrary);
        ret += exports["attachment_boundrary"](attachments, boundrary);
        ret += "--" + boundrary + "--\n\nINVISIBLE!!!!";
        return (exports["simple_body"]({
            "contenttype": sprintf("multipart/mixed; boundary=%s", [boundrary]),
            "body": ret
        }));
    };
    return exports;
})();
///<reference path="../../base/build/logic-decl.d.ts"/>
var lib_string;
(function (lib_string) {
    /**
     * @author frac
     */
    var hexdigits = 4;
    /**
     * @author frac
     */
    var index_max = 1 << (4 * hexdigits);
    /**
     * @author frac
     */
    var index_is = 0;
    /**
     * @author neuc,frac
     */
    function empty(str) {
        var tmp = str.trim();
        return (tmp === "");
    }
    lib_string.empty = empty;
    /**
     * @desc returns a unique string
     * @param {string} prefix an optional prefix for the generated string
     * @return {string}
     * @author frac
     */
    function generate(prefix) {
        if (prefix === void 0) { prefix = "string_"; }
        if (index_is > index_max) {
            throw (new Error("[string_generate] out of valid indices"));
        }
        else {
            return lib_string.sprintf(prefix + "%0" + hexdigits.toString() + "X", [index_is++]);
        }
    }
    lib_string.generate = generate;
    /**
     * @desc splits a string, but returns an empty list, if the string is empty
     * @param {string} chain
     * @param {string} separator
     * @return {Array<string>}
     * @author frac
     */
    function split(chain, separator) {
        if (separator === void 0) { separator = " "; }
        if (chain.length == 0) {
            return [];
        }
        else {
            return chain.split(separator);
        }
    }
    lib_string.split = split;
    /**
     * @desc concats a given word with itself n times
     * @param {string} word
     * @param {int}
     * @return {string}
     * @author frac
     */
    function repeat(word, count) {
        return ((count == 0) ? "" : (word + repeat(word, count - 1)));
    }
    lib_string.repeat = repeat;
    /**
     * @desc lengthens a string by repeatedly appending or prepending another string
     * @param {string} word the string to pad
     * @param {int} length the length, which the result shall have
     * @param {string} symbol the string, which will be added (multiple times)
     * @param {boolean} [prepend]; whether to prepend (~true) or append (~false); default: false
     * @return {string} the padded string
     * @author frac
     */
    function pad(word, length, symbol, prepend) {
        if (prepend === void 0) { prepend = false; }
        if (prepend) {
            while (word.length < length)
                word = symbol + word;
            return word.substring(word.length - length);
        }
        else {
            while (word.length < length)
                word = word + symbol;
            return word.substring(0, length);
        }
    }
    lib_string.pad = pad;
    /**
     * @desc checks if a given string conttains a certain substring
     * @param {string} string
     * @param {string} part
     * @return {boolean}
     * @author frac
     */
    function contains(chain, part) {
        if (typeof (chain) !== "string")
            return false;
        return (chain.indexOf(part) >= 0);
    }
    lib_string.contains = contains;
    /**
     * @desc checks if a given string starts with a certain substring
     * @param {string} string
     * @param {string} part
     * @return {boolean}
     * @author frac
     */
    function startsWith(chain, part) {
        if (typeof (chain) !== "string")
            return false;
        // return (string.indexOf(part) === 0);
        return ((function (m, n) {
            if (n == 0) {
                return true;
            }
            else {
                if (m == 0) {
                    return false;
                }
                else {
                    return ((chain[0] == part[0]) && startsWith(chain.substring(1), part.substring(1)));
                }
            }
        })(chain.length, part.length));
    }
    lib_string.startsWith = startsWith;
    /**
     * @desc checks if a given string ends with a certain substring
     * @param {string} string
     * @param {string} part
     * @return {boolean}
     * @author frac
     */
    function endsWith(chain, part) {
        if (typeof (chain) !== "string")
            return false;
        // return (string.lastIndexOf(part) === string.length-part.length);
        return ((function (m, n) {
            if (n == 0) {
                return true;
            }
            else {
                if (m == 0) {
                    return false;
                }
                else {
                    // console.info(("(" + string[m-1] + " == " + part[n-1] + ")") + " = " + String(string[m-1] == part[n-1]));
                    return ((chain[m - 1] == part[n - 1]) && endsWith(chain.substring(0, m - 1), part.substring(0, n - 1)));
                }
            }
        })(chain.length, part.length));
    }
    lib_string.endsWith = endsWith;
    /**
     * @desc count the occourrences of a string in a string
     * @param string haystack_string the string wich should be examined
     * @param string needle_string the string which should be counted
     * @author neuc
     */
    function count_occourrences(haystack_string, needle_string, check_escape) {
        var cnt = 0;
        var pos = -1;
        do {
            pos = haystack_string.indexOf(needle_string, pos + 1);
            if ((!check_escape) || (haystack_string[pos - 1] != "\\")) {
                cnt++;
            }
        } while (pos >= 0);
        return cnt - 1;
    }
    lib_string.count_occourrences = count_occourrences;
    ;
    /**
     * @author fenris
     */
    function stance(str, args) {
        Object.keys(args).forEach(function (key) {
            var value = args[key];
            var regexp_argument = new RegExp("\\${" + key + "}");
            str = str.replace(regexp_argument, value);
        });
        return str;
    }
    lib_string.stance = stance;
})(lib_string || (lib_string = {}));
/**
 * @desc adapters for old syntax
 */
var string_generate = lib_string.generate;
var string_split = lib_string.split;
var string_repeat = lib_string.repeat;
var string_pad = lib_string.pad;
var string_contains = lib_string.contains;
var string_startsWith = lib_string.startsWith;
var string_endsWith = lib_string.endsWith;
var string_count_occourrences = lib_string.count_occourrences;
var lib_string;
(function (lib_string) {
    var pattern = /%([-+#0 ]*)([0-9]*)[\.]{0,1}([0-9]*)([\w]{1})/;
    var gpattern = /%([-+#0 ]*)([0-9]*)[\.]{0,1}([0-9]*)([\w]{1})/g;
    function split_format(format) {
        var tmp = format.match(pattern);
        if (tmp === null)
            return null;
        return {
            'flags': tmp[1].split(""),
            'width': Number(tmp[2]),
            'precision': tmp[3] === '' ? null : Number(tmp[3]),
            'specifier': tmp[4],
            'string': format
        };
    }
    function make_err(format, arg, should) {
        return ("[sprintf]" + " " + "argument for '" + format.string + "' has to be '" + should + "' but '" + arg + "' is '" + typeof arg + "'!");
    }
    function test_arg(format, arg, should) {
        if (typeof arg !== should) {
            console.warn(make_err(format, arg, should));
            return false;
        }
        return true;
    }
    function string_fill(str, char, len, left) {
        while (str.length < len) {
            if (left) {
                str += char;
            }
            else {
                str = char + str;
            }
        }
        return str;
    }
    /**
     * the known_parameters are used to parse the different identifiers for the welln known syntax:
     *          flag   width   precision   identifier
     *      %{[0#+- ]}{[0-9]*}.{[0-9]*}[fFdiueEgGsoxXaAsn]
     * flags:
     * 0    -   fill with '0' instead of ' ' if the string length < width
     * #    -   not implemented
     * -    -   left-justified -> fill on the right side to reach width
     * +    -   force using '+' on positive numbers
     * ' '  -   add a single space before positive numbers
     *
     * identifiers
     * %f, %F       -   interpret given number as float, width: the minimal total width (fill with ' ' or '0' if the
     *                  resulting string is too short, precision: cut more then given decimal places
     * %d, %i, %u   -   interpret number as integer, decimal places will be cut. width: like float, precision:
     *                  fill with '0' on right side until length given in precision is reached
     * %e           -   interpret as float and write as scientifical number, width & precision like in float
     * %E           -   same es %e but uppercase 'E'
     * %g           -   use the shortest string of %f or %e
     * %G           -   use the shortest string of %E or %E
     * %s           -   simply print a string
     * %o           -   print the given number in octal notation
     * %x           -   print the given number in hex notation
     * %X           -   same as %x but with uppercase characters
     * %a           -   alias to %x
     * %A           -   alias to %X
     * %n           -   just print nothing
     * @type {{}}
     */
    var known_params = {};
    known_params["f"] = function (format, arg) {
        if (!test_arg(format, arg, "number"))
            return "Ø";
        var tmp = Math.abs(arg);
        var sign = (arg < 0) ? -1 : 1;
        var tmp_result = null;
        if (format.precision !== null) {
            tmp = Math.floor(Math.pow(10, format.precision) * tmp) / Math.pow(10, format.precision);
            var tmp_ = (tmp * sign).toString().split(".");
            if (tmp_.length === 1)
                tmp_.push("");
            tmp_[1] = string_fill(tmp_[1], "0", format.precision, true);
            tmp_result = tmp_.join(".");
        }
        else {
            tmp_result = (sign * tmp).toString();
        }
        if ((format.flags.indexOf(" ") >= 0) && (arg >= 0)) {
            tmp_result = " " + tmp;
        }
        else if ((format.flags.indexOf("+") >= 0) && (arg >= 0)) {
            tmp_result = "+" + tmp;
        }
        tmp_result = string_fill(tmp, (format.flags.indexOf("0") >= 0) ? "0" : " ", format.width, (format.flags.indexOf("-") >= 0));
        return tmp_result;
    };
    known_params["F"] = known_params["f"];
    known_params["d"] = function (format, arg) {
        if (!test_arg(format, arg, 'number'))
            return 'Ø';
        var tmp = (((arg < 0 && format.specifier !== 'u') ? -1 : 1) * Math.floor(Math.abs(arg))).toString();
        if ((format.specifier === 'd' || format.specifier === 'i') && format.flags.indexOf(' ') >= 0 && arg >= 0) {
            tmp = ' ' + tmp;
        }
        else if ((format.specifier === 'd' || format.specifier === 'i') && format.flags.indexOf('+') >= 0 && arg >= 0) {
            tmp = '+' + tmp;
        }
        tmp = string_fill(tmp, format.flags.indexOf('0') >= 0 ? '0' : ' ', format.width, format.flags.indexOf('-') >= 0);
        tmp = string_fill(tmp, '0', format.precision === null ? 0 : format.precision, false);
        return tmp;
    };
    known_params["i"] = known_params["d"];
    known_params["u"] = known_params["d"];
    known_params["e"] = function (format, arg) {
        if (!test_arg(format, arg, 'number'))
            return 'Ø';
        var tmp = arg.toExponential(format.precision === null ? undefined : format.precision).toString();
        if (format.flags.indexOf(' ') >= 0 && arg >= 0) {
            tmp = ' ' + tmp;
        }
        else if (format.flags.indexOf('+') >= 0 && arg >= 0) {
            tmp = '+' + tmp;
        }
        tmp = string_fill(tmp, format.flags.indexOf('0') >= 0 ? '0' : ' ', format.width, format.flags.indexOf('-') >= 0);
        return tmp;
    };
    known_params["E"] = function (format, arg) {
        return known_params["e"](format, arg).toUpperCase();
    };
    known_params["g"] = function (format, arg) {
        if (!test_arg(format, arg, 'number'))
            return 'Ø';
        var tmpf = known_params["f"](format, arg);
        var tmpe = known_params["e"](format, arg);
        if (tmpf.length < tmpe.length) {
            return tmpf;
        }
        else {
            return tmpe;
        }
    };
    known_params["G"] = function (format, arg) {
        return known_params["g"](format, arg).toUpperCase();
    };
    known_params["s"] = function (format, arg) {
        if (!test_arg(format, arg, 'string'))
            return 'o.O';
        var tmp = format.precision !== null ? arg.substr(0, format.precision) : arg;
        tmp = string_fill(tmp, format.flags.indexOf('0') >= 0 ? '0' : ' ', format.width, format.flags.indexOf('-') >= 0);
        return tmp;
    };
    known_params["o"] = function (format, arg) {
        if (!test_arg(format, arg, 'number'))
            return 'Ø';
        var tmp = Math.floor(Math.round(Math.abs(arg))) * ((arg < 0) ? -1 : 1);
        return known_params["s"](format, tmp.toString(8));
    };
    known_params["x"] = function (format, arg) {
        if (!test_arg(format, arg, 'number'))
            return 'Ø';
        var tmp = Math.floor(Math.round(Math.abs(arg))) * ((arg < 0) ? -1 : 1);
        return known_params["s"](format, tmp.toString(16));
    };
    known_params["a"] = known_params["x"];
    known_params["X"] = function (format, arg) {
        if (!test_arg(format, arg, 'number'))
            return 'Ø';
        return known_params["x"](format, arg).toUpperCase();
    };
    known_params["A"] = known_params["X"];
    known_params["c"] = function (format, arg) {
        var tmp = "";
        if (typeof arg === "number") {
            tmp = String.fromCharCode(arg);
        }
        else if ((typeof arg === "string") && (arg.length === 1)) {
            tmp = arg[0];
        }
        else {
            console.warn(make_err(format, arg, "number|string") + " and if string it needs to have the length of 1!");
        }
        return known_params["s"](format, tmp);
    };
    known_params["n"] = function () {
        return "";
    };
    var decompose = function (chain, regexp) {
        var result = regexp.exec(chain);
        if (result == null) {
            return null;
        }
        else {
            var front = chain.substring(0, result.index);
            var back = chain.substring(result.index + result[0].length);
            return { "front": front, "match": result[0], "back": back };
        }
    };
    /**
     * an implementation of c sprintf
     * @param {string} string format string
     * @param {array} args arguments which should be filled into
     * @returns {string}
     */
    lib_string.sprintf = function (input, args, original) {
        if (args === void 0) { args = []; }
        if (original === void 0) { original = null; }
        if (original == null)
            original = input;
        var components = decompose(input, pattern);
        if (components == null) {
            if (args.length > 0) {
                console.warn("[sprintf] superfluous arguments while formatting '" + original + "': ", args);
            }
            return input;
        }
        else {
            var arg;
            var rest;
            if (args.length > 0) {
                arg = args[0];
                rest = args.slice(1);
            }
            else {
                console.warn("[sprintf] out of arguments while formatting '" + original + "'");
                arg = null;
                rest = [];
                return input;
            }
            var fmt = split_format(components["match"]);
            return (components["front"]
                + known_params[fmt.specifier](fmt, arg)
                + lib_string.sprintf(components["back"], rest, original));
        }
    };
    /**
     * an implementation of c printf
     * @param {string} string format string
     * @param {array} args arguments which should be filled into
     * @returns {string}
     */
    function printf(format, args) {
        console.log(lib_string.sprintf(format, args));
    }
    lib_string.printf = printf;
})(lib_string || (lib_string = {}));
var sprintf = lib_string.sprintf;
var printf = lib_string.printf;
/**
 * @author neuc
 */
var strftime;
(function (strftime) {
    var currentDate = new Date();
    var days = [
        "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
    ];
    var months = [
        "January", "February", "March", "April", "May", "June", "July", "August", "September",
        "October", "November", "December"
    ];
    function set_days(day_names) {
        days = day_names;
    }
    strftime.set_days = set_days;
    function set_months(month_names) {
        months = month_names;
    }
    strftime.set_months = set_months;
    // source: https://stackoverflow.com/questions/8619879/javascript-calculate-the-day-of-the-year-1-366
    function helper_dayOfYear(date) {
        var start = new Date(date.getFullYear(), 0, 0);
        var diff = date - start;
        var oneDay = 1000 * 60 * 60 * 24;
        return Math.floor(diff / oneDay);
    }
    // source: http://weeknumber.net/how-to/javascript
    function helper_weekOfYear(date_) {
        var date = new Date(date_.getTime());
        date.setHours(0, 0, 0, 0);
        // Thursday in current week decides the year.
        date.setDate(date.getDate() + 3 - (date.getDay() + 6) % 7);
        // January 4 is always in week 1.
        var week1 = new Date(date.getFullYear(), 0, 4);
        // Adjust to Thursday in week 1 and count number of weeks from date to week1.
        return 1 + Math.round(((date.getTime() - week1.getTime()) / 86400000
            - 3 + (week1.getDay() + 6) % 7) / 7);
    }
    function helper_englishWeekOfYear(date) {
        var nr = helper_weekOfYear(date);
        if (date.getDay() === 0) {
            nr = nr - 1;
        }
        return nr;
    }
    function set_currentDate(date) {
        currentDate = date;
    }
    strftime.set_currentDate = set_currentDate;
    function parse(format, date) {
        if (!date) {
            date = currentDate;
        }
        var ret = format;
        var re = new RegExp("%[a-z]", "gi");
        var match;
        while (match = re.exec(format)) {
            ret = ret.replace(match[0], parse_segment(match[0], date));
        }
        return ret;
    }
    strftime.parse = parse;
    function parse_segment(segment, date) {
        if (!date) {
            date = currentDate;
        }
        var hm_segments = {
            "%a": function () { return days[date.getDay()].slice(0, 3); },
            "%A": function () { return days[date.getDay()]; },
            "%b": function () { return days[date.getMonth()].slice(0, 3); },
            "%B": function () { return days[date.getMonth()]; },
            "%c": function () { return date.toLocaleString(); },
            "%C": function () { return Math.floor((date.getFullYear()) / 100).toString(); },
            "%d": function () { return sprintf("%02d", [date.getDate()]); },
            "%D": function () { return parse("%m/%d/%y", date); },
            "%e": function () { return sprintf("%2d", [date.getDate()]); },
            "%F": function () { return parse("%Y-%m-%d", date); },
            "%g": function () { return sprintf("%02d", [date.getFullYear() % 1000]); },
            "%G": function () { return date.getFullYear().toString(); },
            "%h": function () { return parse("%b", date); },
            "%H": function () { return sprintf("%02d", [date.getHours()]); },
            "%I": function () {
                return sprintf("%02d", [
                    (date.getHours() > 12 ? date.getHours() - 12 : date.getHours())
                ]);
            },
            "%j": function () { return sprintf("%03d", [helper_dayOfYear(date)]); },
            "%m": function () { return sprintf("%02d", [date.getMonth() + 1]); },
            "%M": function () { return sprintf("%02d", [date.getMinutes()]); },
            "%n": function () { return "\n"; },
            "%p": function () { return (date.getHours() > 12 ? "PM" : "AM"); },
            "%r": function () { return parse("%I:%M:%S %p", date); },
            "%R": function () { return parse("%H:%M", date); },
            "%S": function () { return date.getSeconds().toString(); },
            "%t": function () { return "\t"; },
            "%T": function () { return parse("%H:%M:%S", date); },
            "%u": function () { return sprintf("%02d", [(date.getDay() === 0 ? 7 : date.getDay())]); },
            "%U": function () { return sprintf("%02d", [helper_englishWeekOfYear(date)]); },
            "%V": function () { return sprintf("%02d", [helper_weekOfYear(date)]); },
            "%w": function () { return sprintf("%02d", [date.getDay().toString()]); },
            "%W": function () { return parse("%w", date); },
            "%x": function () { return parse("%m/%d/%G", date); },
            "%X": function () { return parse("%T", date); },
            "%y": function () { return parse("%g", date); },
            "%Y": function () { return parse("%G", date); },
            "%z": function () { return date.getTimezoneOffset().toString(); },
            "%Z": function () { return date.toUTCString().split(' ').pop(); },
            "%%": function () { return "%"; }
        };
        if (!(segment in hm_segments)) {
            throw "unknown format argument '" + segment + "'";
        }
        return hm_segments[segment]();
    }
})(strftime || (strftime = {}));
function locale_date(date, ignore_error) {
    if (date === void 0) { date = new Date(); }
    if (ignore_error === void 0) { ignore_error = false; }
    if (!(date instanceof Date)) {
        if (!ignore_error) {
            throw new SyntaxError("date must be instance of Date");
        }
        else {
            console.warn("'" + date + "' seems not to be instance of Date try to force convert.");
            var tmp = date;
            date = new Date(tmp);
            if ((date.toString() === "Invalid Date") ||
                (!(date < new Date(0)) && !(date > new Date(0)))) {
                console.warn("conversion didn't work, returning default value");
                return "Ø";
            }
        }
    }
    var conf = global_config.get_value("date") || {
        "use_locale_date": true,
        "format_string": "%d.%m.%Y"
    };
    if (conf.use_locale_date) {
        return date.toLocaleDateString();
    }
    else {
        return strftime.parse(conf.format_string, date);
    }
}
;
///<reference path="../../call/build/logic-decl.d.ts"/>
var make_logger = (function () {
    var _loggers = {};
    var make_logger = function (prefix, current_loglevel) {
        var log = [];
        var level = [
            "LOG", "INFO", "WARNING", "DEBUG"
        ];
        var logger = function (obj, lvl) {
            var txt = obj.txt || obj;
            if (!lib_call.is_def(lvl))
                lvl = 0;
            var date = new Date();
            log.push({
                "message": sprintf("%s [%s:%s] %s", [date.toString(), level[lvl], prefix, txt]),
                "timeStamp": +(date)
            });
            if (lvl <= current_loglevel) {
                var msg = ["[" + prefix + "]", txt];
                if (obj.arg)
                    msg = ["[" + prefix + "]"].concat(Array.prototype.slice.call(obj.arg));
                if (lvl === 0)
                    console["_log"].apply(console, msg);
                else if (lvl === 1)
                    console["_info"].apply(console, msg);
                else if (lvl === 2)
                    console["_warn"].apply(console, msg);
                else if (lvl >= 3)
                    console["_log"].apply(console, msg);
            }
        };
        _loggers[prefix] = {
            "logger": logger,
            "log": log
        };
        return logger;
    };
    make_logger["loggers"] = _loggers;
    make_logger["complete_log"] = function () {
        var logs = Object.keys(_loggers)
            .reduce(function (p, c) {
            return [].concat(p, _loggers[c].log);
        }, []);
        logs.sort(function (x, y) {
            return ((x.timeStamp > y.timeStamp) ? -1 : +1);
        });
        return logs.map(function (x, i, a) {
            return x.message;
        });
    };
    if (true) {
        var _log_all = function (log, lvl, next) {
            if (next === void 0) { next = function () { }; }
            return function () {
                var msg = [];
                for (var i = 0; i < arguments.length; i++) {
                    if (typeof arguments[i] === "string") {
                        msg.push(arguments[i]);
                    }
                    else {
                        msg.push(JSON.stringify(arguments[i]));
                    }
                }
                var obj = {
                    txt: msg.join("\t"),
                    arg: arguments
                };
                log(obj, lvl);
                next();
            };
        };
        {
            var __warn = make_logger("deprecated console.warn", 99);
            var __error = make_logger("deprecated console.error", 99);
            var __log = make_logger("deprecated console.log", 99);
            var __info = make_logger("deprecated console.info", 99);
            // bad ass
            console["_log"] = console.log;
            console["_error"] = console.error;
            console["_warn"] = console.warn;
            console["_info"] = console.info;
        }
    }
    return make_logger;
})();
///<reference path="../../base/build/logic-decl.d.ts"/>
var lib_object;
(function (lib_object) {
    /**
     * @author fenris
     */
    function fetch(object, fieldname, fallback, escalation) {
        if (fallback === void 0) { fallback = null; }
        if (escalation === void 0) { escalation = 1; }
        if ((fieldname in object) && (object[fieldname] !== undefined)) {
            return object[fieldname];
        }
        else {
            switch (escalation) {
                case 0: {
                    return fallback;
                    break;
                }
                case 1: {
                    var message = ("field '" + fieldname + "' not in structure");
                    message += ("; using fallback value '" + String(fallback) + "'");
                    // console.warn(message);
                    return fallback;
                    break;
                }
                case 2: {
                    var message = ("field '" + fieldname + "' not in structure");
                    throw (new Error(message));
                    break;
                }
                default: {
                    throw (new Error("invalid escalation level " + escalation));
                    break;
                }
            }
        }
    }
    lib_object.fetch = fetch;
    /**
     * @author fenris
     */
    function map(object_from, transformator) {
        var object_to = {};
        Object.keys(object_from).forEach(function (key) { return (object_to[key] = transformator(object_from[key], key)); });
        return object_to;
    }
    lib_object.map = map;
    /**
     * @author fenris
     */
    function filter(object_from, predicate) {
        var object_to = {};
        Object.keys(object_from).forEach(function (key) {
            var value = object_from[key];
            if (predicate(value, key)) {
                object_to[key] = value;
            }
        });
        return object_to;
    }
    lib_object.filter = filter;
    /**
     * @author fenris
     */
    function from_array(array) {
        var object = {};
        array.forEach(function (entry) { return (object[entry.key] = entry.value); });
        return object;
    }
    lib_object.from_array = from_array;
    /**
     * @author fenris
     */
    function to_array(object) {
        var array = [];
        Object.keys(object).forEach(function (key) { return array.push({ "key": key, "value": object[key] }); });
        return array;
    }
    lib_object.to_array = to_array;
    /**
     * @author fenris
     */
    function values(object) {
        return to_array(object).map(function (entry) { return entry.value; });
    }
    lib_object.values = values;
    /**
     * @author fenris
     */
    function path_read(object, path, fallback, escalation) {
        if (fallback === void 0) { fallback = null; }
        if (escalation === void 0) { escalation = 1; }
        var steps = ((path.length == 0) ? [] : path.split("."));
        if (steps.length == 0) {
            throw (new Error("empty path"));
        }
        else {
            var position_1 = object;
            var reachable = steps.slice(0, steps.length - 1).every(function (step) {
                position_1 = object_fetch(position_1, step, null, 0);
                return (position_1 != null);
            });
            if (reachable) {
                return object_fetch(position_1, steps[steps.length - 1], fallback, escalation);
            }
            else {
                return object_fetch({}, "_dummy_", fallback, escalation);
            }
        }
    }
    lib_object.path_read = path_read;
    /**
     * @author fenris
     */
    function path_write(object, path, value, construct) {
        if (construct === void 0) { construct = true; }
        var steps = ((path.length == 0) ? [] : path.split("."));
        if (steps.length == 0) {
            throw (new Error("empty path"));
        }
        else {
            var position_2 = object;
            var reachable = steps.slice(0, steps.length - 1).every(function (step) {
                var position_ = object_fetch(position_2, step, null, 0);
                if (position_ == null) {
                    if (construct) {
                        position_2[step] = {};
                        position_2 = position_2[step];
                        return true;
                    }
                    else {
                        return false;
                    }
                }
                else {
                    position_2 = position_;
                    return true;
                }
            });
            if (reachable) {
                position_2[steps[steps.length - 1]] = value;
            }
            else {
                throw (new Error("path " + path + " does not exist and may not be constructed"));
            }
        }
    }
    lib_object.path_write = path_write;
    /**
     * @author fenris
     */
    function matches(object, pattern) {
        return Object.keys(pattern).every(function (key) { return (pattern[key] == object[key]); });
    }
    lib_object.matches = matches;
    /**
     * @author fenris
     */
    function flatten(value) {
        var integrate = function (result, key_, value_) {
            if (value_ == null) {
                result[key_] = value_;
            }
            else {
                if (typeof (value_) != "object") {
                    result[key_] = value_;
                }
                else {
                    var result_1 = flatten(value_);
                    Object.keys(result_1).forEach(function (key__) {
                        var value__ = result_1[key__];
                        result[key_ + "." + key__] = value__;
                    });
                }
            }
        };
        if (value == null) {
            return null;
        }
        else {
            var result_2 = {};
            if (typeof (value) != "object") {
                result_2["value"] = value;
            }
            else {
                if (value instanceof Array) {
                    var array = (value);
                    array.forEach(function (element, index) { return integrate(result_2, "element_" + index, element); });
                }
                else {
                    var object_1 = (value);
                    Object.keys(object_1).forEach(function (key) { return integrate(result_2, key, object_1[key]); });
                }
            }
            return result_2;
        }
    }
    lib_object.flatten = flatten;
    /**
     * @author fenris
     */
    function clash(x, y, _a) {
        var _b = _a === void 0 ? {} : _a, _c = _b["overwrite"], overwrite = _c === void 0 ? true : _c, _d = _b["hooks"]["existing"], hook_existing = _d === void 0 ? null : _d;
        if (hook_existing == null) {
            (function (key, value_old, value_new) { return console.warn("field " + key + " already defined"); });
        }
        var z = {};
        Object.keys(x).forEach(function (key) {
            z[key] = x[key];
        });
        Object.keys(y).forEach(function (key) {
            if (key in z) {
                hook_existing(key, z[key], y[key]);
                if (overwrite) {
                    z[key] = y[key];
                }
            }
            else {
                z[key] = y[key];
            }
        });
        return z;
    }
    lib_object.clash = clash;
    /**
     * @author fenris
     */
    function patch(core, mantle, deep, path) {
        if (deep === void 0) { deep = true; }
        if (path === void 0) { path = null; }
        if (mantle == null) {
            console.warn("mantle is null; core was", core);
        }
        else {
            Object.keys(mantle).forEach(function (key) {
                var path_ = ((path == null) ? key : path + "." + key);
                var value_mantle = mantle[key];
                if (!(key in core)) {
                    if ((typeof (value_mantle) == "object") && (value_mantle != null) && deep) {
                        core[key] = {};
                        patch(core[key], value_mantle, deep, path_);
                    }
                    else {
                        core[key] = value_mantle;
                    }
                }
                else {
                    var value_core = core[key];
                    if (typeof (value_mantle) == typeof (value_core)) {
                        if ((typeof (value_mantle) == "object") && (value_mantle != null) && deep) {
                            patch(core[key], value_mantle, deep, path_);
                        }
                        else {
                            core[key] = value_mantle;
                        }
                    }
                    else {
                        var message = "objects have different shapes at path '" + path_ + "'; core has type '" + typeof (value_core) + "' and mantle has type '" + typeof (value_mantle) + "'";
                        console.warn(message);
                        core[key] = value_mantle;
                    }
                }
            });
        }
    }
    lib_object.patch = patch;
    /**
     * @author fenris
     */
    function patched(core, mantle, deep) {
        if (deep === void 0) { deep = undefined; }
        var result = {};
        patch(result, core, deep);
        patch(result, mantle, deep);
        return result;
    }
    lib_object.patched = patched;
    /**
     * @author fenris
     */
    function attached(object, key, value) {
        var mantle = {};
        mantle[key] = value;
        return patched(object, mantle, false);
    }
    lib_object.attached = attached;
    /**
     * @author fenris
     */
    function copy(object) {
        return patched({}, object);
    }
    lib_object.copy = copy;
})(lib_object || (lib_object = {}));
/**
 * @desc adapters for old syntax
 * @author fenris
 */
var object_fetch = lib_object.fetch;
var object_map = lib_object.map;
var object_a2o = lib_object.from_array;
var object_o2a = lib_object.to_array;
var object_matches = lib_object.matches;
var object_clash = lib_object.clash;
///<reference path="../../base/build/logic-decl.d.ts"/>
///<reference path="../../string/build/logic-decl.d.ts"/>
/**
 * @param {Object} map
 * @return {string}
 * @author frac
 */
/*export*/ var object_map2string = function (map) {
    return (" " + Object.keys(map)
        .filter(function (key) { return (key != "isMapped"); })
        .map(function (key) { return ("" + ((map[key] == null) ? "-" : map[key].toString()) + ""); })
        .join(" ")
        + "");
};
/**
 * @param {Array} array
 * @return {string}
 * @author frac
 */
/*export*/ var object_array2string = function (array) {
    return ("" + array.map(function (element, index) {
        switch (typeof (element)) {
            case "object": return object_map2string(element);
            default: return String(element);
        }
    }).join(",") + "");
};
/**
 * @desc follows a path in an object-tree
 * @param {Object} object the object in which the path lies
 * @param {string} path the steps
 * @param {boolean} [create] whether to create not yet existing branches
 * @return {Object} {'successful': successful, 'position': position} where the branch or leaf at the end of the path
 * @author frac
 */
var object_path_walk = function (object, path, create, null_on_missing) {
    if (create === void 0) { create = true; }
    if (null_on_missing === void 0) { null_on_missing = false; }
    var steps = ((path == "") ? [] : path.split("."));
    if (steps.length == 0) {
        return object;
    }
    else {
        var head = steps[0];
        // create
        {
            if (!(head in object)) {
                if (create) {
                    var value = null;
                    if (steps.length >= 2) {
                        var next = steps[1];
                        var index = parseInt(next);
                        if (!isNaN(index)) {
                            value = [];
                        }
                        else {
                            value = {};
                        }
                    }
                    else {
                        value = {};
                    }
                    object[head] = value;
                }
                else {
                    // console.info("[object_path_walk] object is ", object);
                    var message = "[object_path_walk] can not walk step \u00BB" + head + "\u00AB in path \u00BB" + path + "\u00AB on object";
                    if (null_on_missing) {
                        console.warn(message);
                        return null;
                    }
                    else {
                        throw (new Error(message));
                    }
                }
            }
        }
        // execute rest
        {
            var object_ = object[head];
            var path_ = steps.slice(1).join(".");
            return object_path_walk(object_, path_, create, null_on_missing);
        }
    }
    /*
    return (
        string_split(path, ".").reduce(
            function (position : any, step : string) : any {
                if (! lib_call.is_def(position[step], true)) {
                    if (create) {
                        position[step] = {};
                    }
                    else {
                        // console.info("[object_path_walk] object is ", object);
                        let message : string = sprintf("[object_path_walk] can not walk step »%s« in path »%s« on object", [step, path]);
                        if (null_on_missing) {
                            console.warn(message);
                            return null;
                        }
                        else {
                            throw (new Error(message));
                        }
                    }
                }
                return position[step];
            },
            object
        )
    );
     */
};
/**
 * @desc reads a branch/leaf from an object-tree
 * @author frac
 */
/*export*/ var object_path_read = function (object, path, null_on_missing) {
    if (null_on_missing === void 0) { null_on_missing = false; }
    return object_path_walk(object, path, false, null_on_missing);
};
/**
 * @desc writes a branch/leaf to an object-tree
 * @author frac
 */
/*export*/ var object_path_write = function (object, path, value) {
    // for "initializing" the object (important if the value to write is an entry in a yet not existing array)
    /*let old : any = */ object_path_walk(object, path, true, true);
    var steps = ((path == "") ? [] : path.split("."));
    var position = object_path_walk(object, steps.slice(0, steps.length - 1).join("."), true);
    if (position == undefined) {
        console.warn("can't set \u00BB" + steps[steps.length - 1] + "\u00AB in undefined");
    }
    else {
        position[steps[steps.length - 1]] = value;
    }
};
/*export*/ var object_object_path_write_ex = function (obj, path, val) {
    var ref = obj;
    var paths = path.split(".");
    var i;
    for (i = 0; i < paths.length - 1; i++) {
        if (ref[paths[i]] === void 0) {
            if (/^(0|[1-9][0-9]*)$/.test(paths[i + 1])) {
                ref[paths[i]] = [];
            }
            else {
                ref[paths[i]] = {};
            }
        }
        ref = ref[paths[i]];
    }
    ref[paths[i]] = val;
};
/**
 * @desc filters branches from an object
 * @param {Object} object the object to read from
 * @param {Array} paths a list of string-lists, that are the paths to be propagated
 * @return {Object} the object with only the selected branches
 * @author frac
 */
/*export*/ var object_path_filter = function (object, paths) {
    var result = {};
    paths.forEach(function (path) {
        var value = null;
        try {
            value = object_path_read(object, path);
        }
        catch (exception) {
            console.warn(exception);
        }
        if (value != null) {
            object_path_write(result, path, value);
        }
        else {
            console.warn("skipped path \"" + path + "\" while filtering");
        }
    });
    return result;
};
/**
 * @desc dunno… returns a list of object-paths?
 * @param {Object} object
 * @param {string} p
 * @todo can probably be merged with getLeafg
 */
/*export*/ var object_path_list = function (object, path, visited) {
    if (path === void 0) { path = null; }
    if (visited === void 0) { visited = []; }
    var result = [];
    visited.push(object);
    for (var key in object) {
        var value = object[key];
        if (visited.indexOf(value) === -1) {
            var key_ = (path == null) ? key : (path + "." + key);
            if (typeof (value) === "object") {
                result = result.concat(object_path_list(value, key_, visited));
            }
            else {
                result.push({ "key": key_, "value": value });
            }
        }
    }
    return result;
};
/**
 * theroreticaly loop prof walk through all elements and subelements of an object
 * and call a callback for each entry
 * @param {object} obj object to iterate through
 * @param {function} callback
 */
/*export*/ var object_iterate = function (obj, callback, leafs_only, path, visited) {
    if (leafs_only === void 0) { leafs_only = false; }
    if (visited === void 0) { visited = []; }
    var have_seen = function (ob) {
        return visited.some(function (e) { return ((typeof ob === "Object") && (ob !== null) && (e === ob)); });
    };
    var next = [];
    Object.keys(obj).forEach(function (key) {
        var elem = obj[key];
        if (!have_seen(elem)) {
            visited.push(elem);
            var _path = "";
            if (typeof path === "undefined") {
                _path = key;
            }
            else {
                _path += [path, key].join(".");
            }
            if (!leafs_only)
                callback(_path, elem, key);
            if (typeof (elem) === "object") {
                (function (elem_, callback_, _path_, visited_) {
                    next.push(function () { object_iterate(elem_, callback_, leafs_only, _path_, visited_); });
                })(elem, callback, _path, visited);
            }
            else {
                if (leafs_only)
                    callback(_path, elem, key);
            }
        }
    });
    var func;
    while (func = next.shift()) {
        func();
    }
};
/**
 * @desc get the leaf-nodes of an object
 * @param {object} object
 * @return {Array<string>} a list containing all leaf-nodes
 * @author frac
 */
/*export*/ var getLeafs = function (object) {
    var skip = {
        "className": true,
        "timeStamp": true,
        "parentId": true,
        "transactionID": true,
        "guid": true,
        "_id": true,
        "parents": true,
        "children": true
    };
    return (Object.keys(object).reduce(function (leafs, key) {
        try {
            var value = object[key];
            if (key in skip) {
                console.warn("skipping field \"" + key + "\"");
                return leafs;
            }
            else {
                if ((typeof (value) === "object") && (value != null)) {
                    return leafs.concat(getLeafs(value).map(function (leaf) { return (key + "." + leaf); }));
                }
                else {
                    return leafs.concat([key]);
                }
            }
        }
        catch (exception) {
            console.warn(exception);
            console.info("key: ", key);
            return null;
        }
    }, new Array()));
};
/**
 *
 * @desc merges two arrays by probing
 * @param {Array} core
 * @param {Array} mantle
 * @param {function} match
 */
/*export*/ var merge_array = function (core, mantle, match) {
    if (match === void 0) { match = (function (x, y) { return (x === y); }); }
    if ((core == undefined) || (mantle == undefined)) {
        throw (new Error("Error: "
            + ((core == undefined) ? " core must be an array and not '" + typeof (core) + "'" : "")
            + ((mantle == undefined) ? " mantle must be an array and not '" + typeof (mantle) + "'" : "")));
    }
    var ret = core;
    for (var i = 0; i < mantle.length; i++) {
        var entry = mantle[i];
        try {
            var matching_index = core.find(function (element) { return match(element, entry); });
            ret[matching_index] = object_merge_objects(core[matching_index], entry);
        }
        catch (e) {
            ret.push(entry);
        }
    }
    return ret;
};
/**
 * @desc merges two objects recursivly
 * @param {Object} object1 core
 * @param {Object} object2 mantle
 * @param {Array} [ignore_keys]
 * @param [do_not_overwrite_existing_values]
 * @returns {Object} a clone of object1 will be returned
 */
/*export*/ var object_merge_objects = function (object1, object2, ignore_keys, do_not_overwrite_existing_values, ignore_null, path) {
    if (object1 === void 0) { object1 = null; }
    if (object2 === void 0) { object2 = null; }
    if (ignore_keys === void 0) { ignore_keys = ["parents"]; }
    if (do_not_overwrite_existing_values === void 0) { do_not_overwrite_existing_values = false; }
    if (ignore_null === void 0) { ignore_null = false; }
    if (path === void 0) { path = []; }
    if (object1 == null) {
        if (object2 instanceof Array) {
            object1 = [];
        }
        else {
            object1 = {};
        }
    }
    var iteration_keys = Object.keys(object2);
    if (ignore_keys === []) {
        if (path.indexOf(object2) >= 0)
            return undefined;
        path.push(object2);
    }
    //
    for (var i = 0; i < iteration_keys.length; i += 1) {
        var key = iteration_keys[i];
        if (ignore_keys.some(function (k) {
            return key == k;
        })) {
        }
        else if (object2[key] === null) {
            if (!ignore_null)
                object1[key] = null;
        }
        else if ((typeof (object2[key]) === "object") && ((typeof (object1[key]) === "object") || (typeof (object1[key]) === "undefined"))) {
            object1[key] = object_merge_objects(object1[key], object2[key], ignore_keys, do_not_overwrite_existing_values, ignore_null, path);
        }
        else {
            if ((do_not_overwrite_existing_values === false) || (typeof (object1[key]) === "undefined")) {
                object1[key] = object2[key];
            }
        }
    }
    return object1;
};
/*
 * @param {object} recipie  ex: { "name" : { extract : function(o) { return o["name"]; }}}
 * */
var flatten_object = function (obj, recipie, drop_key) {
    if (drop_key === void 0) { drop_key = (function (k) { return ["parents", "parent", "children"].indexOf(k) > -1; }); }
    var ret = {};
    for (var key in recipie) {
        if (!drop_key(key)) {
            var prefix = (recipie[key].prefix || "");
            var recursive = (recipie[key].recursive || -1);
            var extract = (recipie[key].extract || (function (x) { return x; }));
            var _obj = extract(obj[key]);
            if ((_obj !== null) && ((typeof _obj == "object") || (obj[key] instanceof Array)) && (!(recursive == 0))) {
                var tmp = {};
                var _recipie = {};
                for (var _i = 0, _a = Object.keys(_obj); _i < _a.length; _i++) {
                    var k = _a[_i];
                    _recipie[k] = {
                        "prefix": (prefix + key + "."),
                        "recursive": (recursive - 1),
                        "extract": (function (x) { return x; })
                    };
                }
                tmp = flatten_object(_obj, _recipie, drop_key);
                ret = object_merge_objects(ret, tmp);
            }
            else {
                ret[prefix + key] = _obj;
            }
        }
    }
    return ret;
};
/**
 * use the complete path of an objects entry as key to make an one dimensional object
 * @param {object} object the object which should be moade flat
 * @param {string} [path] for the recursive call the current path
 */
/*export*/ var object_make_flat = function (object, path, filter, split_char, objects) {
    if (path === void 0) { path = null; }
    if (filter === void 0) { filter = ["parent", "children"]; }
    if (split_char === void 0) { split_char = "."; }
    if (objects === void 0) { objects = []; }
    if (object.toFlat != undefined) {
        return object.toFlat();
    }
    else {
        var ret = {};
        var default_visited_key = "___visited_path___";
        var visited_key;
        if (object != void 0) {
            var iterate = function (key) {
                var newkey = key;
                if ((path != undefined) && (path !== "")) {
                    newkey = path + split_char + newkey;
                }
                // do not touch objects we alrdy know
                if ((obj_ref[key] != undefined) && (!objects.some(function (e) { return (e === obj_ref); }))) {
                    //if (lib_call.is_def(obj_ref[key]) && (! obj_ref[key].hasOwnProperty(visited_key)) && (key !== visited_key)) {
                    if (typeof obj_ref[key] === "object") {
                        ret = object_merge_objects(ret, object_make_flat(obj_ref[key], newkey, filter, split_char, objects.concat(object)));
                    }
                    else if (typeof obj_ref[key] === "function") {
                    }
                    else {
                        var value = obj_ref[key];
                        ret[newkey] = value;
                    }
                }
            };
            visited_key = default_visited_key;
            //object[visited_key] = true;
            var obj_ref = object;
            Object.keys(object).filter(function (key) { return (filter.indexOf(key) < 0); }).forEach(iterate);
            if (typeof object.getComputedValues == "function") {
                visited_key = default_visited_key + "_" + Math.random().toString();
                obj_ref = object.getComputedValues();
                obj_ref[visited_key] = true;
                Object.keys(obj_ref).filter(function (key) { return (filter.indexOf(key) < 0); }).forEach(iterate);
            }
        }
        else {
        }
        return ret;
    }
};
/**
 * splits a flat oject into an array of objects if there are paths containing numbers, which indicates
 * that there might be an array
 * used for normalisation of imports
 * @param entry
 * @param number_replace_string
 * @param {function} [match_function] how to test key if it causes a split
 * @returns {Array}
 */
var object_split_flat_object = function (entry, number_replace_string, fab_function, match_function) {
    if (typeof (match_function) === "undefined") {
        match_function = function (key) {
            return (!key.match(/^custom/)) && key.match(/\.[0-9]+\./);
        };
    }
    if (typeof (fab_function) === "undefined") {
        fab_function = function (obj, e) {
            return obj;
        };
    }
    if (typeof (number_replace_string) === "undefined") {
        number_replace_string = "%d";
    }
    var ret = {};
    var _ret = [];
    var keys = Object.keys(entry);
    var group_keys = keys.filter(match_function);
    keys.forEach(function (key) {
        var index = 0;
        var nkey = key;
        if (match_function(key)) {
            index = Number(key.match(/[0-9]+/)[0]).valueOf();
            nkey = key.replace(/\.[0-9]+\./, "." + number_replace_string + ".");
        }
        if (!ret[index]) {
            ret[index] = {};
        }
        ret[index][nkey] = entry[key];
    });
    keys = Object.keys(ret).sort();
    _ret.push(ret[0]);
    for (var index = 1; index < keys.length; index++) {
        _ret.push(fab_function(ret[keys[index]], entry));
    }
    _ret[0] = object_merge_objects(_ret[0], ret[0]);
    return _ret;
};
// TODO: move to exporter, it's to specific
// to normalize the objects convert paths of a tree-like structure to a
// key-value list with complete paths as key
// the info object is passed to the next function as it is
// and a flat_object (key : value)
/*export*/ var object_make_flat_async = function (data, callback, on_progress) {
    setTimeout((function (_obj, _cb, _info) {
        return (function () {
            var ret = _obj.map(function (o) { return object_make_flat(o); });
            _cb({ "flat_object": ret, "objects": ret, "info": _info });
        });
    })((typeof (data.processed.objects) === "undefined") ? data.processed.source_object : data.processed.objects, callback, data.processed.info), 0);
};
var object_flatten = function (object, paths, prefix) {
    if (prefix === void 0) { prefix = ""; }
    var ret = {};
    var paths_ = paths.reduce(function (prev, current) {
        if (current.split(".").some(function (x) { return (x === "%d"); })) {
            var path = current.split(".%d").shift();
            var len = object_path_read(object, path).length;
            for (var i = 0; i < len; i++) {
                prev.push(sprintf(current, [i]));
            }
        }
        else {
            prev.push(current);
        }
        return prev;
    }, []);
    for (var _i = 0, paths_1 = paths_; _i < paths_1.length; _i++) {
        var path = paths_1[_i];
        var tmp = object_path_read(object, path, true);
        if ((tmp != undefined) && (tmp.toFlat != undefined)) {
            var tmp_ = tmp.toFlat([path, "."].join(""));
            for (var key in tmp_) {
                ret[key] = tmp_[key];
            }
        }
        else {
            ret[prefix + path] = tmp;
        }
    }
    return ret;
};
/**
 * parse
 * @param {String} value
 * @returns {Object}
 */
var object_parse = function (value) {
    var content = JSON.parse(value);
    var m = { "root": content };
    (new Mapper()).mapClasses(m);
    return m["root"];
};
/**
 * stringify
 *
 * @description stringify object as JSON
 */
var object_stringify = function (object, readable) {
    if (readable === void 0) { readable = false; }
    return (JSON.stringify(object, function (key, value) {
        if ((key == "parents") && (value !== null)) {
            return null;
        }
        if (key == "changeActions") {
            return undefined;
        }
        if (key == "observer") {
            return undefined;
        }
        if (key == "isMapped") {
            return undefined;
        }
        /*
        if (value === null) {
            return undefined;
        }
        */
        return value;
    }, readable ? 1 : 0));
};
///<reference path="../../base/build/logic-decl.d.ts"/>
var lib_object;
(function (lib_object) {
    /**
     * @author fenris
     */
    var class_relation = (function () {
        /**
         * @author fenris
         */
        /*protected*/ function class_relation(id, parameters) {
            this.id = id;
            this.symbol = lib_object.fetch(parameters, "symbol", null, 1);
            this.name = lib_object.fetch(parameters, "name", null, 1);
            this.predicate = lib_object.fetch(parameters, "predicate", null, 2);
        }
        /**
         * @author fenris
         */
        class_relation.prototype.check = function (value, reference) {
            return this.predicate(value, reference);
        };
        /**
         * @author fenris
         */
        class_relation.prototype.id_get = function () {
            return this.id;
        };
        /**
         * @author fenris
         */
        class_relation.prototype.symbol_get = function () {
            return this.symbol;
        };
        /**
         * @author fenris
         */
        class_relation.prototype.name_get = function () {
            return this.name;
        };
        /**
         * @desc [implementation]
         * @author fenris
         */
        class_relation.prototype._show = function () {
            return "[" + this.symbol + "]";
        };
        /**
         * @author fenris
         */
        class_relation.prototype.toString = function () {
            return this._show();
        };
        /**
         * @author fenris
         */
        class_relation.pool = function () {
            return {
                "eq": {
                    "symbol": "=",
                    "name": "gleich",
                    "predicate": function (value, reference) { return (value == reference); }
                },
                "ne": {
                    "symbol": "≠",
                    "name": "ungleich",
                    "predicate": function (value, reference) { return (value != reference); }
                },
                "gt": {
                    "symbol": ">",
                    "name": "größer",
                    "predicate": function (value, reference) { return (value > reference); }
                },
                "ge": {
                    "symbol": "≥",
                    "name": "größer oder gleich",
                    "predicate": function (value, reference) { return (value >= reference); }
                },
                "lt": {
                    "symbol": "<",
                    "name": "kleiner",
                    "predicate": function (value, reference) { return (value < reference); }
                },
                "le": {
                    "symbol": "≤",
                    "name": "kleiner oder gleich",
                    "predicate": function (value, reference) { return (value <= reference); }
                }
            };
        };
        /**
         * @author fenris
         */
        class_relation.get = function (id) {
            var parameters = lib_object.fetch(this.pool(), id, null, 2);
            return (new class_relation(id, parameters));
        };
        /**
         * @author fenris
         */
        class_relation.available = function () {
            return Object.keys(this.pool());
        };
        return class_relation;
    }());
    lib_object.class_relation = class_relation;
    /**
     * @author fenris
     */
    var class_filtrationitem = (function () {
        /**
         * @author fenris
         */
        function class_filtrationitem(parameters) {
            this.extract = lib_object.fetch(parameters, "extract", null, 2);
            this.relation = lib_object.fetch(parameters, "relation", null, 2);
            this.reference = lib_object.fetch(parameters, "reference", null, 2);
        }
        /**
         * @author fenris
         */
        class_filtrationitem.prototype.check = function (dataset) {
            var value = this.extract(dataset);
            var result = this.relation.check(value, this.reference);
            return result;
        };
        /**
         * @desc [implementation]
         * @author fenris
         */
        class_filtrationitem.prototype._show = function () {
            return "(" + this.relation.symbol_get() + " " + instance_show(this.reference) + ")";
        };
        /**
         * @author fenris
         */
        class_filtrationitem.prototype.toString = function () {
            return this._show();
        };
        return class_filtrationitem;
    }());
    lib_object.class_filtrationitem = class_filtrationitem;
    /**
     * @desc disjunctive normal form
     * @author fenris
     */
    var class_filtration = (function () {
        /**
         * @author fenris
         */
        function class_filtration(clauses) {
            this.clauses = clauses;
        }
        /**
         * @author fenris
         */
        class_filtration.prototype.check = function (dataset) {
            return (this.clauses.some(function (clause) { return clause.every(function (literal) { return literal.check(dataset); }); }));
        };
        /**
         * @author fenris
         */
        class_filtration.prototype.use = function (datasets) {
            var _this = this;
            return datasets.filter(function (dataset) { return _this.check(dataset); });
        };
        /**
         * @desc [implementation]
         * @author fenris
         */
        class_filtration.prototype._show = function () {
            return ("{" + this.clauses.map(function (clause) { return ("[" + clause.map(instance_show).join(",") + "]"); }).join(",") + "}");
        };
        /**
         * @author fenris
         */
        class_filtration.prototype.toString = function () {
            return this._show();
        };
        return class_filtration;
    }());
    lib_object.class_filtration = class_filtration;
})(lib_object || (lib_object = {}));
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
///<reference path="../../call/build/logic-decl.d.ts"/>
var lib_file;
(function (lib_file) {
    /**
     * @author fenris
     */
    var class_file_abstract = (function () {
        function class_file_abstract() {
        }
        /**
         * @desc reads a json file
         * @author fenris
         */
        class_file_abstract.prototype.read_json = function (path) {
            var _this = this;
            return (function (resolve, reject) {
                lib_call.executor_chain({}, [
                    function (state) { return function (resolve_, reject_) {
                        _this.read(path)(function (content) {
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
        };
        /**
         * @desc writes a json file
         * @author fenris
         */
        class_file_abstract.prototype.write_json = function (path, data) {
            return this.write(path, JSON.stringify(data, undefined, "\t"));
        };
        return class_file_abstract;
    }());
    lib_file.class_file_abstract = class_file_abstract;
})(lib_file || (lib_file = {}));
///<reference path="../../call/build/logic-decl.d.ts"/>
var lib_file;
(function (lib_file) {
    /**
     * @author fenris
     */
    var class_file_node = (function (_super) {
        __extends(class_file_node, _super);
        function class_file_node() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**
         * @author maspr
         */
        class_file_node.prototype.determine_handler = function (path) {
            if (/^https?:\/\//.test(path)) {
                return "http";
            }
            else {
                return "file";
            }
        };
        /**
         * @override
         * @author fenris,maspr
         * @todo clear up if http(s)-handling belongs here or not
         */
        class_file_node.prototype.read = function (path, skip_error) {
            if (skip_error === void 0) { skip_error = false; }
            switch (this.determine_handler(path)) {
                case "file":
                    {
                        var nm_fs_1 = require("fs");
                        return (function (resolve, reject) {
                            nm_fs_1.readFile(path, {
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
                            var nm_http = require("http");
                            var nm_https = require("https");
                            var nm_url = require("url");
                            var parsed_url = nm_url.parse(path, false, true);
                            var client = (parsed_url.protocol == "https:") ? nm_https : nm_http;
                            var default_port = ((parsed_url.protocol == "https:") ? 443 : 80);
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
        };
        /**
         * @override
         * @author fenris
         */
        class_file_node.prototype.write = function (path, content) {
            var nm_fs = require("fs");
            return (function (resolve, reject) {
                nm_fs.writeFile(path, content, {
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
        };
        return class_file_node;
    }(lib_file.class_file_abstract));
    lib_file.class_file_node = class_file_node;
})(lib_file || (lib_file = {}));
///<reference path="../../call/build/logic-decl.d.ts"/>
var lib_file;
(function (lib_file) {
    /**
     * @author fenris
     * @todo move to a dedicated lib (e.g. "http", "transport", etc.)
     */
    function ajax(_a) {
        var target = _a["target"] /*: string*/, _b = _a["data"], data /*: {[key : string] : string}*/ = _b === void 0 ? null : _b, _c = _a["method"], method /* : string*/ = _c === void 0 ? "GET" : _c;
        method = method.toLowerCase();
        return (function (resolve, reject) {
            var datastring = ((data == null) ? null : Object.keys(data).map(function (key) { return key + "=" + data[key]; }).join("&"));
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
    /**
     * @author fenris
     */
    var class_file_web = (function (_super) {
        __extends(class_file_web, _super);
        function class_file_web() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        /**
         * @override
         * @author fenris
         */
        class_file_web.prototype.read = function (path, skip_error) {
            if (skip_error === void 0) { skip_error = false; }
            return (function (resolve, reject) {
                ajax({
                    "target": path,
                    "method": "GET",
                })(resolve, function (reason) { return (skip_error ? resolve(null) : reject(reason)); });
            });
        };
        /**
         * @override
         * @author fenris
         */
        class_file_web.prototype.write = function (path, content) {
            return (function (resolve, reject) {
                reject(new Error("not implemented / not possible"));
            });
        };
        return class_file_web;
    }(lib_file.class_file_abstract));
    lib_file.class_file_web = class_file_web;
})(lib_file || (lib_file = {}));
///<reference path="../../base/build/logic-decl.d.ts"/>
///<reference path="../../call/build/logic-decl.d.ts"/>
var lib_file;
(function (lib_file) {
    /**
     * @desc selects the implementation which fits for the detected environment
     * @author fenris
     */
    function auto() {
        var environment = lib_base.environment();
        switch (environment) {
            case "node": {
                return (new lib_file.class_file_node());
                break;
            }
            case "web": {
                return (new lib_file.class_file_web());
                break;
            }
            default: {
                throw (new Error("no implementation for environment '" + environment + "'"));
                break;
            }
        }
    }
    lib_file.auto = auto;
    /**
     * @author fenris
     */
    var class_file = (function (_super) {
        __extends(class_file, _super);
        /**
         * @author fenris
         */
        function class_file() {
            var _this = _super.call(this) || this;
            _this.core = auto();
            return _this;
        }
        /**
         * @override
         * @author fenris
         */
        class_file.prototype.read = function (path, skip_error) {
            if (skip_error === void 0) { skip_error = false; }
            return this.core.read(path, skip_error);
        };
        /**
         * @override
         * @author fenris
         */
        class_file.prototype.write = function (path, content) {
            return this.core.write(path, content);
        };
        return class_file;
    }(lib_file.class_file_abstract));
    lib_file.class_file = class_file;
    /**
     * @author fenris
     */
    var instance = auto();
    /**
     * @author fenris
     */
    function read(path, skip_error) {
        if (skip_error === void 0) { skip_error = false; }
        return instance.read(path, skip_error);
    }
    lib_file.read = read;
    /**
     * @author fenris
     */
    function write(path, content) {
        return instance.write(path, content);
    }
    lib_file.write = write;
    /**
     * @author fenris
     */
    function read_json(path) {
        return instance.read_json(path);
    }
    lib_file.read_json = read_json;
    /**
     * @author fenris
     */
    function write_json(path, data) {
        return instance.write_json(path, data);
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

