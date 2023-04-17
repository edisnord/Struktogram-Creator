import { toString, Union, Record } from "../../../fable_modules/fable-library.4.0.1/Types.js";
import { class_type, union_type, record_type, string_type, int32_type } from "../../../fable_modules/fable-library.4.0.1/Reflection.js";
import { contains, ofSeq } from "../../../fable_modules/fable-library.4.0.1/Set.js";
import { partialApply, max, compare, comparePrimitives } from "../../../fable_modules/fable-library.4.0.1/Util.js";
import { empty as empty_1, append as append_1, head as head_1, tail, isEmpty, ofArray, singleton as singleton_1, sortByDescending } from "../../../fable_modules/fable-library.4.0.1/List.js";
import { map } from "../../../fable_modules/fable-library.4.0.1/Option.js";
import { substring, toFail, printf, toText, join, split } from "../../../fable_modules/fable-library.4.0.1/String.js";
import { empty, singleton, append, collect, delay, toList } from "../../../fable_modules/fable-library.4.0.1/Seq.js";
import { Result_MapError, FSharpResult$2 } from "../../../fable_modules/fable-library.4.0.1/Choice.js";
import { isDigit } from "../../../fable_modules/fable-library.4.0.1/Char.js";
import { parse } from "../../../fable_modules/fable-library.4.0.1/Double.js";
import { op_UnaryNegation_Int32, op_UnaryNegation_Int16, op_UnaryNegation_Int8, parse as parse_1 } from "../../../fable_modules/fable-library.4.0.1/Int32.js";
import { op_UnaryNegation, parse as parse_2 } from "../../../fable_modules/fable-library.4.0.1/Long.js";

export class StringSegment extends Record {
    "constructor"(startIndex, length, underlying, startLine, startColumn) {
        super();
        this.startIndex = (startIndex | 0);
        this.length = (length | 0);
        this.underlying = underlying;
        this.startLine = (startLine | 0);
        this.startColumn = (startColumn | 0);
    }
}

export function StringSegment$reflection() {
    return record_type("Parsec.StringSegment", [], StringSegment, () => [["startIndex", int32_type], ["length", int32_type], ["underlying", string_type], ["startLine", int32_type], ["startColumn", int32_type]]);
}

export function StringSegmentModule_startsWith(s, seg) {
    const check = (i_mut) => {
        check:
        while (true) {
            const i = i_mut;
            if (i === s.length) {
                return true;
            }
            else if ((i === seg.length) ? true : (seg.underlying[i + seg.startIndex] !== s[i])) {
                return false;
            }
            else {
                i_mut = (i + 1);
                continue check;
            }
            break;
        }
    };
    return check(0);
}

export function StringSegmentModule_indexOfItem(c, seg) {
    const check = (i_mut) => {
        check:
        while (true) {
            const i = i_mut;
            if (i === seg.length) {
                return -1;
            }
            else if (seg.underlying[i + seg.startIndex] === c) {
                return i | 0;
            }
            else {
                i_mut = (i + 1);
                continue check;
            }
            break;
        }
    };
    return check(0) | 0;
}

export function StringSegmentModule_indexOfAny(cs, seg) {
    const s = ofSeq(cs, {
        Compare: comparePrimitives,
    });
    const check = (i_mut) => {
        let element;
        check:
        while (true) {
            const i = i_mut;
            if (i === seg.length) {
                return -1;
            }
            else if ((element = seg.underlying[i + seg.startIndex], contains(element, s))) {
                return i | 0;
            }
            else {
                i_mut = (i + 1);
                continue check;
            }
            break;
        }
    };
    return check(0) | 0;
}

export function StringSegmentModule_indexOfSequence(s, seg) {
    const check = (i_mut, j_mut) => {
        check:
        while (true) {
            const i = i_mut, j = j_mut;
            if (j === s.length) {
                return (i - j) | 0;
            }
            else if (((i + s.length) - j) > seg.length) {
                return -1;
            }
            else if (seg.underlying[i + seg.startIndex] === s[j]) {
                i_mut = (i + 1);
                j_mut = (j + 1);
                continue check;
            }
            else {
                i_mut = (i + 1);
                j_mut = 0;
                continue check;
            }
            break;
        }
    };
    return check(0, 0) | 0;
}

export class Position extends Record {
    "constructor"(Line, Col) {
        super();
        this.Line = (Line | 0);
        this.Col = (Col | 0);
    }
}

export function Position$reflection() {
    return record_type("Parsec.Position", [], Position, () => [["Line", int32_type], ["Col", int32_type]]);
}

export class ErrorType extends Union {
    "constructor"(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["Expected", "Unexpected", "Message"];
    }
}

export function ErrorType$reflection() {
    return union_type("Parsec.ErrorType", [], ErrorType, () => [[["Item", string_type]], [["Item", string_type]], [["Item", string_type]]]);
}

export function ParseError_sort(_arg1_, _arg1__1) {
    const _arg = [_arg1_, _arg1__1];
    return [sortByDescending((tuple) => tuple[0], _arg[0], {
        Compare: compare,
    }), _arg[1]];
}

export function ParseError_prettyPrint(_arg1_, _arg1__1, input) {
    const input_1 = map((s) => split(s, ["\n"], void 0, 0), input);
    return join("", toList(delay(() => collect((matchValue) => {
        let clo, clo_1;
        const pos = matchValue[0];
        return append(singleton((clo = toText(printf("at Line %i, Col %i:\n")), (clo_1 = clo(pos.Line), clo_1(pos.Col)))), delay(() => {
            let matchValue_1, lines, arg_2, clo_2;
            return append((matchValue_1 = input_1, (matchValue_1 != null) ? ((lines = matchValue_1, singleton((arg_2 = lines[pos.Line], (clo_2 = toText(printf("> %s")), clo_2(arg_2)))))) : (empty())), delay(() => collect((msg) => {
                let clo_4, clo_5, clo_3;
                const matchValue_2 = msg;
                switch (matchValue_2.tag) {
                    case 1: {
                        return singleton((clo_4 = toText(printf("    Unexpected %s.\n")), clo_4(matchValue_2.fields[0])));
                    }
                    case 2: {
                        return singleton((clo_5 = toText(printf("  %s\n")), clo_5(matchValue_2.fields[0])));
                    }
                    default: {
                        return singleton((clo_3 = toText(printf("    Expected %s.\n")), clo_3(matchValue_2.fields[0])));
                    }
                }
            }, matchValue[1])));
        }));
    }, _arg1_))));
}

export function Primitives_pzero(state, s) {
    let this$;
    return new FSharpResult$2(1, [[singleton_1([(this$ = s, new Position(this$.startLine, this$.startColumn)), singleton_1(new ErrorType(2, ["pzero"]))]), state]]);
}

export class Primitives_Inline {
    "constructor"() {
    }
}

export function Primitives_Inline$reflection() {
    return class_type("Parsec.Primitives.Inline", void 0, Primitives_Inline);
}

export class Primitives_ParserCombinator {
    "constructor"() {
    }
}

export function Primitives_ParserCombinator$reflection() {
    return class_type("Parsec.Primitives.ParserCombinator", void 0, Primitives_ParserCombinator);
}

export function Primitives_ParserCombinator_$ctor() {
    return new Primitives_ParserCombinator();
}

export const Primitives_parse = Primitives_ParserCombinator_$ctor();

export function CharParsers_anyChar(state, s) {
    let this$_1, this$_2, start_1, finish_1, len, line, column, clo, clo_1;
    let matchValue;
    const this$ = s;
    const index = 0;
    matchValue = (((index < 0) ? true : (index >= this$.length)) ? "￿" : this$.underlying[this$.startIndex + index]);
    if (matchValue === "￿") {
        return new FSharpResult$2(1, [[singleton_1([(this$_1 = s, new Position(this$_1.startLine, this$_1.startColumn)), ofArray([new ErrorType(0, ["any char"]), new ErrorType(1, ["EOF"])])]), state]]);
    }
    else {
        return new FSharpResult$2(0, [[matchValue, (this$_2 = s, (start_1 = 1, (finish_1 = ((this$_2.length - 1) | 0), (((start_1 >= 0) && (start_1 <= this$_2.length)) && (finish_1 < max(comparePrimitives, start_1, this$_2.length))) ? ((len = (max(comparePrimitives, 0, (finish_1 - start_1) + 1) | 0), (line = this$_2.startLine, (column = this$_2.startColumn, ((() => {
            for (let i_1 = 0; i_1 <= (start_1 - 1); i_1++) {
                if (this$_2.underlying[this$_2.startIndex + i_1] === "\n") {
                    line = ((line + 1) | 0);
                    column = 0;
                }
                else {
                    column = ((column + 1) | 0);
                }
            }
        })(), new StringSegment(this$_2.startIndex + start_1, len, this$_2.underlying, line, column)))))) : ((clo = toFail(printf("Index was out of range (GetSlice(%i, %i)).")), (clo_1 = clo(start_1), clo_1(finish_1))))))), state]]);
    }
}

export function CharParsers_skipAnyChar(state, s) {
    let this$, index, this$_1, this$_2, start_1, finish_1, len, line, column, clo, clo_1;
    if (((this$ = s, (index = 0, ((index < 0) ? true : (index >= this$.length)) ? "￿" : this$.underlying[this$.startIndex + index]))) === "￿") {
        return new FSharpResult$2(1, [[singleton_1([(this$_1 = s, new Position(this$_1.startLine, this$_1.startColumn)), ofArray([new ErrorType(0, ["any char"]), new ErrorType(1, ["EOF"])])]), state]]);
    }
    else {
        return new FSharpResult$2(0, [[void 0, (this$_2 = s, (start_1 = 1, (finish_1 = ((this$_2.length - 1) | 0), (((start_1 >= 0) && (start_1 <= this$_2.length)) && (finish_1 < max(comparePrimitives, start_1, this$_2.length))) ? ((len = (max(comparePrimitives, 0, (finish_1 - start_1) + 1) | 0), (line = this$_2.startLine, (column = this$_2.startColumn, ((() => {
            for (let i_1 = 0; i_1 <= (start_1 - 1); i_1++) {
                if (this$_2.underlying[this$_2.startIndex + i_1] === "\n") {
                    line = ((line + 1) | 0);
                    column = 0;
                }
                else {
                    column = ((column + 1) | 0);
                }
            }
        })(), new StringSegment(this$_2.startIndex + start_1, len, this$_2.underlying, line, column)))))) : ((clo = toFail(printf("Index was out of range (GetSlice(%i, %i)).")), (clo_1 = clo(start_1), clo_1(finish_1))))))), state]]);
    }
}

export function CharParsers_spaces() {
    const go = (tupledArg_mut) => {
        let this$_1, start_1, finish_1, len, line, column, clo, clo_1;
        go:
        while (true) {
            const tupledArg = tupledArg_mut;
            const state = tupledArg[0];
            const s = tupledArg[1];
            let matchValue;
            const this$ = s;
            const index = 0;
            matchValue = (((index < 0) ? true : (index >= this$.length)) ? "￿" : this$.underlying[this$.startIndex + index]);
            let matchResult;
            if (matchValue === "\t") {
                matchResult = 0;
            }
            else if (matchValue === "\n") {
                matchResult = 0;
            }
            else if (matchValue === " ") {
                matchResult = 0;
            }
            else {
                matchResult = 1;
            }
            switch (matchResult) {
                case 0: {
                    tupledArg_mut = [state, (this$_1 = s, (start_1 = 1, (finish_1 = ((this$_1.length - 1) | 0), (((start_1 >= 0) && (start_1 <= this$_1.length)) && (finish_1 < max(comparePrimitives, start_1, this$_1.length))) ? ((len = (max(comparePrimitives, 0, (finish_1 - start_1) + 1) | 0), (line = this$_1.startLine, (column = this$_1.startColumn, ((() => {
                        for (let i_1 = 0; i_1 <= (start_1 - 1); i_1++) {
                            if (this$_1.underlying[this$_1.startIndex + i_1] === "\n") {
                                line = ((line + 1) | 0);
                                column = 0;
                            }
                            else {
                                column = ((column + 1) | 0);
                            }
                        }
                    })(), new StringSegment(this$_1.startIndex + start_1, len, this$_1.underlying, line, column)))))) : ((clo = toFail(printf("Index was out of range (GetSlice(%i, %i)).")), (clo_1 = clo(start_1), clo_1(finish_1)))))))];
                    continue go;
                }
                case 1: {
                    return new FSharpResult$2(0, [[void 0, s, state]]);
                }
            }
            break;
        }
    };
    return go;
}

export function CharParsers_spaces1() {
    const go = (tupledArg_mut) => {
        let this$_1, start_1, finish_1, len, line, column, clo, clo_1;
        go:
        while (true) {
            const tupledArg = tupledArg_mut;
            const state = tupledArg[0];
            const s = tupledArg[1];
            let matchValue;
            const this$ = s;
            const index = 0;
            matchValue = (((index < 0) ? true : (index >= this$.length)) ? "￿" : this$.underlying[this$.startIndex + index]);
            let matchResult;
            if (matchValue === "\t") {
                matchResult = 0;
            }
            else if (matchValue === "\n") {
                matchResult = 0;
            }
            else if (matchValue === " ") {
                matchResult = 0;
            }
            else {
                matchResult = 1;
            }
            switch (matchResult) {
                case 0: {
                    tupledArg_mut = [state, (this$_1 = s, (start_1 = 1, (finish_1 = ((this$_1.length - 1) | 0), (((start_1 >= 0) && (start_1 <= this$_1.length)) && (finish_1 < max(comparePrimitives, start_1, this$_1.length))) ? ((len = (max(comparePrimitives, 0, (finish_1 - start_1) + 1) | 0), (line = this$_1.startLine, (column = this$_1.startColumn, ((() => {
                        for (let i_1 = 0; i_1 <= (start_1 - 1); i_1++) {
                            if (this$_1.underlying[this$_1.startIndex + i_1] === "\n") {
                                line = ((line + 1) | 0);
                                column = 0;
                            }
                            else {
                                column = ((column + 1) | 0);
                            }
                        }
                    })(), new StringSegment(this$_1.startIndex + start_1, len, this$_1.underlying, line, column)))))) : ((clo = toFail(printf("Index was out of range (GetSlice(%i, %i)).")), (clo_1 = clo(start_1), clo_1(finish_1)))))))];
                    continue go;
                }
                case 1: {
                    return new FSharpResult$2(0, [[void 0, s, state]]);
                }
            }
            break;
        }
    };
    return (tupledArg_1) => {
        let this$_3, start_1_1, finish_1_1, len_1, line_1, column_1, clo_2, clo_1_1, this$_4;
        const state_1 = tupledArg_1[0];
        const s_1 = tupledArg_1[1];
        let matchValue_2;
        const this$_2 = s_1;
        const index_1 = 0;
        matchValue_2 = (((index_1 < 0) ? true : (index_1 >= this$_2.length)) ? "￿" : this$_2.underlying[this$_2.startIndex + index_1]);
        let matchResult_1;
        if (matchValue_2 === "\t") {
            matchResult_1 = 0;
        }
        else if (matchValue_2 === "\n") {
            matchResult_1 = 0;
        }
        else if (matchValue_2 === " ") {
            matchResult_1 = 0;
        }
        else {
            matchResult_1 = 1;
        }
        switch (matchResult_1) {
            case 0: {
                return go([state_1, (this$_3 = s_1, (start_1_1 = 1, (finish_1_1 = ((this$_3.length - 1) | 0), (((start_1_1 >= 0) && (start_1_1 <= this$_3.length)) && (finish_1_1 < max(comparePrimitives, start_1_1, this$_3.length))) ? ((len_1 = (max(comparePrimitives, 0, (finish_1_1 - start_1_1) + 1) | 0), (line_1 = this$_3.startLine, (column_1 = this$_3.startColumn, ((() => {
                    for (let i_3 = 0; i_3 <= (start_1_1 - 1); i_3++) {
                        if (this$_3.underlying[this$_3.startIndex + i_3] === "\n") {
                            line_1 = ((line_1 + 1) | 0);
                            column_1 = 0;
                        }
                        else {
                            column_1 = ((column_1 + 1) | 0);
                        }
                    }
                })(), new StringSegment(this$_3.startIndex + start_1_1, len_1, this$_3.underlying, line_1, column_1)))))) : ((clo_2 = toFail(printf("Index was out of range (GetSlice(%i, %i)).")), (clo_1_1 = clo_2(start_1_1), clo_1_1(finish_1_1)))))))]);
            }
            case 1: {
                return new FSharpResult$2(1, [[singleton_1([(this$_4 = s_1, new Position(this$_4.startLine, this$_4.startColumn)), singleton_1(new ErrorType(0, ["one or more spaces"]))]), state_1]]);
            }
        }
    };
}

export function CharParsers_eof(state, s) {
    let this$, index, this$_1;
    if (((this$ = s, (index = 0, ((index < 0) ? true : (index >= this$.length)) ? "￿" : this$.underlying[this$.startIndex + index]))) === "￿") {
        return new FSharpResult$2(0, [[void 0, s, state]]);
    }
    else {
        return new FSharpResult$2(1, [[singleton_1([(this$_1 = s, new Position(this$_1.startLine, this$_1.startColumn)), singleton_1(new ErrorType(0, ["EOF"]))]), state]]);
    }
}

export class CharParsers_StringBuilder {
    "constructor"(s) {
        this["s@784"] = s;
    }
    toString() {
        const __ = this;
        return __["s@784"];
    }
}

export function CharParsers_StringBuilder$reflection() {
    return class_type("Parsec.CharParsers.StringBuilder", void 0, CharParsers_StringBuilder);
}

export function CharParsers_StringBuilder_$ctor_Z721C83C5(s) {
    return new CharParsers_StringBuilder(s);
}

export function CharParsers_StringBuilder_$ctor() {
    return CharParsers_StringBuilder_$ctor_Z721C83C5("");
}

export function CharParsers_StringBuilder__get_Length(__) {
    return __["s@784"].length;
}

