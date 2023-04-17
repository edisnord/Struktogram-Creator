import { singleton } from "../fable-library.4.0.1/List.js";
import { singleton as singleton_1 } from "../fable-library.4.0.1/AsyncBuilder.js";

export function OfFunc_result(msg) {
    return singleton((dispatch) => {
        dispatch(msg);
    });
}

export function OfAsyncWith_result(start, task) {
    return singleton((arg) => {
        start(singleton_1.Delay(() => singleton_1.Bind(task, (_arg) => {
            arg(_arg);
            return singleton_1.Zero();
        })));
    });
}

export function OfPromise_result(task) {
    return singleton((dispatch) => {
        task.then(dispatch);
    });
}

