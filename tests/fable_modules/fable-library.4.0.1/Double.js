import { FSharpRef } from "./Types.js";
export function tryParse(str, defValue) {
    // TODO: test if value is valid and in range
    if (str != null && /\S/.test(str)) {
        const v = +str.replace("_", "");
        if (!Number.isNaN(v)) {
            defValue.contents = v;
            return true;
        }
    }
    return false;
}
export function parse(str) {
    const defValue = new FSharpRef(0);
    if (tryParse(str, defValue)) {
        return defValue.contents;
    }
    else {
        throw new Error("Input string was not in a correct format.");
    }
}
// JS Number.isFinite function evals false for NaN
export function isPositiveInfinity(x) {
    return x === Number.POSITIVE_INFINITY;
}
export function isNegativeInfinity(x) {
    return x === Number.NEGATIVE_INFINITY;
}
export function isInfinity(x) {
    return x === Number.POSITIVE_INFINITY || x === Number.NEGATIVE_INFINITY;
}