export function CharParsers_StringBuilder__Append_Z721C83C5(sb, s$0027) {
    sb["s@784"] = (sb["s@784"] + s$0027);
    return sb;
}

export function CharParsers_StringBuilder__Remove_Z37302880(sb, startIndex, length) {
    if ((startIndex + length) >= sb["s@784"].length) {
        sb["s@784"] = substring(sb["s@784"], 0, startIndex);
    }
    else {
        sb["s@784"] = (substring(sb["s@784"], 0, startIndex) + substring(sb["s@784"], startIndex + length));
    }
    return sb;
}

export const CharParsers_Internal_pfloatUnit = (() => {
    let p1_5, p_7, p2_4, p_15, p_12, cond_1, go_1, p3, p_38, p_35, p_32, cond_9, go_2;
    const ps = ofArray([(tupledArg) => {
        let length, this$, start_1, finish_1, len, line, column, clo, clo_1, this$_1;
        const str_1 = "NaN";
        const state_1 = void 0;
        const s_1 = tupledArg[1];
        return StringSegmentModule_startsWith(str_1, s_1) ? (new FSharpResult$2(0, [["NaN", (length = (str_1.length | 0), (this$ = s_1, (start_1 = (length | 0), (finish_1 = ((this$.length - 1) | 0), (((start_1 >= 0) && (start_1 <= this$.length)) && (finish_1 < max(comparePrimitives, start_1, this$.length))) ? ((len = (max(comparePrimitives, 0, (finish_1 - start_1) + 1) | 0), (line = this$.startLine, (column = this$.startColumn, ((() => {
            for (let i = 0; i <= (start_1 - 1); i++) {
                if (this$.underlying[this$.startIndex + i] === "\n") {
                    line = ((line + 1) | 0);
                    column = 0;
                }
                else {
                    column = ((column + 1) | 0);
                }
            }
        })(), new StringSegment(this$.startIndex + start_1, len, this$.underlying, line, column)))))) : ((clo = toFail(printf("Index was out of range (GetSlice(%i, %i)).")), (clo_1 = clo(start_1), clo_1(finish_1)))))))), state_1]])) : (new FSharpResult$2(1, [[singleton_1([(this$_1 = s_1, new Position(this$_1.startLine, this$_1.startColumn)), singleton_1(new ErrorType(0, [("\'" + str_1) + "\'"]))]), state_1]]));
    }, (tupledArg_5) => {
        let str_3, state_4, s_4, length_2, this$_2, start_1_1, finish_1_1, len_1, line_1, column_1, clo_2, clo_1_1, this$_3, s_10, matchValue_3, tupledArg_2, str_5, state_7, s_7, length_4, this$_4, start_1_2, finish_1_2, len_2, line_2, column_2, clo_3, clo_1_2, this$_5;
        const matchValue_4 = Result_MapError((tupledArg_6) => ParseError_sort(tupledArg_6[0], tupledArg_6[1]), (str_3 = "Inf", (state_4 = (void 0), (s_4 = tupledArg_5[1], StringSegmentModule_startsWith(str_3, s_4) ? (new FSharpResult$2(0, [["Infinity", (length_2 = (str_3.length | 0), (this$_2 = s_4, (start_1_1 = (length_2 | 0), (finish_1_1 = ((this$_2.length - 1) | 0), (((start_1_1 >= 0) && (start_1_1 <= this$_2.length)) && (finish_1_1 < max(comparePrimitives, start_1_1, this$_2.length))) ? ((len_1 = (max(comparePrimitives, 0, (finish_1_1 - start_1_1) + 1) | 0), (line_1 = this$_2.startLine, (column_1 = this$_2.startColumn, ((() => {
            for (let i_1 = 0; i_1 <= (start_1_1 - 1); i_1++) {
                if (this$_2.underlying[this$_2.startIndex + i_1] === "\n") {
                    line_1 = ((line_1 + 1) | 0);
                    column_1 = 0;
                }
                else {
                    column_1 = ((column_1 + 1) | 0);
                }
            }
        })(), new StringSegment(this$_2.startIndex + start_1_1, len_1, this$_2.underlying, line_1, column_1)))))) : ((clo_2 = toFail(printf("Index was out of range (GetSlice(%i, %i)).")), (clo_1_1 = clo_2(start_1_1), clo_1_1(finish_1_1)))))))), state_4]])) : (new FSharpResult$2(1, [[singleton_1([(this$_3 = s_4, new Position(this$_3.startLine, this$_3.startColumn)), singleton_1(new ErrorType(0, [("\'" + str_3) + "\'"]))]), state_4]]))))));
        if (matchValue_4.tag === 0) {
            const matchValue_1_1 = Result_MapError((tupledArg_7) => ParseError_sort(tupledArg_7[0], tupledArg_7[1]), (s_10 = matchValue_4.fields[0][1], (matchValue_3 = Result_MapError((tupledArg_4) => ParseError_sort(tupledArg_4[0], tupledArg_4[1]), (tupledArg_2 = [void 0, s_10], (str_5 = "inity", (state_7 = tupledArg_2[0], (s_7 = tupledArg_2[1], StringSegmentModule_startsWith(str_5, s_7) ? (new FSharpResult$2(0, [[void 0, (length_4 = (str_5.length | 0), (this$_4 = s_7, (start_1_2 = (length_4 | 0), (finish_1_2 = ((this$_4.length - 1) | 0), (((start_1_2 >= 0) && (start_1_2 <= this$_4.length)) && (finish_1_2 < max(comparePrimitives, start_1_2, this$_4.length))) ? ((len_2 = (max(comparePrimitives, 0, (finish_1_2 - start_1_2) + 1) | 0), (line_2 = this$_4.startLine, (column_2 = this$_4.startColumn, ((() => {
                for (let i_2 = 0; i_2 <= (start_1_2 - 1); i_2++) {
                    if (this$_4.underlying[this$_4.startIndex + i_2] === "\n") {
                        line_2 = ((line_2 + 1) | 0);
                        column_2 = 0;
                    }
                    else {
                        column_2 = ((column_2 + 1) | 0);
                    }
                }
            })(), new StringSegment(this$_4.startIndex + start_1_2, len_2, this$_4.underlying, line_2, column_2)))))) : ((clo_3 = toFail(printf("Index was out of range (GetSlice(%i, %i)).")), (clo_1_2 = clo_3(start_1_2), clo_1_2(finish_1_2)))))))), state_7]])) : (new FSharpResult$2(1, [[singleton_1([(this$_5 = s_7, new Position(this$_5.startLine, this$_5.startColumn)), singleton_1(new ErrorType(0, [("\'" + str_5) + "\'"]))]), state_7]]))))))), (matchValue_3.tag === 1) ? (new FSharpResult$2(0, [[void 0, s_10, matchValue_3.fields[0][1]]])) : (new FSharpResult$2(0, [[void 0, matchValue_3.fields[0][1], matchValue_3.fields[0][2]]])))));
            return (matchValue_1_1.tag === 0) ? (new FSharpResult$2(0, [[matchValue_4.fields[0][0], matchValue_1_1.fields[0][1], matchValue_1_1.fields[0][2]]])) : (new FSharpResult$2(1, [matchValue_1_1.fields[0]]));
        }
        else {
            return new FSharpResult$2(1, [matchValue_4.fields[0]]);
        }
    }, (p1_5 = ((p_7 = ((tupledArg_8) => {
        let this$_7, this$_8, start_1_3, finish_1_3, len_3, line_3, column_3, clo_4, clo_1_3, this$_9;
        const label = "[0-9]";
        const state_18 = void 0;
        const s_15 = tupledArg_8[1];
        let matchValue_5;
        const this$_6 = s_15;
        const index = 0;
        matchValue_5 = (((index < 0) ? true : (index >= this$_6.length)) ? "￿" : this$_6.underlying[this$_6.startIndex + index]);
        if (matchValue_5 === "￿") {
            return new FSharpResult$2(1, [[singleton_1([(this$_7 = s_15, new Position(this$_7.startLine, this$_7.startColumn)), ofArray([new ErrorType(0, [label]), new ErrorType(1, ["EOF"])])]), state_18]]);
        }
        else {
            const c = matchValue_5;
            if (isDigit(c)) {
                return new FSharpResult$2(0, [[c, (this$_8 = s_15, (start_1_3 = 1, (finish_1_3 = ((this$_8.length - 1) | 0), (((start_1_3 >= 0) && (start_1_3 <= this$_8.length)) && (finish_1_3 < max(comparePrimitives, start_1_3, this$_8.length))) ? ((len_3 = (max(comparePrimitives, 0, (finish_1_3 - start_1_3) + 1) | 0), (line_3 = this$_8.startLine, (column_3 = this$_8.startColumn, ((() => {
                    for (let i_4 = 0; i_4 <= (start_1_3 - 1); i_4++) {
                        if (this$_8.underlying[this$_8.startIndex + i_4] === "\n") {
                            line_3 = ((line_3 + 1) | 0);
                            column_3 = 0;
                        }
                        else {
                            column_3 = ((column_3 + 1) | 0);
                        }
                    }
                })(), new StringSegment(this$_8.startIndex + start_1_3, len_3, this$_8.underlying, line_3, column_3)))))) : ((clo_4 = toFail(printf("Index was out of range (GetSlice(%i, %i)).")), (clo_1_3 = clo_4(start_1_3), clo_1_3(finish_1_3))))))), state_18]]);
            }
            else {
                return new FSharpResult$2(1, [[singleton_1([(this$_9 = s_15, new Position(this$_9.startLine, this$_9.startColumn)), ofArray([new ErrorType(0, [label]), new ErrorType(1, [c])])]), state_18]]);
            }
        }
    }), (tupledArg_9) => {
        const s_17 = tupledArg_9[1];
        const matchValue_7 = Result_MapError((tupledArg_10) => ParseError_sort(tupledArg_10[0], tupledArg_10[1]), p_7([tupledArg_9[0], s_17]));
        if (matchValue_7.tag === 0) {
            const sb = CharParsers_StringBuilder_$ctor();
            CharParsers_StringBuilder__Append_Z721C83C5(sb, matchValue_7.fields[0][0]);
            const go = (tupledArg_11_mut) => {
                go:
                while (true) {
                    const tupledArg_11 = tupledArg_11_mut;
                    const state_3_1 = tupledArg_11[0];
                    const s_2_2 = tupledArg_11[1];
                    const matchValue_1_2 = Result_MapError((tupledArg_12) => ParseError_sort(tupledArg_12[0], tupledArg_12[1]), p_7([state_3_1, s_2_2]));
                    if (matchValue_1_2.tag === 0) {
                        CharParsers_StringBuilder__Append_Z721C83C5(sb, matchValue_1_2.fields[0][0]);
                        tupledArg_11_mut = [matchValue_1_2.fields[0][2], matchValue_1_2.fields[0][1]];
                        continue go;
                    }
                    else {
                        return new FSharpResult$2(0, [[toString(sb), s_2_2, state_3_1]]);
                    }
                    break;
                }
            };
            return go([matchValue_7.fields[0][2], matchValue_7.fields[0][1]]);
        }
        else {
            const state_1_3 = matchValue_7.fields[0][1];
            return new FSharpResult$2(1, [[matchValue_7.fields[0][0], state_1_3]]);
        }
    })), (p2_4 = ((p_15 = ((p_12 = ((cond_1 = (isDigit), (go_1 = ((i_7_mut, tupledArg_14_mut) => {
        let this$_16, start_1_5, finish_1_5, len_5, line_5, column_5, clo_6, clo_1_5;
        go_1:
        while (true) {
            const i_7 = i_7_mut, tupledArg_14 = tupledArg_14_mut;
            const state_29 = tupledArg_14[0];
            const s_23 = tupledArg_14[1];
            let c_8;
            const this$_14 = s_23;
            const index_2 = i_7 | 0;
            c_8 = (((index_2 < 0) ? true : (index_2 >= this$_14.length)) ? "￿" : this$_14.underlying[this$_14.startIndex + index_2]);
            if (i_7 === 0) {
                if (cond_1(c_8)) {
                    i_7_mut = (i_7 + 1);
                    tupledArg_14_mut = [state_29, s_23];
                    continue go_1;
                }
                else {
                    return new FSharpResult$2(0, [[void 0, s_23, state_29]]);
                }
            }
            else if (cond_1(c_8)) {
                i_7_mut = (i_7 + 1);
                tupledArg_14_mut = [state_29, s_23];
                continue go_1;
            }
            else {
                return new FSharpResult$2(0, [[void 0, (this$_16 = s_23, (start_1_5 = (i_7 | 0), (finish_1_5 = ((this$_16.length - 1) | 0), (((start_1_5 >= 0) && (start_1_5 <= this$_16.length)) && (finish_1_5 < max(comparePrimitives, start_1_5, this$_16.length))) ? ((len_5 = (max(comparePrimitives, 0, (finish_1_5 - start_1_5) + 1) | 0), (line_5 = this$_16.startLine, (column_5 = this$_16.startColumn, ((() => {
                    for (let i_9 = 0; i_9 <= (start_1_5 - 1); i_9++) {
                        if (this$_16.underlying[this$_16.startIndex + i_9] === "\n") {
                            line_5 = ((line_5 + 1) | 0);
                            column_5 = 0;
                        }
                        else {
                            column_5 = ((column_5 + 1) | 0);
                        }
                    }
                })(), new StringSegment(this$_16.startIndex + start_1_5, len_5, this$_16.underlying, line_5, column_5)))))) : ((clo_6 = toFail(printf("Index was out of range (GetSlice(%i, %i)).")), (clo_1_5 = clo_6(start_1_5), clo_1_5(finish_1_5))))))), state_29]]);
            }
            break;
        }
    }), partialApply(1, go_1, [0])))), (tupledArg_15) => {
        let tupledArg_13, c_5, state_26, s_19, matchValue_8, this$_10, index_1, this$_11, head, this$_12, start_1_4, finish_1_4, len_4, line_4, column_4, clo_5, clo_1_4, this$_13;
        const matchValue_11 = Result_MapError((tupledArg_16) => ParseError_sort(tupledArg_16[0], tupledArg_16[1]), (tupledArg_13 = [void 0, tupledArg_15[1]], (c_5 = ".", (state_26 = tupledArg_13[0], (s_19 = tupledArg_13[1], (matchValue_8 = ((this$_10 = s_19, (index_1 = 0, ((index_1 < 0) ? true : (index_1 >= this$_10.length)) ? "￿" : this$_10.underlying[this$_10.startIndex + index_1]))), (matchValue_8 === "￿") ? (new FSharpResult$2(1, [[singleton_1([(this$_11 = s_19, new Position(this$_11.startLine, this$_11.startColumn)), ofArray([new ErrorType(0, [("\'" + c_5) + "\'"]), new ErrorType(1, ["EOF"])])]), state_26]])) : ((head = matchValue_8, (head === c_5) ? (new FSharpResult$2(0, [[void 0, (this$_12 = s_19, (start_1_4 = 1, (finish_1_4 = ((this$_12.length - 1) | 0), (((start_1_4 >= 0) && (start_1_4 <= this$_12.length)) && (finish_1_4 < max(comparePrimitives, start_1_4, this$_12.length))) ? ((len_4 = (max(comparePrimitives, 0, (finish_1_4 - start_1_4) + 1) | 0), (line_4 = this$_12.startLine, (column_4 = this$_12.startColumn, ((() => {
            for (let i_6 = 0; i_6 <= (start_1_4 - 1); i_6++) {
                if (this$_12.underlying[this$_12.startIndex + i_6] === "\n") {
                    line_4 = ((line_4 + 1) | 0);
                    column_4 = 0;
                }
                else {
                    column_4 = ((column_4 + 1) | 0);
                }
            }
        })(), new StringSegment(this$_12.startIndex + start_1_4, len_4, this$_12.underlying, line_4, column_4)))))) : ((clo_5 = toFail(printf("Index was out of range (GetSlice(%i, %i)).")), (clo_1_4 = clo_5(start_1_4), clo_1_4(finish_1_4))))))), state_26]])) : (new FSharpResult$2(1, [[singleton_1([(this$_13 = s_19, new Position(this$_13.startLine, this$_13.startColumn)), ofArray([new ErrorType(0, [("\'" + c_5) + "\'"]), new ErrorType(1, [("\'" + head) + "\'"])])]), state_26]]))))))))));
        if (matchValue_11.tag === 0) {
            const matchValue_1_3 = Result_MapError((tupledArg_17) => ParseError_sort(tupledArg_17[0], tupledArg_17[1]), p_12([matchValue_11.fields[0][2], matchValue_11.fields[0][1]]));
            return (matchValue_1_3.tag === 0) ? (new FSharpResult$2(0, [[matchValue_1_3.fields[0][0], matchValue_1_3.fields[0][1], matchValue_1_3.fields[0][2]]])) : (new FSharpResult$2(1, [matchValue_1_3.fields[0]]));
        }
        else {
            return new FSharpResult$2(1, [matchValue_11.fields[0]]);
        }
    })), (tupledArg_18) => {
        let this$_18, this$_17, start_1_6, finish_1_6, len_6, line_6, column_6, clo_7, clo_1_6;
        const s_27 = tupledArg_18[1];
        const matchValue_12 = Result_MapError((tupledArg_19) => ParseError_sort(tupledArg_19[0], tupledArg_19[1]), p_15([void 0, s_27]));
        if (matchValue_12.tag === 0) {
            const s$0027 = matchValue_12.fields[0][1];
            return new FSharpResult$2(0, [[(this$_18 = ((this$_17 = s_27, (start_1_6 = 0, (finish_1_6 = (((s$0027.startIndex - s_27.startIndex) - 1) | 0), (((start_1_6 >= 0) && (start_1_6 <= this$_17.length)) && (finish_1_6 < max(comparePrimitives, start_1_6, this$_17.length))) ? ((len_6 = (max(comparePrimitives, 0, (finish_1_6 - start_1_6) + 1) | 0), (line_6 = this$_17.startLine, (column_6 = this$_17.startColumn, ((() => {
                for (let i_10 = 0; i_10 <= (start_1_6 - 1); i_10++) {
                    if (this$_17.underlying[this$_17.startIndex + i_10] === "\n") {
                        line_6 = ((line_6 + 1) | 0);
                        column_6 = 0;
                    }
                    else {
                        column_6 = ((column_6 + 1) | 0);
                    }
                }
            })(), new StringSegment(this$_17.startIndex + start_1_6, len_6, this$_17.underlying, line_6, column_6)))))) : ((clo_7 = toFail(printf("Index was out of range (GetSlice(%i, %i)).")), (clo_1_6 = clo_7(start_1_6), clo_1_6(finish_1_6)))))))), substring(this$_18.underlying, this$_18.startIndex, this$_18.length)), s$0027, matchValue_12.fields[0][2]]]);
        }
        else {
            return new FSharpResult$2(1, [matchValue_12.fields[0]]);
        }
    })), (p3 = ((p_38 = ((p_35 = ((p_32 = ((cond_9 = (isDigit), (go_2 = ((i_15_mut, tupledArg_29_mut) => {
        let this$_28, this$_29, start_1_9, finish_1_9, len_9, line_9, column_9, clo_10, clo_1_9;
        go_2:
        while (true) {
            const i_15 = i_15_mut, tupledArg_29 = tupledArg_29_mut;
            const state_57 = tupledArg_29[0];
            const s_38 = tupledArg_29[1];
            let c_13;
            const this$_27 = s_38;
            const index_5 = i_15 | 0;
            c_13 = (((index_5 < 0) ? true : (index_5 >= this$_27.length)) ? "￿" : this$_27.underlying[this$_27.startIndex + index_5]);
            if (i_15 === 0) {
                if (cond_9(c_13)) {
                    i_15_mut = (i_15 + 1);
                    tupledArg_29_mut = [state_57, s_38];
                    continue go_2;
                }
                else {
                    return new FSharpResult$2(1, [[singleton_1([(this$_28 = s_38, new Position(this$_28.startLine, this$_28.startColumn)), singleton_1(new ErrorType(0, ["a char satisfying the condition"]))]), state_57]]);
                }
            }
            else if (cond_9(c_13)) {
                i_15_mut = (i_15 + 1);
                tupledArg_29_mut = [state_57, s_38];
                continue go_2;
            }
            else {
                return new FSharpResult$2(0, [[void 0, (this$_29 = s_38, (start_1_9 = (i_15 | 0), (finish_1_9 = ((this$_29.length - 1) | 0), (((start_1_9 >= 0) && (start_1_9 <= this$_29.length)) && (finish_1_9 < max(comparePrimitives, start_1_9, this$_29.length))) ? ((len_9 = (max(comparePrimitives, 0, (finish_1_9 - start_1_9) + 1) | 0), (line_9 = this$_29.startLine, (column_9 = this$_29.startColumn, ((() => {
                    for (let i_17 = 0; i_17 <= (start_1_9 - 1); i_17++) {
                        if (this$_29.underlying[this$_29.startIndex + i_17] === "\n") {
                            line_9 = ((line_9 + 1) | 0);
                            column_9 = 0;
                        }
                        else {
                            column_9 = ((column_9 + 1) | 0);
                        }
                    }
                })(), new StringSegment(this$_29.startIndex + start_1_9, len_9, this$_29.underlying, line_9, column_9)))))) : ((clo_10 = toFail(printf("Index was out of range (GetSlice(%i, %i)).")), (clo_1_9 = clo_10(start_1_9), clo_1_9(finish_1_9))))))), state_57]]);
            }
            break;
        }
    }), partialApply(1, go_2, [0])))), (tupledArg_30) => {
        let matchValue_21, tupledArg_1_1, matchValue_16, tupledArg_20, label_3, state_39, s_29, matchValue_14, this$_19, index_3, this$_20, c_9, _arg, this$_21, start_1_7, finish_1_7, len_7, line_7, column_7, clo_8, clo_1_7, this$_22, matchValue_1_4, s_35, matchValue_20, tupledArg_1_2, matchValue_19, tupledArg_22, label_5, state_45, s_32, matchValue_17, this$_23, index_4, this$_24, c_10, _arg_1, this$_25, start_1_8, finish_1_8, len_8, line_8, column_8, clo_9, clo_1_8, this$_26;
        const matchValue_23 = Result_MapError((tupledArg_31) => ParseError_sort(tupledArg_31[0], tupledArg_31[1]), (matchValue_21 = Result_MapError((tupledArg_27) => ParseError_sort(tupledArg_27[0], tupledArg_27[1]), (tupledArg_1_1 = [void 0, tupledArg_30[1]], (matchValue_16 = Result_MapError((tupledArg_21) => ParseError_sort(tupledArg_21[0], tupledArg_21[1]), (tupledArg_20 = [tupledArg_1_1[0], tupledArg_1_1[1]], (label_3 = "a char with condition", (state_39 = tupledArg_20[0], (s_29 = tupledArg_20[1], (matchValue_14 = ((this$_19 = s_29, (index_3 = 0, ((index_3 < 0) ? true : (index_3 >= this$_19.length)) ? "￿" : this$_19.underlying[this$_19.startIndex + index_3]))), (matchValue_14 === "￿") ? (new FSharpResult$2(1, [[singleton_1([(this$_20 = s_29, new Position(this$_20.startLine, this$_20.startColumn)), ofArray([new ErrorType(0, [label_3]), new ErrorType(1, ["EOF"])])]), state_39]])) : ((c_9 = matchValue_14, ((_arg = c_9, (_arg === "E") ? true : (_arg === "e"))) ? (new FSharpResult$2(0, [[c_9, (this$_21 = s_29, (start_1_7 = 1, (finish_1_7 = ((this$_21.length - 1) | 0), (((start_1_7 >= 0) && (start_1_7 <= this$_21.length)) && (finish_1_7 < max(comparePrimitives, start_1_7, this$_21.length))) ? ((len_7 = (max(comparePrimitives, 0, (finish_1_7 - start_1_7) + 1) | 0), (line_7 = this$_21.startLine, (column_7 = this$_21.startColumn, ((() => {
            for (let i_12 = 0; i_12 <= (start_1_7 - 1); i_12++) {
                if (this$_21.underlying[this$_21.startIndex + i_12] === "\n") {
                    line_7 = ((line_7 + 1) | 0);
                    column_7 = 0;
                }
                else {
                    column_7 = ((column_7 + 1) | 0);
                }
            }
        })(), new StringSegment(this$_21.startIndex + start_1_7, len_7, this$_21.underlying, line_7, column_7)))))) : ((clo_8 = toFail(printf("Index was out of range (GetSlice(%i, %i)).")), (clo_1_7 = clo_8(start_1_7), clo_1_7(finish_1_7))))))), state_39]])) : (new FSharpResult$2(1, [[singleton_1([(this$_22 = s_29, new Position(this$_22.startLine, this$_22.startColumn)), ofArray([new ErrorType(0, [label_3]), new ErrorType(1, [c_9])])]), state_39]])))))))))), (matchValue_16.tag === 0) ? (new FSharpResult$2(0, [[void 0, matchValue_16.fields[0][1], matchValue_16.fields[0][2]]])) : (new FSharpResult$2(1, [matchValue_16.fields[0]]))))), (matchValue_21.tag === 0) ? ((matchValue_1_4 = Result_MapError((tupledArg_28) => ParseError_sort(tupledArg_28[0], tupledArg_28[1]), (s_35 = matchValue_21.fields[0][1], (matchValue_20 = Result_MapError((tupledArg_25) => ParseError_sort(tupledArg_25[0], tupledArg_25[1]), (tupledArg_1_2 = [void 0, s_35], (matchValue_19 = Result_MapError((tupledArg_23) => ParseError_sort(tupledArg_23[0], tupledArg_23[1]), (tupledArg_22 = [tupledArg_1_2[0], tupledArg_1_2[1]], (label_5 = "a char with condition", (state_45 = tupledArg_22[0], (s_32 = tupledArg_22[1], (matchValue_17 = ((this$_23 = s_32, (index_4 = 0, ((index_4 < 0) ? true : (index_4 >= this$_23.length)) ? "￿" : this$_23.underlying[this$_23.startIndex + index_4]))), (matchValue_17 === "￿") ? (new FSharpResult$2(1, [[singleton_1([(this$_24 = s_32, new Position(this$_24.startLine, this$_24.startColumn)), ofArray([new ErrorType(0, [label_5]), new ErrorType(1, ["EOF"])])]), state_45]])) : ((c_10 = matchValue_17, ((_arg_1 = c_10, (_arg_1 === "+") ? true : (_arg_1 === "-"))) ? (new FSharpResult$2(0, [[c_10, (this$_25 = s_32, (start_1_8 = 1, (finish_1_8 = ((this$_25.length - 1) | 0), (((start_1_8 >= 0) && (start_1_8 <= this$_25.length)) && (finish_1_8 < max(comparePrimitives, start_1_8, this$_25.length))) ? ((len_8 = (max(comparePrimitives, 0, (finish_1_8 - start_1_8) + 1) | 0), (line_8 = this$_25.startLine, (column_8 = this$_25.startColumn, ((() => {
            for (let i_14 = 0; i_14 <= (start_1_8 - 1); i_14++) {
                if (this$_25.underlying[this$_25.startIndex + i_14] === "\n") {
                    line_8 = ((line_8 + 1) | 0);
                    column_8 = 0;
                }
                else {
                    column_8 = ((column_8 + 1) | 0);
                }
            }
        })(), new StringSegment(this$_25.startIndex + start_1_8, len_8, this$_25.underlying, line_8, column_8)))))) : ((clo_9 = toFail(printf("Index was out of range (GetSlice(%i, %i)).")), (clo_1_8 = clo_9(start_1_8), clo_1_8(finish_1_8))))))), state_45]])) : (new FSharpResult$2(1, [[singleton_1([(this$_26 = s_32, new Position(this$_26.startLine, this$_26.startColumn)), ofArray([new ErrorType(0, [label_5]), new ErrorType(1, [c_10])])]), state_45]])))))))))), (matchValue_19.tag === 0) ? (new FSharpResult$2(0, [[void 0, matchValue_19.fields[0][1], matchValue_19.fields[0][2]]])) : (new FSharpResult$2(1, [matchValue_19.fields[0]]))))), (matchValue_20.tag === 1) ? (new FSharpResult$2(0, [[void 0, s_35, matchValue_20.fields[0][1]]])) : (new FSharpResult$2(0, [[void 0, matchValue_20.fields[0][1], matchValue_20.fields[0][2]]]))))), (matchValue_1_4.tag === 0) ? (new FSharpResult$2(0, [[matchValue_1_4.fields[0][0], matchValue_1_4.fields[0][1], matchValue_1_4.fields[0][2]]])) : (new FSharpResult$2(1, [matchValue_1_4.fields[0]])))) : (new FSharpResult$2(1, [matchValue_21.fields[0]]))));
        if (matchValue_23.tag === 0) {
            const matchValue_1_5 = Result_MapError((tupledArg_32) => ParseError_sort(tupledArg_32[0], tupledArg_32[1]), p_32([matchValue_23.fields[0][2], matchValue_23.fields[0][1]]));
            return (matchValue_1_5.tag === 0) ? (new FSharpResult$2(0, [[matchValue_1_5.fields[0][0], matchValue_1_5.fields[0][1], matchValue_1_5.fields[0][2]]])) : (new FSharpResult$2(1, [matchValue_1_5.fields[0]]));
        }
        else {
            return new FSharpResult$2(1, [matchValue_23.fields[0]]);
        }
    })), (tupledArg_33) => {
        const s_42 = tupledArg_33[1];
        const matchValue_24 = Result_MapError((tupledArg_34) => ParseError_sort(tupledArg_34[0], tupledArg_34[1]), p_35([void 0, s_42]));
        return (matchValue_24.tag === 1) ? (new FSharpResult$2(0, [[void 0, s_42, matchValue_24.fields[0][1]]])) : (new FSharpResult$2(0, [[void 0, matchValue_24.fields[0][1], matchValue_24.fields[0][2]]]));
    })), (tupledArg_35) => {
        let this$_31, this$_30, start_1_10, finish_1_10, len_10, line_10, column_10, clo_11, clo_1_10;
        const s_44 = tupledArg_35[1];
        const matchValue_25 = Result_MapError((tupledArg_36) => ParseError_sort(tupledArg_36[0], tupledArg_36[1]), p_38([void 0, s_44]));
        if (matchValue_25.tag === 0) {
            const s$0027_1 = matchValue_25.fields[0][1];
            return new FSharpResult$2(0, [[(this$_31 = ((this$_30 = s_44, (start_1_10 = 0, (finish_1_10 = (((s$0027_1.startIndex - s_44.startIndex) - 1) | 0), (((start_1_10 >= 0) && (start_1_10 <= this$_30.length)) && (finish_1_10 < max(comparePrimitives, start_1_10, this$_30.length))) ? ((len_10 = (max(comparePrimitives, 0, (finish_1_10 - start_1_10) + 1) | 0), (line_10 = this$_30.startLine, (column_10 = this$_30.startColumn, ((() => {
                for (let i_18 = 0; i_18 <= (start_1_10 - 1); i_18++) {
                    if (this$_30.underlying[this$_30.startIndex + i_18] === "\n") {
                        line_10 = ((line_10 + 1) | 0);
                        column_10 = 0;
                    }
                    else {
                        column_10 = ((column_10 + 1) | 0);
                    }
                }
            })(), new StringSegment(this$_30.startIndex + start_1_10, len_10, this$_30.underlying, line_10, column_10)))))) : ((clo_11 = toFail(printf("Index was out of range (GetSlice(%i, %i)).")), (clo_1_10 = clo_11(start_1_10), clo_1_10(finish_1_10)))))))), substring(this$_31.underlying, this$_31.startIndex, this$_31.length)), s$0027_1, matchValue_25.fields[0][2]]]);
        }
        else {
            return new FSharpResult$2(1, [matchValue_25.fields[0]]);
        }
    })), (tupledArg_3_1) => {
        let tupledArg_2_1, matchValue_28, tupledArg_1_3, matchValue_27, x_24;
        const matchValue_29 = Result_MapError((tupledArg_42) => ParseError_sort(tupledArg_42[0], tupledArg_42[1]), p1_5([tupledArg_3_1[0], tupledArg_3_1[1]]));
        return (matchValue_29.tag === 0) ? Result_MapError((tupledArg_43) => ParseError_sort(tupledArg_43[0], tupledArg_43[1]), (tupledArg_2_1 = [matchValue_29.fields[0][2], matchValue_29.fields[0][1]], (matchValue_28 = Result_MapError((tupledArg_40) => ParseError_sort(tupledArg_40[0], tupledArg_40[1]), p2_4([tupledArg_2_1[0], tupledArg_2_1[1]])), (matchValue_28.tag === 0) ? Result_MapError((tupledArg_41) => ParseError_sort(tupledArg_41[0], tupledArg_41[1]), (tupledArg_1_3 = [matchValue_28.fields[0][2], matchValue_28.fields[0][1]], (matchValue_27 = Result_MapError((tupledArg_38) => ParseError_sort(tupledArg_38[0], tupledArg_38[1]), p3([tupledArg_1_3[0], tupledArg_1_3[1]])), (matchValue_27.tag === 0) ? Result_MapError((tupledArg_39) => ParseError_sort(tupledArg_39[0], tupledArg_39[1]), ((x_24 = ((matchValue_29.fields[0][0] + matchValue_28.fields[0][0]) + matchValue_27.fields[0][0]), (tupledArg_37) => (new FSharpResult$2(0, [[x_24, tupledArg_37[1], tupledArg_37[0]]]))))([matchValue_27.fields[0][2], matchValue_27.fields[0][1]])) : (new FSharpResult$2(1, [matchValue_27.fields[0]]))))) : (new FSharpResult$2(1, [matchValue_28.fields[0]]))))) : (new FSharpResult$2(1, [matchValue_29.fields[0]]));
    })))]);
    return (tupledArg_44) => {
        const s_51 = tupledArg_44[1];
        const go_3 = (state_1_19_mut, _arg_2_mut) => {
            let this$_33, this$_32;
            go_3:
            while (true) {
                const state_1_19 = state_1_19_mut, _arg_2 = _arg_2_mut;
                if (!isEmpty(_arg_2)) {
                    if (isEmpty(tail(_arg_2))) {
                        const matchValue_30 = Result_MapError((tupledArg_45) => ParseError_sort(tupledArg_45[0], tupledArg_45[1]), head_1(_arg_2)([state_1_19, s_51]));
                        if (matchValue_30.tag === 1) {
                            return new FSharpResult$2(1, [[singleton_1([(this$_33 = s_51, new Position(this$_33.startLine, this$_33.startColumn)), singleton_1(new ErrorType(0, ["float"]))]), matchValue_30.fields[0][1]]]);
                        }
                        else {
                            return matchValue_30;
                        }
                    }
                    else {
                        const matchValue_1_6 = Result_MapError((tupledArg_46) => ParseError_sort(tupledArg_46[0], tupledArg_46[1]), head_1(_arg_2)([state_1_19, s_51]));
                        if (matchValue_1_6.tag === 1) {
                            state_1_19_mut = matchValue_1_6.fields[0][1];
                            _arg_2_mut = tail(_arg_2);
                            continue go_3;
                        }
                        else {
                            return matchValue_1_6;
                        }
                    }
                }
                else {
                    return new FSharpResult$2(1, [[singleton_1([(this$_32 = s_51, new Position(this$_32.startLine, this$_32.startColumn)), singleton_1(new ErrorType(2, ["No parsers given"]))]), state_1_19]]);
                }
                break;
            }
        };
        return go_3(void 0, ps);
    };
})();

