import { useLayoutEffectWithDeps, useLayoutEffect, useEffectWithDeps, useEffect, useDebugValue } from "./ReactInterop.js";
import { class_type } from "../fable-library.4.0.1/Reflection.js";
import { iterate } from "../fable-library.4.0.1/Seq.js";
import { some, defaultArg, toArray } from "../fable-library.4.0.1/Option.js";
import { Interop_reactApi } from "./Interop.fs.js";
import { disposeSafe, defaultOf, curry, uncurry } from "../fable-library.4.0.1/Util.js";
import { useState } from "react";
import * as react from "react";

export const ReactInterop_useDebugValueWithFormatter = useDebugValue;

export const ReactInterop_useEffect = useEffect;

export const ReactInterop_useEffectWithDeps = useEffectWithDeps;

export const ReactInterop_useLayoutEffect = useLayoutEffect;

export const ReactInterop_useLayoutEffectWithDeps = useLayoutEffectWithDeps;

export class Internal {
    "constructor"() {
    }
}

export function Internal$reflection() {
    return class_type("Feliz.Internal", void 0, Internal);
}

export function Internal_$ctor() {
    return new Internal();
}


export function Internal_functionComponent_Z45822769(renderElement, name, withKey) {
    iterate((name_1) => {
        renderElement.displayName = name_1;
    }, toArray(name));
    return (props) => {
        const props_2 = Internal_propsWithKey(withKey, props);
        return Interop_reactApi.createElement(renderElement, props_2);
    };
}

export function Internal_memo_Z1716C242(renderElement, name, areEqual, withKey) {
    const memoElementType = Interop_reactApi.memo(renderElement, uncurry(2, defaultArg(curry(2, areEqual), defaultOf())));
    iterate((name_1) => {
        renderElement.displayName = name_1;
    }, toArray(name));
    return (props) => {
        const props_2 = Internal_propsWithKey(withKey, props);
        return Interop_reactApi.createElement(memoElementType, props_2);
    };
}

export function Internal_propsWithKey(withKey, props) {
    if (withKey == null) {
        return props;
    }
    else {
        const f = withKey;
        props.key = f(props);
        return props;
    }
}

export class React {
    "constructor"() {
    }
}

export function React$reflection() {
    return class_type("Feliz.React", void 0, React);
}

export function React_createDisposable_3A5B6456(dispose) {
    return {
        Dispose() {
            dispose();
        },
    };
}

export function useReact_useState_FCFD9EF(initializer) {
    return Interop_reactApi.useState(initializer);
}

export function useReact_useReducer_2B9E6EA0(update, initialState) {
    const arg = update;
    return Interop_reactApi.useReducer(arg, initialState);
}

export function useReact_useEffect_Z5ECA432F(effect) {
    ReactInterop_useEffect(effect);
}

export function useReact_useEffect_7331F961(effect, dependencies) {
    ReactInterop_useEffectWithDeps(effect, dependencies);
}

export function useReact_useLayoutEffect_Z5ECA432F(effect) {
    ReactInterop_useLayoutEffect(effect);
}

export function useReact_useLayoutEffect_7331F961(effect, dependencies) {
    ReactInterop_useLayoutEffectWithDeps(effect, dependencies);
}

export function useReact_useLayoutEffect_3A5B6456(effect) {
    ReactInterop_useLayoutEffect((_arg) => {
        effect();
        return React_createDisposable_3A5B6456(() => {
        });
    });
}

export function useReact_useLayoutEffect_311B4086(effect, dependencies) {
    ReactInterop_useLayoutEffectWithDeps((_arg) => {
        effect();
        return React_createDisposable_3A5B6456(() => {
        });
    }, dependencies);
}

export function useReact_useEffectOnce_3A5B6456(effect) {
    const calledOnce = Interop_reactApi.useRef(false);
    useReact_useEffect_311B4086(() => {
        if (calledOnce.current) {
        }
        else {
            calledOnce.current = true;
            effect();
        }
    }, []);
}

