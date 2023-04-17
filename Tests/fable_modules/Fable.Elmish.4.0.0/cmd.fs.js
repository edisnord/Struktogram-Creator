import { singleton, concat, map, empty, iterate } from "../fable-library.4.0.1/List.js";
import { singleton as singleton_1 } from "../fable-library.4.0.1/AsyncBuilder.js";
import { startImmediate, catchAsync } from "../fable-library.4.0.1/Async.js";
import { Timer_delay } from "./prelude.fs.js";

export function Cmd_exec(onError, dispatch, cmd) {
    iterate((call) => {
        try {
            call(dispatch);
        }
        catch (ex) {
            onError(ex);
        }
    }, cmd);
}

export function Cmd_none() {
    return empty();
}

export function Cmd_map(f, cmd) {
    return map((g) => ((arg_1) => {
        g((arg) => {
            arg_1(f(arg));
        });
    }), cmd);
}

export function Cmd_batch(cmds) {
    return concat(cmds);
}

export function Cmd_ofEffect(effect) {
    return singleton(effect);
}

export function Cmd_OfFunc_either(task, arg, ofSuccess, ofError) {
    return singleton((dispatch) => {
        try {
            dispatch(ofSuccess(task(arg)));
        }
        catch (x) {
            dispatch(ofError(x));
        }
    });
}

export function Cmd_OfFunc_perform(task, arg, ofSuccess) {
    return singleton((dispatch) => {
        try {
            dispatch(ofSuccess(task(arg)));
        }
        catch (x) {
        }
    });
}

export function Cmd_OfFunc_attempt(task, arg, ofError) {
    return singleton((dispatch) => {
        try {
            task(arg);
        }
        catch (x) {
            dispatch(ofError(x));
        }
    });
}

export function Cmd_OfAsyncWith_either(start, task, arg, ofSuccess, ofError) {
    return singleton((arg_2) => {
        start(singleton_1.Delay(() => singleton_1.Bind(catchAsync(task(arg)), (_arg) => {
            const r = _arg;
            arg_2((r.tag === 1) ? ofError(r.fields[0]) : ofSuccess(r.fields[0]));
            return singleton_1.Zero();
        })));
    });
}

export function Cmd_OfAsyncWith_perform(start, task, arg, ofSuccess) {
    return singleton((arg_2) => {
        start(singleton_1.Delay(() => singleton_1.Bind(catchAsync(task(arg)), (_arg) => {
            const r = _arg;
            if (r.tag === 0) {
                arg_2(ofSuccess(r.fields[0]));
                return singleton_1.Zero();
            }
            else {
                return singleton_1.Zero();
            }
        })));
    });
}

export function Cmd_OfAsyncWith_attempt(start, task, arg, ofError) {
    return singleton((arg_2) => {
        start(singleton_1.Delay(() => singleton_1.Bind(catchAsync(task(arg)), (_arg) => {
            const r = _arg;
            if (r.tag === 1) {
                arg_2(ofError(r.fields[0]));
                return singleton_1.Zero();
            }
            else {
                return singleton_1.Zero();
            }
        })));
    });
}

export function Cmd_OfAsync_start(x) {
    Timer_delay(1, (_arg) => {
        startImmediate(x);
    });
}

export function Cmd_OfPromise_either(task, arg, ofSuccess, ofError) {
    return singleton((dispatch) => {
        task(arg).then((arg_3) => {
            dispatch(ofSuccess(arg_3));
        }).catch((arg_2) => {
            dispatch(ofError(arg_2));
        });
    });
}

export function Cmd_OfPromise_perform(task, arg, ofSuccess) {
    return singleton((dispatch) => {
        task(arg).then((arg_1) => dispatch(ofSuccess(arg_1)));
    });
}

export function Cmd_OfPromise_attempt(task, arg, ofError) {
    return singleton((dispatch) => {
        task(arg).catch((arg_2) => {
            dispatch(ofError(arg_2));
        });
    });
}