export const CharParsers_Internal_pIntLikeUnit = (() => {
    let p_15, p_12, p_8, p_30, p_27, p_23, p_45, p_42, p_38, p_52, p_48;
    let p_63;
    let p_60;
    const p1_10 = (tupledArg) => {
        const s_1 = tupledArg[1];
        const matchValue = Result_MapError((tupledArg_1) => ParseError_sort(tupledArg_1[0], tupledArg_1[1]), ((tupledArg_2) => {
            let this$_1, _arg, this$_2, start_1, finish_1, len, line, column, clo, clo_1, this$_3;
            const label_1 = "a char with condition";
            const state_4 = tupledArg_2[0];
            const s_3 = tupledArg_2[1];
            let matchValue_1;
            const this$ = s_3;
            const index = 0;
            matchValue_1 = (((index < 0) ? true : (index >= this$.length)) ? "￿" : this$.underlying[this$.startIndex + index]);
            if (matchValue_1 === "￿") {
                return new FSharpResult$2(1, [[singleton_1([(this$_1 = s_3, new Position(this$_1.startLine, this$_1.startColumn)), ofArray([new ErrorType(0, [label_1]), new ErrorType(1, ["EOF"])])]), state_4]]);
            }
            else {
                const c = matchValue_1;
                if ((_arg = c, (_arg === "+") ? true : (_arg === "-"))) {
                    return new FSharpResult$2(0, [[c, (this$_2 = s_3, (start_1 = 1, (finish_1 = ((this$_2.length - 1) | 0), (((start_1 >= 0) && (start_1 <= this$_2.length)) && (finish_1 < max(comparePrimitives, start_1, this$_2.length))) ? ((len = (max(comparePrimitives, 0, (finish_1 - start_1) + 1) | 0), (line = this$_2.startLine, (column = this$_2.startColumn, ((() => {
                        for (let i_1 = 0; i_1 <= (start_1 - 1); i_1++) {
                            if (this$_2.underlying[this$_2.startIndex + i_1] === "\n") {
                                line = ((line + 1) | 0);
                                column = 0;
                            }
                            else {
                                column = ((column + 1) | 0);
                            }
                        }
                    })(), new StringSegment(this$_2.startIndex + start_1, len, this$_2.underlying, line, column)))))) : ((clo = toFail(printf("Index was out of range (GetSlice(%i, %i)).")), (clo_1 = clo(start_1), clo_1(finish_1))))))), state_4]]);
                }
                else {
                    return new FSharpResult$2(1, [[singleton_1([(this$_3 = s_3, new Position(this$_3.startLine, this$_3.startColumn)), ofArray([new ErrorType(0, [label_1]), new ErrorType(1, [c])])]), state_4]]);
                }
            }
        })([void 0, s_1]));
        if (matchValue.tag === 1) {
            return new FSharpResult$2(0, [[void 0, s_1, matchValue.fields[0][1]]]);
        }
        else {
            return new FSharpResult$2(0, [[matchValue.fields[0][0], matchValue.fields[0][1], matchValue.fields[0][2]]]);
        }
    };
    let p2_6;
    const ps = ofArray([(p_15 = ((p_12 = ((p_8 = ((tupledArg_8) => {
        let this$_9, c_1, this$_10, start_1_3, finish_1_3, len_3, line_3, column_3, clo_4, clo_1_3, this$_11;
        const label_2 = "[0-9a-fA-F]";
        const state_19 = void 0;
        const s_14 = tupledArg_8[1];
        let matchValue_6;
        const this$_8 = s_14;
        const index_1 = 0;
        matchValue_6 = (((index_1 < 0) ? true : (index_1 >= this$_8.length)) ? "￿" : this$_8.underlying[this$_8.startIndex + index_1]);
        if (matchValue_6 === "￿") {
            return new FSharpResult$2(1, [[singleton_1([(this$_9 = s_14, new Position(this$_9.startLine, this$_9.startColumn)), ofArray([new ErrorType(0, [label_2]), new ErrorType(1, ["EOF"])])]), state_19]]);
        }
        else {
            const c_2 = matchValue_6;
            if ((c_1 = c_2, (isDigit(c_1) ? true : (("A" <= c_1) && (c_1 <= "F"))) ? true : (("a" <= c_1) && (c_1 <= "f")))) {
                return new FSharpResult$2(0, [[c_2, (this$_10 = s_14, (start_1_3 = 1, (finish_1_3 = ((this$_10.length - 1) | 0), (((start_1_3 >= 0) && (start_1_3 <= this$_10.length)) && (finish_1_3 < max(comparePrimitives, start_1_3, this$_10.length))) ? ((len_3 = (max(comparePrimitives, 0, (finish_1_3 - start_1_3) + 1) | 0), (line_3 = this$_10.startLine, (column_3 = this$_10.startColumn, ((() => {
                    for (let i_5 = 0; i_5 <= (start_1_3 - 1); i_5++) {
                        if (this$_10.underlying[this$_10.startIndex + i_5] === "\n") {
                            line_3 = ((line_3 + 1) | 0);
                            column_3 = 0;
                        }
                        else {
                            column_3 = ((column_3 + 1) | 0);
                        }
                    }
                })(), new StringSegment(this$_10.startIndex + start_1_3, len_3, this$_10.underlying, line_3, column_3)))))) : ((clo_4 = toFail(printf("Index was out of range (GetSlice(%i, %i)).")), (clo_1_3 = clo_4(start_1_3), clo_1_3(finish_1_3))))))), state_19]]);
            }
            else {
                return new FSharpResult$2(1, [[singleton_1([(this$_11 = s_14, new Position(this$_11.startLine, this$_11.startColumn)), ofArray([new ErrorType(0, [label_2]), new ErrorType(1, [c_2])])]), state_19]]);
            }
        }
    }), (tupledArg_9) => {
        const s_16 = tupledArg_9[1];
        const matchValue_8 = Result_MapError((tupledArg_10) => ParseError_sort(tupledArg_10[0], tupledArg_10[1]), p_8([tupledArg_9[0], s_16]));
        if (matchValue_8.tag === 0) {
            const sb = CharParsers_StringBuilder_$ctor();
            CharParsers_StringBuilder__Append_Z721C83C5(sb, matchValue_8.fields[0][0]);
            const go = (tupledArg_11_mut_1) => {
                go:
                while (true) {
                    const tupledArg_11 = tupledArg_11_mut_1;
                    const state_3_1 = tupledArg_11[0];
                    const s_2_1 = tupledArg_11[1];
                    const matchValue_1_2 = Result_MapError((tupledArg_12) => ParseError_sort(tupledArg_12[0], tupledArg_12[1]), p_8([state_3_1, s_2_1]));
                    if (matchValue_1_2.tag === 0) {
                        CharParsers_StringBuilder__Append_Z721C83C5(sb, matchValue_1_2.fields[0][0]);
                        tupledArg_11_mut_1 = [matchValue_1_2.fields[0][2], matchValue_1_2.fields[0][1]];
                        continue go;
                    }
                    else {
                        return new FSharpResult$2(0, [[toString(sb), s_2_1, state_3_1]]);
                    }
                    break;
                }
            };
            return go([matchValue_8.fields[0][2], matchValue_8.fields[0][1]]);
        }
        else {
            const state_1_3 = matchValue_8.fields[0][1];
            return new FSharpResult$2(1, [[matchValue_8.fields[0][0], state_1_3]]);
        }
    })), (tupledArg_13) => {
        let s_11, matchValue_5, tupledArg_3, str_1, state_8, s_5, length_2, this$_4, start_1_1, finish_1_1, len_1, line_1, column_1, clo_2, clo_1_1, this$_5, matchValue_1_1, tupledArg_4, str_3, state_11, s_8, length_4, this$_6, start_1_2, finish_1_2, len_2, line_2, column_2, clo_3, clo_1_2, this$_7;
        const matchValue_9 = Result_MapError((tupledArg_14) => ParseError_sort(tupledArg_14[0], tupledArg_14[1]), (s_11 = tupledArg_13[1], (matchValue_5 = Result_MapError((tupledArg_6) => ParseError_sort(tupledArg_6[0], tupledArg_6[1]), (tupledArg_3 = [void 0, s_11], (str_1 = "0x", (state_8 = tupledArg_3[0], (s_5 = tupledArg_3[1], StringSegmentModule_startsWith(str_1, s_5) ? (new FSharpResult$2(0, [[void 0, (length_2 = (str_1.length | 0), (this$_4 = s_5, (start_1_1 = (length_2 | 0), (finish_1_1 = ((this$_4.length - 1) | 0), (((start_1_1 >= 0) && (start_1_1 <= this$_4.length)) && (finish_1_1 < max(comparePrimitives, start_1_1, this$_4.length))) ? ((len_1 = (max(comparePrimitives, 0, (finish_1_1 - start_1_1) + 1) | 0), (line_1 = this$_4.startLine, (column_1 = this$_4.startColumn, ((() => {
            for (let i_2 = 0; i_2 <= (start_1_1 - 1); i_2++) {
                if (this$_4.underlying[this$_4.startIndex + i_2] === "\n") {
                    line_1 = ((line_1 + 1) | 0);
                    column_1 = 0;
                }
                else {
                    column_1 = ((column_1 + 1) | 0);
                }
            }
        })(), new StringSegment(this$_4.startIndex + start_1_1, len_1, this$_4.underlying, line_1, column_1)))))) : ((clo_2 = toFail(printf("Index was out of range (GetSlice(%i, %i)).")), (clo_1_1 = clo_2(start_1_1), clo_1_1(finish_1_1)))))))), state_8]])) : (new FSharpResult$2(1, [[singleton_1([(this$_5 = s_5, new Position(this$_5.startLine, this$_5.startColumn)), singleton_1(new ErrorType(0, [("\'" + str_1) + "\'"]))]), state_8]]))))))), (matchValue_5.tag === 1) ? ((matchValue_1_1 = Result_MapError((tupledArg_7) => ParseError_sort(tupledArg_7[0], tupledArg_7[1]), (tupledArg_4 = [matchValue_5.fields[0][1], s_11], (str_3 = "0X", (state_11 = tupledArg_4[0], (s_8 = tupledArg_4[1], StringSegmentModule_startsWith(str_3, s_8) ? (new FSharpResult$2(0, [[void 0, (length_4 = (str_3.length | 0), (this$_6 = s_8, (start_1_2 = (length_4 | 0), (finish_1_2 = ((this$_6.length - 1) | 0), (((start_1_2 >= 0) && (start_1_2 <= this$_6.length)) && (finish_1_2 < max(comparePrimitives, start_1_2, this$_6.length))) ? ((len_2 = (max(comparePrimitives, 0, (finish_1_2 - start_1_2) + 1) | 0), (line_2 = this$_6.startLine, (column_2 = this$_6.startColumn, ((() => {
            for (let i_3 = 0; i_3 <= (start_1_2 - 1); i_3++) {
                if (this$_6.underlying[this$_6.startIndex + i_3] === "\n") {
                    line_2 = ((line_2 + 1) | 0);
                    column_2 = 0;
                }
                else {
                    column_2 = ((column_2 + 1) | 0);
                }
            }
        })(), new StringSegment(this$_6.startIndex + start_1_2, len_2, this$_6.underlying, line_2, column_2)))))) : ((clo_3 = toFail(printf("Index was out of range (GetSlice(%i, %i)).")), (clo_1_2 = clo_3(start_1_2), clo_1_2(finish_1_2)))))))), state_11]])) : (new FSharpResult$2(1, [[singleton_1([(this$_7 = s_8, new Position(this$_7.startLine, this$_7.startColumn)), singleton_1(new ErrorType(0, [("\'" + str_3) + "\'"]))]), state_11]]))))))), (matchValue_1_1.tag === 1) ? (new FSharpResult$2(1, [[append_1(matchValue_5.fields[0][0], matchValue_1_1.fields[0][0]), matchValue_1_1.fields[0][1]]])) : matchValue_1_1)) : matchValue_5)));
        if (matchValue_9.tag === 0) {
            const matchValue_1_3 = Result_MapError((tupledArg_15) => ParseError_sort(tupledArg_15[0], tupledArg_15[1]), p_12([matchValue_9.fields[0][2], matchValue_9.fields[0][1]]));
            return (matchValue_1_3.tag === 0) ? (new FSharpResult$2(0, [[matchValue_1_3.fields[0][0], matchValue_1_3.fields[0][1], matchValue_1_3.fields[0][2]]])) : (new FSharpResult$2(1, [matchValue_1_3.fields[0]]));
        }
        else {
            return new FSharpResult$2(1, [matchValue_9.fields[0]]);
        }
    })), (tupledArg_16) => {
        const matchValue_10 = Result_MapError((tupledArg_17) => ParseError_sort(tupledArg_17[0], tupledArg_17[1]), p_15([void 0, tupledArg_16[1]]));
        return (matchValue_10.tag === 0) ? (new FSharpResult$2(0, [[[16, matchValue_10.fields[0][0]], matchValue_10.fields[0][1], matchValue_10.fields[0][2]]])) : (new FSharpResult$2(1, [matchValue_10.fields[0]]));
    }), (p_30 = ((p_27 = ((p_23 = ((tupledArg_23) => {
        let this$_17, c_6, this$_18, start_1_6, finish_1_6, len_6, line_6, column_6, clo_7, clo_1_6, this$_19;
        const label_3 = "[0-7]";
        const state_45 = void 0;
        const s_31 = tupledArg_23[1];
        let matchValue_14;
        const this$_16 = s_31;
        const index_2 = 0;
        matchValue_14 = (((index_2 < 0) ? true : (index_2 >= this$_16.length)) ? "￿" : this$_16.underlying[this$_16.startIndex + index_2]);
        if (matchValue_14 === "￿") {
            return new FSharpResult$2(1, [[singleton_1([(this$_17 = s_31, new Position(this$_17.startLine, this$_17.startColumn)), ofArray([new ErrorType(0, [label_3]), new ErrorType(1, ["EOF"])])]), state_45]]);
        }
        else {
            const c_7 = matchValue_14;
            if ((c_6 = c_7, ("0" <= c_6) && (c_6 <= "7"))) {
                return new FSharpResult$2(0, [[c_7, (this$_18 = s_31, (start_1_6 = 1, (finish_1_6 = ((this$_18.length - 1) | 0), (((start_1_6 >= 0) && (start_1_6 <= this$_18.length)) && (finish_1_6 < max(comparePrimitives, start_1_6, this$_18.length))) ? ((len_6 = (max(comparePrimitives, 0, (finish_1_6 - start_1_6) + 1) | 0), (line_6 = this$_18.startLine, (column_6 = this$_18.startColumn, ((() => {
                    for (let i_9 = 0; i_9 <= (start_1_6 - 1); i_9++) {
                        if (this$_18.underlying[this$_18.startIndex + i_9] === "\n") {
                            line_6 = ((line_6 + 1) | 0);
                            column_6 = 0;
                        }
                        else {
                            column_6 = ((column_6 + 1) | 0);
                        }
                    }
                })(), new StringSegment(this$_18.startIndex + start_1_6, len_6, this$_18.underlying, line_6, column_6)))))) : ((clo_7 = toFail(printf("Index was out of range (GetSlice(%i, %i)).")), (clo_1_6 = clo_7(start_1_6), clo_1_6(finish_1_6))))))), state_45]]);
            }
            else {
                return new FSharpResult$2(1, [[singleton_1([(this$_19 = s_31, new Position(this$_19.startLine, this$_19.startColumn)), ofArray([new ErrorType(0, [label_3]), new ErrorType(1, [c_7])])]), state_45]]);
            }
        }
    }), (tupledArg_24) => {
        const s_33 = tupledArg_24[1];
        const matchValue_16 = Result_MapError((tupledArg_25) => ParseError_sort(tupledArg_25[0], tupledArg_25[1]), p_23([tupledArg_24[0], s_33]));
        if (matchValue_16.tag === 0) {
            const sb_3 = CharParsers_StringBuilder_$ctor();
            CharParsers_StringBuilder__Append_Z721C83C5(sb_3, matchValue_16.fields[0][0]);
            const go_1 = (tupledArg_26_mut) => {
                go_1:
                while (true) {
                    const tupledArg_26 = tupledArg_26_mut;
                    const state_3_2 = tupledArg_26[0];
                    const s_2_3 = tupledArg_26[1];
                    const matchValue_1_5 = Result_MapError((tupledArg_27) => ParseError_sort(tupledArg_27[0], tupledArg_27[1]), p_23([state_3_2, s_2_3]));
                    if (matchValue_1_5.tag === 0) {
                        CharParsers_StringBuilder__Append_Z721C83C5(sb_3, matchValue_1_5.fields[0][0]);
                        tupledArg_26_mut = [matchValue_1_5.fields[0][2], matchValue_1_5.fields[0][1]];
                        continue go_1;
                    }
                    else {
                        return new FSharpResult$2(0, [[toString(sb_3), s_2_3, state_3_2]]);
                    }
                    break;
                }
            };
            return go_1([matchValue_16.fields[0][2], matchValue_16.fields[0][1]]);
        }
        else {
            const state_1_7 = matchValue_16.fields[0][1];
            return new FSharpResult$2(1, [[matchValue_16.fields[0][0], state_1_7]]);
        }
    })), (tupledArg_28) => {
        let s_28, matchValue_13, tupledArg_18, str_5, state_34, s_22, length_8, this$_12, start_1_4, finish_1_4, len_4, line_4, column_4, clo_5, clo_1_4, this$_13, matchValue_1_4, tupledArg_19, str_7, state_37, s_25, length_10, this$_14, start_1_5, finish_1_5, len_5, line_5, column_5, clo_6, clo_1_5, this$_15;
        const matchValue_17 = Result_MapError((tupledArg_29) => ParseError_sort(tupledArg_29[0], tupledArg_29[1]), (s_28 = tupledArg_28[1], (matchValue_13 = Result_MapError((tupledArg_21) => ParseError_sort(tupledArg_21[0], tupledArg_21[1]), (tupledArg_18 = [void 0, s_28], (str_5 = "0o", (state_34 = tupledArg_18[0], (s_22 = tupledArg_18[1], StringSegmentModule_startsWith(str_5, s_22) ? (new FSharpResult$2(0, [[void 0, (length_8 = (str_5.length | 0), (this$_12 = s_22, (start_1_4 = (length_8 | 0), (finish_1_4 = ((this$_12.length - 1) | 0), (((start_1_4 >= 0) && (start_1_4 <= this$_12.length)) && (finish_1_4 < max(comparePrimitives, start_1_4, this$_12.length))) ? ((len_4 = (max(comparePrimitives, 0, (finish_1_4 - start_1_4) + 1) | 0), (line_4 = this$_12.startLine, (column_4 = this$_12.startColumn, ((() => {
            for (let i_6 = 0; i_6 <= (start_1_4 - 1); i_6++) {
                if (this$_12.underlying[this$_12.startIndex + i_6] === "\n") {
                    line_4 = ((line_4 + 1) | 0);
                    column_4 = 0;
                }
                else {
                    column_4 = ((column_4 + 1) | 0);
                }
            }
        })(), new StringSegment(this$_12.startIndex + start_1_4, len_4, this$_12.underlying, line_4, column_4)))))) : ((clo_5 = toFail(printf("Index was out of range (GetSlice(%i, %i)).")), (clo_1_4 = clo_5(start_1_4), clo_1_4(finish_1_4)))))))), state_34]])) : (new FSharpResult$2(1, [[singleton_1([(this$_13 = s_22, new Position(this$_13.startLine, this$_13.startColumn)), singleton_1(new ErrorType(0, [("\'" + str_5) + "\'"]))]), state_34]]))))))), (matchValue_13.tag === 1) ? ((matchValue_1_4 = Result_MapError((tupledArg_22) => ParseError_sort(tupledArg_22[0], tupledArg_22[1]), (tupledArg_19 = [matchValue_13.fields[0][1], s_28], (str_7 = "0O", (state_37 = tupledArg_19[0], (s_25 = tupledArg_19[1], StringSegmentModule_startsWith(str_7, s_25) ? (new FSharpResult$2(0, [[void 0, (length_10 = (str_7.length | 0), (this$_14 = s_25, (start_1_5 = (length_10 | 0), (finish_1_5 = ((this$_14.length - 1) | 0), (((start_1_5 >= 0) && (start_1_5 <= this$_14.length)) && (finish_1_5 < max(comparePrimitives, start_1_5, this$_14.length))) ? ((len_5 = (max(comparePrimitives, 0, (finish_1_5 - start_1_5) + 1) | 0), (line_5 = this$_14.startLine, (column_5 = this$_14.startColumn, ((() => {
            for (let i_7 = 0; i_7 <= (start_1_5 - 1); i_7++) {
                if (this$_14.underlying[this$_14.startIndex + i_7] === "\n") {
                    line_5 = ((line_5 + 1) | 0);
                    column_5 = 0;
                }
                else {
                    column_5 = ((column_5 + 1) | 0);
                }
            }
        })(), new StringSegment(this$_14.startIndex + start_1_5, len_5, this$_14.underlying, line_5, column_5)))))) : ((clo_6 = toFail(printf("Index was out of range (GetSlice(%i, %i)).")), (clo_1_5 = clo_6(start_1_5), clo_1_5(finish_1_5)))))))), state_37]])) : (new FSharpResult$2(1, [[singleton_1([(this$_15 = s_25, new Position(this$_15.startLine, this$_15.startColumn)), singleton_1(new ErrorType(0, [("\'" + str_7) + "\'"]))]), state_37]]))))))), (matchValue_1_4.tag === 1) ? (new FSharpResult$2(1, [[append_1(matchValue_13.fields[0][0], matchValue_1_4.fields[0][0]), matchValue_1_4.fields[0][1]]])) : matchValue_1_4)) : matchValue_13)));
        if (matchValue_17.tag === 0) {
            const matchValue_1_6 = Result_MapError((tupledArg_30) => ParseError_sort(tupledArg_30[0], tupledArg_30[1]), p_27([matchValue_17.fields[0][2], matchValue_17.fields[0][1]]));
            return (matchValue_1_6.tag === 0) ? (new FSharpResult$2(0, [[matchValue_1_6.fields[0][0], matchValue_1_6.fields[0][1], matchValue_1_6.fields[0][2]]])) : (new FSharpResult$2(1, [matchValue_1_6.fields[0]]));
        }
        else {
            return new FSharpResult$2(1, [matchValue_17.fields[0]]);
        }
    })), (tupledArg_31) => {
        const matchValue_18 = Result_MapError((tupledArg_32) => ParseError_sort(tupledArg_32[0], tupledArg_32[1]), p_30([void 0, tupledArg_31[1]]));
        return (matchValue_18.tag === 0) ? (new FSharpResult$2(0, [[[8, matchValue_18.fields[0][0]], matchValue_18.fields[0][1], matchValue_18.fields[0][2]]])) : (new FSharpResult$2(1, [matchValue_18.fields[0]]));
    }), (p_45 = ((p_42 = ((p_38 = ((tupledArg_38) => {
        let this$_25, _arg_1, this$_26, start_1_9, finish_1_9, len_9, line_9, column_9, clo_10, clo_1_9, this$_27;
        const label_5 = "a char with condition";
        const state_70 = tupledArg_38[0];
        const s_47 = tupledArg_38[1];
        let matchValue_22;
        const this$_24 = s_47;
        const index_3 = 0;
        matchValue_22 = (((index_3 < 0) ? true : (index_3 >= this$_24.length)) ? "￿" : this$_24.underlying[this$_24.startIndex + index_3]);
        if (matchValue_22 === "￿") {
            return new FSharpResult$2(1, [[singleton_1([(this$_25 = s_47, new Position(this$_25.startLine, this$_25.startColumn)), ofArray([new ErrorType(0, [label_5]), new ErrorType(1, ["EOF"])])]), state_70]]);
        }
        else {
            const c_11 = matchValue_22;
            if ((_arg_1 = c_11, (_arg_1 === "0") ? true : (_arg_1 === "1"))) {
                return new FSharpResult$2(0, [[c_11, (this$_26 = s_47, (start_1_9 = 1, (finish_1_9 = ((this$_26.length - 1) | 0), (((start_1_9 >= 0) && (start_1_9 <= this$_26.length)) && (finish_1_9 < max(comparePrimitives, start_1_9, this$_26.length))) ? ((len_9 = (max(comparePrimitives, 0, (finish_1_9 - start_1_9) + 1) | 0), (line_9 = this$_26.startLine, (column_9 = this$_26.startColumn, ((() => {
                    for (let i_13 = 0; i_13 <= (start_1_9 - 1); i_13++) {
                        if (this$_26.underlying[this$_26.startIndex + i_13] === "\n") {
                            line_9 = ((line_9 + 1) | 0);
                            column_9 = 0;
                        }
                        else {
                            column_9 = ((column_9 + 1) | 0);
                        }
                    }
                })(), new StringSegment(this$_26.startIndex + start_1_9, len_9, this$_26.underlying, line_9, column_9)))))) : ((clo_10 = toFail(printf("Index was out of range (GetSlice(%i, %i)).")), (clo_1_9 = clo_10(start_1_9), clo_1_9(finish_1_9))))))), state_70]]);
            }
            else {
                return new FSharpResult$2(1, [[singleton_1([(this$_27 = s_47, new Position(this$_27.startLine, this$_27.startColumn)), ofArray([new ErrorType(0, [label_5]), new ErrorType(1, [c_11])])]), state_70]]);
            }
        }
    }), (tupledArg_39) => {
        const s_49 = tupledArg_39[1];
        const matchValue_24 = Result_MapError((tupledArg_40) => ParseError_sort(tupledArg_40[0], tupledArg_40[1]), p_38([tupledArg_39[0], s_49]));
        if (matchValue_24.tag === 0) {
            const sb_6 = CharParsers_StringBuilder_$ctor();
            CharParsers_StringBuilder__Append_Z721C83C5(sb_6, matchValue_24.fields[0][0]);
            const go_2 = (tupledArg_41_mut) => {
                go_2:
                while (true) {
                    const tupledArg_41 = tupledArg_41_mut;
                    const state_3_3 = tupledArg_41[0];
                    const s_2_5 = tupledArg_41[1];
                    const matchValue_1_8 = Result_MapError((tupledArg_42) => ParseError_sort(tupledArg_42[0], tupledArg_42[1]), p_38([state_3_3, s_2_5]));
                    if (matchValue_1_8.tag === 0) {
                        CharParsers_StringBuilder__Append_Z721C83C5(sb_6, matchValue_1_8.fields[0][0]);
                        tupledArg_41_mut = [matchValue_1_8.fields[0][2], matchValue_1_8.fields[0][1]];
                        continue go_2;
                    }
                    else {
                        return new FSharpResult$2(0, [[toString(sb_6), s_2_5, state_3_3]]);
                    }
                    break;
                }
            };
            return go_2([matchValue_24.fields[0][2], matchValue_24.fields[0][1]]);
        }
        else {
            const state_1_11 = matchValue_24.fields[0][1];
            return new FSharpResult$2(1, [[matchValue_24.fields[0][0], state_1_11]]);
        }
    })), (tupledArg_43) => {
        let s_45, matchValue_21, tupledArg_33, str_9, state_60, s_39, length_14, this$_20, start_1_7, finish_1_7, len_7, line_7, column_7, clo_8, clo_1_7, this$_21, matchValue_1_7, tupledArg_34, str_11, state_63, s_42, length_16, this$_22, start_1_8, finish_1_8, len_8, line_8, column_8, clo_9, clo_1_8, this$_23;
        const matchValue_25 = Result_MapError((tupledArg_44) => ParseError_sort(tupledArg_44[0], tupledArg_44[1]), (s_45 = tupledArg_43[1], (matchValue_21 = Result_MapError((tupledArg_36) => ParseError_sort(tupledArg_36[0], tupledArg_36[1]), (tupledArg_33 = [void 0, s_45], (str_9 = "0b", (state_60 = tupledArg_33[0], (s_39 = tupledArg_33[1], StringSegmentModule_startsWith(str_9, s_39) ? (new FSharpResult$2(0, [[void 0, (length_14 = (str_9.length | 0), (this$_20 = s_39, (start_1_7 = (length_14 | 0), (finish_1_7 = ((this$_20.length - 1) | 0), (((start_1_7 >= 0) && (start_1_7 <= this$_20.length)) && (finish_1_7 < max(comparePrimitives, start_1_7, this$_20.length))) ? ((len_7 = (max(comparePrimitives, 0, (finish_1_7 - start_1_7) + 1) | 0), (line_7 = this$_20.startLine, (column_7 = this$_20.startColumn, ((() => {
            for (let i_10 = 0; i_10 <= (start_1_7 - 1); i_10++) {
                if (this$_20.underlying[this$_20.startIndex + i_10] === "\n") {
                    line_7 = ((line_7 + 1) | 0);
                    column_7 = 0;
                }
                else {
                    column_7 = ((column_7 + 1) | 0);
                }
            }
        })(), new StringSegment(this$_20.startIndex + start_1_7, len_7, this$_20.underlying, line_7, column_7)))))) : ((clo_8 = toFail(printf("Index was out of range (GetSlice(%i, %i)).")), (clo_1_7 = clo_8(start_1_7), clo_1_7(finish_1_7)))))))), state_60]])) : (new FSharpResult$2(1, [[singleton_1([(this$_21 = s_39, new Position(this$_21.startLine, this$_21.startColumn)), singleton_1(new ErrorType(0, [("\'" + str_9) + "\'"]))]), state_60]]))))))), (matchValue_21.tag === 1) ? ((matchValue_1_7 = Result_MapError((tupledArg_37) => ParseError_sort(tupledArg_37[0], tupledArg_37[1]), (tupledArg_34 = [matchValue_21.fields[0][1], s_45], (str_11 = "0B", (state_63 = tupledArg_34[0], (s_42 = tupledArg_34[1], StringSegmentModule_startsWith(str_11, s_42) ? (new FSharpResult$2(0, [[void 0, (length_16 = (str_11.length | 0), (this$_22 = s_42, (start_1_8 = (length_16 | 0), (finish_1_8 = ((this$_22.length - 1) | 0), (((start_1_8 >= 0) && (start_1_8 <= this$_22.length)) && (finish_1_8 < max(comparePrimitives, start_1_8, this$_22.length))) ? ((len_8 = (max(comparePrimitives, 0, (finish_1_8 - start_1_8) + 1) | 0), (line_8 = this$_22.startLine, (column_8 = this$_22.startColumn, ((() => {
            for (let i_11 = 0; i_11 <= (start_1_8 - 1); i_11++) {
                if (this$_22.underlying[this$_22.startIndex + i_11] === "\n") {
                    line_8 = ((line_8 + 1) | 0);
                    column_8 = 0;
                }
                else {
                    column_8 = ((column_8 + 1) | 0);
                }
            }
        })(), new StringSegment(this$_22.startIndex + start_1_8, len_8, this$_22.underlying, line_8, column_8)))))) : ((clo_9 = toFail(printf("Index was out of range (GetSlice(%i, %i)).")), (clo_1_8 = clo_9(start_1_8), clo_1_8(finish_1_8)))))))), state_63]])) : (new FSharpResult$2(1, [[singleton_1([(this$_23 = s_42, new Position(this$_23.startLine, this$_23.startColumn)), singleton_1(new ErrorType(0, [("\'" + str_11) + "\'"]))]), state_63]]))))))), (matchValue_1_7.tag === 1) ? (new FSharpResult$2(1, [[append_1(matchValue_21.fields[0][0], matchValue_1_7.fields[0][0]), matchValue_1_7.fields[0][1]]])) : matchValue_1_7)) : matchValue_21)));
        if (matchValue_25.tag === 0) {
            const matchValue_1_9 = Result_MapError((tupledArg_45) => ParseError_sort(tupledArg_45[0], tupledArg_45[1]), p_42([matchValue_25.fields[0][2], matchValue_25.fields[0][1]]));
            return (matchValue_1_9.tag === 0) ? (new FSharpResult$2(0, [[matchValue_1_9.fields[0][0], matchValue_1_9.fields[0][1], matchValue_1_9.fields[0][2]]])) : (new FSharpResult$2(1, [matchValue_1_9.fields[0]]));
        }
        else {
            return new FSharpResult$2(1, [matchValue_25.fields[0]]);
        }
    })), (tupledArg_46) => {
        const matchValue_26 = Result_MapError((tupledArg_47) => ParseError_sort(tupledArg_47[0], tupledArg_47[1]), p_45([void 0, tupledArg_46[1]]));
        return (matchValue_26.tag === 0) ? (new FSharpResult$2(0, [[[2, matchValue_26.fields[0][0]], matchValue_26.fields[0][1], matchValue_26.fields[0][2]]])) : (new FSharpResult$2(1, [matchValue_26.fields[0]]));
    }), (p_52 = ((p_48 = ((tupledArg_48) => {
        let this$_29, this$_30, start_1_10, finish_1_10, len_10, line_10, column_10, clo_11, clo_1_10, this$_31;
        const label_6 = "[0-9]";
        const state_86 = void 0;
        const s_56 = tupledArg_48[1];
        let matchValue_27;
        const this$_28 = s_56;
        const index_4 = 0;
        matchValue_27 = (((index_4 < 0) ? true : (index_4 >= this$_28.length)) ? "￿" : this$_28.underlying[this$_28.startIndex + index_4]);
        if (matchValue_27 === "￿") {
            return new FSharpResult$2(1, [[singleton_1([(this$_29 = s_56, new Position(this$_29.startLine, this$_29.startColumn)), ofArray([new ErrorType(0, [label_6]), new ErrorType(1, ["EOF"])])]), state_86]]);
        }
        else {
            const c_15 = matchValue_27;
            if (isDigit(c_15)) {
                return new FSharpResult$2(0, [[c_15, (this$_30 = s_56, (start_1_10 = 1, (finish_1_10 = ((this$_30.length - 1) | 0), (((start_1_10 >= 0) && (start_1_10 <= this$_30.length)) && (finish_1_10 < max(comparePrimitives, start_1_10, this$_30.length))) ? ((len_10 = (max(comparePrimitives, 0, (finish_1_10 - start_1_10) + 1) | 0), (line_10 = this$_30.startLine, (column_10 = this$_30.startColumn, ((() => {
                    for (let i_15 = 0; i_15 <= (start_1_10 - 1); i_15++) {
                        if (this$_30.underlying[this$_30.startIndex + i_15] === "\n") {
                            line_10 = ((line_10 + 1) | 0);
                            column_10 = 0;
                        }
                        else {
                            column_10 = ((column_10 + 1) | 0);
                        }
                    }
                })(), new StringSegment(this$_30.startIndex + start_1_10, len_10, this$_30.underlying, line_10, column_10)))))) : ((clo_11 = toFail(printf("Index was out of range (GetSlice(%i, %i)).")), (clo_1_10 = clo_11(start_1_10), clo_1_10(finish_1_10))))))), state_86]]);
            }
            else {
                return new FSharpResult$2(1, [[singleton_1([(this$_31 = s_56, new Position(this$_31.startLine, this$_31.startColumn)), ofArray([new ErrorType(0, [label_6]), new ErrorType(1, [c_15])])]), state_86]]);
            }
        }
    }), (tupledArg_49) => {
        const s_58 = tupledArg_49[1];
        const matchValue_29 = Result_MapError((tupledArg_50) => ParseError_sort(tupledArg_50[0], tupledArg_50[1]), p_48([tupledArg_49[0], s_58]));
        if (matchValue_29.tag === 0) {
            const sb_9 = CharParsers_StringBuilder_$ctor();
            CharParsers_StringBuilder__Append_Z721C83C5(sb_9, matchValue_29.fields[0][0]);
            const go_3 = (tupledArg_51_mut) => {
                go_3:
                while (true) {
                    const tupledArg_51 = tupledArg_51_mut;
                    const state_3_4 = tupledArg_51[0];
                    const s_2_7 = tupledArg_51[1];
                    const matchValue_1_10 = Result_MapError((tupledArg_52) => ParseError_sort(tupledArg_52[0], tupledArg_52[1]), p_48([state_3_4, s_2_7]));
                    if (matchValue_1_10.tag === 0) {
                        CharParsers_StringBuilder__Append_Z721C83C5(sb_9, matchValue_1_10.fields[0][0]);
                        tupledArg_51_mut = [matchValue_1_10.fields[0][2], matchValue_1_10.fields[0][1]];
                        continue go_3;
                    }
                    else {
                        return new FSharpResult$2(0, [[toString(sb_9), s_2_7, state_3_4]]);
                    }
                    break;
                }
            };
            return go_3([matchValue_29.fields[0][2], matchValue_29.fields[0][1]]);
        }
        else {
            const state_1_14 = matchValue_29.fields[0][1];
            return new FSharpResult$2(1, [[matchValue_29.fields[0][0], state_1_14]]);
        }
    })), (tupledArg_53) => {
        const matchValue_30 = Result_MapError((tupledArg_54) => ParseError_sort(tupledArg_54[0], tupledArg_54[1]), p_52([void 0, tupledArg_53[1]]));
        return (matchValue_30.tag === 0) ? (new FSharpResult$2(0, [[[10, matchValue_30.fields[0][0]], matchValue_30.fields[0][1], matchValue_30.fields[0][2]]])) : (new FSharpResult$2(1, [matchValue_30.fields[0]]));
    })]);
    p2_6 = ((tupledArg_55) => {
        const s_62 = tupledArg_55[1];
        const go_4 = (state_1_16_mut, errorsAcc_mut, _arg_2_mut) => {
            let this$_32;
            go_4:
            while (true) {
                const state_1_16 = state_1_16_mut, errorsAcc = errorsAcc_mut, _arg_2 = _arg_2_mut;
                if (!isEmpty(_arg_2)) {
                    if (isEmpty(tail(_arg_2))) {
                        const matchValue_31 = Result_MapError((tupledArg_56) => ParseError_sort(tupledArg_56[0], tupledArg_56[1]), head_1(_arg_2)([state_1_16, s_62]));
                        if (matchValue_31.tag === 1) {
                            return new FSharpResult$2(1, [[append_1(errorsAcc, matchValue_31.fields[0][0]), matchValue_31.fields[0][1]]]);
                        }
                        else {
                            return matchValue_31;
                        }
                    }
                    else {
                        const matchValue_1_11 = Result_MapError((tupledArg_57) => ParseError_sort(tupledArg_57[0], tupledArg_57[1]), head_1(_arg_2)([state_1_16, s_62]));
                        if (matchValue_1_11.tag === 1) {
                            state_1_16_mut = matchValue_1_11.fields[0][1];
                            errorsAcc_mut = append_1(matchValue_1_11.fields[0][0], errorsAcc);
                            _arg_2_mut = tail(_arg_2);
                            continue go_4;
                        }
                        else {
                            return matchValue_1_11;
                        }
                    }
                }
                else {
                    return new FSharpResult$2(1, [[singleton_1([(this$_32 = s_62, new Position(this$_32.startLine, this$_32.startColumn)), singleton_1(new ErrorType(2, ["No parsers given"]))]), state_1_16]]);
                }
                break;
            }
        };
        return go_4(void 0, empty_1(), ps);
    });
    p_60 = ((tupledArg_58) => {
        const matchValue_32 = Result_MapError((tupledArg_59) => ParseError_sort(tupledArg_59[0], tupledArg_59[1]), p1_10([tupledArg_58[0], tupledArg_58[1]]));
        if (matchValue_32.tag === 0) {
            const matchValue_1_12 = Result_MapError((tupledArg_60) => ParseError_sort(tupledArg_60[0], tupledArg_60[1]), p2_6([matchValue_32.fields[0][2], matchValue_32.fields[0][1]]));
            return (matchValue_1_12.tag === 0) ? (new FSharpResult$2(0, [[[matchValue_32.fields[0][0], matchValue_1_12.fields[0][0]], matchValue_1_12.fields[0][1], matchValue_1_12.fields[0][2]]])) : (new FSharpResult$2(1, [matchValue_1_12.fields[0]]));
        }
        else {
            return new FSharpResult$2(1, [matchValue_32.fields[0]]);
        }
    });
    p_63 = ((tupledArg_61) => {
        let _arg_3;
        const matchValue_33 = Result_MapError((tupledArg_62) => ParseError_sort(tupledArg_62[0], tupledArg_62[1]), p_60([void 0, tupledArg_61[1]]));
        return (matchValue_33.tag === 0) ? (new FSharpResult$2(0, [[(_arg_3 = matchValue_33.fields[0][0], (_arg_3[0] != null) ? ((_arg_3[0] === "+") ? [true, _arg_3[1][0], _arg_3[1][1]] : [false, _arg_3[1][0], _arg_3[1][1]]) : [true, _arg_3[1][0], _arg_3[1][1]]), matchValue_33.fields[0][1], matchValue_33.fields[0][2]]])) : (new FSharpResult$2(1, [matchValue_33.fields[0]]));
    });
    return (tupledArg_63) => {
        let this$_33;
        const s_70 = tupledArg_63[1];
        const matchValue_34 = Result_MapError((tupledArg_64) => ParseError_sort(tupledArg_64[0], tupledArg_64[1]), p_63([void 0, s_70]));
        return (matchValue_34.tag === 1) ? (new FSharpResult$2(1, [[singleton_1([(this$_33 = s_70, new Position(this$_33.startLine, this$_33.startColumn)), singleton_1(new ErrorType(0, ["integer"]))]), matchValue_34.fields[0][1]]])) : matchValue_34;
    };
})();