export function useReact_useEffectOnce_Z5ECA432F(effect) {
    const destroyFunc = Interop_reactApi.useRef(void 0);
    const calledOnce = Interop_reactApi.useRef(false);
    const renderAfterCalled = Interop_reactApi.useRef(false);
    if (calledOnce.current) {
        renderAfterCalled.current = true;
    }
    useReact_useEffect_7331F961(() => {
        let disposeOption;
        if (calledOnce.current) {
            disposeOption = (void 0);
        }
        else {
            calledOnce.current = true;
            destroyFunc.current = some(effect());
            disposeOption = (renderAfterCalled.current ? destroyFunc.current : (void 0));
        }
        return {
            Dispose() {
                iterate((d) => {
                    let copyOfStruct = d;
                    disposeSafe(copyOfStruct);
                }, toArray(disposeOption));
            },
        };
    }, []);
}

export function useReact_useEffectOnce_69320292(effect) {
    const destroyFunc = Interop_reactApi.useRef(void 0);
    const calledOnce = Interop_reactApi.useRef(false);
    const renderAfterCalled = Interop_reactApi.useRef(false);
    if (calledOnce.current) {
        renderAfterCalled.current = true;
    }
    useReact_useEffect_7331F961(() => {
        let disposeOption;
        if (calledOnce.current) {
            disposeOption = (void 0);
        }
        else {
            calledOnce.current = true;
            destroyFunc.current = effect();
            disposeOption = (renderAfterCalled.current ? destroyFunc.current : (void 0));
        }
        return {
            Dispose() {
                iterate((d) => {
                    let copyOfStruct = d;
                    disposeSafe(copyOfStruct);
                }, toArray(disposeOption));
            },
        };
    }, []);
}

export function useReact_useEffect_3A5B6456(effect) {
    ReactInterop_useEffect((_arg) => {
        effect();
        return React_createDisposable_3A5B6456(() => {
        });
    });
}

export function useReact_useEffect_311B4086(effect, dependencies) {
    ReactInterop_useEffectWithDeps((_arg) => {
        effect();
        return React_createDisposable_3A5B6456(() => {
        });
    }, dependencies);
}

export function useReact_useDebugValue_Z721C83C5(value) {
    ReactInterop_useDebugValueWithFormatter(value, (x) => x);
}

export function useReact_useDebugValue_77A55D6D(value, formatter) {
    ReactInterop_useDebugValueWithFormatter(value, formatter);
}

export function useReact_useCallback_1CA17B65(callbackFunction, dependencies) {
    const arg_1 = defaultArg(dependencies, []);
    return Interop_reactApi.useCallback(callbackFunction, arg_1);
}

export function useReact_useRef_1505(initialValue) {
    return Interop_reactApi.useRef(initialValue);
}

export function useReact_useInputRef() {
    return useReact_useRef_1505(void 0);
}

export function useReact_useButtonRef() {
    return useReact_useRef_1505(void 0);
}

export function useReact_useElementRef() {
    return useReact_useRef_1505(void 0);
}

export function useReact_useMemo_10C6A43C(createFunction, dependencies) {
    const arg_1 = defaultArg(dependencies, []);
    return Interop_reactApi.useMemo(createFunction, arg_1);
}

export function React_functionComponent_Z336EF691(render, withKey) {
    return Internal_functionComponent_Z45822769(render, void 0, withKey);
}

export function React_functionComponent_50AC6514(name, render, withKey) {
    return Internal_functionComponent_Z45822769(render, name, withKey);
}

export function React_functionComponent_Z552AB1C(render, withKey) {
    return Internal_functionComponent_Z45822769((arg_1) => {
        const arg = render(arg_1);
        return react.createElement(react.Fragment, {}, ...arg);
    }, void 0, withKey);
}

export function React_functionComponent_Z32EE5C21(name, render, withKey) {
    return Internal_functionComponent_Z45822769((arg_1) => {
        const arg = render(arg_1);
        return react.createElement(react.Fragment, {}, ...arg);
    }, name, withKey);
}

export function React_memo_Z71E4ACFA(render, withKey, areEqual) {
    return Internal_memo_Z1716C242(render, void 0, areEqual, withKey);
}

export function React_memo_Z496F9C23(name, render, withKey, areEqual) {
    return Internal_memo_Z1716C242(render, name, areEqual, withKey);
}

export function React_memo_Z7F016AD3(render, withKey, areEqual) {
    return Internal_memo_Z1716C242((arg_1) => {
        const arg = render(arg_1);
        return react.createElement(react.Fragment, {}, ...arg);
    }, void 0, areEqual, withKey);
}

