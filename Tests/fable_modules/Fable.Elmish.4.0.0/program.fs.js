import { Record } from "../fable-library.4.0.1/Types.js";
import { record_type, bool_type, class_type, string_type, tuple_type, list_type, lambda_type, unit_type } from "../fable-library.4.0.1/Reflection.js";
import { Sub_Internal_Fx_change, Sub_Internal_diff, Sub_Internal_Fx_stop, Sub_Internal_empty, Sub_none } from "./sub.fs.js";
import { curry, partialApply, uncurry } from "../fable-library.4.0.1/Util.js";
import { Log_toConsole, Log_onError } from "./prelude.fs.js";
import { Cmd_exec, Cmd_none } from "./cmd.fs.js";
import { map as map_1 } from "../fable-library.4.0.1/List.js";
import { RingBuffer$1__Pop, RingBuffer$1__Push_2B595, RingBuffer$1_$ctor_Z524259A4 } from "./ring.fs.js";
import { value as value_2 } from "../fable-library.4.0.1/Option.js";
import { printf, toText } from "../fable-library.4.0.1/String.js";

export class Program$4 extends Record {
    "constructor"(init, update, subscribe, view, setState, onError, termination) {
        super();
        this.init = init;
        this.update = update;
        this.subscribe = subscribe;
        this.view = view;
        this.setState = setState;
        this.onError = onError;
        this.termination = termination;
    }
}

export function Program$4$reflection(gen0, gen1, gen2, gen3) {
    return record_type("Elmish.Program`4", [gen0, gen1, gen2, gen3], Program$4, () => [["init", lambda_type(gen0, tuple_type(gen1, list_type(lambda_type(lambda_type(gen2, unit_type), unit_type))))], ["update", lambda_type(gen2, lambda_type(gen1, tuple_type(gen1, list_type(lambda_type(lambda_type(gen2, unit_type), unit_type)))))], ["subscribe", lambda_type(gen1, list_type(tuple_type(list_type(string_type), lambda_type(lambda_type(gen2, unit_type), class_type("System.IDisposable")))))], ["view", lambda_type(gen1, lambda_type(lambda_type(gen2, unit_type), gen3))], ["setState", lambda_type(gen1, lambda_type(lambda_type(gen2, unit_type), unit_type))], ["onError", lambda_type(tuple_type(string_type, class_type("System.Exception")), unit_type)], ["termination", tuple_type(lambda_type(gen2, bool_type), lambda_type(gen1, unit_type))]]);
}

export function ProgramModule_mkProgram(init, update, view) {
    return new Program$4(init, update, (_arg) => Sub_none(), view, uncurry(2, (model) => {
        const f1 = partialApply(1, view, [model]);
        return (arg) => {
            f1(arg);
        };
    }), (tupledArg) => {
        Log_onError(tupledArg[0], tupledArg[1]);
    }, [(_arg_1) => false, (value_1) => {
    }]);
}

export function ProgramModule_mkSimple(init, update, view) {
    return new Program$4((arg) => [init(arg), Cmd_none()], uncurry(2, (msg) => {
        const f1_1 = partialApply(1, update, [msg]);
        return (arg_1) => [f1_1(arg_1), Cmd_none()];
    }), (_arg) => Sub_none(), view, uncurry(2, (model) => {
        const f1_2 = partialApply(1, view, [model]);
        return (arg_2) => {
            f1_2(arg_2);
        };
    }), (tupledArg) => {
        Log_onError(tupledArg[0], tupledArg[1]);
    }, [(_arg_1) => false, (value_1) => {
    }]);
}

export function ProgramModule_withSubscription(subscribe, program) {
    return new Program$4(program.init, program.update, subscribe, program.view, program.setState, program.onError, program.termination);
}

export function ProgramModule_mapSubscription(map, program) {
    return new Program$4(program.init, program.update, partialApply(1, map, [program.subscribe]), program.view, program.setState, program.onError, program.termination);
}

export function ProgramModule_withConsoleTrace(program) {
    return new Program$4((arg) => {
        const patternInput = program.init(arg);
        const initModel = patternInput[0];
        Log_toConsole("Initial state:", initModel);
        return [initModel, patternInput[1]];
    }, (msg, model) => {
        Log_toConsole("New message:", msg);
        const patternInput_1 = program.update(msg, model);
        const newModel = patternInput_1[0];
        Log_toConsole("Updated state:", newModel);
        return [newModel, patternInput_1[1]];
    }, (model_1) => {
        const sub = program.subscribe(model_1);
        Log_toConsole("Updated subs:", map_1((tuple) => tuple[0], sub));
        return sub;
    }, program.view, program.setState, program.onError, program.termination);
}

