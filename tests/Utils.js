import { isEmptySequence, parseSource } from "./src/Parser.js";
import { toConsole } from "./fable_modules/fable-library.4.0.1/String.js";
import { toString } from "./fable_modules/fable-library.4.0.1/Types.js";
import { empty, singleton, collect, delay, toList } from "./fable_modules/fable-library.4.0.1/Seq.js";

export function extractResult(src) {
    const matchValue = parseSource(src);
    if (matchValue.tag === 1) {
        const errorValue = matchValue.fields[0];
        toConsole(`${toString(errorValue)}`);
        throw new Error(toString(errorValue));
    }
    else {
        return toList(delay(() => collect((x) => ((!isEmptySequence(x)) ? singleton(x) : empty()), matchValue.fields[0][0])));
    }
}