export function React_memo_Z4010840A(name, render, withKey, areEqual) {
    return Internal_memo_Z1716C242((arg_1) => {
        const arg = render(arg_1);
        return react.createElement(react.Fragment, {}, ...arg);
    }, name, areEqual, withKey);
}

export function React_createContext_Z10F951C2(name, defaultValue) {
    const contextObject = Interop_reactApi.createContext(defaultArg(defaultValue, void 0));
    iterate((name_1) => {
        contextObject.displayName = name_1;
    }, toArray(name));
    return contextObject;
}

export function React_contextProvider_34D9BBBD(contextObject, contextValue, child) {
    return Interop_reactApi.createElement(contextObject.Provider, {
        value: contextValue,
    }, child);
}

export function React_contextProvider_138D2F56(contextObject, contextValue, children) {
    return Interop_reactApi.createElement(contextObject.Provider, {
        value: contextValue,
    }, ...children);
}

export function React_contextConsumer_Z68910595(contextObject, render) {
    return Interop_reactApi.createElement(contextObject.Consumer, defaultOf(), render);
}

export function React_contextConsumer_56D53A40(contextObject, render) {
    return Interop_reactApi.createElement(contextObject.Consumer, defaultOf(), (arg_1) => {
        const arg = render(arg_1);
        return react.createElement(react.Fragment, {}, ...arg);
    });
}

export function useReact_useContext_37FA55CF(contextObject) {
    return Interop_reactApi.useContext(contextObject);
}

export function useReact_useCallbackRef_7C4B0DD6(callback) {
    const lastRenderCallbackRef = useReact_useRef_1505(callback);
    const callbackRef = useReact_useCallback_1CA17B65((arg) => lastRenderCallbackRef.current(arg), []);
    useReact_useLayoutEffect_3A5B6456(() => {
        lastRenderCallbackRef.current = callback;
    });
    return callbackRef;
}

export const React_useStateWithUpdater_1505 = useState;

export function React_forwardRef_3790D881(render) {
    const forwardRefType = Interop_reactApi.forwardRef((props, ref) => render([props, ref]));
    return (tupledArg) => {
        const propsObj = Object.assign({}, tupledArg[0]);
        propsObj.ref = tupledArg[1];
        return Interop_reactApi.createElement(forwardRefType, propsObj);
    };
}

export function React_forwardRef_7DC3DB1A(name, render) {
    const forwardRefType = Interop_reactApi.forwardRef((props, ref) => render([props, ref]));
    render.displayName = name;
    return (tupledArg) => {
        const propsObj = Object.assign({}, tupledArg[0]);
        propsObj.ref = tupledArg[1];
        return Interop_reactApi.createElement(forwardRefType, propsObj);
    };
}

export function React_strictMode_1FEFDAB5(children) {
    return Interop_reactApi.createElement(Interop_reactApi.StrictMode, void 0, ...children);
}

export function React_lazy$0027_4712D3AE(dynamicImport, props) {
    return Interop_reactApi.createElement(Interop_reactApi.lazy(() => dynamicImport), props);
}

export function React_lazy$0027_Z3D8450FC(dynamicImport, props) {
    return Interop_reactApi.createElement(Interop_reactApi.lazy(dynamicImport), props);
}

export function React_suspense_1FEFDAB5(children) {
    let o;
    return Interop_reactApi.createElement(Interop_reactApi.Suspense, (o = {
        fallback: defaultOf(),
    }, Object.assign({}, o)), ...children);
}

export function React_suspense_36DAE502(children, fallback) {
    let o;
    return Interop_reactApi.createElement(Interop_reactApi.Suspense, (o = {
        fallback: fallback,
    }, Object.assign({}, o)), ...children);
}

export function useReact_useImperativeHandle_596DDC25(ref, createHandle) {
    Interop_reactApi.useImperativeHandle(ref, createHandle);
}

export function useReact_useImperativeHandle_33F5CF55(ref, createHandle, dependencies) {
    Interop_reactApi.useImperativeHandle(ref, createHandle, dependencies);
}

export function useFeliz_React__React_useState_Static_1505(initial) {
    return Interop_reactApi.useState(initial);
}

export const Feliz_React__React_useStateWithUpdater_Static_FCFD9EF = useState;