export const CharParsers_Internal_pUIntLikeUnit = (() => {
    let p_12, p_9, p_5, p_27, p_24, p_20, p_42, p_39, p_35, p_49, p_45;
    const ps = ofArray([(p_12 = ((p_9 = ((p_5 = ((tupledArg_5) => {
        let this$_5, c, this$_6, start_1_2, finish_1_2, len_2, line_2, column_2, clo_3, clo_1_2, this$_7;
        const label = "[0-9a-fA-F]";
        const state_12 = void 0;
        const s_10 = tupledArg_5[1];
        let matchValue_3;
        const this$_4 = s_10;
        const index = 0;
        matchValue_3 = (((index < 0) ? true : (index >= this$_4.length)) ? "￿" : this$_4.underlying[this$_4.startIndex + index]);
        if (matchValue_3 === "￿") {
            return new FSharpResult$2(1, [[singleton_1([(this$_5 = s_10, new Position(this$_5.startLine, this$_5.startColumn)), ofArray([new ErrorType(0, [label]), new ErrorType(1, ["EOF"])])]), state_12]]);
        }
        else {
            const c_1 = matchValue_3;
            if ((c = c_1, (isDigit(c) ? true : (("A" <= c) && (c <= "F"))) ? true : (("a" <= c) && (c <= "f")))) {
                return new FSharpResult$2(0, [[c_1, (this$_6 = s_10, (start_1_2 = 1, (finish_1_2 = ((this$_6.length - 1) | 0), (((start_1_2 >= 0) && (start_1_2 <= this$_6.length)) && (finish_1_2 < max(comparePrimitives, start_1_2, this$_6.length))) ? ((len_2 = (max(comparePrimitives, 0, (finish_1_2 - start_1_2) + 1) | 0), (line_2 = this$_6.startLine, (column_2 = this$_6.startColumn, ((() => {
                    for (let i_3 = 0; i_3 <= (start_1_2 - 1); i_3++) {
                        if (this$_6.underlying[this$_6.startIndex + i_3] === "\n") {
                            line_2 = ((line_2 + 1) | 0);
                            column_2 = 0;
                        }
                        else {
                            column_2 = ((column_2 + 1) | 0);
                        }
                    }
                })(), new StringSegment(this$_6.startIndex + start_1_2, len_2, this$_6.underlying, line_2, column_2)))))) : ((clo_3 = toFail(printf("Index was out of range (GetSlice(%i, %i)).")), (clo_1_2 = clo_3(start_1_2), clo_1_2(finish_1_2))))))), state_12]]);
            }
            else {
                return new FSharpResult$2(1, [[singleton_1([(this$_7 = s_10, new Position(this$_7.startLine, this$_7.startColumn)), ofArray([new ErrorType(0, [label]), new ErrorType(1, [c_1])])]), state_12]]);
            }
        }
    }), (tupledArg_6) => {
        const s_12 = tupledArg_6[1];
        const matchValue_5 = Result_MapError((tupledArg_7) => ParseError_sort(tupledArg_7[0], tupledArg_7[1]), p_5([tupledArg_6[0], s_12]));
        if (matchValue_5.tag === 0) {
            const sb = CharParsers_StringBuilder_$ctor();
            CharParsers_StringBuilder__Append_Z721C83C5(sb, matchValue_5.fields[0][0]);
            const go = (tupledArg_8_mut_1) => {
                go:
                while (true) {
                    const tupledArg_8 = tupledArg_8_mut_1;
                    const state_3_1 = tupledArg_8[0];
                    const s_2_1 = tupledArg_8[1];
                    const matchValue_1_2 = Result_MapError((tupledArg_9) => ParseError_sort(tupledArg_9[0], tupledArg_9[1]), p_5([state_3_1, s_2_1]));
                    if (matchValue_1_2.tag === 0) {
                        CharParsers_StringBuilder__Append_Z721C83C5(sb, matchValue_1_2.fields[0][0]);
                        tupledArg_8_mut_1 = [matchValue_1_2.fields[0][2], matchValue_1_2.fields[0][1]];
                        continue go;
                    }
                    else {
                        return new FSharpResult$2(0, [[toString(sb), s_2_1, state_3_1]]);
                    }
                    break;
                }
            };
            return go([matchValue_5.fields[0][2], matchValue_5.fields[0][1]]);
        }
        else {
            const state_1_2 = matchValue_5.fields[0][1];
            return new FSharpResult$2(1, [[matchValue_5.fields[0][0], state_1_2]]);
        }
    })), (tupledArg_10) => {
        let s_7, matchValue_2, tupledArg, str_1, state_1, s_1, length, this$, start_1, finish_1, len, line, column, clo, clo_1, this$_1, matchValue_1_1, tupledArg_1, str_3, state_4, s_4, length_2, this$_2, start_1_1, finish_1_1, len_1, line_1, column_1, clo_2, clo_1_1, this$_3;
        const matchValue_6 = Result_MapError((tupledArg_11) => ParseError_sort(tupledArg_11[0], tupledArg_11[1]), (s_7 = tupledArg_10[1], (matchValue_2 = Result_MapError((tupledArg_3) => ParseError_sort(tupledArg_3[0], tupledArg_3[1]), (tupledArg = [void 0, s_7], (str_1 = "0x", (state_1 = tupledArg[0], (s_1 = tupledArg[1], StringSegmentModule_startsWith(str_1, s_1) ? (new FSharpResult$2(0, [[void 0, (length = (str_1.length | 0), (this$ = s_1, (start_1 = (length | 0), (finish_1 = ((this$.length - 1) | 0), (((start_1 >= 0) && (start_1 <= this$.length)) && (finish_1 < max(comparePrimitives, start_1, this$.length))) ? ((len = (max(comparePrimitives, 0, (finish_1 - start_1) + 1) | 0), (line = this$.startLine, (column = this$.startColumn, ((() => {
            for (let i = 0; i <= (start_1 - 1); i++) {
                if (this$.underlying[this$.startIndex + i] === "\n") {
                    line = ((line + 1) | 0);
                    column = 0;
                }
                else {
                    column = ((column + 1) | 0);
                }
            }
        })(), new StringSegment(this$.startIndex + start_1, len, this$.underlying, line, column)))))) : ((clo = toFail(printf("Index was out of range (GetSlice(%i, %i)).")), (clo_1 = clo(start_1), clo_1(finish_1)))))))), state_1]])) : (new FSharpResult$2(1, [[singleton_1([(this$_1 = s_1, new Position(this$_1.startLine, this$_1.startColumn)), singleton_1(new ErrorType(0, [("\'" + str_1) + "\'"]))]), state_1]]))))))), (matchValue_2.tag === 1) ? ((matchValue_1_1 = Result_MapError((tupledArg_4) => ParseError_sort(tupledArg_4[0], tupledArg_4[1]), (tupledArg_1 = [matchValue_2.fields[0][1], s_7], (str_3 = "0X", (state_4 = tupledArg_1[0], (s_4 = tupledArg_1[1], StringSegmentModule_startsWith(str_3, s_4) ? (new FSharpResult$2(0, [[void 0, (length_2 = (str_3.length | 0), (this$_2 = s_4, (start_1_1 = (length_2 | 0), (finish_1_1 = ((this$_2.length - 1) | 0), (((start_1_1 >= 0) && (start_1_1 <= this$_2.length)) && (finish_1_1 < max(comparePrimitives, start_1_1, this$_2.length))) ? ((len_1 = (max(comparePrimitives, 0, (finish_1_1 - start_1_1) + 1) | 0), (line_1 = this$_2.startLine, (column_1 = this$_2.startColumn, ((() => {
            for (let i_1 = 0; i_1 <= (start_1_1 - 1); i_1++) {
                if (this$_2.underlying[this$_2.startIndex + i_1] === "\n") {
                    line_1 = ((line_1 + 1) | 0);
                    column_1 = 0;
                }
                else {
                    column_1 = ((column_1 + 1) | 0);
                }
            }
        })(), new StringSegment(this$_2.startIndex + start_1_1, len_1, this$_2.underlying, line_1, column_1)))))) : ((clo_2 = toFail(printf("Index was out of range (GetSlice(%i, %i)).")), (clo_1_1 = clo_2(start_1_1), clo_1_1(finish_1_1)))))))), state_4]])) : (new FSharpResult$2(1, [[singleton_1([(this$_3 = s_4, new Position(this$_3.startLine, this$_3.startColumn)), singleton_1(new ErrorType(0, [("\'" + str_3) + "\'"]))]), state_4]]))))))), (matchValue_1_1.tag === 1) ? (new FSharpResult$2(1, [[append_1(matchValue_2.fields[0][0], matchValue_1_1.fields[0][0]), matchValue_1_1.fields[0][1]]])) : matchValue_1_1)) : matchValue_2)));
        if (matchValue_6.tag === 0) {
            const matchValue_1_3 = Result_MapError((tupledArg_12) => ParseError_sort(tupledArg_12[0], tupledArg_12[1]), p_9([matchValue_6.fields[0][2], matchValue_6.fields[0][1]]));
            return (matchValue_1_3.tag === 0) ? (new FSharpResult$2(0, [[matchValue_1_3.fields[0][0], matchValue_1_3.fields[0][1], matchValue_1_3.fields[0][2]]])) : (new FSharpResult$2(1, [matchValue_1_3.fields[0]]));
        }
        else {
            return new FSharpResult$2(1, [matchValue_6.fields[0]]);
        }
    })), (tupledArg_13) => {
        const matchValue_7 = Result_MapError((tupledArg_14) => ParseError_sort(tupledArg_14[0], tupledArg_14[1]), p_12([void 0, tupledArg_13[1]]));
        return (matchValue_7.tag === 0) ? (new FSharpResult$2(0, [[[16, matchValue_7.fields[0][0]], matchValue_7.fields[0][1], matchValue_7.fields[0][2]]])) : (new FSharpResult$2(1, [matchValue_7.fields[0]]));
    }), (p_27 = ((p_24 = ((p_20 = ((tupledArg_20) => {
        let this$_13, c_5, this$_14, start_1_5, finish_1_5, len_5, line_5, column_5, clo_6, clo_1_5, this$_15;
        const label_1 = "[0-7]";
        const state_38 = void 0;
        const s_27 = tupledArg_20[1];
        let matchValue_11;
        const this$_12 = s_27;
        const index_1 = 0;
        matchValue_11 = (((index_1 < 0) ? true : (index_1 >= this$_12.length)) ? "￿" : this$_12.underlying[this$_12.startIndex + index_1]);
        if (matchValue_11 === "￿") {
            return new FSharpResult$2(1, [[singleton_1([(this$_13 = s_27, new Position(this$_13.startLine, this$_13.startColumn)), ofArray([new ErrorType(0, [label_1]), new ErrorType(1, ["EOF"])])]), state_38]]);
        }
        else {
            const c_6 = matchValue_11;
            if ((c_5 = c_6, ("0" <= c_5) && (c_5 <= "7"))) {
                return new FSharpResult$2(0, [[c_6, (this$_14 = s_27, (start_1_5 = 1, (finish_1_5 = ((this$_14.length - 1) | 0), (((start_1_5 >= 0) && (start_1_5 <= this$_14.length)) && (finish_1_5 < max(comparePrimitives, start_1_5, this$_14.length))) ? ((len_5 = (max(comparePrimitives, 0, (finish_1_5 - start_1_5) + 1) | 0), (line_5 = this$_14.startLine, (column_5 = this$_14.startColumn, ((() => {
                    for (let i_7 = 0; i_7 <= (start_1_5 - 1); i_7++) {
                        if (this$_14.underlying[this$_14.startIndex + i_7] === "\n") {
                            line_5 = ((line_5 + 1) | 0);
                            column_5 = 0;
                        }
                        else {
                            column_5 = ((column_5 + 1) | 0);
                        }
                    }
                })(), new StringSegment(this$_14.startIndex + start_1_5, len_5, this$_14.underlying, line_5, column_5)))))) : ((clo_6 = toFail(printf("Index was out of range (GetSlice(%i, %i)).")), (clo_1_5 = clo_6(start_1_5), clo_1_5(finish_1_5))))))), state_38]]);
            }
            else {
                return new FSharpResult$2(1, [[singleton_1([(this$_15 = s_27, new Position(this$_15.startLine, this$_15.startColumn)), ofArray([new ErrorType(0, [label_1]), new ErrorType(1, [c_6])])]), state_38]]);
            }
        }
    }), (tupledArg_21) => {
        const s_29 = tupledArg_21[1];
        const matchValue_13 = Result_MapError((tupledArg_22) => ParseError_sort(tupledArg_22[0], tupledArg_22[1]), p_20([tupledArg_21[0], s_29]));
        if (matchValue_13.tag === 0) {
            const sb_3 = CharParsers_StringBuilder_$ctor();
            CharParsers_StringBuilder__Append_Z721C83C5(sb_3, matchValue_13.fields[0][0]);
            const go_1 = (tupledArg_23_mut) => {
                go_1:
                while (true) {
                    const tupledArg_23 = tupledArg_23_mut;
                    const state_3_2 = tupledArg_23[0];
                    const s_2_3 = tupledArg_23[1];
                    const matchValue_1_5 = Result_MapError((tupledArg_24) => ParseError_sort(tupledArg_24[0], tupledArg_24[1]), p_20([state_3_2, s_2_3]));
                    if (matchValue_1_5.tag === 0) {
                        CharParsers_StringBuilder__Append_Z721C83C5(sb_3, matchValue_1_5.fields[0][0]);
                        tupledArg_23_mut = [matchValue_1_5.fields[0][2], matchValue_1_5.fields[0][1]];
                        continue go_1;
                    }
                    else {
                        return new FSharpResult$2(0, [[toString(sb_3), s_2_3, state_3_2]]);
                    }
                    break;
                }
            };
            return go_1([matchValue_13.fields[0][2], matchValue_13.fields[0][1]]);
        }
        else {
            const state_1_6 = matchValue_13.fields[0][1];
            return new FSharpResult$2(1, [[matchValue_13.fields[0][0], state_1_6]]);
        }
    })), (tupledArg_25) => {
        let s_24, matchValue_10, tupledArg_15, str_5, state_27, s_18, length_6, this$_8, start_1_3, finish_1_3, len_3, line_3, column_3, clo_4, clo_1_3, this$_9, matchValue_1_4, tupledArg_16, str_7, state_30, s_21, length_8, this$_10, start_1_4, finish_1_4, len_4, line_4, column_4, clo_5, clo_1_4, this$_11;
        const matchValue_14 = Result_MapError((tupledArg_26) => ParseError_sort(tupledArg_26[0], tupledArg_26[1]), (s_24 = tupledArg_25[1], (matchValue_10 = Result_MapError((tupledArg_18) => ParseError_sort(tupledArg_18[0], tupledArg_18[1]), (tupledArg_15 = [void 0, s_24], (str_5 = "0o", (state_27 = tupledArg_15[0], (s_18 = tupledArg_15[1], StringSegmentModule_startsWith(str_5, s_18) ? (new FSharpResult$2(0, [[void 0, (length_6 = (str_5.length | 0), (this$_8 = s_18, (start_1_3 = (length_6 | 0), (finish_1_3 = ((this$_8.length - 1) | 0), (((start_1_3 >= 0) && (start_1_3 <= this$_8.length)) && (finish_1_3 < max(comparePrimitives, start_1_3, this$_8.length))) ? ((len_3 = (max(comparePrimitives, 0, (finish_1_3 - start_1_3) + 1) | 0), (line_3 = this$_8.startLine, (column_3 = this$_8.startColumn, ((() => {
            for (let i_4 = 0; i_4 <= (start_1_3 - 1); i_4++) {
                if (this$_8.underlying[this$_8.startIndex + i_4] === "\n") {
                    line_3 = ((line_3 + 1) | 0);
                    column_3 = 0;
                }
                else {
                    column_3 = ((column_3 + 1) | 0);
                }
            }
        })(), new StringSegment(this$_8.startIndex + start_1_3, len_3, this$_8.underlying, line_3, column_3)))))) : ((clo_4 = toFail(printf("Index was out of range (GetSlice(%i, %i)).")), (clo_1_3 = clo_4(start_1_3), clo_1_3(finish_1_3)))))))), state_27]])) : (new FSharpResult$2(1, [[singleton_1([(this$_9 = s_18, new Position(this$_9.startLine, this$_9.startColumn)), singleton_1(new ErrorType(0, [("\'" + str_5) + "\'"]))]), state_27]]))))))), (matchValue_10.tag === 1) ? ((matchValue_1_4 = Result_MapError((tupledArg_19) => ParseError_sort(tupledArg_19[0], tupledArg_19[1]), (tupledArg_16 = [matchValue_10.fields[0][1], s_24], (str_7 = "0O", (state_30 = tupledArg_16[0], (s_21 = tupledArg_16[1], StringSegmentModule_startsWith(str_7, s_21) ? (new FSharpResult$2(0, [[void 0, (length_8 = (str_7.length | 0), (this$_10 = s_21, (start_1_4 = (length_8 | 0), (finish_1_4 = ((this$_10.length - 1) | 0), (((start_1_4 >= 0) && (start_1_4 <= this$_10.length)) && (finish_1_4 < max(comparePrimitives, start_1_4, this$_10.length))) ? ((len_4 = (max(comparePrimitives, 0, (finish_1_4 - start_1_4) + 1) | 0), (line_4 = this$_10.startLine, (column_4 = this$_10.startColumn, ((() => {
            for (let i_5 = 0; i_5 <= (start_1_4 - 1); i_5++) {
                if (this$_10.underlying[this$_10.startIndex + i_5] === "\n") {
                    line_4 = ((line_4 + 1) | 0);
                    column_4 = 0;
                }
                else {
                    column_4 = ((column_4 + 1) | 0);
                }
            }
        })(), new StringSegment(this$_10.startIndex + start_1_4, len_4, this$_10.underlying, line_4, column_4)))))) : ((clo_5 = toFail(printf("Index was out of range (GetSlice(%i, %i)).")), (clo_1_4 = clo_5(start_1_4), clo_1_4(finish_1_4)))))))), state_30]])) : (new FSharpResult$2(1, [[singleton_1([(this$_11 = s_21, new Position(this$_11.startLine, this$_11.startColumn)), singleton_1(new ErrorType(0, [("\'" + str_7) + "\'"]))]), state_30]]))))))), (matchValue_1_4.tag === 1) ? (new FSharpResult$2(1, [[append_1(matchValue_10.fields[0][0], matchValue_1_4.fields[0][0]), matchValue_1_4.fields[0][1]]])) : matchValue_1_4)) : matchValue_10)));
        if (matchValue_14.tag === 0) {
            const matchValue_1_6 = Result_MapError((tupledArg_27) => ParseError_sort(tupledArg_27[0], tupledArg_27[1]), p_24([matchValue_14.fields[0][2], matchValue_14.fields[0][1]]));
            return (matchValue_1_6.tag === 0) ? (new FSharpResult$2(0, [[matchValue_1_6.fields[0][0], matchValue_1_6.fields[0][1], matchValue_1_6.fields[0][2]]])) : (new FSharpResult$2(1, [matchValue_1_6.fields[0]]));
        }
        else {
            return new FSharpResult$2(1, [matchValue_14.fields[0]]);
        }
    })), (tupledArg_28) => {
        const matchValue_15 = Result_MapError((tupledArg_29) => ParseError_sort(tupledArg_29[0], tupledArg_29[1]), p_27([void 0, tupledArg_28[1]]));
        return (matchValue_15.tag === 0) ? (new FSharpResult$2(0, [[[8, matchValue_15.fields[0][0]], matchValue_15.fields[0][1], matchValue_15.fields[0][2]]])) : (new FSharpResult$2(1, [matchValue_15.fields[0]]));
    }), (p_42 = ((p_39 = ((p_35 = ((tupledArg_35) => {
        let this$_21, _arg, this$_22, start_1_8, finish_1_8, len_8, line_8, column_8, clo_9, clo_1_8, this$_23;
        const label_3 = "a char with condition";
        const state_63 = tupledArg_35[0];
        const s_43 = tupledArg_35[1];
        let matchValue_19;
        const this$_20 = s_43;
        const index_2 = 0;
        matchValue_19 = (((index_2 < 0) ? true : (index_2 >= this$_20.length)) ? "￿" : this$_20.underlying[this$_20.startIndex + index_2]);
        if (matchValue_19 === "￿") {
            return new FSharpResult$2(1, [[singleton_1([(this$_21 = s_43, new Position(this$_21.startLine, this$_21.startColumn)), ofArray([new ErrorType(0, [label_3]), new ErrorType(1, ["EOF"])])]), state_63]]);
        }
        else {
            const c_10 = matchValue_19;
            if ((_arg = c_10, (_arg === "0") ? true : (_arg === "1"))) {
                return new FSharpResult$2(0, [[c_10, (this$_22 = s_43, (start_1_8 = 1, (finish_1_8 = ((this$_22.length - 1) | 0), (((start_1_8 >= 0) && (start_1_8 <= this$_22.length)) && (finish_1_8 < max(comparePrimitives, start_1_8, this$_22.length))) ? ((len_8 = (max(comparePrimitives, 0, (finish_1_8 - start_1_8) + 1) | 0), (line_8 = this$_22.startLine, (column_8 = this$_22.startColumn, ((() => {
                    for (let i_11 = 0; i_11 <= (start_1_8 - 1); i_11++) {
                        if (this$_22.underlying[this$_22.startIndex + i_11] === "\n") {
                            line_8 = ((line_8 + 1) | 0);
                            column_8 = 0;
                        }
                        else {
                            column_8 = ((column_8 + 1) | 0);
                        }
                    }
                })(), new StringSegment(this$_22.startIndex + start_1_8, len_8, this$_22.underlying, line_8, column_8)))))) : ((clo_9 = toFail(printf("Index was out of range (GetSlice(%i, %i)).")), (clo_1_8 = clo_9(start_1_8), clo_1_8(finish_1_8))))))), state_63]]);
            }
            else {
                return new FSharpResult$2(1, [[singleton_1([(this$_23 = s_43, new Position(this$_23.startLine, this$_23.startColumn)), ofArray([new ErrorType(0, [label_3]), new ErrorType(1, [c_10])])]), state_63]]);
            }
        }
    }), (tupledArg_36) => {
        const s_45 = tupledArg_36[1];
        const matchValue_21 = Result_MapError((tupledArg_37) => ParseError_sort(tupledArg_37[0], tupledArg_37[1]), p_35([tupledArg_36[0], s_45]));
        if (matchValue_21.tag === 0) {
            const sb_6 = CharParsers_StringBuilder_$ctor();
            CharParsers_StringBuilder__Append_Z721C83C5(sb_6, matchValue_21.fields[0][0]);
            const go_2 = (tupledArg_38_mut) => {
                go_2:
                while (true) {
                    const tupledArg_38 = tupledArg_38_mut;
                    const state_3_3 = tupledArg_38[0];
                    const s_2_5 = tupledArg_38[1];
                    const matchValue_1_8 = Result_MapError((tupledArg_39) => ParseError_sort(tupledArg_39[0], tupledArg_39[1]), p_35([state_3_3, s_2_5]));
                    if (matchValue_1_8.tag === 0) {
                        CharParsers_StringBuilder__Append_Z721C83C5(sb_6, matchValue_1_8.fields[0][0]);
                        tupledArg_38_mut = [matchValue_1_8.fields[0][2], matchValue_1_8.fields[0][1]];
                        continue go_2;
                    }
                    else {
                        return new FSharpResult$2(0, [[toString(sb_6), s_2_5, state_3_3]]);
                    }
                    break;
                }
            };
            return go_2([matchValue_21.fields[0][2], matchValue_21.fields[0][1]]);
        }
        else {
            const state_1_10 = matchValue_21.fields[0][1];
            return new FSharpResult$2(1, [[matchValue_21.fields[0][0], state_1_10]]);
        }
    })), (tupledArg_40) => {
        let s_41, matchValue_18, tupledArg_30, str_9, state_53, s_35, length_12, this$_16, start_1_6, finish_1_6, len_6, line_6, column_6, clo_7, clo_1_6, this$_17, matchValue_1_7, tupledArg_31, str_11, state_56, s_38, length_14, this$_18, start_1_7, finish_1_7, len_7, line_7, column_7, clo_8, clo_1_7, this$_19;
        const matchValue_22 = Result_MapError((tupledArg_41) => ParseError_sort(tupledArg_41[0], tupledArg_41[1]), (s_41 = tupledArg_40[1], (matchValue_18 = Result_MapError((tupledArg_33) => ParseError_sort(tupledArg_33[0], tupledArg_33[1]), (tupledArg_30 = [void 0, s_41], (str_9 = "0b", (state_53 = tupledArg_30[0], (s_35 = tupledArg_30[1], StringSegmentModule_startsWith(str_9, s_35) ? (new FSharpResult$2(0, [[void 0, (length_12 = (str_9.length | 0), (this$_16 = s_35, (start_1_6 = (length_12 | 0), (finish_1_6 = ((this$_16.length - 1) | 0), (((start_1_6 >= 0) && (start_1_6 <= this$_16.length)) && (finish_1_6 < max(comparePrimitives, start_1_6, this$_16.length))) ? ((len_6 = (max(comparePrimitives, 0, (finish_1_6 - start_1_6) + 1) | 0), (line_6 = this$_16.startLine, (column_6 = this$_16.startColumn, ((() => {
            for (let i_8 = 0; i_8 <= (start_1_6 - 1); i_8++) {
                if (this$_16.underlying[this$_16.startIndex + i_8] === "\n") {
                    line_6 = ((line_6 + 1) | 0);
                    column_6 = 0;
                }
                else {
                    column_6 = ((column_6 + 1) | 0);
                }
            }
        })(), new StringSegment(this$_16.startIndex + start_1_6, len_6, this$_16.underlying, line_6, column_6)))))) : ((clo_7 = toFail(printf("Index was out of range (GetSlice(%i, %i)).")), (clo_1_6 = clo_7(start_1_6), clo_1_6(finish_1_6)))))))), state_53]])) : (new FSharpResult$2(1, [[singleton_1([(this$_17 = s_35, new Position(this$_17.startLine, this$_17.startColumn)), singleton_1(new ErrorType(0, [("\'" + str_9) + "\'"]))]), state_53]]))))))), (matchValue_18.tag === 1) ? ((matchValue_1_7 = Result_MapError((tupledArg_34) => ParseError_sort(tupledArg_34[0], tupledArg_34[1]), (tupledArg_31 = [matchValue_18.fields[0][1], s_41], (str_11 = "0B", (state_56 = tupledArg_31[0], (s_38 = tupledArg_31[1], StringSegmentModule_startsWith(str_11, s_38) ? (new FSharpResult$2(0, [[void 0, (length_14 = (str_11.length | 0), (this$_18 = s_38, (start_1_7 = (length_14 | 0), (finish_1_7 = ((this$_18.length - 1) | 0), (((start_1_7 >= 0) && (start_1_7 <= this$_18.length)) && (finish_1_7 < max(comparePrimitives, start_1_7, this$_18.length))) ? ((len_7 = (max(comparePrimitives, 0, (finish_1_7 - start_1_7) + 1) | 0), (line_7 = this$_18.startLine, (column_7 = this$_18.startColumn, ((() => {
            for (let i_9 = 0; i_9 <= (start_1_7 - 1); i_9++) {
                if (this$_18.underlying[this$_18.startIndex + i_9] === "\n") {
                    line_7 = ((line_7 + 1) | 0);
                    column_7 = 0;
                }
                else {
                    column_7 = ((column_7 + 1) | 0);
                }
            }
        })(), new StringSegment(this$_18.startIndex + start_1_7, len_7, this$_18.underlying, line_7, column_7)))))) : ((clo_8 = toFail(printf("Index was out of range (GetSlice(%i, %i)).")), (clo_1_7 = clo_8(start_1_7), clo_1_7(finish_1_7)))))))), state_56]])) : (new FSharpResult$2(1, [[singleton_1([(this$_19 = s_38, new Position(this$_19.startLine, this$_19.startColumn)), singleton_1(new ErrorType(0, [("\'" + str_11) + "\'"]))]), state_56]]))))))), (matchValue_1_7.tag === 1) ? (new FSharpResult$2(1, [[append_1(matchValue_18.fields[0][0], matchValue_1_7.fields[0][0]), matchValue_1_7.fields[0][1]]])) : matchValue_1_7)) : matchValue_18)));
        if (matchValue_22.tag === 0) {
            const matchValue_1_9 = Result_MapError((tupledArg_42) => ParseError_sort(tupledArg_42[0], tupledArg_42[1]), p_39([matchValue_22.fields[0][2], matchValue_22.fields[0][1]]));
            return (matchValue_1_9.tag === 0) ? (new FSharpResult$2(0, [[matchValue_1_9.fields[0][0], matchValue_1_9.fields[0][1], matchValue_1_9.fields[0][2]]])) : (new FSharpResult$2(1, [matchValue_1_9.fields[0]]));
        }
        else {
            return new FSharpResult$2(1, [matchValue_22.fields[0]]);
        }
    })), (tupledArg_43) => {
        const matchValue_23 = Result_MapError((tupledArg_44) => ParseError_sort(tupledArg_44[0], tupledArg_44[1]), p_42([void 0, tupledArg_43[1]]));
        return (matchValue_23.tag === 0) ? (new FSharpResult$2(0, [[[2, matchValue_23.fields[0][0]], matchValue_23.fields[0][1], matchValue_23.fields[0][2]]])) : (new FSharpResult$2(1, [matchValue_23.fields[0]]));
    }), (p_49 = ((p_45 = ((tupledArg_45) => {
        let this$_25, this$_26, start_1_9, finish_1_9, len_9, line_9, column_9, clo_10, clo_1_9, this$_27;
        const label_4 = "[0-9]";
        const state_79 = void 0;
        const s_52 = tupledArg_45[1];
        let matchValue_24;
        const this$_24 = s_52;
        const index_3 = 0;
        matchValue_24 = (((index_3 < 0) ? true : (index_3 >= this$_24.length)) ? "￿" : this$_24.underlying[this$_24.startIndex + index_3]);
        if (matchValue_24 === "￿") {
            return new FSharpResult$2(1, [[singleton_1([(this$_25 = s_52, new Position(this$_25.startLine, this$_25.startColumn)), ofArray([new ErrorType(0, [label_4]), new ErrorType(1, ["EOF"])])]), state_79]]);
        }
        else {
            const c_14 = matchValue_24;
            if (isDigit(c_14)) {
                return new FSharpResult$2(0, [[c_14, (this$_26 = s_52, (start_1_9 = 1, (finish_1_9 = ((this$_26.length - 1) | 0), (((start_1_9 >= 0) && (start_1_9 <= this$_26.length)) && (finish_1_9 < max(comparePrimitives, start_1_9, this$_26.length))) ? ((len_9 = (max(comparePrimitives, 0, (finish_1_9 - start_1_9) + 1) | 0), (line_9 = this$_26.startLine, (column_9 = this$_26.startColumn, ((() => {
                    for (let i_13 = 0; i_13 <= (start_1_9 - 1); i_13++) {
                        if (this$_26.underlying[this$_26.startIndex + i_13] === "\n") {
                            line_9 = ((line_9 + 1) | 0);
                            column_9 = 0;
                        }
                        else {
                            column_9 = ((column_9 + 1) | 0);
                        }
                    }
                })(), new StringSegment(this$_26.startIndex + start_1_9, len_9, this$_26.underlying, line_9, column_9)))))) : ((clo_10 = toFail(printf("Index was out of range (GetSlice(%i, %i)).")), (clo_1_9 = clo_10(start_1_9), clo_1_9(finish_1_9))))))), state_79]]);
            }
            else {
                return new FSharpResult$2(1, [[singleton_1([(this$_27 = s_52, new Position(this$_27.startLine, this$_27.startColumn)), ofArray([new ErrorType(0, [label_4]), new ErrorType(1, [c_14])])]), state_79]]);
            }
        }
    }), (tupledArg_46) => {
        const s_54 = tupledArg_46[1];
        const matchValue_26 = Result_MapError((tupledArg_47) => ParseError_sort(tupledArg_47[0], tupledArg_47[1]), p_45([tupledArg_46[0], s_54]));
        if (matchValue_26.tag === 0) {
            const sb_9 = CharParsers_StringBuilder_$ctor();
            CharParsers_StringBuilder__Append_Z721C83C5(sb_9, matchValue_26.fields[0][0]);
            const go_3 = (tupledArg_48_mut) => {
                go_3:
                while (true) {
                    const tupledArg_48 = tupledArg_48_mut;
                    const state_3_4 = tupledArg_48[0];
                    const s_2_7 = tupledArg_48[1];
                    const matchValue_1_10 = Result_MapError((tupledArg_49) => ParseError_sort(tupledArg_49[0], tupledArg_49[1]), p_45([state_3_4, s_2_7]));
                    if (matchValue_1_10.tag === 0) {
                        CharParsers_StringBuilder__Append_Z721C83C5(sb_9, matchValue_1_10.fields[0][0]);
                        tupledArg_48_mut = [matchValue_1_10.fields[0][2], matchValue_1_10.fields[0][1]];
                        continue go_3;
                    }
                    else {
                        return new FSharpResult$2(0, [[toString(sb_9), s_2_7, state_3_4]]);
                    }
                    break;
                }
            };
            return go_3([matchValue_26.fields[0][2], matchValue_26.fields[0][1]]);
        }
        else {
            const state_1_13 = matchValue_26.fields[0][1];
            return new FSharpResult$2(1, [[matchValue_26.fields[0][0], state_1_13]]);
        }
    })), (tupledArg_50) => {
        const matchValue_27 = Result_MapError((tupledArg_51) => ParseError_sort(tupledArg_51[0], tupledArg_51[1]), p_49([void 0, tupledArg_50[1]]));
        return (matchValue_27.tag === 0) ? (new FSharpResult$2(0, [[[10, matchValue_27.fields[0][0]], matchValue_27.fields[0][1], matchValue_27.fields[0][2]]])) : (new FSharpResult$2(1, [matchValue_27.fields[0]]));
    })]);
    return (tupledArg_52) => {
        const s_58 = tupledArg_52[1];
        const go_4 = (state_1_15_mut, _arg_1_mut) => {
            let this$_29, this$_28;
            go_4:
            while (true) {
                const state_1_15 = state_1_15_mut, _arg_1 = _arg_1_mut;
                if (!isEmpty(_arg_1)) {
                    if (isEmpty(tail(_arg_1))) {
                        const matchValue_28 = Result_MapError((tupledArg_53) => ParseError_sort(tupledArg_53[0], tupledArg_53[1]), head_1(_arg_1)([state_1_15, s_58]));
                        if (matchValue_28.tag === 1) {
                            return new FSharpResult$2(1, [[singleton_1([(this$_29 = s_58, new Position(this$_29.startLine, this$_29.startColumn)), singleton_1(new ErrorType(0, ["unsigned integer"]))]), matchValue_28.fields[0][1]]]);
                        }
                        else {
                            return matchValue_28;
                        }
                    }
                    else {
                        const matchValue_1_11 = Result_MapError((tupledArg_54) => ParseError_sort(tupledArg_54[0], tupledArg_54[1]), head_1(_arg_1)([state_1_15, s_58]));
                        if (matchValue_1_11.tag === 1) {
                            state_1_15_mut = matchValue_1_11.fields[0][1];
                            _arg_1_mut = tail(_arg_1);
                            continue go_4;
                        }
                        else {
                            return matchValue_1_11;
                        }
                    }
                }
                else {
                    return new FSharpResult$2(1, [[singleton_1([(this$_28 = s_58, new Position(this$_28.startLine, this$_28.startColumn)), singleton_1(new ErrorType(2, ["No parsers given"]))]), state_1_15]]);
                }
                break;
            }
        };
        return go_4(void 0, ps);
    };
})();

