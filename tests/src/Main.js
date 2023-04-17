import { createRoot } from "react-dom/client";
import * as ace_builds from "ace-builds";
import { isEmptySequence, parseSource } from "./Parser.js";
import { toString } from "../fable_modules/fable-library.4.0.1/Types.js";
import { empty, singleton, collect, delay, toList } from "../fable_modules/fable-library.4.0.1/Seq.js";
import { toConsole } from "../fable_modules/fable-library.4.0.1/String.js";
import { createElement } from "react";
import { Diagram } from "./DisplayDiagram.js";

export const codeArea = document.getElementById("codeEditor");

export const createButton = document.getElementById("createButton");

export const root = createRoot(document.getElementById("feliz-app"));

export const editor = ace_builds.edit(codeArea);

editor.setFontSize(20);

export function parseCode() {
    const matchValue = parseSource(editor.getValue());
    if (matchValue.tag === 1) {
        throw new Error(toString(matchValue.fields[0]));
    }
    else {
        const value_1 = toList(delay(() => collect((x) => ((!isEmptySequence(x)) ? singleton(x) : empty()), matchValue.fields[0][0])));
        toConsole(`${value_1}`);
        return value_1;
    }
}

createButton.addEventListener("click", (_arg) => {
    const arg = createElement(Diagram, {
        blocks: parseCode(),
    });
    root.render(arg);
});

