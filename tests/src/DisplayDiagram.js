import { createElement } from "react";
import React from "react";
import { join } from "../fable_modules/fable-library.4.0.1/String.js";
import { React_functionComponent_Z336EF691 } from "../fable_modules/Feliz.2.6.0/React.fs.js";
import { defaultOf } from "../fable_modules/fable-library.4.0.1/Util.js";
import { Operators_FailurePattern } from "../fable_modules/fable-library.4.0.1/FSharp.Core.js";
import { Block } from "./Parser.js";
import { cons, map, find } from "../fable_modules/fable-library.4.0.1/List.js";
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

export function Sequence(text) {
    return createElement("p", {
        className: "struct-sequence",
        dangerouslySetInnerHTML: {
            __html: text,
        },
    });
}

export function Return(text, exit) {
    return createElement("p", {
        className: "struct-break",
        dangerouslySetInnerHTML: {
            __html: (exit ? "exit " : "") + (`${text}`),
        },
    });
}

export function Call(text) {
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
        case 8: {
            matchResult = 0;
            s = _arg.fields[0];
            break;
        }
        case 9: {
            matchResult = 0;
            s = _arg.fields[0];
            break;
        }
        case 4: {
            matchResult = 1;
            break;
        }
        case 10: {
            matchResult = 2;
            break;
        }
        case 7: {
            matchResult = 3;
            break;
        }
        default: matchResult = 4}
    switch (matchResult) {
        case 0: {
            return Return(s, true);
        }
        case 1: {
            return Return(_arg.fields[0], false);
        }
        case 2: {
            return Sequence(_arg.fields[0].fields[0]);
        }
        case 3: {
            return Call(_arg.fields[0]);
        }
        case 4: {
            return React_functionComponent_Z336EF691(defaultOf)();
        }
    }
}

export function Diagram(diagramInputProps) {
    const blocks = diagramInputProps.blocks;
    let patternInput;
    try {
        patternInput = find((_arg) => (_arg.tag === 0), blocks);
    }
    catch (matchValue) {
        if (Operators_FailurePattern(matchValue) != null) {
            patternInput = (new Block(0, ["Nassi–Shneiderman diagram"]));
        }
        else {
            throw matchValue;
        }
    }
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