export function CharParsers_pfloat(state, s) {
    let this$;
    const matchValue = Result_MapError((tupledArg) => ParseError_sort(tupledArg[0], tupledArg[1]), CharParsers_Internal_pfloatUnit([void 0, s]));
    if (matchValue.tag === 0) {
        const s_1 = matchValue.fields[0][1];
        try {
            return new FSharpResult$2(0, [[parse(matchValue.fields[0][0]), s_1, state]]);
        }
        catch (matchValue_1) {
            return new FSharpResult$2(1, [[singleton_1([(this$ = s_1, new Position(this$.startLine, this$.startColumn)), singleton_1(new ErrorType(2, ["value was too large and too small."]))]), state]]);
        }
    }
    else {
        return new FSharpResult$2(1, [[matchValue.fields[0][0], state]]);
    }
}

export function CharParsers_pint8(x_, x__1) {
    let this$, x_2, tupledArg;
    const x = [x_, x__1];
    const state_1 = x[0];
    const matchValue = Result_MapError((tupledArg_1) => ParseError_sort(tupledArg_1[0], tupledArg_1[1]), CharParsers_Internal_pIntLikeUnit([void 0, x[1]]));
    if (matchValue.tag === 0) {
        const s_1_1 = matchValue.fields[0][1];
        try {
            return new FSharpResult$2(0, [[(x_2 = (((tupledArg = [matchValue.fields[0][0][2], matchValue.fields[0][0][1]], parse_1(tupledArg[0], 511, false, 8, tupledArg[1]))) | 0), matchValue.fields[0][0][0] ? x_2 : op_UnaryNegation_Int8(x_2)), s_1_1, state_1]]);
        }
        catch (matchValue_1) {
            return new FSharpResult$2(1, [[singleton_1([(this$ = s_1_1, new Position(this$.startLine, this$.startColumn)), singleton_1(new ErrorType(2, ["value was too large and too small."]))]), state_1]]);
        }
    }
    else {
        return new FSharpResult$2(1, [[matchValue.fields[0][0], state_1]]);
    }
}