export function ProgramModule_withTrace(trace, program) {
    return new Program$4(program.init, (msg, model) => {
        const patternInput = program.update(msg, model);
        const state = patternInput[0];
        trace(msg, state, map_1((tuple) => tuple[0], program.subscribe(state)));
        return [state, patternInput[1]];
    }, program.subscribe, program.view, program.setState, program.onError, program.termination);
}

export function ProgramModule_withErrorHandler(onError, program) {
    return new Program$4(program.init, program.update, program.subscribe, program.view, program.setState, onError, program.termination);
}

export function ProgramModule_withTermination(predicate, terminate, program) {
    return new Program$4(program.init, program.update, program.subscribe, program.view, program.setState, program.onError, [predicate, terminate]);
}

export function ProgramModule_mapTermination(map, program) {
    return new Program$4(program.init, program.update, program.subscribe, program.view, program.setState, program.onError, map(program.termination));
}

export function ProgramModule_mapErrorHandler(map, program) {
    return new Program$4(program.init, program.update, program.subscribe, program.view, program.setState, partialApply(1, map, [program.onError]), program.termination);
}

export function ProgramModule_onError(program) {
    return program.onError;
}

export function ProgramModule_withSetState(setState, program) {
    return new Program$4(program.init, program.update, program.subscribe, program.view, setState, program.onError, program.termination);
}

export function ProgramModule_setState(program) {
    return curry(2, program.setState);
}

export function ProgramModule_view(program) {
    return curry(2, program.view);
}

export function ProgramModule_init(program) {
    return program.init;
}

export function ProgramModule_update(program) {
    return curry(2, program.update);
}

export function ProgramModule_map(mapInit, mapUpdate, mapView, mapSetState, mapSubscribe, mapTermination, program) {
    const init = partialApply(1, mapInit, [program.init]);
    const update = partialApply(2, mapUpdate, [curry(2, program.update)]);
    const view = partialApply(2, mapView, [curry(2, program.view)]);
    const setState = partialApply(2, mapSetState, [curry(2, program.setState)]);
    return new Program$4(init, uncurry(2, update), partialApply(1, mapSubscribe, [program.subscribe]), uncurry(2, view), uncurry(2, setState), program.onError, mapTermination(program.termination));
}

export function ProgramModule_runWithDispatch(syncDispatch, arg, program) {
    let tupledArg_1;
    const patternInput = program.init(arg);
    const model = patternInput[0];
    const sub = program.subscribe(model);
    const patternInput_1 = program.termination;
    const rb = RingBuffer$1_$ctor_Z524259A4(10);
    let reentered = false;
    let state = model;
    let activeSubs = Sub_Internal_empty;
    let terminated = false;
    const dispatch = (msg) => {
        if (!terminated) {
            RingBuffer$1__Push_2B595(rb, msg);
            if (!reentered) {
                reentered = true;
                processMsgs();
                reentered = false;
            }
        }
    };
    const dispatch$0027 = partialApply(1, syncDispatch, [dispatch]);
    const processMsgs = () => {
        let tupledArg;
        let nextMsg = RingBuffer$1__Pop(rb);
        while ((!terminated) && (nextMsg != null)) {
            const msg_1 = value_2(nextMsg);
            if (patternInput_1[0](msg_1)) {
                Sub_Internal_Fx_stop(program.onError, activeSubs);
                patternInput_1[1](state);
                terminated = true;
            }
            else {
                const patternInput_2 = program.update(msg_1, state);
                const model$0027 = patternInput_2[0];
                const sub$0027 = program.subscribe(model$0027);
                program.setState(model$0027, dispatch$0027);
                Cmd_exec((ex) => {
                    let clo;
                    program.onError([(clo = toText(printf("Error handling the message: %A")), clo(msg_1)), ex]);
                }, dispatch$0027, patternInput_2[1]);
                state = model$0027;
                activeSubs = ((tupledArg = Sub_Internal_diff(activeSubs, sub$0027), Sub_Internal_Fx_change(program.onError, dispatch$0027, tupledArg[0], tupledArg[1], tupledArg[2], tupledArg[3])));
                nextMsg = RingBuffer$1__Pop(rb);
            }
        }
    };
    reentered = true;
    program.setState(model, dispatch$0027);
    Cmd_exec((ex_1) => {
        program.onError([toText(printf("Error intitializing:")), ex_1]);
    }, dispatch$0027, patternInput[1]);
    activeSubs = ((tupledArg_1 = Sub_Internal_diff(activeSubs, sub), Sub_Internal_Fx_change(program.onError, dispatch$0027, tupledArg_1[0], tupledArg_1[1], tupledArg_1[2], tupledArg_1[3])));
    processMsgs();
    reentered = false;
}

export function ProgramModule_runWith(arg, program) {
    ProgramModule_runWithDispatch(uncurry(2, (x) => x), arg, program);
}

export function ProgramModule_run(program) {
    ProgramModule_runWith(void 0, program);
}

