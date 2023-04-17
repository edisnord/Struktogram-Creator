import { createElement } from "react";
import React from "react";
import { join } from "../fable_modules/fable-library.4.0.1/String.js";
import { React_functionComponent_Z336EF691 } from "../fable_modules/Feliz.2.6.0/React.fs.js";
import { defaultOf } from "../fable_modules/fable-library.4.0.1/Util.js";
import { defaultArg } from "../fable_modules/fable-library.4.0.1/Option.js";
import { cons, map, tryFind } from "../fable_modules/fable-library.4.0.1/List.js";
import { Block } from "./Parser.js";
import { Interop_reactApi } from "../fable_modules/Feliz.2.6.0/Interop.fs.js";

export function Caption(captionInputProps) {
    const caption = captionInputProps.caption;
    return createElement("p", {
        className: join(" ", ["struct-caption"]),
        dangerouslySetInnerHTML: {
            __html: caption,
        },
    });
}

export function Sequence(sequenceInputProps) {
    const text = sequenceInputProps.text;
    return createElement("p", {
        className: "struct-sequence",
        dangerouslySetInnerHTML: {
            __html: text,
        },
    });
}

export function Return(returnInputProps) {
    const exit = returnInputProps.exit;
    const text = returnInputProps.text;
    return createElement("p", {
        className: "struct-break",
        dangerouslySetInnerHTML: {
            __html: (exit ? "exit " : "") + (`${text}`),
        },
    });
}

export function Call(callInputProps) {
    const text = callInputProps.text;
    return createElement("p", {
        className: "struct-call",
        dangerouslySetInnerHTML: {
            __html: text,
        },
    });
}

export function astNodeToComponent(_arg) {
    let matchResult, s;
    switch (_arg.tag) {
        case 7: {
            matchResult = 0;
            s = _arg.fields[0];
            break;
        }
        case 8: {
            matchResult = 0;
            s = _arg.fields[0];
            break;
        }
        case 3: {
            matchResult = 1;
            break;
        }
        case 9: {
            matchResult = 2;
            break;
        }
        case 6: {
            matchResult = 3;
            break;
        }
        default: matchResult = 4}
    switch (matchResult) {
        case 0: {
            return createElement(Return, {
                text: s,
                exit: true,
            });
        }
        case 1: {
            return createElement(Return, {
                text: _arg.fields[0],
                exit: false,
            });
        }
        case 2: {
            return createElement(Sequence, {
                text: _arg.fields[0].fields[0],
            });
        }
        case 3: {
            return createElement(Call, {
                text: _arg.fields[0],
            });
        }
        case 4: {
            return React_functionComponent_Z336EF691(defaultOf)();
        }
    }
}

export function Diagram(diagramInputProps) {
    const blocks = diagramInputProps.blocks;
    const patternInput = defaultArg(tryFind((_arg) => (_arg.tag === 0), blocks), new Block(0, ["Nassi–Shneiderman diagram"]));
    if (patternInput.tag === 0) {
        const children = cons(createElement(Caption, {
            caption: patternInput.fields[0],
        }), map(astNodeToComponent, blocks));
        return createElement("div", {
            className: join(" ", ["struct-diagram"]),
            children: Interop_reactApi.Children.toArray(Array.from(children)),
        });
    }
    else {
        throw new Error("Match failure");
    }
}