export function CharParsers_puint8(x_, x__1) {
    let this$, tupledArg;
    const x = [x_, x__1];
    const state_1 = x[0];
    const matchValue = Result_MapError((tupledArg_1) => ParseError_sort(tupledArg_1[0], tupledArg_1[1]), CharParsers_Internal_pUIntLikeUnit([void 0, x[1]]));
    if (matchValue.tag === 0) {
        const s_1_1 = matchValue.fields[0][1];
        try {
            return new FSharpResult$2(0, [[(tupledArg = [matchValue.fields[0][0][1], matchValue.fields[0][0][0]], parse_1(tupledArg[0], 511, true, 8, tupledArg[1])), s_1_1, state_1]]);
        }
        catch (matchValue_1) {
            return new FSharpResult$2(1, [[singleton_1([(this$ = s_1_1, new Position(this$.startLine, this$.startColumn)), singleton_1(new ErrorType(2, ["value was too large and too small."]))]), state_1]]);
        }
    }
    else {
        return new FSharpResult$2(1, [[matchValue.fields[0][0], state_1]]);
    }
}

export function CharParsers_pint16(x_, x__1) {
    let this$, x_2, tupledArg;
    const x = [x_, x__1];
    const state_1 = x[0];
    const matchValue = Result_MapError((tupledArg_1) => ParseError_sort(tupledArg_1[0], tupledArg_1[1]), CharParsers_Internal_pIntLikeUnit([void 0, x[1]]));
    if (matchValue.tag === 0) {
        const s_1_1 = matchValue.fields[0][1];
        try {
            return new FSharpResult$2(0, [[(x_2 = (((tupledArg = [matchValue.fields[0][0][2], matchValue.fields[0][0][1]], parse_1(tupledArg[0], 511, false, 16, tupledArg[1]))) | 0), matchValue.fields[0][0][0] ? x_2 : op_UnaryNegation_Int16(x_2)), s_1_1, state_1]]);
        }
        catch (matchValue_1) {
            return new FSharpResult$2(1, [[singleton_1([(this$ = s_1_1, new Position(this$.startLine, this$.startColumn)), singleton_1(new ErrorType(2, ["value was too large and too small."]))]), state_1]]);
        }
    }
    else {
        return new FSharpResult$2(1, [[matchValue.fields[0][0], state_1]]);
    }
}

