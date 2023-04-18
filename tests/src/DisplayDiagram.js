import { FSharpRef } from "../fable_modules/fable-library.4.0.1/Types.js";
import { createObj, defaultOf } from "../fable_modules/fable-library.4.0.1/Util.js";
import { createElement } from "react";
import React from "react";
import { join } from "../fable_modules/fable-library.4.0.1/String.js";
import { cons, tryFind, empty, map, singleton, isEmpty, ofArray } from "../fable_modules/fable-library.4.0.1/List.js";
import { Interop_reactApi } from "../fable_modules/Feliz.2.6.0/Interop.fs.js";
import { map as map_1, defaultArg } from "../fable_modules/fable-library.4.0.1/Option.js";
import { defaultOf as defaultOf_1 } from "../fable_modules/fable-library.4.0.1/Util.js";
import { React_functionComponent_Z336EF691 } from "../fable_modules/Feliz.2.6.0/React.fs.js";

export function declare() {
    return new FSharpRef(defaultOf());
}

export const astNodeToComponent = declare();

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

export function DesicisonGraphic(desicisonGraphicInputProps) {
    let elements;
    const condition = desicisonGraphicInputProps.condition;
    return createElement("svg", createObj(ofArray([["className", "decision-graphic"], (elements = ofArray([createElement("text", {
        fontSize: 16,
        x: "50%",
        y: "30%",
        dominantBaseline: "middle",
        textAnchor: "middle",
        children: condition,
    }), createElement("line", {
        x1: "0%",
        y1: "0%",
        x2: "50%",
        y2: "100%",
        fill: "none",
        stroke: "#000",
        strokeWidth: 1,
    }), createElement("line", {
        x1: "100%",
        y1: "0%",
        x2: "50%",
        y2: "100%",
        fill: "none",
        stroke: "#000",
        strokeWidth: 1,
    }), createElement("text", {
        x: "1%",
        y: "90%",
        className: "small-text",
        dominantBaseline: "middle",
        textAnchor: "start",
        children: "true",
    }), createElement("text", {
        x: "99%",
        y: "90%",
        className: "small-text",
        dominantBaseline: "middle",
        textAnchor: "end",
        children: "false",
    })]), ["children", Interop_reactApi.Children.toArray(Array.from(elements))])])));
}

export function IfElseBranchContents(_arg) {
    if (isEmpty(_arg)) {
        return singleton(createElement("h1", {
            width: 100 + "%",
            height: 100 + "%",
            fontSize: 20,
            dangerouslySetInnerHTML: {
                __html: "𝝓",
            },
            className: "phi",
        }));
    }
    else {
        return map(astNodeToComponent.contents, _arg);
    }
}

export function If(_arg) {
    let elems_3, elems_2, elems, elems_1;
    return createElement("div", createObj(ofArray([["className", "struct-if"], (elems_3 = [createElement(DesicisonGraphic, {
        condition: _arg.condition.fields[0],
    }), createElement("div", createObj(ofArray([["className", "decision-branches"], (elems_2 = [createElement("div", createObj(ofArray([["className", "if-else-branch"], (elems = IfElseBranchContents(_arg.blocks), ["children", Interop_reactApi.Children.toArray(Array.from(elems))])]))), createElement("div", createObj(ofArray([["className", "if-else-branch"], (elems_1 = IfElseBranchContents(defaultArg(_arg.opt_else, empty())), ["children", Interop_reactApi.Children.toArray(Array.from(elems_1))])])))], ["children", Interop_reactApi.Children.toArray(Array.from(elems_2))])])))], ["children", Interop_reactApi.Children.toArray(Array.from(elems_3))])])));
}

export function Diagram(diagramInputProps) {
    const width = diagramInputProps.width;
    const blocks = diagramInputProps.blocks;
    const children = cons(defaultArg(map_1((_arg) => ((_arg.tag === 0) ? createElement(Caption, {
        caption: _arg.fields[0],
    }) : defaultOf_1()), tryFind((_arg_1) => (_arg_1.tag === 0), blocks)), defaultOf_1()), map(astNodeToComponent.contents, blocks));
    return createElement("div", {
        className: join(" ", ["struct-diagram"]),
        style: {
            width: width + "%",
        },
        children: Interop_reactApi.Children.toArray(Array.from(children)),
    });
}

astNodeToComponent.contents = ((_arg) => ((_arg.tag === 7) ? createElement(Return, {
    text: _arg.fields[0],
    exit: true,
}) : ((_arg.tag === 8) ? createElement(Return, {
    text: _arg.fields[0],
    exit: true,
}) : ((_arg.tag === 3) ? createElement(Return, {
    text: _arg.fields[0],
    exit: false,
}) : ((_arg.tag === 9) ? createElement(Sequence, {
    text: _arg.fields[0].fields[0],
}) : ((_arg.tag === 6) ? createElement(Call, {
    text: _arg.fields[0],
}) : ((_arg.tag === 1) ? createElement(If, _arg.fields[0]) : React_functionComponent_Z336EF691(defaultOf_1)())))))));