export function CharParsers_puint16(x_, x__1) {
    let this$, tupledArg;
    const x = [x_, x__1];
    const state_1 = x[0];
    const matchValue = Result_MapError((tupledArg_1) => ParseError_sort(tupledArg_1[0], tupledArg_1[1]), CharParsers_Internal_pUIntLikeUnit([void 0, x[1]]));
    if (matchValue.tag === 0) {
        const s_1_1 = matchValue.fields[0][1];
        try {
            return new FSharpResult$2(0, [[(tupledArg = [matchValue.fields[0][0][1], matchValue.fields[0][0][0]], parse_1(tupledArg[0], 511, true, 16, tupledArg[1])), s_1_1, state_1]]);
        }
        catch (matchValue_1) {
            return new FSharpResult$2(1, [[singleton_1([(this$ = s_1_1, new Position(this$.startLine, this$.startColumn)), singleton_1(new ErrorType(2, ["value was too large and too small."]))]), state_1]]);
        }
    }
    else {
        return new FSharpResult$2(1, [[matchValue.fields[0][0], state_1]]);
    }
}

export function CharParsers_pint32(x_, x__1) {
    let this$, x_2, tupledArg;
    const x = [x_, x__1];
    const state_1 = x[0];
    const matchValue = Result_MapError((tupledArg_1) => ParseError_sort(tupledArg_1[0], tupledArg_1[1]), CharParsers_Internal_pIntLikeUnit([void 0, x[1]]));
    if (matchValue.tag === 0) {
        const s_1_1 = matchValue.fields[0][1];
        try {
            return new FSharpResult$2(0, [[(x_2 = (((tupledArg = [matchValue.fields[0][0][2], matchValue.fields[0][0][1]], parse_1(tupledArg[0], 511, false, 32, tupledArg[1]))) | 0), matchValue.fields[0][0][0] ? x_2 : op_UnaryNegation_Int32(x_2)), s_1_1, state_1]]);
        }
        catch (matchValue_1) {
            return new FSharpResult$2(1, [[singleton_1([(this$ = s_1_1, new Position(this$.startLine, this$.startColumn)), singleton_1(new ErrorType(2, ["value was too large and too small."]))]), state_1]]);
        }
    }
    else {
        return new FSharpResult$2(1, [[matchValue.fields[0][0], state_1]]);
    }
}

export function CharParsers_puint32(x_, x__1) {
    let this$, tupledArg;
    const x = [x_, x__1];
    const state_1 = x[0];
    const matchValue = Result_MapError((tupledArg_1) => ParseError_sort(tupledArg_1[0], tupledArg_1[1]), CharParsers_Internal_pUIntLikeUnit([void 0, x[1]]));
    if (matchValue.tag === 0) {
        const s_1_1 = matchValue.fields[0][1];
        try {
            return new FSharpResult$2(0, [[(tupledArg = [matchValue.fields[0][0][1], matchValue.fields[0][0][0]], parse_1(tupledArg[0], 511, true, 32, tupledArg[1])), s_1_1, state_1]]);
        }
        catch (matchValue_1) {
            return new FSharpResult$2(1, [[singleton_1([(this$ = s_1_1, new Position(this$.startLine, this$.startColumn)), singleton_1(new ErrorType(2, ["value was too large and too small."]))]), state_1]]);
        }
    }
    else {
        return new FSharpResult$2(1, [[matchValue.fields[0][0], state_1]]);
    }
}

export function CharParsers_pint64(x_, x__1) {
    let this$, x_2, tupledArg;
    const x = [x_, x__1];
    const state_1 = x[0];
    const matchValue = Result_MapError((tupledArg_1) => ParseError_sort(tupledArg_1[0], tupledArg_1[1]), CharParsers_Internal_pIntLikeUnit([void 0, x[1]]));
    if (matchValue.tag === 0) {
        const s_1_1 = matchValue.fields[0][1];
        try {
            return new FSharpResult$2(0, [[(x_2 = ((tupledArg = [matchValue.fields[0][0][2], matchValue.fields[0][0][1]], parse_2(tupledArg[0], 511, false, 64, tupledArg[1]))), matchValue.fields[0][0][0] ? x_2 : op_UnaryNegation(x_2)), s_1_1, state_1]]);
        }
        catch (matchValue_1) {
            return new FSharpResult$2(1, [[singleton_1([(this$ = s_1_1, new Position(this$.startLine, this$.startColumn)), singleton_1(new ErrorType(2, ["value was too large and too small."]))]), state_1]]);
        }
    }
    else {
        return new FSharpResult$2(1, [[matchValue.fields[0][0], state_1]]);
    }
}

export function CharParsers_puint64(x_, x__1) {
    let this$, tupledArg;
    const x = [x_, x__1];
    const state_1 = x[0];
    const matchValue = Result_MapError((tupledArg_1) => ParseError_sort(tupledArg_1[0], tupledArg_1[1]), CharParsers_Internal_pUIntLikeUnit([void 0, x[1]]));
    if (matchValue.tag === 0) {
        const s_1_1 = matchValue.fields[0][1];
        try {
            return new FSharpResult$2(0, [[(tupledArg = [matchValue.fields[0][0][1], matchValue.fields[0][0][0]], parse_2(tupledArg[0], 511, true, 64, tupledArg[1])), s_1_1, state_1]]);
        }
        catch (matchValue_1) {
            return new FSharpResult$2(1, [[singleton_1([(this$ = s_1_1, new Position(this$.startLine, this$.startColumn)), singleton_1(new ErrorType(2, ["value was too large and too small."]))]), state_1]]);
        }
    }
    else {
        return new FSharpResult$2(1, [[matchValue.fields[0][0], state_1]]);
    }
}

export function CharParsers_notFollowedByEof(state, s) {
    let this$, index, this$_1;
    if (((this$ = s, (index = 0, ((index < 0) ? true : (index >= this$.length)) ? "￿" : this$.underlying[this$.startIndex + index]))) !== "￿") {
        return new FSharpResult$2(0, [[void 0, s, state]]);
    }
    else {
        return new FSharpResult$2(1, [[singleton_1([(this$_1 = s, new Position(this$_1.startLine, this$_1.startColumn)), singleton_1(new ErrorType(1, ["EOF"]))]), state]]);
    }
}

export function CharParsers_followedByNewline(state, s) {
    let this$, index, this$_1;
    if (((this$ = s, (index = 0, ((index < 0) ? true : (index >= this$.length)) ? "￿" : this$.underlying[this$.startIndex + index]))) === "\n") {
        return new FSharpResult$2(0, [[void 0, s, state]]);
    }
    else {
        return new FSharpResult$2(1, [[singleton_1([(this$_1 = s, new Position(this$_1.startLine, this$_1.startColumn)), singleton_1(new ErrorType(0, ["newline"]))]), state]]);
    }
}

export function CharParsers_notFollowedByNewline(state, s) {
    let this$, index, this$_1;
    if (((this$ = s, (index = 0, ((index < 0) ? true : (index >= this$.length)) ? "￿" : this$.underlying[this$.startIndex + index]))) !== "\n") {
        return new FSharpResult$2(0, [[void 0, s, state]]);
    }
    else {
        return new FSharpResult$2(1, [[singleton_1([(this$_1 = s, new Position(this$_1.startLine, this$_1.startColumn)), singleton_1(new ErrorType(1, ["newline"]))]), state]]);
    }
}

export function CharParsers_previousCharSatisfiesNot(cond) {
    return (tupledArg) => {
        let this$_1, this$_2;
        const state_1 = tupledArg[0];
        const s_1 = tupledArg[1];
        let matchValue;
        const this$ = s_1;
        const i = (this$.startIndex + -1) | 0;
        matchValue = (((i >= 0) && (i < this$.underlying.length)) ? this$.underlying[i] : "￿");
        return (matchValue === "￿") ? (new FSharpResult$2(1, [[singleton_1([(this$_1 = s_1, new Position(this$_1.startLine, this$_1.startColumn)), singleton_1(new ErrorType(1, ["start of input"]))]), state_1]])) : ((!cond(matchValue)) ? (new FSharpResult$2(0, [[void 0, s_1, state_1]])) : (new FSharpResult$2(1, [[singleton_1([(this$_2 = s_1, new Position(this$_2.startLine, this$_2.startColumn)), singleton_1(new ErrorType(0, ["previous char satisfying the condition"]))]), state_1]])));
    };
}

