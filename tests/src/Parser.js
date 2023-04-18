import { toString, FSharpRef, Record, Union } from "../fable_modules/fable-library.4.0.1/Types.js";
import { record_type, option_type, list_type, string_type, union_type } from "../fable_modules/fable-library.4.0.1/Reflection.js";
import { filter, toArray, reverse, cons, ofArray, empty, singleton, append, head, tail, isEmpty } from "../fable_modules/fable-library.4.0.1/List.js";
import { FSharpResult$2, Result_MapError } from "../fable_modules/fable-library.4.0.1/Choice.js";
import { CharParsers_StringBuilder_$ctor_Z721C83C5, CharParsers_StringBuilder__Append_Z721C83C5, CharParsers_StringBuilder_$ctor, StringSegmentModule_startsWith, ParseError_sort } from "../paket-files/cannorin/Parsec.fs/Parsec.js";
import { CharParsers_spaces, CharParsers_eof, StringSegment, ErrorType, Position } from "../paket-files/cannorin/Parsec.fs/Parsec.js";
import { defaultOf, partialApply, comparePrimitives, max } from "../fable_modules/fable-library.4.0.1/Util.js";
import { replace, join, substring, toText, printf, toFail } from "../fable_modules/fable-library.4.0.1/String.js";
import { toList } from "../fable_modules/fable-library.4.0.1/Seq.js";
import { some } from "../fable_modules/fable-library.4.0.1/Option.js";

export class loops extends Union {
    "constructor"(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["For", "Loop"];
    }
}

export function loops$reflection() {
    return union_type("App.Parser.loops", [], loops, () => [[], []]);
}

export class Sequence extends Union {
    "constructor"(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["Text"];
    }
}

export function Sequence$reflection() {
    return union_type("App.Parser.Sequence", [], Sequence, () => [[["Item", string_type]]]);
}

export class Block extends Union {
    "constructor"(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["Caption", "If", "Loop", "Break", "Concurrent", "Thread", "Call", "Return", "Exit", "Sequence"];
    }
}

export function Block$reflection() {
    return union_type("App.Parser.Block", [], Block, () => [[["Item", string_type]], [["Item", If$reflection()]], [["Item", Loop$reflection()]], [["Item", string_type]], [["Item", Concurrent$reflection()]], [["Item", list_type(Block$reflection())]], [["Item", string_type]], [["Item", string_type]], [["Item", string_type]], [["Item", Sequence$reflection()]]]);
}

export class If extends Record {
    "constructor"(condition, blocks, opt_else) {
        super();
        this.condition = condition;
        this.blocks = blocks;
        this.opt_else = opt_else;
    }
}

export function If$reflection() {
    return record_type("App.Parser.If", [], If, () => [["condition", Sequence$reflection()], ["blocks", list_type(Block$reflection())], ["opt_else", option_type(list_type(Block$reflection()))]]);
}

export class Loop extends Record {
    "constructor"(kind, opt_condition, block, opt_end_condition) {
        super();
        this.kind = kind;
        this.opt_condition = opt_condition;
        this.block = block;
        this.opt_end_condition = opt_end_condition;
    }
}

export function Loop$reflection() {
    return record_type("App.Parser.Loop", [], Loop, () => [["kind", loops$reflection()], ["opt_condition", option_type(Sequence$reflection())], ["block", list_type(Block$reflection())], ["opt_end_condition", option_type(Sequence$reflection())]]);
}

export class Concurrent extends Record {
    "constructor"(threads) {
        super();
        this.threads = threads;
    }
}

export function Concurrent$reflection() {
    return record_type("App.Parser.Concurrent", [], Concurrent, () => [["threads", list_type(list_type(Block$reflection()))]]);
}

export function isEmptySequence(_arg) {
    if (_arg.tag === 9) {
        return _arg.fields[0].fields[0] === "";
    }
    else {
        return false;
    }
}

export const patternInput$004046 = (() => {
    const r = new FSharpRef((tupledArg) => {
        throw new Error("invalid definition with createParserForwardedToRef");
    });
    return [(tupledArg_1) => r.contents([tupledArg_1[0], tupledArg_1[1]]), r];
})();

const pBlockRef = patternInput$004046[1];

const pBlock = patternInput$004046[0];

function blockNotClosedError(block) {
    return `${block} block not closed with "end${block}":`;
}

const keywords = (tupledArg_12) => {
    const s_37 = tupledArg_12[1];
    const go = (state_1_1_mut, errorsAcc_mut, _arg_mut) => {
        let this$_24;
        go:
        while (true) {
            const state_1_1 = state_1_1_mut, errorsAcc = errorsAcc_mut, _arg = _arg_mut;
            if (!isEmpty(_arg)) {
                if (isEmpty(tail(_arg))) {
                    const matchValue_12 = Result_MapError((tupledArg_13) => ParseError_sort(tupledArg_13[0], tupledArg_13[1]), head(_arg)([state_1_1, s_37]));
                    if (matchValue_12.tag === 1) {
                        return new FSharpResult$2(1, [[append(errorsAcc, matchValue_12.fields[0][0]), matchValue_12.fields[0][1]]]);
                    }
                    else {
                        return matchValue_12;
                    }
                }
                else {
                    const matchValue_1_1 = Result_MapError((tupledArg_14) => ParseError_sort(tupledArg_14[0], tupledArg_14[1]), head(_arg)([state_1_1, s_37]));
                    if (matchValue_1_1.tag === 1) {
                        state_1_1_mut = matchValue_1_1.fields[0][1];
                        errorsAcc_mut = append(matchValue_1_1.fields[0][0], errorsAcc);
                        _arg_mut = tail(_arg);
                        continue go;
                    }
                    else {
                        return matchValue_1_1;
                    }
                }
            }
            else {
                return new FSharpResult$2(1, [[singleton([(this$_24 = s_37, new Position(this$_24.startLine, this$_24.startColumn)), singleton(new ErrorType(2, ["No parsers given"]))]), state_1_1]]);
            }
            break;
        }
    };
    return go(void 0, empty(), ofArray([(tupledArg) => {
        let length, this$, start_1, finish_1, len, line, column, clo, clo_1, this$_1;
        const str_1 = "endif:";
        const state_1 = tupledArg[0];
        const s_1 = tupledArg[1];
        return StringSegmentModule_startsWith(str_1, s_1) ? (new FSharpResult$2(0, [[void 0, (length = (str_1.length | 0), (this$ = s_1, (start_1 = (length | 0), (finish_1 = ((this$.length - 1) | 0), (((start_1 >= 0) && (start_1 <= this$.length)) && (finish_1 < max(comparePrimitives, start_1, this$.length))) ? ((len = (max(comparePrimitives, 0, (finish_1 - start_1) + 1) | 0), (line = this$.startLine, (column = this$.startColumn, ((() => {
            for (let i = 0; i <= (start_1 - 1); i++) {
                if (this$.underlying[this$.startIndex + i] === "\n") {
                    line = ((line + 1) | 0);
                    column = 0;
                }
                else {
                    column = ((column + 1) | 0);
                }
            }
        })(), new StringSegment(this$.startIndex + start_1, len, this$.underlying, line, column)))))) : ((clo = toFail(printf("Index was out of range (GetSlice(%i, %i)).")), (clo_1 = clo(start_1), clo_1(finish_1)))))))), state_1]])) : (new FSharpResult$2(1, [[singleton([(this$_1 = s_1, new Position(this$_1.startLine, this$_1.startColumn)), singleton(new ErrorType(0, [("\'" + str_1) + "\'"]))]), state_1]]));
    }, (tupledArg_1) => {
        let length_2, this$_2, start_1_1, finish_1_1, len_1, line_1, column_1, clo_2, clo_1_1, this$_3;
        const str_3 = "if:";
        const state_4 = tupledArg_1[0];
        const s_4 = tupledArg_1[1];
        return StringSegmentModule_startsWith(str_3, s_4) ? (new FSharpResult$2(0, [[void 0, (length_2 = (str_3.length | 0), (this$_2 = s_4, (start_1_1 = (length_2 | 0), (finish_1_1 = ((this$_2.length - 1) | 0), (((start_1_1 >= 0) && (start_1_1 <= this$_2.length)) && (finish_1_1 < max(comparePrimitives, start_1_1, this$_2.length))) ? ((len_1 = (max(comparePrimitives, 0, (finish_1_1 - start_1_1) + 1) | 0), (line_1 = this$_2.startLine, (column_1 = this$_2.startColumn, ((() => {
            for (let i_1 = 0; i_1 <= (start_1_1 - 1); i_1++) {
                if (this$_2.underlying[this$_2.startIndex + i_1] === "\n") {
                    line_1 = ((line_1 + 1) | 0);
                    column_1 = 0;
                }
                else {
                    column_1 = ((column_1 + 1) | 0);
                }
            }
        })(), new StringSegment(this$_2.startIndex + start_1_1, len_1, this$_2.underlying, line_1, column_1)))))) : ((clo_2 = toFail(printf("Index was out of range (GetSlice(%i, %i)).")), (clo_1_1 = clo_2(start_1_1), clo_1_1(finish_1_1)))))))), state_4]])) : (new FSharpResult$2(1, [[singleton([(this$_3 = s_4, new Position(this$_3.startLine, this$_3.startColumn)), singleton(new ErrorType(0, [("\'" + str_3) + "\'"]))]), state_4]]));
    }, (tupledArg_2) => {
        let length_4, this$_4, start_1_2, finish_1_2, len_2, line_2, column_2, clo_3, clo_1_2, this$_5;
        const str_5 = "else:";
        const state_7 = tupledArg_2[0];
        const s_7 = tupledArg_2[1];
        return StringSegmentModule_startsWith(str_5, s_7) ? (new FSharpResult$2(0, [[void 0, (length_4 = (str_5.length | 0), (this$_4 = s_7, (start_1_2 = (length_4 | 0), (finish_1_2 = ((this$_4.length - 1) | 0), (((start_1_2 >= 0) && (start_1_2 <= this$_4.length)) && (finish_1_2 < max(comparePrimitives, start_1_2, this$_4.length))) ? ((len_2 = (max(comparePrimitives, 0, (finish_1_2 - start_1_2) + 1) | 0), (line_2 = this$_4.startLine, (column_2 = this$_4.startColumn, ((() => {
            for (let i_2 = 0; i_2 <= (start_1_2 - 1); i_2++) {
                if (this$_4.underlying[this$_4.startIndex + i_2] === "\n") {
                    line_2 = ((line_2 + 1) | 0);
                    column_2 = 0;
                }
                else {
                    column_2 = ((column_2 + 1) | 0);
                }
            }
        })(), new StringSegment(this$_4.startIndex + start_1_2, len_2, this$_4.underlying, line_2, column_2)))))) : ((clo_3 = toFail(printf("Index was out of range (GetSlice(%i, %i)).")), (clo_1_2 = clo_3(start_1_2), clo_1_2(finish_1_2)))))))), state_7]])) : (new FSharpResult$2(1, [[singleton([(this$_5 = s_7, new Position(this$_5.startLine, this$_5.startColumn)), singleton(new ErrorType(0, [("\'" + str_5) + "\'"]))]), state_7]]));
    }, (tupledArg_3) => {
        let length_6, this$_6, start_1_3, finish_1_3, len_3, line_3, column_3, clo_4, clo_1_3, this$_7;
        const str_7 = "loop:";
        const state_10 = tupledArg_3[0];
        const s_10 = tupledArg_3[1];
        return StringSegmentModule_startsWith(str_7, s_10) ? (new FSharpResult$2(0, [[void 0, (length_6 = (str_7.length | 0), (this$_6 = s_10, (start_1_3 = (length_6 | 0), (finish_1_3 = ((this$_6.length - 1) | 0), (((start_1_3 >= 0) && (start_1_3 <= this$_6.length)) && (finish_1_3 < max(comparePrimitives, start_1_3, this$_6.length))) ? ((len_3 = (max(comparePrimitives, 0, (finish_1_3 - start_1_3) + 1) | 0), (line_3 = this$_6.startLine, (column_3 = this$_6.startColumn, ((() => {
            for (let i_3 = 0; i_3 <= (start_1_3 - 1); i_3++) {
                if (this$_6.underlying[this$_6.startIndex + i_3] === "\n") {
                    line_3 = ((line_3 + 1) | 0);
                    column_3 = 0;
                }
                else {
                    column_3 = ((column_3 + 1) | 0);
                }
            }
        })(), new StringSegment(this$_6.startIndex + start_1_3, len_3, this$_6.underlying, line_3, column_3)))))) : ((clo_4 = toFail(printf("Index was out of range (GetSlice(%i, %i)).")), (clo_1_3 = clo_4(start_1_3), clo_1_3(finish_1_3)))))))), state_10]])) : (new FSharpResult$2(1, [[singleton([(this$_7 = s_10, new Position(this$_7.startLine, this$_7.startColumn)), singleton(new ErrorType(0, [("\'" + str_7) + "\'"]))]), state_10]]));
    }, (tupledArg_4) => {
        let length_8, this$_8, start_1_4, finish_1_4, len_4, line_4, column_4, clo_5, clo_1_4, this$_9;
        const str_9 = "endloop:";
        const state_13 = tupledArg_4[0];
        const s_13 = tupledArg_4[1];
        return StringSegmentModule_startsWith(str_9, s_13) ? (new FSharpResult$2(0, [[void 0, (length_8 = (str_9.length | 0), (this$_8 = s_13, (start_1_4 = (length_8 | 0), (finish_1_4 = ((this$_8.length - 1) | 0), (((start_1_4 >= 0) && (start_1_4 <= this$_8.length)) && (finish_1_4 < max(comparePrimitives, start_1_4, this$_8.length))) ? ((len_4 = (max(comparePrimitives, 0, (finish_1_4 - start_1_4) + 1) | 0), (line_4 = this$_8.startLine, (column_4 = this$_8.startColumn, ((() => {
            for (let i_4 = 0; i_4 <= (start_1_4 - 1); i_4++) {
                if (this$_8.underlying[this$_8.startIndex + i_4] === "\n") {
                    line_4 = ((line_4 + 1) | 0);
                    column_4 = 0;
                }
                else {
                    column_4 = ((column_4 + 1) | 0);
                }
            }
        })(), new StringSegment(this$_8.startIndex + start_1_4, len_4, this$_8.underlying, line_4, column_4)))))) : ((clo_5 = toFail(printf("Index was out of range (GetSlice(%i, %i)).")), (clo_1_4 = clo_5(start_1_4), clo_1_4(finish_1_4)))))))), state_13]])) : (new FSharpResult$2(1, [[singleton([(this$_9 = s_13, new Position(this$_9.startLine, this$_9.startColumn)), singleton(new ErrorType(0, [("\'" + str_9) + "\'"]))]), state_13]]));
    }, (tupledArg_5) => {
        let length_10, this$_10, start_1_5, finish_1_5, len_5, line_5, column_5, clo_6, clo_1_5, this$_11;
        const str_11 = "for:";
        const state_16 = tupledArg_5[0];
        const s_16 = tupledArg_5[1];
        return StringSegmentModule_startsWith(str_11, s_16) ? (new FSharpResult$2(0, [[void 0, (length_10 = (str_11.length | 0), (this$_10 = s_16, (start_1_5 = (length_10 | 0), (finish_1_5 = ((this$_10.length - 1) | 0), (((start_1_5 >= 0) && (start_1_5 <= this$_10.length)) && (finish_1_5 < max(comparePrimitives, start_1_5, this$_10.length))) ? ((len_5 = (max(comparePrimitives, 0, (finish_1_5 - start_1_5) + 1) | 0), (line_5 = this$_10.startLine, (column_5 = this$_10.startColumn, ((() => {
            for (let i_5 = 0; i_5 <= (start_1_5 - 1); i_5++) {
                if (this$_10.underlying[this$_10.startIndex + i_5] === "\n") {
                    line_5 = ((line_5 + 1) | 0);
                    column_5 = 0;
                }
                else {
                    column_5 = ((column_5 + 1) | 0);
                }
            }
        })(), new StringSegment(this$_10.startIndex + start_1_5, len_5, this$_10.underlying, line_5, column_5)))))) : ((clo_6 = toFail(printf("Index was out of range (GetSlice(%i, %i)).")), (clo_1_5 = clo_6(start_1_5), clo_1_5(finish_1_5)))))))), state_16]])) : (new FSharpResult$2(1, [[singleton([(this$_11 = s_16, new Position(this$_11.startLine, this$_11.startColumn)), singleton(new ErrorType(0, [("\'" + str_11) + "\'"]))]), state_16]]));
    }, (tupledArg_6) => {
        let length_12, this$_12, start_1_6, finish_1_6, len_6, line_6, column_6, clo_7, clo_1_6, this$_13;
        const str_13 = "endfor:";
        const state_19 = tupledArg_6[0];
        const s_19 = tupledArg_6[1];
        return StringSegmentModule_startsWith(str_13, s_19) ? (new FSharpResult$2(0, [[void 0, (length_12 = (str_13.length | 0), (this$_12 = s_19, (start_1_6 = (length_12 | 0), (finish_1_6 = ((this$_12.length - 1) | 0), (((start_1_6 >= 0) && (start_1_6 <= this$_12.length)) && (finish_1_6 < max(comparePrimitives, start_1_6, this$_12.length))) ? ((len_6 = (max(comparePrimitives, 0, (finish_1_6 - start_1_6) + 1) | 0), (line_6 = this$_12.startLine, (column_6 = this$_12.startColumn, ((() => {
            for (let i_6 = 0; i_6 <= (start_1_6 - 1); i_6++) {
                if (this$_12.underlying[this$_12.startIndex + i_6] === "\n") {
                    line_6 = ((line_6 + 1) | 0);
                    column_6 = 0;
                }
                else {
                    column_6 = ((column_6 + 1) | 0);
                }
            }
        })(), new StringSegment(this$_12.startIndex + start_1_6, len_6, this$_12.underlying, line_6, column_6)))))) : ((clo_7 = toFail(printf("Index was out of range (GetSlice(%i, %i)).")), (clo_1_6 = clo_7(start_1_6), clo_1_6(finish_1_6)))))))), state_19]])) : (new FSharpResult$2(1, [[singleton([(this$_13 = s_19, new Position(this$_13.startLine, this$_13.startColumn)), singleton(new ErrorType(0, [("\'" + str_13) + "\'"]))]), state_19]]));
    }, (tupledArg_7) => {
        let length_14, this$_14, start_1_7, finish_1_7, len_7, line_7, column_7, clo_8, clo_1_7, this$_15;
        const str_15 = "concurrent:";
        const state_22 = tupledArg_7[0];
        const s_22 = tupledArg_7[1];
        return StringSegmentModule_startsWith(str_15, s_22) ? (new FSharpResult$2(0, [[void 0, (length_14 = (str_15.length | 0), (this$_14 = s_22, (start_1_7 = (length_14 | 0), (finish_1_7 = ((this$_14.length - 1) | 0), (((start_1_7 >= 0) && (start_1_7 <= this$_14.length)) && (finish_1_7 < max(comparePrimitives, start_1_7, this$_14.length))) ? ((len_7 = (max(comparePrimitives, 0, (finish_1_7 - start_1_7) + 1) | 0), (line_7 = this$_14.startLine, (column_7 = this$_14.startColumn, ((() => {
            for (let i_7 = 0; i_7 <= (start_1_7 - 1); i_7++) {
                if (this$_14.underlying[this$_14.startIndex + i_7] === "\n") {
                    line_7 = ((line_7 + 1) | 0);
                    column_7 = 0;
                }
                else {
                    column_7 = ((column_7 + 1) | 0);
                }
            }
        })(), new StringSegment(this$_14.startIndex + start_1_7, len_7, this$_14.underlying, line_7, column_7)))))) : ((clo_8 = toFail(printf("Index was out of range (GetSlice(%i, %i)).")), (clo_1_7 = clo_8(start_1_7), clo_1_7(finish_1_7)))))))), state_22]])) : (new FSharpResult$2(1, [[singleton([(this$_15 = s_22, new Position(this$_15.startLine, this$_15.startColumn)), singleton(new ErrorType(0, [("\'" + str_15) + "\'"]))]), state_22]]));
    }, (tupledArg_8) => {
        let length_16, this$_16, start_1_8, finish_1_8, len_8, line_8, column_8, clo_9, clo_1_8, this$_17;
        const str_17 = "thread:";
        const state_25 = tupledArg_8[0];
        const s_25 = tupledArg_8[1];
        return StringSegmentModule_startsWith(str_17, s_25) ? (new FSharpResult$2(0, [[void 0, (length_16 = (str_17.length | 0), (this$_16 = s_25, (start_1_8 = (length_16 | 0), (finish_1_8 = ((this$_16.length - 1) | 0), (((start_1_8 >= 0) && (start_1_8 <= this$_16.length)) && (finish_1_8 < max(comparePrimitives, start_1_8, this$_16.length))) ? ((len_8 = (max(comparePrimitives, 0, (finish_1_8 - start_1_8) + 1) | 0), (line_8 = this$_16.startLine, (column_8 = this$_16.startColumn, ((() => {
            for (let i_8 = 0; i_8 <= (start_1_8 - 1); i_8++) {
                if (this$_16.underlying[this$_16.startIndex + i_8] === "\n") {
                    line_8 = ((line_8 + 1) | 0);
                    column_8 = 0;
                }
                else {
                    column_8 = ((column_8 + 1) | 0);
                }
            }
        })(), new StringSegment(this$_16.startIndex + start_1_8, len_8, this$_16.underlying, line_8, column_8)))))) : ((clo_9 = toFail(printf("Index was out of range (GetSlice(%i, %i)).")), (clo_1_8 = clo_9(start_1_8), clo_1_8(finish_1_8)))))))), state_25]])) : (new FSharpResult$2(1, [[singleton([(this$_17 = s_25, new Position(this$_17.startLine, this$_17.startColumn)), singleton(new ErrorType(0, [("\'" + str_17) + "\'"]))]), state_25]]));
    }, (tupledArg_9) => {
        let length_18, this$_18, start_1_9, finish_1_9, len_9, line_9, column_9, clo_10, clo_1_9, this$_19;
        const str_19 = "break:";
        const state_28 = tupledArg_9[0];
        const s_28 = tupledArg_9[1];
        return StringSegmentModule_startsWith(str_19, s_28) ? (new FSharpResult$2(0, [[void 0, (length_18 = (str_19.length | 0), (this$_18 = s_28, (start_1_9 = (length_18 | 0), (finish_1_9 = ((this$_18.length - 1) | 0), (((start_1_9 >= 0) && (start_1_9 <= this$_18.length)) && (finish_1_9 < max(comparePrimitives, start_1_9, this$_18.length))) ? ((len_9 = (max(comparePrimitives, 0, (finish_1_9 - start_1_9) + 1) | 0), (line_9 = this$_18.startLine, (column_9 = this$_18.startColumn, ((() => {
            for (let i_9 = 0; i_9 <= (start_1_9 - 1); i_9++) {
                if (this$_18.underlying[this$_18.startIndex + i_9] === "\n") {
                    line_9 = ((line_9 + 1) | 0);
                    column_9 = 0;
                }
                else {
                    column_9 = ((column_9 + 1) | 0);
                }
            }
        })(), new StringSegment(this$_18.startIndex + start_1_9, len_9, this$_18.underlying, line_9, column_9)))))) : ((clo_10 = toFail(printf("Index was out of range (GetSlice(%i, %i)).")), (clo_1_9 = clo_10(start_1_9), clo_1_9(finish_1_9)))))))), state_28]])) : (new FSharpResult$2(1, [[singleton([(this$_19 = s_28, new Position(this$_19.startLine, this$_19.startColumn)), singleton(new ErrorType(0, [("\'" + str_19) + "\'"]))]), state_28]]));
    }, (tupledArg_10) => {
        let length_20, this$_20, start_1_10, finish_1_10, len_10, line_10, column_10, clo_11, clo_1_10, this$_21;
        const str_21 = "exit:";
        const state_31 = tupledArg_10[0];
        const s_31 = tupledArg_10[1];
        return StringSegmentModule_startsWith(str_21, s_31) ? (new FSharpResult$2(0, [[void 0, (length_20 = (str_21.length | 0), (this$_20 = s_31, (start_1_10 = (length_20 | 0), (finish_1_10 = ((this$_20.length - 1) | 0), (((start_1_10 >= 0) && (start_1_10 <= this$_20.length)) && (finish_1_10 < max(comparePrimitives, start_1_10, this$_20.length))) ? ((len_10 = (max(comparePrimitives, 0, (finish_1_10 - start_1_10) + 1) | 0), (line_10 = this$_20.startLine, (column_10 = this$_20.startColumn, ((() => {
            for (let i_10 = 0; i_10 <= (start_1_10 - 1); i_10++) {
                if (this$_20.underlying[this$_20.startIndex + i_10] === "\n") {
                    line_10 = ((line_10 + 1) | 0);
                    column_10 = 0;
                }
                else {
                    column_10 = ((column_10 + 1) | 0);
                }
            }
        })(), new StringSegment(this$_20.startIndex + start_1_10, len_10, this$_20.underlying, line_10, column_10)))))) : ((clo_11 = toFail(printf("Index was out of range (GetSlice(%i, %i)).")), (clo_1_10 = clo_11(start_1_10), clo_1_10(finish_1_10)))))))), state_31]])) : (new FSharpResult$2(1, [[singleton([(this$_21 = s_31, new Position(this$_21.startLine, this$_21.startColumn)), singleton(new ErrorType(0, [("\'" + str_21) + "\'"]))]), state_31]]));
    }, (tupledArg_11) => {
        let length_22, this$_22, start_1_11, finish_1_11, len_11, line_11, column_11, clo_12, clo_1_11, this$_23;
        const str_23 = "return:";
        const state_34 = tupledArg_11[0];
        const s_34 = tupledArg_11[1];
        return StringSegmentModule_startsWith(str_23, s_34) ? (new FSharpResult$2(0, [[void 0, (length_22 = (str_23.length | 0), (this$_22 = s_34, (start_1_11 = (length_22 | 0), (finish_1_11 = ((this$_22.length - 1) | 0), (((start_1_11 >= 0) && (start_1_11 <= this$_22.length)) && (finish_1_11 < max(comparePrimitives, start_1_11, this$_22.length))) ? ((len_11 = (max(comparePrimitives, 0, (finish_1_11 - start_1_11) + 1) | 0), (line_11 = this$_22.startLine, (column_11 = this$_22.startColumn, ((() => {
            for (let i_11 = 0; i_11 <= (start_1_11 - 1); i_11++) {
                if (this$_22.underlying[this$_22.startIndex + i_11] === "\n") {
                    line_11 = ((line_11 + 1) | 0);
                    column_11 = 0;
                }
                else {
                    column_11 = ((column_11 + 1) | 0);
                }
            }
        })(), new StringSegment(this$_22.startIndex + start_1_11, len_11, this$_22.underlying, line_11, column_11)))))) : ((clo_12 = toFail(printf("Index was out of range (GetSlice(%i, %i)).")), (clo_1_11 = clo_12(start_1_11), clo_1_11(finish_1_11)))))))), state_34]])) : (new FSharpResult$2(1, [[singleton([(this$_23 = s_34, new Position(this$_23.startLine, this$_23.startColumn)), singleton(new ErrorType(0, [("\'" + str_23) + "\'"]))]), state_34]]));
    }]));
};

const pCondition = (() => {
    let p_7;
    let p_4;
    let p;
    let cond;
    let clo;
    const set$ = new Set("\n".split(""));
    clo = ((c) => (!set$.has(c)));
    cond = (clo);
    p = ((tupledArg) => {
        let this$_1, this$_2, start_1, finish_1, len, line, column, clo_1, clo_1_1, this$_3;
        const label_1 = "a char with condition";
        const state_1 = tupledArg[0];
        const s_1 = tupledArg[1];
        let matchValue;
        const this$ = s_1;
        const index = 0;
        matchValue = (((index < 0) ? true : (index >= this$.length)) ? "￿" : this$.underlying[this$.startIndex + index]);
        if (matchValue === "￿") {
            return new FSharpResult$2(1, [[singleton([(this$_1 = s_1, new Position(this$_1.startLine, this$_1.startColumn)), ofArray([new ErrorType(0, [label_1]), new ErrorType(1, ["EOF"])])]), state_1]]);
        }
        else {
            const c_1 = matchValue;
            return cond(c_1) ? (new FSharpResult$2(0, [[c_1, (this$_2 = s_1, (start_1 = 1, (finish_1 = ((this$_2.length - 1) | 0), (((start_1 >= 0) && (start_1 <= this$_2.length)) && (finish_1 < max(comparePrimitives, start_1, this$_2.length))) ? ((len = (max(comparePrimitives, 0, (finish_1 - start_1) + 1) | 0), (line = this$_2.startLine, (column = this$_2.startColumn, ((() => {
                for (let i_1 = 0; i_1 <= (start_1 - 1); i_1++) {
                    if (this$_2.underlying[this$_2.startIndex + i_1] === "\n") {
                        line = ((line + 1) | 0);
                        column = 0;
                    }
                    else {
                        column = ((column + 1) | 0);
                    }
                }
            })(), new StringSegment(this$_2.startIndex + start_1, len, this$_2.underlying, line, column)))))) : ((clo_1 = toFail(printf("Index was out of range (GetSlice(%i, %i)).")), (clo_1_1 = clo_1(start_1), clo_1_1(finish_1))))))), state_1]])) : (new FSharpResult$2(1, [[singleton([(this$_3 = s_1, new Position(this$_3.startLine, this$_3.startColumn)), ofArray([new ErrorType(0, [label_1]), new ErrorType(1, [c_1])])]), state_1]]));
        }
    });
    p_4 = ((tupledArg_1) => {
        const s_3 = tupledArg_1[1];
        const matchValue_2 = Result_MapError((tupledArg_2) => ParseError_sort(tupledArg_2[0], tupledArg_2[1]), p([tupledArg_1[0], s_3]));
        if (matchValue_2.tag === 0) {
            const sb = CharParsers_StringBuilder_$ctor();
            CharParsers_StringBuilder__Append_Z721C83C5(sb, matchValue_2.fields[0][0]);
            const go = (tupledArg_3_mut) => {
                go:
                while (true) {
                    const tupledArg_3 = tupledArg_3_mut;
                    const state_3_1 = tupledArg_3[0];
                    const s_2_1 = tupledArg_3[1];
                    const matchValue_1_1 = Result_MapError((tupledArg_4) => ParseError_sort(tupledArg_4[0], tupledArg_4[1]), p([state_3_1, s_2_1]));
                    if (matchValue_1_1.tag === 0) {
                        CharParsers_StringBuilder__Append_Z721C83C5(sb, matchValue_1_1.fields[0][0]);
                        tupledArg_3_mut = [matchValue_1_1.fields[0][2], matchValue_1_1.fields[0][1]];
                        continue go;
                    }
                    else {
                        return new FSharpResult$2(0, [[toString(sb), s_2_1, state_3_1]]);
                    }
                    break;
                }
            };
            return go([matchValue_2.fields[0][2], matchValue_2.fields[0][1]]);
        }
        else {
            const state_1_1 = matchValue_2.fields[0][1];
            return new FSharpResult$2(0, [["", s_3, state_1_1]]);
        }
    });
    p_7 = ((tupledArg_5) => {
        const matchValue_3 = Result_MapError((tupledArg_6) => ParseError_sort(tupledArg_6[0], tupledArg_6[1]), p_4([void 0, tupledArg_5[1]]));
        return (matchValue_3.tag === 0) ? (new FSharpResult$2(0, [[new Sequence(0, [matchValue_3.fields[0][0]]), matchValue_3.fields[0][1], matchValue_3.fields[0][2]]])) : (new FSharpResult$2(1, [matchValue_3.fields[0]]));
    });
    return (tupledArg_7) => {
        const matchValue_4 = Result_MapError((tupledArg_8) => ParseError_sort(tupledArg_8[0], tupledArg_8[1]), p_7([void 0, tupledArg_7[1]]));
        return (matchValue_4.tag === 0) ? (new FSharpResult$2(0, [[new Sequence(0, [matchValue_4.fields[0][0].fields[0].trim()]), matchValue_4.fields[0][1], matchValue_4.fields[0][2]]])) : (new FSharpResult$2(1, [matchValue_4.fields[0]]));
    };
})();

const pSequence = (() => {
    let escape;
    let p_7;
    let p;
    let clo_2;
    const chars = "<>".split("");
    const set$ = new Set(chars);
    let label;
    const arg_1 = toList(chars);
    const clo = toText(printf("one of %A"));
    label = clo(arg_1);
    clo_2 = ((tupledArg) => {
        let this$_1, this$_2, start_1, finish_1, len, line, column, clo_1, clo_1_1, this$_3;
        const label_1 = label;
        const state_1 = tupledArg[0];
        const s_1 = tupledArg[1];
        let matchValue;
        const this$ = s_1;
        const index = 0;
        matchValue = (((index < 0) ? true : (index >= this$.length)) ? "￿" : this$.underlying[this$.startIndex + index]);
        if (matchValue === "￿") {
            return new FSharpResult$2(1, [[singleton([(this$_1 = s_1, new Position(this$_1.startLine, this$_1.startColumn)), ofArray([new ErrorType(0, [label_1]), new ErrorType(1, ["EOF"])])]), state_1]]);
        }
        else {
            const c = matchValue;
            return set$.has(c) ? (new FSharpResult$2(0, [[c, (this$_2 = s_1, (start_1 = 1, (finish_1 = ((this$_2.length - 1) | 0), (((start_1 >= 0) && (start_1 <= this$_2.length)) && (finish_1 < max(comparePrimitives, start_1, this$_2.length))) ? ((len = (max(comparePrimitives, 0, (finish_1 - start_1) + 1) | 0), (line = this$_2.startLine, (column = this$_2.startColumn, ((() => {
                for (let i_1 = 0; i_1 <= (start_1 - 1); i_1++) {
                    if (this$_2.underlying[this$_2.startIndex + i_1] === "\n") {
                        line = ((line + 1) | 0);
                        column = 0;
                    }
                    else {
                        column = ((column + 1) | 0);
                    }
                }
            })(), new StringSegment(this$_2.startIndex + start_1, len, this$_2.underlying, line, column)))))) : ((clo_1 = toFail(printf("Index was out of range (GetSlice(%i, %i)).")), (clo_1_1 = clo_1(start_1), clo_1_1(finish_1))))))), state_1]])) : (new FSharpResult$2(1, [[singleton([(this$_3 = s_1, new Position(this$_3.startLine, this$_3.startColumn)), ofArray([new ErrorType(0, [label_1]), new ErrorType(1, [c])])]), state_1]]));
        }
    });
    p = ((tupledArg_1) => clo_2([void 0, tupledArg_1[1]]));
    p_7 = ((tupledArg_5) => {
        let s_4, matchValue_2;
        const matchValue_3 = Result_MapError((tupledArg_6) => ParseError_sort(tupledArg_6[0], tupledArg_6[1]), p([void 0, tupledArg_5[1]]));
        if (matchValue_3.tag === 0) {
            const matchValue_1_1 = Result_MapError((tupledArg_7) => ParseError_sort(tupledArg_7[0], tupledArg_7[1]), (s_4 = matchValue_3.fields[0][1], (matchValue_2 = Result_MapError((tupledArg_4) => ParseError_sort(tupledArg_4[0], tupledArg_4[1]), CharParsers_eof(void 0, s_4)), (matchValue_2.tag === 1) ? (new FSharpResult$2(0, [[void 0, s_4, matchValue_2.fields[0][1]]])) : (new FSharpResult$2(0, [[some(matchValue_2.fields[0][0]), matchValue_2.fields[0][1], matchValue_2.fields[0][2]]])))));
            return (matchValue_1_1.tag === 0) ? (new FSharpResult$2(0, [[matchValue_3.fields[0][0], matchValue_1_1.fields[0][1], matchValue_1_1.fields[0][2]]])) : (new FSharpResult$2(1, [matchValue_1_1.fields[0]]));
        }
        else {
            return new FSharpResult$2(1, [matchValue_3.fields[0]]);
        }
    });
    escape = ((tupledArg_8) => {
        let _arg;
        const matchValue_4 = Result_MapError((tupledArg_9) => ParseError_sort(tupledArg_9[0], tupledArg_9[1]), p_7([void 0, tupledArg_8[1]]));
        return (matchValue_4.tag === 0) ? (new FSharpResult$2(0, [[(_arg = matchValue_4.fields[0][0], (_arg === "<") ? "&lt" : ((_arg === ">") ? "&gt" : _arg)), matchValue_4.fields[0][1], matchValue_4.fields[0][2]]])) : (new FSharpResult$2(1, [matchValue_4.fields[0]]));
    });
    let normalSnippet;
    let p_34;
    let p_27;
    const stateFromFirstElement = singleton;
    const resultForEmptySequence = void 0;
    let p_21;
    const cond_2 = (c_1) => {
        if (((c_1 !== "\n") && (c_1 !== "<")) && (c_1 !== ">")) {
            return c_1 !== "￿";
        }
        else {
            return false;
        }
    };
    const go = (i_2_mut, tupledArg_10_mut) => {
        let this$_7, this$_6, start_1_1, finish_1_1, len_1, line_1, column_1, clo_3, clo_1_2, this$_8, start_1_2, finish_1_2, len_2, line_2, column_2, clo_4, clo_1_3;
        go:
        while (true) {
            const i_2 = i_2_mut, tupledArg_10 = tupledArg_10_mut;
            const state_15 = tupledArg_10[0];
            const s_10 = tupledArg_10[1];
            let c_2;
            const this$_4 = s_10;
            const index_1 = i_2 | 0;
            c_2 = (((index_1 < 0) ? true : (index_1 >= this$_4.length)) ? "￿" : this$_4.underlying[this$_4.startIndex + index_1]);
            if (i_2 === 0) {
                if (cond_2(c_2)) {
                    i_2_mut = (i_2 + 1);
                    tupledArg_10_mut = [state_15, s_10];
                    continue go;
                }
                else {
                    return new FSharpResult$2(0, [["", s_10, state_15]]);
                }
            }
            else if (cond_2(c_2)) {
                i_2_mut = (i_2 + 1);
                tupledArg_10_mut = [state_15, s_10];
                continue go;
            }
            else {
                return new FSharpResult$2(0, [[(this$_7 = ((this$_6 = s_10, (start_1_1 = 0, (finish_1_1 = ((i_2 - 1) | 0), (((start_1_1 >= 0) && (start_1_1 <= this$_6.length)) && (finish_1_1 < max(comparePrimitives, start_1_1, this$_6.length))) ? ((len_1 = (max(comparePrimitives, 0, (finish_1_1 - start_1_1) + 1) | 0), (line_1 = this$_6.startLine, (column_1 = this$_6.startColumn, ((() => {
                    for (let i_4 = 0; i_4 <= (start_1_1 - 1); i_4++) {
                        if (this$_6.underlying[this$_6.startIndex + i_4] === "\n") {
                            line_1 = ((line_1 + 1) | 0);
                            column_1 = 0;
                        }
                        else {
                            column_1 = ((column_1 + 1) | 0);
                        }
                    }
                })(), new StringSegment(this$_6.startIndex + start_1_1, len_1, this$_6.underlying, line_1, column_1)))))) : ((clo_3 = toFail(printf("Index was out of range (GetSlice(%i, %i)).")), (clo_1_2 = clo_3(start_1_1), clo_1_2(finish_1_1)))))))), substring(this$_7.underlying, this$_7.startIndex, this$_7.length)), (this$_8 = s_10, (start_1_2 = (i_2 | 0), (finish_1_2 = ((this$_8.length - 1) | 0), (((start_1_2 >= 0) && (start_1_2 <= this$_8.length)) && (finish_1_2 < max(comparePrimitives, start_1_2, this$_8.length))) ? ((len_2 = (max(comparePrimitives, 0, (finish_1_2 - start_1_2) + 1) | 0), (line_2 = this$_8.startLine, (column_2 = this$_8.startColumn, ((() => {
                    for (let i_5 = 0; i_5 <= (start_1_2 - 1); i_5++) {
                        if (this$_8.underlying[this$_8.startIndex + i_5] === "\n") {
                            line_2 = ((line_2 + 1) | 0);
                            column_2 = 0;
                        }
                        else {
                            column_2 = ((column_2 + 1) | 0);
                        }
                    }
                })(), new StringSegment(this$_8.startIndex + start_1_2, len_2, this$_8.underlying, line_2, column_2)))))) : ((clo_4 = toFail(printf("Index was out of range (GetSlice(%i, %i)).")), (clo_1_3 = clo_4(start_1_2), clo_1_3(finish_1_2))))))), state_15]]);
            }
            break;
        }
    };
    p_21 = partialApply(1, go, [0]);
    const fp = p_21;
    let ep;
    let p_17;
    let p_14;
    let p_11;
    let clo_7;
    const chars_1 = "<>\n".split("");
    const set$_1 = new Set(chars_1);
    let label_3;
    const arg_1_4 = toList(chars_1);
    const clo_5 = toText(printf("one of %A"));
    label_3 = clo_5(arg_1_4);
    clo_7 = ((tupledArg_12) => {
        let this$_10, this$_11, start_1_3, finish_1_3, len_3, line_3, column_3, clo_6, clo_1_4, this$_12;
        const label_4 = label_3;
        const state_19 = tupledArg_12[0];
        const s_13 = tupledArg_12[1];
        let matchValue_7;
        const this$_9 = s_13;
        const index_2 = 0;
        matchValue_7 = (((index_2 < 0) ? true : (index_2 >= this$_9.length)) ? "￿" : this$_9.underlying[this$_9.startIndex + index_2]);
        if (matchValue_7 === "￿") {
            return new FSharpResult$2(1, [[singleton([(this$_10 = s_13, new Position(this$_10.startLine, this$_10.startColumn)), ofArray([new ErrorType(0, [label_4]), new ErrorType(1, ["EOF"])])]), state_19]]);
        }
        else {
            const c_3 = matchValue_7;
            return set$_1.has(c_3) ? (new FSharpResult$2(0, [[c_3, (this$_11 = s_13, (start_1_3 = 1, (finish_1_3 = ((this$_11.length - 1) | 0), (((start_1_3 >= 0) && (start_1_3 <= this$_11.length)) && (finish_1_3 < max(comparePrimitives, start_1_3, this$_11.length))) ? ((len_3 = (max(comparePrimitives, 0, (finish_1_3 - start_1_3) + 1) | 0), (line_3 = this$_11.startLine, (column_3 = this$_11.startColumn, ((() => {
                for (let i_7 = 0; i_7 <= (start_1_3 - 1); i_7++) {
                    if (this$_11.underlying[this$_11.startIndex + i_7] === "\n") {
                        line_3 = ((line_3 + 1) | 0);
                        column_3 = 0;
                    }
                    else {
                        column_3 = ((column_3 + 1) | 0);
                    }
                }
            })(), new StringSegment(this$_11.startIndex + start_1_3, len_3, this$_11.underlying, line_3, column_3)))))) : ((clo_6 = toFail(printf("Index was out of range (GetSlice(%i, %i)).")), (clo_1_4 = clo_6(start_1_3), clo_1_4(finish_1_3))))))), state_19]])) : (new FSharpResult$2(1, [[singleton([(this$_12 = s_13, new Position(this$_12.startLine, this$_12.startColumn)), ofArray([new ErrorType(0, [label_4]), new ErrorType(1, [c_3])])]), state_19]]));
        }
    });
    p_11 = ((tupledArg_13) => clo_7([void 0, tupledArg_13[1]]));
    p_14 = ((tupledArg_14) => {
        const matchValue_9 = Result_MapError((tupledArg_15) => ParseError_sort(tupledArg_15[0], tupledArg_15[1]), p_11([void 0, tupledArg_14[1]]));
        return (matchValue_9.tag === 0) ? (new FSharpResult$2(0, [[void matchValue_9.fields[0][0], matchValue_9.fields[0][1], matchValue_9.fields[0][2]]])) : (new FSharpResult$2(1, [matchValue_9.fields[0]]));
    });
    p_17 = ((tupledArg_16) => {
        const s_17 = tupledArg_16[1];
        const matchValue_10 = Result_MapError((tupledArg_17) => ParseError_sort(tupledArg_17[0], tupledArg_17[1]), CharParsers_eof(void 0, s_17));
        if (matchValue_10.tag === 1) {
            const matchValue_1_2 = Result_MapError((tupledArg_18) => ParseError_sort(tupledArg_18[0], tupledArg_18[1]), p_14([matchValue_10.fields[0][1], s_17]));
            return (matchValue_1_2.tag === 1) ? (new FSharpResult$2(1, [[append(matchValue_10.fields[0][0], matchValue_1_2.fields[0][0]), matchValue_1_2.fields[0][1]]])) : matchValue_1_2;
        }
        else {
            return matchValue_10;
        }
    });
    ep = ((tupledArg_19) => {
        const s_19 = tupledArg_19[1];
        const matchValue_11 = Result_MapError((tupledArg_20) => ParseError_sort(tupledArg_20[0], tupledArg_20[1]), p_17([void 0, s_19]));
        return (matchValue_11.tag === 1) ? (new FSharpResult$2(1, [matchValue_11.fields[0]])) : (new FSharpResult$2(0, [[void 0, s_19, matchValue_11.fields[0][2]]]));
    });
    const go_1 = (acc_mut, tupledArg_21_mut) => {
        go_1:
        while (true) {
            const acc = acc_mut, tupledArg_21 = tupledArg_21_mut;
            const s_20 = tupledArg_21[1];
            const matchValue_12 = Result_MapError((tupledArg_22) => ParseError_sort(tupledArg_22[0], tupledArg_22[1]), ep([tupledArg_21[0], s_20]));
            if (matchValue_12.tag === 1) {
                const matchValue_1_3 = Result_MapError((tupledArg_23) => ParseError_sort(tupledArg_23[0], tupledArg_23[1]), p_21([matchValue_12.fields[0][1], s_20]));
                if (matchValue_1_3.tag === 1) {
                    return new FSharpResult$2(1, [matchValue_1_3.fields[0]]);
                }
                else {
                    acc_mut = cons(matchValue_1_3.fields[0][0], acc);
                    tupledArg_21_mut = [matchValue_1_3.fields[0][2], matchValue_1_3.fields[0][1]];
                    continue go_1;
                }
            }
            else {
                return new FSharpResult$2(0, [[reverse(acc), matchValue_12.fields[0][1], matchValue_12.fields[0][2]]]);
            }
            break;
        }
    };
    p_27 = ((tupledArg_1_1) => {
        const state_4_1 = tupledArg_1_1[0];
        const s_3_1 = tupledArg_1_1[1];
        if (resultForEmptySequence != null) {
            const matchValue_3_1 = Result_MapError((tupledArg_25) => ParseError_sort(tupledArg_25[0], tupledArg_25[1]), fp([state_4_1, s_3_1]));
            if (matchValue_3_1.tag === 0) {
                return go_1(stateFromFirstElement(matchValue_3_1.fields[0][0]), [matchValue_3_1.fields[0][2], matchValue_3_1.fields[0][1]]);
            }
            else {
                const matchValue_4_1 = Result_MapError((tupledArg_26) => ParseError_sort(tupledArg_26[0], tupledArg_26[1]), ep([state_4_1, s_3_1]));
                return (matchValue_4_1.tag === 1) ? (new FSharpResult$2(1, [matchValue_4_1.fields[0]])) : (new FSharpResult$2(0, [[(resultForEmptySequence == null) ? defaultOf() : resultForEmptySequence(matchValue_4_1.fields[0][0]), matchValue_4_1.fields[0][1], matchValue_4_1.fields[0][2]]]));
            }
        }
        else {
            const matchValue_2_1 = Result_MapError((tupledArg_24) => ParseError_sort(tupledArg_24[0], tupledArg_24[1]), fp([state_4_1, s_3_1]));
            return (matchValue_2_1.tag === 0) ? go_1(stateFromFirstElement(matchValue_2_1.fields[0][0]), [matchValue_2_1.fields[0][2], matchValue_2_1.fields[0][1]]) : (new FSharpResult$2(1, [matchValue_2_1.fields[0]]));
        }
    });
    p_34 = ((tupledArg_30) => {
        let s_23, matchValue_13;
        const matchValue_14 = Result_MapError((tupledArg_31) => ParseError_sort(tupledArg_31[0], tupledArg_31[1]), p_27([void 0, tupledArg_30[1]]));
        if (matchValue_14.tag === 0) {
            const matchValue_1_4 = Result_MapError((tupledArg_32) => ParseError_sort(tupledArg_32[0], tupledArg_32[1]), (s_23 = matchValue_14.fields[0][1], (matchValue_13 = Result_MapError((tupledArg_29) => ParseError_sort(tupledArg_29[0], tupledArg_29[1]), CharParsers_eof(void 0, s_23)), (matchValue_13.tag === 1) ? (new FSharpResult$2(0, [[void 0, s_23, matchValue_13.fields[0][1]]])) : (new FSharpResult$2(0, [[some(matchValue_13.fields[0][0]), matchValue_13.fields[0][1], matchValue_13.fields[0][2]]])))));
            return (matchValue_1_4.tag === 0) ? (new FSharpResult$2(0, [[matchValue_14.fields[0][0], matchValue_1_4.fields[0][1], matchValue_1_4.fields[0][2]]])) : (new FSharpResult$2(1, [matchValue_1_4.fields[0]]));
        }
        else {
            return new FSharpResult$2(1, [matchValue_14.fields[0]]);
        }
    });
    normalSnippet = ((tupledArg_33) => {
        const matchValue_15 = Result_MapError((tupledArg_34) => ParseError_sort(tupledArg_34[0], tupledArg_34[1]), p_34([void 0, tupledArg_33[1]]));
        return (matchValue_15.tag === 0) ? (new FSharpResult$2(0, [[join("", toArray(matchValue_15.fields[0][0])), matchValue_15.fields[0][1], matchValue_15.fields[0][2]]])) : (new FSharpResult$2(1, [matchValue_15.fields[0]]));
    });
    let p_55;
    let p_43;
    let p_40;
    const p_37 = CharParsers_spaces();
    p_40 = ((tupledArg_35) => {
        const matchValue_16 = Result_MapError((tupledArg_36) => ParseError_sort(tupledArg_36[0], tupledArg_36[1]), p_37([void 0, tupledArg_35[1]]));
        if (matchValue_16.tag === 0) {
            const matchValue_1_5 = Result_MapError((tupledArg_37) => ParseError_sort(tupledArg_37[0], tupledArg_37[1]), keywords([matchValue_16.fields[0][2], matchValue_16.fields[0][1]]));
            return (matchValue_1_5.tag === 0) ? (new FSharpResult$2(0, [[matchValue_1_5.fields[0][0], matchValue_1_5.fields[0][1], matchValue_1_5.fields[0][2]]])) : (new FSharpResult$2(1, [matchValue_1_5.fields[0]]));
        }
        else {
            return new FSharpResult$2(1, [matchValue_16.fields[0]]);
        }
    });
    p_43 = ((tupledArg_38) => {
        let this$_13;
        const s_31 = tupledArg_38[1];
        const matchValue_17 = Result_MapError((tupledArg_39) => ParseError_sort(tupledArg_39[0], tupledArg_39[1]), p_40([void 0, s_31]));
        return (matchValue_17.tag === 1) ? (new FSharpResult$2(0, [[void 0, s_31, matchValue_17.fields[0][1]]])) : (new FSharpResult$2(1, [[singleton([(this$_13 = s_31, new Position(this$_13.startLine, this$_13.startColumn)), singleton(new ErrorType(1, ["Keyword detected at start of sequence"]))]), matchValue_17.fields[0][2]]]));
    });
    p_55 = ((tupledArg_47) => {
        let matchValue_19, tupledArg_40, p_45, s_33, matchValue_18, sb, go_2, state_1_13;
        const matchValue_20 = Result_MapError((tupledArg_48) => ParseError_sort(tupledArg_48[0], tupledArg_48[1]), p_43([void 0, tupledArg_47[1]]));
        if (matchValue_20.tag === 0) {
            const matchValue_1_7 = Result_MapError((tupledArg_49) => ParseError_sort(tupledArg_49[0], tupledArg_49[1]), (matchValue_19 = Result_MapError((tupledArg_46) => ParseError_sort(tupledArg_46[0], tupledArg_46[1]), (tupledArg_40 = [void 0, matchValue_20.fields[0][1]], (p_45 = normalSnippet, (s_33 = tupledArg_40[1], (matchValue_18 = Result_MapError((tupledArg_41) => ParseError_sort(tupledArg_41[0], tupledArg_41[1]), p_45([tupledArg_40[0], s_33])), (matchValue_18.tag === 0) ? ((sb = CharParsers_StringBuilder_$ctor_Z721C83C5(matchValue_18.fields[0][0]), (go_2 = ((tupledArg_42_mut) => {
                go_2:
                while (true) {
                    const tupledArg_42 = tupledArg_42_mut;
                    const s_2_5 = tupledArg_42[1];
                    const matchValue_1_6 = Result_MapError((tupledArg_43) => ParseError_sort(tupledArg_43[0], tupledArg_43[1]), escape([tupledArg_42[0], s_2_5]));
                    if (matchValue_1_6.tag === 0) {
                        const matchValue_2_2 = Result_MapError((tupledArg_44) => ParseError_sort(tupledArg_44[0], tupledArg_44[1]), p_45([matchValue_1_6.fields[0][2], matchValue_1_6.fields[0][1]]));
                        if (matchValue_2_2.tag === 1) {
                            return new FSharpResult$2(1, [matchValue_2_2.fields[0]]);
                        }
                        else {
                            CharParsers_StringBuilder__Append_Z721C83C5(sb, matchValue_1_6.fields[0][0]);
                            CharParsers_StringBuilder__Append_Z721C83C5(sb, matchValue_2_2.fields[0][0]);
                            tupledArg_42_mut = [matchValue_2_2.fields[0][2], matchValue_2_2.fields[0][1]];
                            continue go_2;
                        }
                    }
                    else {
                        return new FSharpResult$2(0, [[toString(sb), s_2_5, matchValue_1_6.fields[0][1]]]);
                    }
                    break;
                }
            }), go_2([matchValue_18.fields[0][2], matchValue_18.fields[0][1]])))) : ((state_1_13 = matchValue_18.fields[0][1], new FSharpResult$2(0, [["", s_33, state_1_13]])))))))), (matchValue_19.tag === 0) ? (new FSharpResult$2(0, [[new Sequence(0, [matchValue_19.fields[0][0]]), matchValue_19.fields[0][1], matchValue_19.fields[0][2]]])) : (new FSharpResult$2(1, [matchValue_19.fields[0]]))));
            return (matchValue_1_7.tag === 0) ? (new FSharpResult$2(0, [[matchValue_1_7.fields[0][0], matchValue_1_7.fields[0][1], matchValue_1_7.fields[0][2]]])) : (new FSharpResult$2(1, [matchValue_1_7.fields[0]]));
        }
        else {
            return new FSharpResult$2(1, [matchValue_20.fields[0]]);
        }
    });
    return (tupledArg_50) => {
        const matchValue_21 = Result_MapError((tupledArg_51) => ParseError_sort(tupledArg_51[0], tupledArg_51[1]), p_55([void 0, tupledArg_50[1]]));
        return (matchValue_21.tag === 0) ? (new FSharpResult$2(0, [[new Sequence(0, [matchValue_21.fields[0][0].fields[0].trim()]), matchValue_21.fields[0][1], matchValue_21.fields[0][2]]])) : (new FSharpResult$2(1, [matchValue_21.fields[0]]));
    };
})();

function pKeyWordWithCond(keyword) {
    let p_10;
    let p_4;
    const p = CharParsers_spaces();
    p_4 = ((tupledArg_1) => {
        let tupledArg, str_1, state_1, s_1, length, this$, start_1, finish_1, len, line, column, clo, clo_1, this$_1;
        const matchValue_1 = Result_MapError((tupledArg_2) => ParseError_sort(tupledArg_2[0], tupledArg_2[1]), p([void 0, tupledArg_1[1]]));
        if (matchValue_1.tag === 0) {
            const matchValue_1_1 = Result_MapError((tupledArg_3) => ParseError_sort(tupledArg_3[0], tupledArg_3[1]), (tupledArg = [matchValue_1.fields[0][2], matchValue_1.fields[0][1]], (str_1 = keyword, (state_1 = tupledArg[0], (s_1 = tupledArg[1], StringSegmentModule_startsWith(str_1, s_1) ? (new FSharpResult$2(0, [[void 0, (length = (str_1.length | 0), (this$ = s_1, (start_1 = (length | 0), (finish_1 = ((this$.length - 1) | 0), (((start_1 >= 0) && (start_1 <= this$.length)) && (finish_1 < max(comparePrimitives, start_1, this$.length))) ? ((len = (max(comparePrimitives, 0, (finish_1 - start_1) + 1) | 0), (line = this$.startLine, (column = this$.startColumn, ((() => {
                for (let i = 0; i <= (start_1 - 1); i++) {
                    if (this$.underlying[this$.startIndex + i] === "\n") {
                        line = ((line + 1) | 0);
                        column = 0;
                    }
                    else {
                        column = ((column + 1) | 0);
                    }
                }
            })(), new StringSegment(this$.startIndex + start_1, len, this$.underlying, line, column)))))) : ((clo = toFail(printf("Index was out of range (GetSlice(%i, %i)).")), (clo_1 = clo(start_1), clo_1(finish_1)))))))), state_1]])) : (new FSharpResult$2(1, [[singleton([(this$_1 = s_1, new Position(this$_1.startLine, this$_1.startColumn)), singleton(new ErrorType(0, [("\'" + str_1) + "\'"]))]), state_1]])))))));
            return (matchValue_1_1.tag === 0) ? (new FSharpResult$2(0, [[matchValue_1_1.fields[0][0], matchValue_1_1.fields[0][1], matchValue_1_1.fields[0][2]]])) : (new FSharpResult$2(1, [matchValue_1_1.fields[0]]));
        }
        else {
            return new FSharpResult$2(1, [matchValue_1.fields[0]]);
        }
    });
    p_10 = ((tupledArg_6) => {
        let s_6, matchValue_2, this$_2;
        const matchValue_3 = Result_MapError((tupledArg_7) => ParseError_sort(tupledArg_7[0], tupledArg_7[1]), p_4([void 0, tupledArg_6[1]]));
        if (matchValue_3.tag === 0) {
            const matchValue_1_2 = Result_MapError((tupledArg_8) => ParseError_sort(tupledArg_8[0], tupledArg_8[1]), (s_6 = matchValue_3.fields[0][1], (matchValue_2 = Result_MapError((tupledArg_5) => ParseError_sort(tupledArg_5[0], tupledArg_5[1]), pCondition([void 0, s_6])), (matchValue_2.tag === 1) ? (new FSharpResult$2(1, [[singleton([(this$_2 = s_6, new Position(this$_2.startLine, this$_2.startColumn)), singleton(new ErrorType(0, ["Condition required"]))]), matchValue_2.fields[0][1]]])) : matchValue_2)));
            return (matchValue_1_2.tag === 0) ? (new FSharpResult$2(0, [[matchValue_1_2.fields[0][0], matchValue_1_2.fields[0][1], matchValue_1_2.fields[0][2]]])) : (new FSharpResult$2(1, [matchValue_1_2.fields[0]]));
        }
        else {
            return new FSharpResult$2(1, [matchValue_3.fields[0]]);
        }
    });
    return (tupledArg_14) => {
        let s_14, matchValue_6, state_17, s_11, this$_3, index, this$_4, start_1_1, finish_1_1, len_1, line_1, column_1, clo_2, clo_1_1, this$_5, matchValue_1_3;
        const matchValue_7 = Result_MapError((tupledArg_15) => ParseError_sort(tupledArg_15[0], tupledArg_15[1]), p_10([void 0, tupledArg_14[1]]));
        if (matchValue_7.tag === 0) {
            const matchValue_1_4 = Result_MapError((tupledArg_16) => ParseError_sort(tupledArg_16[0], tupledArg_16[1]), (s_14 = matchValue_7.fields[0][1], (matchValue_6 = Result_MapError((tupledArg_12) => ParseError_sort(tupledArg_12[0], tupledArg_12[1]), (state_17 = (void 0), (s_11 = s_14, (((this$_3 = s_11, (index = 0, ((index < 0) ? true : (index >= this$_3.length)) ? "￿" : this$_3.underlying[this$_3.startIndex + index]))) === "\n") ? (new FSharpResult$2(0, [[void 0, (this$_4 = s_11, (start_1_1 = 1, (finish_1_1 = ((this$_4.length - 1) | 0), (((start_1_1 >= 0) && (start_1_1 <= this$_4.length)) && (finish_1_1 < max(comparePrimitives, start_1_1, this$_4.length))) ? ((len_1 = (max(comparePrimitives, 0, (finish_1_1 - start_1_1) + 1) | 0), (line_1 = this$_4.startLine, (column_1 = this$_4.startColumn, ((() => {
                for (let i_2 = 0; i_2 <= (start_1_1 - 1); i_2++) {
                    if (this$_4.underlying[this$_4.startIndex + i_2] === "\n") {
                        line_1 = ((line_1 + 1) | 0);
                        column_1 = 0;
                    }
                    else {
                        column_1 = ((column_1 + 1) | 0);
                    }
                }
            })(), new StringSegment(this$_4.startIndex + start_1_1, len_1, this$_4.underlying, line_1, column_1)))))) : ((clo_2 = toFail(printf("Index was out of range (GetSlice(%i, %i)).")), (clo_1_1 = clo_2(start_1_1), clo_1_1(finish_1_1))))))), state_17]])) : (new FSharpResult$2(1, [[singleton([(this$_5 = s_11, new Position(this$_5.startLine, this$_5.startColumn)), singleton(new ErrorType(0, ["newline"]))]), state_17]]))))), (matchValue_6.tag === 1) ? ((matchValue_1_3 = Result_MapError((tupledArg_13) => ParseError_sort(tupledArg_13[0], tupledArg_13[1]), CharParsers_eof(void 0, s_14)), (matchValue_1_3.tag === 1) ? (new FSharpResult$2(1, [[append(matchValue_6.fields[0][0], matchValue_1_3.fields[0][0]), matchValue_1_3.fields[0][1]]])) : matchValue_1_3)) : matchValue_6)));
            return (matchValue_1_4.tag === 0) ? (new FSharpResult$2(0, [[matchValue_7.fields[0][0], matchValue_1_4.fields[0][1], matchValue_1_4.fields[0][2]]])) : (new FSharpResult$2(1, [matchValue_1_4.fields[0]]));
        }
        else {
            return new FSharpResult$2(1, [matchValue_7.fields[0]]);
        }
    };
}

function pKeyWord(kw) {
    let p_4;
    const p = CharParsers_spaces();
    p_4 = ((tupledArg_1) => {
        let tupledArg, str_1, state_1, s_1, length, this$, start_1, finish_1, len, line, column, clo, clo_1, this$_1;
        const matchValue_1 = Result_MapError((tupledArg_2) => ParseError_sort(tupledArg_2[0], tupledArg_2[1]), p([tupledArg_1[0], tupledArg_1[1]]));
        if (matchValue_1.tag === 0) {
            const matchValue_1_1 = Result_MapError((tupledArg_3) => ParseError_sort(tupledArg_3[0], tupledArg_3[1]), (tupledArg = [matchValue_1.fields[0][2], matchValue_1.fields[0][1]], (str_1 = kw, (state_1 = tupledArg[0], (s_1 = tupledArg[1], StringSegmentModule_startsWith(str_1, s_1) ? (new FSharpResult$2(0, [[void 0, (length = (str_1.length | 0), (this$ = s_1, (start_1 = (length | 0), (finish_1 = ((this$.length - 1) | 0), (((start_1 >= 0) && (start_1 <= this$.length)) && (finish_1 < max(comparePrimitives, start_1, this$.length))) ? ((len = (max(comparePrimitives, 0, (finish_1 - start_1) + 1) | 0), (line = this$.startLine, (column = this$.startColumn, ((() => {
                for (let i = 0; i <= (start_1 - 1); i++) {
                    if (this$.underlying[this$.startIndex + i] === "\n") {
                        line = ((line + 1) | 0);
                        column = 0;
                    }
                    else {
                        column = ((column + 1) | 0);
                    }
                }
            })(), new StringSegment(this$.startIndex + start_1, len, this$.underlying, line, column)))))) : ((clo = toFail(printf("Index was out of range (GetSlice(%i, %i)).")), (clo_1 = clo(start_1), clo_1(finish_1)))))))), state_1]])) : (new FSharpResult$2(1, [[singleton([(this$_1 = s_1, new Position(this$_1.startLine, this$_1.startColumn)), singleton(new ErrorType(0, [("\'" + str_1) + "\'"]))]), state_1]])))))));
            return (matchValue_1_1.tag === 0) ? (new FSharpResult$2(0, [[matchValue_1_1.fields[0][0], matchValue_1_1.fields[0][1], matchValue_1_1.fields[0][2]]])) : (new FSharpResult$2(1, [matchValue_1_1.fields[0]]));
        }
        else {
            return new FSharpResult$2(1, [matchValue_1.fields[0]]);
        }
    });
    let p_19;
    const stateFromFirstElement = (_arg) => {
    };
    const resultForEmptySequence = () => {
    };
    let p_13;
    let clo_4;
    const chars = " \t".split("");
    const set$ = new Set(chars);
    let label;
    const arg_1_1 = toList(chars);
    const clo_2 = toText(printf("one of %A"));
    label = clo_2(arg_1_1);
    clo_4 = ((tupledArg_4) => {
        let this$_3, this$_4, start_1_1, finish_1_1, len_1, line_1, column_1, clo_3, clo_1_1, this$_5;
        const label_1 = label;
        const state_8 = tupledArg_4[0];
        const s_6 = tupledArg_4[1];
        let matchValue_2;
        const this$_2 = s_6;
        const index = 0;
        matchValue_2 = (((index < 0) ? true : (index >= this$_2.length)) ? "￿" : this$_2.underlying[this$_2.startIndex + index]);
        if (matchValue_2 === "￿") {
            return new FSharpResult$2(1, [[singleton([(this$_3 = s_6, new Position(this$_3.startLine, this$_3.startColumn)), ofArray([new ErrorType(0, [label_1]), new ErrorType(1, ["EOF"])])]), state_8]]);
        }
        else {
            const c = matchValue_2;
            return set$.has(c) ? (new FSharpResult$2(0, [[c, (this$_4 = s_6, (start_1_1 = 1, (finish_1_1 = ((this$_4.length - 1) | 0), (((start_1_1 >= 0) && (start_1_1 <= this$_4.length)) && (finish_1_1 < max(comparePrimitives, start_1_1, this$_4.length))) ? ((len_1 = (max(comparePrimitives, 0, (finish_1_1 - start_1_1) + 1) | 0), (line_1 = this$_4.startLine, (column_1 = this$_4.startColumn, ((() => {
                for (let i_2 = 0; i_2 <= (start_1_1 - 1); i_2++) {
                    if (this$_4.underlying[this$_4.startIndex + i_2] === "\n") {
                        line_1 = ((line_1 + 1) | 0);
                        column_1 = 0;
                    }
                    else {
                        column_1 = ((column_1 + 1) | 0);
                    }
                }
            })(), new StringSegment(this$_4.startIndex + start_1_1, len_1, this$_4.underlying, line_1, column_1)))))) : ((clo_3 = toFail(printf("Index was out of range (GetSlice(%i, %i)).")), (clo_1_1 = clo_3(start_1_1), clo_1_1(finish_1_1))))))), state_8]])) : (new FSharpResult$2(1, [[singleton([(this$_5 = s_6, new Position(this$_5.startLine, this$_5.startColumn)), ofArray([new ErrorType(0, [label_1]), new ErrorType(1, [c])])]), state_8]]));
        }
    });
    p_13 = ((tupledArg_5) => clo_4([tupledArg_5[0], tupledArg_5[1]]));
    const fp = p_13;
    const ep = (tupledArg_11) => {
        let tupledArg_8, s_12, matchValue_6, tupledArg_6, state_13, s_9, this$_6, index_1, this$_7, start_1_2, finish_1_2, len_2, line_2, column_2, clo_5, clo_1_2, this$_8, matchValue_1_2, tupledArg_7;
        const s_14 = tupledArg_11[1];
        const matchValue_7 = Result_MapError((tupledArg_12) => ParseError_sort(tupledArg_12[0], tupledArg_12[1]), (tupledArg_8 = [tupledArg_11[0], s_14], (s_12 = tupledArg_8[1], (matchValue_6 = Result_MapError((tupledArg_9) => ParseError_sort(tupledArg_9[0], tupledArg_9[1]), (tupledArg_6 = [tupledArg_8[0], s_12], (state_13 = tupledArg_6[0], (s_9 = tupledArg_6[1], (((this$_6 = s_9, (index_1 = 0, ((index_1 < 0) ? true : (index_1 >= this$_6.length)) ? "￿" : this$_6.underlying[this$_6.startIndex + index_1]))) === "\n") ? (new FSharpResult$2(0, [[void 0, (this$_7 = s_9, (start_1_2 = 1, (finish_1_2 = ((this$_7.length - 1) | 0), (((start_1_2 >= 0) && (start_1_2 <= this$_7.length)) && (finish_1_2 < max(comparePrimitives, start_1_2, this$_7.length))) ? ((len_2 = (max(comparePrimitives, 0, (finish_1_2 - start_1_2) + 1) | 0), (line_2 = this$_7.startLine, (column_2 = this$_7.startColumn, ((() => {
            for (let i_4 = 0; i_4 <= (start_1_2 - 1); i_4++) {
                if (this$_7.underlying[this$_7.startIndex + i_4] === "\n") {
                    line_2 = ((line_2 + 1) | 0);
                    column_2 = 0;
                }
                else {
                    column_2 = ((column_2 + 1) | 0);
                }
            }
        })(), new StringSegment(this$_7.startIndex + start_1_2, len_2, this$_7.underlying, line_2, column_2)))))) : ((clo_5 = toFail(printf("Index was out of range (GetSlice(%i, %i)).")), (clo_1_2 = clo_5(start_1_2), clo_1_2(finish_1_2))))))), state_13]])) : (new FSharpResult$2(1, [[singleton([(this$_8 = s_9, new Position(this$_8.startLine, this$_8.startColumn)), singleton(new ErrorType(0, ["newline"]))]), state_13]])))))), (matchValue_6.tag === 1) ? ((matchValue_1_2 = Result_MapError((tupledArg_10) => ParseError_sort(tupledArg_10[0], tupledArg_10[1]), (tupledArg_7 = [matchValue_6.fields[0][1], s_12], CharParsers_eof(tupledArg_7[0], tupledArg_7[1]))), (matchValue_1_2.tag === 1) ? (new FSharpResult$2(1, [[append(matchValue_6.fields[0][0], matchValue_1_2.fields[0][0]), matchValue_1_2.fields[0][1]]])) : matchValue_1_2)) : matchValue_6))));
        if (matchValue_7.tag === 1) {
            return new FSharpResult$2(1, [matchValue_7.fields[0]]);
        }
        else {
            return new FSharpResult$2(0, [[void 0, s_14, matchValue_7.fields[0][2]]]);
        }
    };
    const go = (acc_mut, tupledArg_13_mut) => {
        go:
        while (true) {
            const acc = acc_mut, tupledArg_13 = tupledArg_13_mut;
            const s_15 = tupledArg_13[1];
            const matchValue_8 = Result_MapError((tupledArg_14) => ParseError_sort(tupledArg_14[0], tupledArg_14[1]), ep([tupledArg_13[0], s_15]));
            if (matchValue_8.tag === 1) {
                const matchValue_1_3 = Result_MapError((tupledArg_15) => ParseError_sort(tupledArg_15[0], tupledArg_15[1]), p_13([matchValue_8.fields[0][1], s_15]));
                if (matchValue_1_3.tag === 1) {
                    return new FSharpResult$2(1, [matchValue_1_3.fields[0]]);
                }
                else {
                    acc_mut = (void 0);
                    tupledArg_13_mut = [matchValue_1_3.fields[0][2], matchValue_1_3.fields[0][1]];
                    continue go;
                }
            }
            else {
                return new FSharpResult$2(0, [[void 0, matchValue_8.fields[0][1], matchValue_8.fields[0][2]]]);
            }
            break;
        }
    };
    p_19 = ((tupledArg_1_1) => {
        const state_4_1 = tupledArg_1_1[0];
        const s_3_1 = tupledArg_1_1[1];
        if (resultForEmptySequence != null) {
            const matchValue_3_1 = Result_MapError((tupledArg_17) => ParseError_sort(tupledArg_17[0], tupledArg_17[1]), fp([state_4_1, s_3_1]));
            if (matchValue_3_1.tag === 0) {
                return go(stateFromFirstElement(matchValue_3_1.fields[0][0]), [matchValue_3_1.fields[0][2], matchValue_3_1.fields[0][1]]);
            }
            else {
                const matchValue_4_1 = Result_MapError((tupledArg_18) => ParseError_sort(tupledArg_18[0], tupledArg_18[1]), ep([state_4_1, s_3_1]));
                return (matchValue_4_1.tag === 1) ? (new FSharpResult$2(1, [matchValue_4_1.fields[0]])) : (new FSharpResult$2(0, [[(resultForEmptySequence == null) ? defaultOf() : resultForEmptySequence(matchValue_4_1.fields[0][0]), matchValue_4_1.fields[0][1], matchValue_4_1.fields[0][2]]]));
            }
        }
        else {
            const matchValue_2_1 = Result_MapError((tupledArg_16) => ParseError_sort(tupledArg_16[0], tupledArg_16[1]), fp([state_4_1, s_3_1]));
            return (matchValue_2_1.tag === 0) ? go(stateFromFirstElement(matchValue_2_1.fields[0][0]), [matchValue_2_1.fields[0][2], matchValue_2_1.fields[0][1]]) : (new FSharpResult$2(1, [matchValue_2_1.fields[0]]));
        }
    });
    return (tupledArg_19) => {
        const matchValue_9 = Result_MapError((tupledArg_20) => ParseError_sort(tupledArg_20[0], tupledArg_20[1]), p_4([tupledArg_19[0], tupledArg_19[1]]));
        if (matchValue_9.tag === 0) {
            const matchValue_1_4 = Result_MapError((tupledArg_21) => ParseError_sort(tupledArg_21[0], tupledArg_21[1]), p_19([matchValue_9.fields[0][2], matchValue_9.fields[0][1]]));
            return (matchValue_1_4.tag === 0) ? (new FSharpResult$2(0, [[matchValue_9.fields[0][0], matchValue_1_4.fields[0][1], matchValue_1_4.fields[0][2]]])) : (new FSharpResult$2(1, [matchValue_1_4.fields[0]]));
        }
        else {
            return new FSharpResult$2(1, [matchValue_9.fields[0]]);
        }
    };
}

const pElse = (() => {
    let p_35;
    let p_28;
    let p_4;
    const p = pKeyWord("else:");
    p_4 = ((tupledArg_1) => {
        let state_2, s_2, this$, index, this$_1, start_1, finish_1, len, line, column, clo, clo_1, this$_2;
        const matchValue_2 = Result_MapError((tupledArg_2) => ParseError_sort(tupledArg_2[0], tupledArg_2[1]), p([void 0, tupledArg_1[1]]));
        if (matchValue_2.tag === 0) {
            const matchValue_1_1 = Result_MapError((tupledArg_3) => ParseError_sort(tupledArg_3[0], tupledArg_3[1]), (state_2 = (void 0), (s_2 = matchValue_2.fields[0][1], (((this$ = s_2, (index = 0, ((index < 0) ? true : (index >= this$.length)) ? "￿" : this$.underlying[this$.startIndex + index]))) === "\n") ? (new FSharpResult$2(0, [[void 0, (this$_1 = s_2, (start_1 = 1, (finish_1 = ((this$_1.length - 1) | 0), (((start_1 >= 0) && (start_1 <= this$_1.length)) && (finish_1 < max(comparePrimitives, start_1, this$_1.length))) ? ((len = (max(comparePrimitives, 0, (finish_1 - start_1) + 1) | 0), (line = this$_1.startLine, (column = this$_1.startColumn, ((() => {
                for (let i_1 = 0; i_1 <= (start_1 - 1); i_1++) {
                    if (this$_1.underlying[this$_1.startIndex + i_1] === "\n") {
                        line = ((line + 1) | 0);
                        column = 0;
                    }
                    else {
                        column = ((column + 1) | 0);
                    }
                }
            })(), new StringSegment(this$_1.startIndex + start_1, len, this$_1.underlying, line, column)))))) : ((clo = toFail(printf("Index was out of range (GetSlice(%i, %i)).")), (clo_1 = clo(start_1), clo_1(finish_1))))))), state_2]])) : (new FSharpResult$2(1, [[singleton([(this$_2 = s_2, new Position(this$_2.startLine, this$_2.startColumn)), singleton(new ErrorType(0, ["newline"]))]), state_2]])))));
            return (matchValue_1_1.tag === 0) ? (new FSharpResult$2(0, [[matchValue_1_1.fields[0][0], matchValue_1_1.fields[0][1], matchValue_1_1.fields[0][2]]])) : (new FSharpResult$2(1, [matchValue_1_1.fields[0]]));
        }
        else {
            return new FSharpResult$2(1, [matchValue_2.fields[0]]);
        }
    });
    let p_25;
    const stateFromFirstElement = singleton;
    const resultForEmptySequence = empty;
    const p_19 = (tupledArg_5) => {
        let state_10, s_7, this$_3, index_1, this$_4, start_1_1, finish_1_1, len_1, line_1, column_1, clo_2, clo_1_1, this$_5;
        const matchValue_5 = Result_MapError((tupledArg_6) => ParseError_sort(tupledArg_6[0], tupledArg_6[1]), pBlock([void 0, tupledArg_5[1]]));
        if (matchValue_5.tag === 0) {
            const matchValue_1_2 = Result_MapError((tupledArg_7) => ParseError_sort(tupledArg_7[0], tupledArg_7[1]), (state_10 = (void 0), (s_7 = matchValue_5.fields[0][1], (((this$_3 = s_7, (index_1 = 0, ((index_1 < 0) ? true : (index_1 >= this$_3.length)) ? "￿" : this$_3.underlying[this$_3.startIndex + index_1]))) === "\n") ? (new FSharpResult$2(0, [[void 0, (this$_4 = s_7, (start_1_1 = 1, (finish_1_1 = ((this$_4.length - 1) | 0), (((start_1_1 >= 0) && (start_1_1 <= this$_4.length)) && (finish_1_1 < max(comparePrimitives, start_1_1, this$_4.length))) ? ((len_1 = (max(comparePrimitives, 0, (finish_1_1 - start_1_1) + 1) | 0), (line_1 = this$_4.startLine, (column_1 = this$_4.startColumn, ((() => {
                for (let i_3 = 0; i_3 <= (start_1_1 - 1); i_3++) {
                    if (this$_4.underlying[this$_4.startIndex + i_3] === "\n") {
                        line_1 = ((line_1 + 1) | 0);
                        column_1 = 0;
                    }
                    else {
                        column_1 = ((column_1 + 1) | 0);
                    }
                }
            })(), new StringSegment(this$_4.startIndex + start_1_1, len_1, this$_4.underlying, line_1, column_1)))))) : ((clo_2 = toFail(printf("Index was out of range (GetSlice(%i, %i)).")), (clo_1_1 = clo_2(start_1_1), clo_1_1(finish_1_1))))))), state_10]])) : (new FSharpResult$2(1, [[singleton([(this$_5 = s_7, new Position(this$_5.startLine, this$_5.startColumn)), singleton(new ErrorType(0, ["newline"]))]), state_10]])))));
            if (matchValue_1_2.tag === 0) {
                return new FSharpResult$2(0, [[matchValue_5.fields[0][0], matchValue_1_2.fields[0][1], matchValue_1_2.fields[0][2]]]);
            }
            else {
                return new FSharpResult$2(1, [matchValue_1_2.fields[0]]);
            }
        }
        else {
            return new FSharpResult$2(1, [matchValue_5.fields[0]]);
        }
    };
    const fp = p_19;
    let ep;
    let p_15;
    let p_11;
    const p_8 = pKeyWordWithCond("endif:");
    p_11 = ((tupledArg_8) => {
        const matchValue_6 = Result_MapError((tupledArg_9) => ParseError_sort(tupledArg_9[0], tupledArg_9[1]), p_8([void 0, tupledArg_8[1]]));
        return (matchValue_6.tag === 0) ? (new FSharpResult$2(0, [[void matchValue_6.fields[0][0], matchValue_6.fields[0][1], matchValue_6.fields[0][2]]])) : (new FSharpResult$2(1, [matchValue_6.fields[0]]));
    });
    p_15 = ((tupledArg_11) => {
        const s_14 = tupledArg_11[1];
        const matchValue_7 = Result_MapError((tupledArg_12) => ParseError_sort(tupledArg_12[0], tupledArg_12[1]), p_11([void 0, s_14]));
        if (matchValue_7.tag === 1) {
            const matchValue_1_3 = Result_MapError((tupledArg_13) => ParseError_sort(tupledArg_13[0], tupledArg_13[1]), CharParsers_eof(void 0, s_14));
            return (matchValue_1_3.tag === 1) ? (new FSharpResult$2(1, [[append(matchValue_7.fields[0][0], matchValue_1_3.fields[0][0]), matchValue_1_3.fields[0][1]]])) : matchValue_1_3;
        }
        else {
            return matchValue_7;
        }
    });
    ep = ((tupledArg_14) => {
        const s_16 = tupledArg_14[1];
        const matchValue_8 = Result_MapError((tupledArg_15) => ParseError_sort(tupledArg_15[0], tupledArg_15[1]), p_15([void 0, s_16]));
        return (matchValue_8.tag === 1) ? (new FSharpResult$2(1, [matchValue_8.fields[0]])) : (new FSharpResult$2(0, [[void 0, s_16, matchValue_8.fields[0][2]]]));
    });
    const go = (acc_mut, tupledArg_16_mut) => {
        go:
        while (true) {
            const acc = acc_mut, tupledArg_16 = tupledArg_16_mut;
            const s_17 = tupledArg_16[1];
            const matchValue_9 = Result_MapError((tupledArg_17) => ParseError_sort(tupledArg_17[0], tupledArg_17[1]), ep([tupledArg_16[0], s_17]));
            if (matchValue_9.tag === 1) {
                const matchValue_1_4 = Result_MapError((tupledArg_18) => ParseError_sort(tupledArg_18[0], tupledArg_18[1]), p_19([matchValue_9.fields[0][1], s_17]));
                if (matchValue_1_4.tag === 1) {
                    return new FSharpResult$2(1, [matchValue_1_4.fields[0]]);
                }
                else {
                    acc_mut = cons(matchValue_1_4.fields[0][0], acc);
                    tupledArg_16_mut = [matchValue_1_4.fields[0][2], matchValue_1_4.fields[0][1]];
                    continue go;
                }
            }
            else {
                return new FSharpResult$2(0, [[reverse(acc), matchValue_9.fields[0][1], matchValue_9.fields[0][2]]]);
            }
            break;
        }
    };
    p_25 = ((tupledArg_1_1) => {
        const state_4_1 = tupledArg_1_1[0];
        const s_3_1 = tupledArg_1_1[1];
        if (resultForEmptySequence != null) {
            const matchValue_3_1 = Result_MapError((tupledArg_20) => ParseError_sort(tupledArg_20[0], tupledArg_20[1]), fp([state_4_1, s_3_1]));
            if (matchValue_3_1.tag === 0) {
                return go(stateFromFirstElement(matchValue_3_1.fields[0][0]), [matchValue_3_1.fields[0][2], matchValue_3_1.fields[0][1]]);
            }
            else {
                const matchValue_4_1 = Result_MapError((tupledArg_21) => ParseError_sort(tupledArg_21[0], tupledArg_21[1]), ep([state_4_1, s_3_1]));
                return (matchValue_4_1.tag === 1) ? (new FSharpResult$2(1, [matchValue_4_1.fields[0]])) : (new FSharpResult$2(0, [[(resultForEmptySequence == null) ? defaultOf() : resultForEmptySequence(matchValue_4_1.fields[0][0]), matchValue_4_1.fields[0][1], matchValue_4_1.fields[0][2]]]));
            }
        }
        else {
            const matchValue_2_1 = Result_MapError((tupledArg_19) => ParseError_sort(tupledArg_19[0], tupledArg_19[1]), fp([state_4_1, s_3_1]));
            return (matchValue_2_1.tag === 0) ? go(stateFromFirstElement(matchValue_2_1.fields[0][0]), [matchValue_2_1.fields[0][2], matchValue_2_1.fields[0][1]]) : (new FSharpResult$2(1, [matchValue_2_1.fields[0]]));
        }
    });
    p_28 = ((tupledArg_22) => {
        const matchValue_10 = Result_MapError((tupledArg_23) => ParseError_sort(tupledArg_23[0], tupledArg_23[1]), p_4([void 0, tupledArg_22[1]]));
        if (matchValue_10.tag === 0) {
            const matchValue_1_5 = Result_MapError((tupledArg_24) => ParseError_sort(tupledArg_24[0], tupledArg_24[1]), p_25([matchValue_10.fields[0][2], matchValue_10.fields[0][1]]));
            return (matchValue_1_5.tag === 0) ? (new FSharpResult$2(0, [[matchValue_1_5.fields[0][0], matchValue_1_5.fields[0][1], matchValue_1_5.fields[0][2]]])) : (new FSharpResult$2(1, [matchValue_1_5.fields[0]]));
        }
        else {
            return new FSharpResult$2(1, [matchValue_10.fields[0]]);
        }
    });
    let p_32;
    const p_29 = CharParsers_spaces();
    p_32 = ((tupledArg_25) => {
        const matchValue_11 = Result_MapError((tupledArg_26) => ParseError_sort(tupledArg_26[0], tupledArg_26[1]), p_29([void 0, tupledArg_25[1]]));
        return (matchValue_11.tag === 0) ? (new FSharpResult$2(0, [[empty(), matchValue_11.fields[0][1], matchValue_11.fields[0][2]]])) : (new FSharpResult$2(1, [matchValue_11.fields[0]]));
    });
    p_35 = ((tupledArg_27) => {
        const s_23 = tupledArg_27[1];
        const matchValue_12 = Result_MapError((tupledArg_28) => ParseError_sort(tupledArg_28[0], tupledArg_28[1]), p_28([void 0, s_23]));
        if (matchValue_12.tag === 1) {
            const matchValue_1_6 = Result_MapError((tupledArg_29) => ParseError_sort(tupledArg_29[0], tupledArg_29[1]), p_32([matchValue_12.fields[0][1], s_23]));
            return (matchValue_1_6.tag === 1) ? (new FSharpResult$2(1, [[append(matchValue_12.fields[0][0], matchValue_1_6.fields[0][0]), matchValue_1_6.fields[0][1]]])) : matchValue_1_6;
        }
        else {
            return matchValue_12;
        }
    });
    return (tupledArg_30) => {
        const matchValue_13 = Result_MapError((tupledArg_31) => ParseError_sort(tupledArg_31[0], tupledArg_31[1]), p_35([void 0, tupledArg_30[1]]));
        return (matchValue_13.tag === 0) ? (new FSharpResult$2(0, [[filter((arg_3) => (!isEmptySequence(arg_3)), matchValue_13.fields[0][0]), matchValue_13.fields[0][1], matchValue_13.fields[0][2]]])) : (new FSharpResult$2(1, [matchValue_13.fields[0]]));
    };
})();

const pIf = (() => {
    let pIfBody;
    let p_15;
    let sep;
    let p_7;
    const p_3 = pKeyWord("endif:");
    const p_4 = pKeyWord("else:");
    p_7 = ((tupledArg_4) => {
        const s_6 = tupledArg_4[1];
        const matchValue_3 = Result_MapError((tupledArg_5) => ParseError_sort(tupledArg_5[0], tupledArg_5[1]), p_3([void 0, s_6]));
        if (matchValue_3.tag === 1) {
            const matchValue_1_2 = Result_MapError((tupledArg_6) => ParseError_sort(tupledArg_6[0], tupledArg_6[1]), p_4([matchValue_3.fields[0][1], s_6]));
            return (matchValue_1_2.tag === 1) ? (new FSharpResult$2(1, [[append(matchValue_3.fields[0][0], matchValue_1_2.fields[0][0]), matchValue_1_2.fields[0][1]]])) : matchValue_1_2;
        }
        else {
            return matchValue_3;
        }
    });
    sep = ((tupledArg_7) => {
        let this$_3;
        const s_8 = tupledArg_7[1];
        const matchValue_4 = Result_MapError((tupledArg_8) => ParseError_sort(tupledArg_8[0], tupledArg_8[1]), p_7([void 0, s_8]));
        return (matchValue_4.tag === 1) ? (new FSharpResult$2(0, [[void 0, s_8, matchValue_4.fields[0][1]]])) : (new FSharpResult$2(1, [[singleton([(this$_3 = s_8, new Position(this$_3.startLine, this$_3.startColumn)), singleton(new ErrorType(2, ["notFollowedBy failed"]))]), matchValue_4.fields[0][2]]]));
    });
    const resultFromState = reverse;
    const resultForEmptySequence = empty;
    const p_11 = (tupledArg_1) => {
        let state_2, s_2, this$, index, this$_1, start_1, finish_1, len, line, column, clo, clo_1, this$_2;
        const matchValue_2 = Result_MapError((tupledArg_2) => ParseError_sort(tupledArg_2[0], tupledArg_2[1]), pBlock([void 0, tupledArg_1[1]]));
        if (matchValue_2.tag === 0) {
            const matchValue_1_1 = Result_MapError((tupledArg_3) => ParseError_sort(tupledArg_3[0], tupledArg_3[1]), (state_2 = (void 0), (s_2 = matchValue_2.fields[0][1], (((this$ = s_2, (index = 0, ((index < 0) ? true : (index >= this$.length)) ? "￿" : this$.underlying[this$.startIndex + index]))) === "\n") ? (new FSharpResult$2(0, [[void 0, (this$_1 = s_2, (start_1 = 1, (finish_1 = ((this$_1.length - 1) | 0), (((start_1 >= 0) && (start_1 <= this$_1.length)) && (finish_1 < max(comparePrimitives, start_1, this$_1.length))) ? ((len = (max(comparePrimitives, 0, (finish_1 - start_1) + 1) | 0), (line = this$_1.startLine, (column = this$_1.startColumn, ((() => {
                for (let i_1 = 0; i_1 <= (start_1 - 1); i_1++) {
                    if (this$_1.underlying[this$_1.startIndex + i_1] === "\n") {
                        line = ((line + 1) | 0);
                        column = 0;
                    }
                    else {
                        column = ((column + 1) | 0);
                    }
                }
            })(), new StringSegment(this$_1.startIndex + start_1, len, this$_1.underlying, line, column)))))) : ((clo = toFail(printf("Index was out of range (GetSlice(%i, %i)).")), (clo_1 = clo(start_1), clo_1(finish_1))))))), state_2]])) : (new FSharpResult$2(1, [[singleton([(this$_2 = s_2, new Position(this$_2.startLine, this$_2.startColumn)), singleton(new ErrorType(0, ["newline"]))]), state_2]])))));
            if (matchValue_1_1.tag === 0) {
                return new FSharpResult$2(0, [[matchValue_2.fields[0][0], matchValue_1_1.fields[0][1], matchValue_1_1.fields[0][2]]]);
            }
            else {
                return new FSharpResult$2(1, [matchValue_1_1.fields[0]]);
            }
        }
        else {
            return new FSharpResult$2(1, [matchValue_2.fields[0]]);
        }
    };
    const go = (acc_mut, tupledArg_9_mut) => {
        go:
        while (true) {
            const acc = acc_mut, tupledArg_9 = tupledArg_9_mut;
            const s_9 = tupledArg_9[1];
            const matchValue_5 = Result_MapError((tupledArg_10) => ParseError_sort(tupledArg_10[0], tupledArg_10[1]), sep([tupledArg_9[0], s_9]));
            if (matchValue_5.tag === 0) {
                const s_1_2 = matchValue_5.fields[0][1];
                const matchValue_1_3 = Result_MapError((tupledArg_11) => ParseError_sort(tupledArg_11[0], tupledArg_11[1]), p_11([matchValue_5.fields[0][2], s_1_2]));
                if (matchValue_1_3.tag === 0) {
                    acc_mut = cons(matchValue_1_3.fields[0][0], acc);
                    tupledArg_9_mut = [matchValue_1_3.fields[0][2], matchValue_1_3.fields[0][1]];
                    continue go;
                }
                else {
                    const state_3_1 = matchValue_1_3.fields[0][1];
                    return new FSharpResult$2(0, [[resultFromState(acc), s_1_2, state_3_1]]);
                }
            }
            else {
                return new FSharpResult$2(0, [[resultFromState(acc), s_9, matchValue_5.fields[0][1]]]);
            }
            break;
        }
    };
    p_15 = ((tupledArg_1_1) => {
        const s_3_1 = tupledArg_1_1[1];
        const matchValue_2_1 = Result_MapError((tupledArg_12) => ParseError_sort(tupledArg_12[0], tupledArg_12[1]), p_11([tupledArg_1_1[0], s_3_1]));
        if (matchValue_2_1.tag === 0) {
            return go(singleton(matchValue_2_1.fields[0][0]), [matchValue_2_1.fields[0][2], matchValue_2_1.fields[0][1]]);
        }
        else {
            const state_6_1 = matchValue_2_1.fields[0][1];
            return (resultForEmptySequence == null) ? (new FSharpResult$2(1, [[matchValue_2_1.fields[0][0], state_6_1]])) : (new FSharpResult$2(0, [[(resultForEmptySequence == null) ? defaultOf() : resultForEmptySequence(), s_3_1, state_6_1]]));
        }
    });
    let p_19;
    const p_16 = CharParsers_spaces();
    p_19 = ((tupledArg_13) => {
        const matchValue_6 = Result_MapError((tupledArg_14) => ParseError_sort(tupledArg_14[0], tupledArg_14[1]), p_16([void 0, tupledArg_13[1]]));
        return (matchValue_6.tag === 0) ? (new FSharpResult$2(0, [[empty(), matchValue_6.fields[0][1], matchValue_6.fields[0][2]]])) : (new FSharpResult$2(1, [matchValue_6.fields[0]]));
    });
    pIfBody = ((tupledArg_15) => {
        const s_13 = tupledArg_15[1];
        const matchValue_7 = Result_MapError((tupledArg_16) => ParseError_sort(tupledArg_16[0], tupledArg_16[1]), p_15([void 0, s_13]));
        if (matchValue_7.tag === 1) {
            const matchValue_1_4 = Result_MapError((tupledArg_17) => ParseError_sort(tupledArg_17[0], tupledArg_17[1]), p_19([matchValue_7.fields[0][1], s_13]));
            return (matchValue_1_4.tag === 1) ? (new FSharpResult$2(1, [[append(matchValue_7.fields[0][0], matchValue_1_4.fields[0][0]), matchValue_1_4.fields[0][1]]])) : matchValue_1_4;
        }
        else {
            return matchValue_7;
        }
    });
    let p1_4;
    const p_22 = pKeyWordWithCond("if:");
    let p_26;
    const p_23 = pKeyWord("if:");
    p_26 = ((tupledArg_18) => {
        const matchValue_8 = Result_MapError((tupledArg_19) => ParseError_sort(tupledArg_19[0], tupledArg_19[1]), p_23([void 0, tupledArg_18[1]]));
        return (matchValue_8.tag === 0) ? (new FSharpResult$2(0, [[new Sequence(0, [""]), matchValue_8.fields[0][1], matchValue_8.fields[0][2]]])) : (new FSharpResult$2(1, [matchValue_8.fields[0]]));
    });
    p1_4 = ((tupledArg_20) => {
        const s_17 = tupledArg_20[1];
        const matchValue_9 = Result_MapError((tupledArg_21) => ParseError_sort(tupledArg_21[0], tupledArg_21[1]), p_22([void 0, s_17]));
        if (matchValue_9.tag === 1) {
            const matchValue_1_5 = Result_MapError((tupledArg_22) => ParseError_sort(tupledArg_22[0], tupledArg_22[1]), p_26([matchValue_9.fields[0][1], s_17]));
            return (matchValue_1_5.tag === 1) ? (new FSharpResult$2(1, [[append(matchValue_9.fields[0][0], matchValue_1_5.fields[0][0]), matchValue_1_5.fields[0][1]]])) : matchValue_1_5;
        }
        else {
            return matchValue_9;
        }
    });
    let p4;
    const p_31 = pKeyWordWithCond("endif:");
    const label = blockNotClosedError("if");
    p4 = ((tupledArg_25) => {
        let this$_4;
        const s_21 = tupledArg_25[1];
        const matchValue_11 = Result_MapError((tupledArg_26) => ParseError_sort(tupledArg_26[0], tupledArg_26[1]), p_31([void 0, s_21]));
        return (matchValue_11.tag === 1) ? (new FSharpResult$2(1, [[singleton([(this$_4 = s_21, new Position(this$_4.startLine, this$_4.startColumn)), singleton(new ErrorType(0, [label]))]), matchValue_11.fields[0][1]]])) : matchValue_11;
    });
    return (tupledArg_4_1) => {
        let tupledArg_3_1, matchValue_14, tupledArg_2_1, matchValue_13, s_19, matchValue_10, tupledArg_1_2, matchValue_12, x_7;
        const matchValue_15 = Result_MapError((tupledArg_34) => ParseError_sort(tupledArg_34[0], tupledArg_34[1]), p1_4([tupledArg_4_1[0], tupledArg_4_1[1]]));
        return (matchValue_15.tag === 0) ? Result_MapError((tupledArg_35) => ParseError_sort(tupledArg_35[0], tupledArg_35[1]), (tupledArg_3_1 = [matchValue_15.fields[0][2], matchValue_15.fields[0][1]], (matchValue_14 = Result_MapError((tupledArg_32) => ParseError_sort(tupledArg_32[0], tupledArg_32[1]), pIfBody([tupledArg_3_1[0], tupledArg_3_1[1]])), (matchValue_14.tag === 0) ? Result_MapError((tupledArg_33) => ParseError_sort(tupledArg_33[0], tupledArg_33[1]), (tupledArg_2_1 = [matchValue_14.fields[0][2], matchValue_14.fields[0][1]], (matchValue_13 = Result_MapError((tupledArg_30) => ParseError_sort(tupledArg_30[0], tupledArg_30[1]), (s_19 = tupledArg_2_1[1], (matchValue_10 = Result_MapError((tupledArg_24) => ParseError_sort(tupledArg_24[0], tupledArg_24[1]), pElse([void 0, s_19])), (matchValue_10.tag === 1) ? (new FSharpResult$2(0, [[void 0, s_19, matchValue_10.fields[0][1]]])) : (new FSharpResult$2(0, [[matchValue_10.fields[0][0], matchValue_10.fields[0][1], matchValue_10.fields[0][2]]]))))), (matchValue_13.tag === 0) ? Result_MapError((tupledArg_31) => ParseError_sort(tupledArg_31[0], tupledArg_31[1]), (tupledArg_1_2 = [matchValue_13.fields[0][2], matchValue_13.fields[0][1]], (matchValue_12 = Result_MapError((tupledArg_28) => ParseError_sort(tupledArg_28[0], tupledArg_28[1]), p4([tupledArg_1_2[0], tupledArg_1_2[1]])), (matchValue_12.tag === 0) ? Result_MapError((tupledArg_29) => ParseError_sort(tupledArg_29[0], tupledArg_29[1]), ((x_7 = (new If(matchValue_15.fields[0][0], filter((arg_2) => (!isEmptySequence(arg_2)), matchValue_14.fields[0][0]), matchValue_13.fields[0][0])), (tupledArg_27) => (new FSharpResult$2(0, [[x_7, tupledArg_27[1], tupledArg_27[0]]]))))([matchValue_12.fields[0][2], matchValue_12.fields[0][1]])) : (new FSharpResult$2(1, [matchValue_12.fields[0]]))))) : (new FSharpResult$2(1, [matchValue_13.fields[0]]))))) : (new FSharpResult$2(1, [matchValue_14.fields[0]]))))) : (new FSharpResult$2(1, [matchValue_15.fields[0]]));
    };
})();

const pThread = (() => {
    const errorMsg = blockNotClosedError("concurrent");
    let p_28;
    let p_25;
    let p_4;
    const p = pKeyWordWithCond("thread:");
    p_4 = ((tupledArg_1) => {
        let state_2, s_2, this$, index, this$_1, start_1, finish_1, len, line, column, clo, clo_1, this$_2;
        const matchValue_2 = Result_MapError((tupledArg_2) => ParseError_sort(tupledArg_2[0], tupledArg_2[1]), p([void 0, tupledArg_1[1]]));
        if (matchValue_2.tag === 0) {
            const matchValue_1_1 = Result_MapError((tupledArg_3) => ParseError_sort(tupledArg_3[0], tupledArg_3[1]), (state_2 = (void 0), (s_2 = matchValue_2.fields[0][1], (((this$ = s_2, (index = 0, ((index < 0) ? true : (index >= this$.length)) ? "￿" : this$.underlying[this$.startIndex + index]))) === "\n") ? (new FSharpResult$2(0, [[void 0, (this$_1 = s_2, (start_1 = 1, (finish_1 = ((this$_1.length - 1) | 0), (((start_1 >= 0) && (start_1 <= this$_1.length)) && (finish_1 < max(comparePrimitives, start_1, this$_1.length))) ? ((len = (max(comparePrimitives, 0, (finish_1 - start_1) + 1) | 0), (line = this$_1.startLine, (column = this$_1.startColumn, ((() => {
                for (let i_1 = 0; i_1 <= (start_1 - 1); i_1++) {
                    if (this$_1.underlying[this$_1.startIndex + i_1] === "\n") {
                        line = ((line + 1) | 0);
                        column = 0;
                    }
                    else {
                        column = ((column + 1) | 0);
                    }
                }
            })(), new StringSegment(this$_1.startIndex + start_1, len, this$_1.underlying, line, column)))))) : ((clo = toFail(printf("Index was out of range (GetSlice(%i, %i)).")), (clo_1 = clo(start_1), clo_1(finish_1))))))), state_2]])) : (new FSharpResult$2(1, [[singleton([(this$_2 = s_2, new Position(this$_2.startLine, this$_2.startColumn)), singleton(new ErrorType(0, ["newline"]))]), state_2]])))));
            return (matchValue_1_1.tag === 0) ? (new FSharpResult$2(0, [[matchValue_1_1.fields[0][0], matchValue_1_1.fields[0][1], matchValue_1_1.fields[0][2]]])) : (new FSharpResult$2(1, [matchValue_1_1.fields[0]]));
        }
        else {
            return new FSharpResult$2(1, [matchValue_2.fields[0]]);
        }
    });
    let p_22;
    const stateFromFirstElement = singleton;
    const resultForEmptySequence = empty;
    const p_16 = (tupledArg_5) => {
        let state_10, s_7, this$_3, index_1, this$_4, start_1_1, finish_1_1, len_1, line_1, column_1, clo_2, clo_1_1, this$_5;
        const matchValue_5 = Result_MapError((tupledArg_6) => ParseError_sort(tupledArg_6[0], tupledArg_6[1]), pBlock([void 0, tupledArg_5[1]]));
        if (matchValue_5.tag === 0) {
            const matchValue_1_2 = Result_MapError((tupledArg_7) => ParseError_sort(tupledArg_7[0], tupledArg_7[1]), (state_10 = (void 0), (s_7 = matchValue_5.fields[0][1], (((this$_3 = s_7, (index_1 = 0, ((index_1 < 0) ? true : (index_1 >= this$_3.length)) ? "￿" : this$_3.underlying[this$_3.startIndex + index_1]))) === "\n") ? (new FSharpResult$2(0, [[void 0, (this$_4 = s_7, (start_1_1 = 1, (finish_1_1 = ((this$_4.length - 1) | 0), (((start_1_1 >= 0) && (start_1_1 <= this$_4.length)) && (finish_1_1 < max(comparePrimitives, start_1_1, this$_4.length))) ? ((len_1 = (max(comparePrimitives, 0, (finish_1_1 - start_1_1) + 1) | 0), (line_1 = this$_4.startLine, (column_1 = this$_4.startColumn, ((() => {
                for (let i_3 = 0; i_3 <= (start_1_1 - 1); i_3++) {
                    if (this$_4.underlying[this$_4.startIndex + i_3] === "\n") {
                        line_1 = ((line_1 + 1) | 0);
                        column_1 = 0;
                    }
                    else {
                        column_1 = ((column_1 + 1) | 0);
                    }
                }
            })(), new StringSegment(this$_4.startIndex + start_1_1, len_1, this$_4.underlying, line_1, column_1)))))) : ((clo_2 = toFail(printf("Index was out of range (GetSlice(%i, %i)).")), (clo_1_1 = clo_2(start_1_1), clo_1_1(finish_1_1))))))), state_10]])) : (new FSharpResult$2(1, [[singleton([(this$_5 = s_7, new Position(this$_5.startLine, this$_5.startColumn)), singleton(new ErrorType(0, ["newline"]))]), state_10]])))));
            if (matchValue_1_2.tag === 0) {
                return new FSharpResult$2(0, [[matchValue_5.fields[0][0], matchValue_1_2.fields[0][1], matchValue_1_2.fields[0][2]]]);
            }
            else {
                return new FSharpResult$2(1, [matchValue_1_2.fields[0]]);
            }
        }
        else {
            return new FSharpResult$2(1, [matchValue_5.fields[0]]);
        }
    };
    const fp = p_16;
    let ep;
    let p_12;
    const p_8 = pKeyWord("endconcurrent:");
    const p_9 = pKeyWord("thread:");
    p_12 = ((tupledArg_8) => {
        const s_11 = tupledArg_8[1];
        const matchValue_6 = Result_MapError((tupledArg_9) => ParseError_sort(tupledArg_9[0], tupledArg_9[1]), p_8([void 0, s_11]));
        if (matchValue_6.tag === 1) {
            const matchValue_1_3 = Result_MapError((tupledArg_10) => ParseError_sort(tupledArg_10[0], tupledArg_10[1]), p_9([matchValue_6.fields[0][1], s_11]));
            return (matchValue_1_3.tag === 1) ? (new FSharpResult$2(1, [[append(matchValue_6.fields[0][0], matchValue_1_3.fields[0][0]), matchValue_1_3.fields[0][1]]])) : matchValue_1_3;
        }
        else {
            return matchValue_6;
        }
    });
    ep = ((tupledArg_11) => {
        const s_13 = tupledArg_11[1];
        const matchValue_7 = Result_MapError((tupledArg_12) => ParseError_sort(tupledArg_12[0], tupledArg_12[1]), p_12([void 0, s_13]));
        return (matchValue_7.tag === 1) ? (new FSharpResult$2(1, [matchValue_7.fields[0]])) : (new FSharpResult$2(0, [[void 0, s_13, matchValue_7.fields[0][2]]]));
    });
    const go = (acc_mut, tupledArg_13_mut) => {
        go:
        while (true) {
            const acc = acc_mut, tupledArg_13 = tupledArg_13_mut;
            const s_14 = tupledArg_13[1];
            const matchValue_8 = Result_MapError((tupledArg_14) => ParseError_sort(tupledArg_14[0], tupledArg_14[1]), ep([tupledArg_13[0], s_14]));
            if (matchValue_8.tag === 1) {
                const matchValue_1_4 = Result_MapError((tupledArg_15) => ParseError_sort(tupledArg_15[0], tupledArg_15[1]), p_16([matchValue_8.fields[0][1], s_14]));
                if (matchValue_1_4.tag === 1) {
                    return new FSharpResult$2(1, [matchValue_1_4.fields[0]]);
                }
                else {
                    acc_mut = cons(matchValue_1_4.fields[0][0], acc);
                    tupledArg_13_mut = [matchValue_1_4.fields[0][2], matchValue_1_4.fields[0][1]];
                    continue go;
                }
            }
            else {
                return new FSharpResult$2(0, [[reverse(acc), matchValue_8.fields[0][1], matchValue_8.fields[0][2]]]);
            }
            break;
        }
    };
    p_22 = ((tupledArg_1_1) => {
        const state_4_1 = tupledArg_1_1[0];
        const s_3_1 = tupledArg_1_1[1];
        if (resultForEmptySequence != null) {
            const matchValue_3_1 = Result_MapError((tupledArg_17) => ParseError_sort(tupledArg_17[0], tupledArg_17[1]), fp([state_4_1, s_3_1]));
            if (matchValue_3_1.tag === 0) {
                return go(stateFromFirstElement(matchValue_3_1.fields[0][0]), [matchValue_3_1.fields[0][2], matchValue_3_1.fields[0][1]]);
            }
            else {
                const matchValue_4_1 = Result_MapError((tupledArg_18) => ParseError_sort(tupledArg_18[0], tupledArg_18[1]), ep([state_4_1, s_3_1]));
                return (matchValue_4_1.tag === 1) ? (new FSharpResult$2(1, [matchValue_4_1.fields[0]])) : (new FSharpResult$2(0, [[(resultForEmptySequence == null) ? defaultOf() : resultForEmptySequence(matchValue_4_1.fields[0][0]), matchValue_4_1.fields[0][1], matchValue_4_1.fields[0][2]]]));
            }
        }
        else {
            const matchValue_2_1 = Result_MapError((tupledArg_16) => ParseError_sort(tupledArg_16[0], tupledArg_16[1]), fp([state_4_1, s_3_1]));
            return (matchValue_2_1.tag === 0) ? go(stateFromFirstElement(matchValue_2_1.fields[0][0]), [matchValue_2_1.fields[0][2], matchValue_2_1.fields[0][1]]) : (new FSharpResult$2(1, [matchValue_2_1.fields[0]]));
        }
    });
    p_25 = ((tupledArg_19) => {
        const matchValue_9 = Result_MapError((tupledArg_20) => ParseError_sort(tupledArg_20[0], tupledArg_20[1]), p_4([void 0, tupledArg_19[1]]));
        if (matchValue_9.tag === 0) {
            const matchValue_1_5 = Result_MapError((tupledArg_21) => ParseError_sort(tupledArg_21[0], tupledArg_21[1]), p_22([matchValue_9.fields[0][2], matchValue_9.fields[0][1]]));
            return (matchValue_1_5.tag === 0) ? (new FSharpResult$2(0, [[matchValue_1_5.fields[0][0], matchValue_1_5.fields[0][1], matchValue_1_5.fields[0][2]]])) : (new FSharpResult$2(1, [matchValue_1_5.fields[0]]));
        }
        else {
            return new FSharpResult$2(1, [matchValue_9.fields[0]]);
        }
    });
    p_28 = ((tupledArg_22) => {
        let this$_6;
        const s_18 = tupledArg_22[1];
        const matchValue_10 = Result_MapError((tupledArg_23) => ParseError_sort(tupledArg_23[0], tupledArg_23[1]), p_25([void 0, s_18]));
        return (matchValue_10.tag === 1) ? (new FSharpResult$2(1, [[singleton([(this$_6 = s_18, new Position(this$_6.startLine, this$_6.startColumn)), singleton(new ErrorType(0, [errorMsg]))]), matchValue_10.fields[0][1]]])) : matchValue_10;
    });
    return (tupledArg_24) => {
        const matchValue_11 = Result_MapError((tupledArg_25) => ParseError_sort(tupledArg_25[0], tupledArg_25[1]), p_28([void 0, tupledArg_24[1]]));
        return (matchValue_11.tag === 0) ? (new FSharpResult$2(0, [[filter((_arg_2) => {
            if (_arg_2.tag === 9) {
                return !(_arg_2.fields[0].fields[0] === "");
            }
            else {
                return true;
            }
        }, matchValue_11.fields[0][0]), matchValue_11.fields[0][1], matchValue_11.fields[0][2]]])) : (new FSharpResult$2(1, [matchValue_11.fields[0]]));
    };
})();

const pConcurrent = (() => {
    const errorMsg = blockNotClosedError("concurrent");
    let p_24;
    let p_21;
    const p = pKeyWordWithCond("concurrent:");
    let p_18;
    let sep;
    let p_9;
    const p_6 = pKeyWord("endconcurrent:");
    p_9 = ((tupledArg_5) => {
        let this$;
        const s_5 = tupledArg_5[1];
        const matchValue_2 = Result_MapError((tupledArg_6) => ParseError_sort(tupledArg_6[0], tupledArg_6[1]), p_6([void 0, s_5]));
        return (matchValue_2.tag === 1) ? (new FSharpResult$2(0, [[void 0, s_5, matchValue_2.fields[0][1]]])) : (new FSharpResult$2(1, [[singleton([(this$ = s_5, new Position(this$.startLine, this$.startColumn)), singleton(new ErrorType(2, ["notFollowedBy failed"]))]), matchValue_2.fields[0][2]]]));
    });
    sep = ((tupledArg_8) => {
        let state_13, s_8, this$_1, index, this$_2, start_1, finish_1, len, line, column, clo, clo_1, this$_3;
        const matchValue_5 = Result_MapError((tupledArg_9) => ParseError_sort(tupledArg_9[0], tupledArg_9[1]), p_9([void 0, tupledArg_8[1]]));
        if (matchValue_5.tag === 0) {
            const matchValue_1_2 = Result_MapError((tupledArg_10) => ParseError_sort(tupledArg_10[0], tupledArg_10[1]), (state_13 = (void 0), (s_8 = matchValue_5.fields[0][1], (((this$_1 = s_8, (index = 0, ((index < 0) ? true : (index >= this$_1.length)) ? "￿" : this$_1.underlying[this$_1.startIndex + index]))) === "\n") ? (new FSharpResult$2(0, [[void 0, (this$_2 = s_8, (start_1 = 1, (finish_1 = ((this$_2.length - 1) | 0), (((start_1 >= 0) && (start_1 <= this$_2.length)) && (finish_1 < max(comparePrimitives, start_1, this$_2.length))) ? ((len = (max(comparePrimitives, 0, (finish_1 - start_1) + 1) | 0), (line = this$_2.startLine, (column = this$_2.startColumn, ((() => {
                for (let i_1 = 0; i_1 <= (start_1 - 1); i_1++) {
                    if (this$_2.underlying[this$_2.startIndex + i_1] === "\n") {
                        line = ((line + 1) | 0);
                        column = 0;
                    }
                    else {
                        column = ((column + 1) | 0);
                    }
                }
            })(), new StringSegment(this$_2.startIndex + start_1, len, this$_2.underlying, line, column)))))) : ((clo = toFail(printf("Index was out of range (GetSlice(%i, %i)).")), (clo_1 = clo(start_1), clo_1(finish_1))))))), state_13]])) : (new FSharpResult$2(1, [[singleton([(this$_3 = s_8, new Position(this$_3.startLine, this$_3.startColumn)), singleton(new ErrorType(0, ["newline"]))]), state_13]])))));
            return (matchValue_1_2.tag === 0) ? (new FSharpResult$2(0, [[matchValue_1_2.fields[0][0], matchValue_1_2.fields[0][1], matchValue_1_2.fields[0][2]]])) : (new FSharpResult$2(1, [matchValue_1_2.fields[0]]));
        }
        else {
            return new FSharpResult$2(1, [matchValue_5.fields[0]]);
        }
    });
    const resultFromState = reverse;
    const resultForEmptySequence = empty;
    const p_14 = (tupledArg_2) => {
        let matchValue;
        const s_3 = tupledArg_2[1];
        const matchValue_1 = Result_MapError((tupledArg_3) => ParseError_sort(tupledArg_3[0], tupledArg_3[1]), pThread([void 0, s_3]));
        if (matchValue_1.tag === 1) {
            const matchValue_1_1 = Result_MapError((tupledArg_4) => ParseError_sort(tupledArg_4[0], tupledArg_4[1]), (matchValue = Result_MapError((tupledArg_1) => ParseError_sort(tupledArg_1[0], tupledArg_1[1]), pBlock([void 0, s_3])), (matchValue.tag === 0) ? (new FSharpResult$2(0, [[singleton(matchValue.fields[0][0]), matchValue.fields[0][1], matchValue.fields[0][2]]])) : (new FSharpResult$2(1, [matchValue.fields[0]]))));
            if (matchValue_1_1.tag === 1) {
                return new FSharpResult$2(1, [[append(matchValue_1.fields[0][0], matchValue_1_1.fields[0][0]), matchValue_1_1.fields[0][1]]]);
            }
            else {
                return matchValue_1_1;
            }
        }
        else {
            return matchValue_1;
        }
    };
    const go = (acc_mut, tupledArg_11_mut) => {
        go:
        while (true) {
            const acc = acc_mut, tupledArg_11 = tupledArg_11_mut;
            const s_11 = tupledArg_11[1];
            const matchValue_6 = Result_MapError((tupledArg_12) => ParseError_sort(tupledArg_12[0], tupledArg_12[1]), sep([tupledArg_11[0], s_11]));
            if (matchValue_6.tag === 0) {
                const s_1_3 = matchValue_6.fields[0][1];
                const matchValue_1_3 = Result_MapError((tupledArg_13) => ParseError_sort(tupledArg_13[0], tupledArg_13[1]), p_14([matchValue_6.fields[0][2], s_1_3]));
                if (matchValue_1_3.tag === 0) {
                    acc_mut = cons(matchValue_1_3.fields[0][0], acc);
                    tupledArg_11_mut = [matchValue_1_3.fields[0][2], matchValue_1_3.fields[0][1]];
                    continue go;
                }
                else {
                    const state_3_1 = matchValue_1_3.fields[0][1];
                    return new FSharpResult$2(0, [[resultFromState(acc), s_1_3, state_3_1]]);
                }
            }
            else {
                return new FSharpResult$2(0, [[resultFromState(acc), s_11, matchValue_6.fields[0][1]]]);
            }
            break;
        }
    };
    p_18 = ((tupledArg_1_1) => {
        const s_3_1 = tupledArg_1_1[1];
        const matchValue_2_1 = Result_MapError((tupledArg_14) => ParseError_sort(tupledArg_14[0], tupledArg_14[1]), p_14([tupledArg_1_1[0], s_3_1]));
        if (matchValue_2_1.tag === 0) {
            return go(singleton(matchValue_2_1.fields[0][0]), [matchValue_2_1.fields[0][2], matchValue_2_1.fields[0][1]]);
        }
        else {
            const state_6_1 = matchValue_2_1.fields[0][1];
            return (resultForEmptySequence == null) ? (new FSharpResult$2(1, [[matchValue_2_1.fields[0][0], state_6_1]])) : (new FSharpResult$2(0, [[(resultForEmptySequence == null) ? defaultOf() : resultForEmptySequence(), s_3_1, state_6_1]]));
        }
    });
    p_21 = ((tupledArg_15) => {
        const matchValue_7 = Result_MapError((tupledArg_16) => ParseError_sort(tupledArg_16[0], tupledArg_16[1]), p([void 0, tupledArg_15[1]]));
        if (matchValue_7.tag === 0) {
            const matchValue_1_4 = Result_MapError((tupledArg_17) => ParseError_sort(tupledArg_17[0], tupledArg_17[1]), p_18([matchValue_7.fields[0][2], matchValue_7.fields[0][1]]));
            return (matchValue_1_4.tag === 0) ? (new FSharpResult$2(0, [[matchValue_1_4.fields[0][0], matchValue_1_4.fields[0][1], matchValue_1_4.fields[0][2]]])) : (new FSharpResult$2(1, [matchValue_1_4.fields[0]]));
        }
        else {
            return new FSharpResult$2(1, [matchValue_7.fields[0]]);
        }
    });
    p_24 = ((tupledArg_18) => {
        const matchValue_8 = Result_MapError((tupledArg_19) => ParseError_sort(tupledArg_19[0], tupledArg_19[1]), p_21([void 0, tupledArg_18[1]]));
        return (matchValue_8.tag === 0) ? (new FSharpResult$2(0, [[new Concurrent(matchValue_8.fields[0][0]), matchValue_8.fields[0][1], matchValue_8.fields[0][2]]])) : (new FSharpResult$2(1, [matchValue_8.fields[0]]));
    });
    let p_39;
    const p_25 = CharParsers_spaces();
    let p_36;
    let p_33;
    let p_29;
    const p_26 = pKeyWordWithCond("endconcurrent:");
    p_29 = ((tupledArg_20) => {
        const matchValue_9 = Result_MapError((tupledArg_21) => ParseError_sort(tupledArg_21[0], tupledArg_21[1]), p_26([void 0, tupledArg_20[1]]));
        return (matchValue_9.tag === 0) ? (new FSharpResult$2(0, [[void 0, matchValue_9.fields[0][1], matchValue_9.fields[0][2]]])) : (new FSharpResult$2(1, [matchValue_9.fields[0]]));
    });
    p_33 = ((tupledArg_23) => {
        let tupledArg_22, str_1, state_34, s_19, length_2, this$_4, start_1_1, finish_1_1, len_1, line_1, column_1, clo_2, clo_1_1, this$_5;
        const s_22 = tupledArg_23[1];
        const matchValue_11 = Result_MapError((tupledArg_24) => ParseError_sort(tupledArg_24[0], tupledArg_24[1]), p_29([void 0, s_22]));
        if (matchValue_11.tag === 1) {
            const matchValue_1_5 = Result_MapError((tupledArg_25) => ParseError_sort(tupledArg_25[0], tupledArg_25[1]), (tupledArg_22 = [matchValue_11.fields[0][1], s_22], (str_1 = "endconcurrent:", (state_34 = tupledArg_22[0], (s_19 = tupledArg_22[1], StringSegmentModule_startsWith(str_1, s_19) ? (new FSharpResult$2(0, [[void 0, (length_2 = (str_1.length | 0), (this$_4 = s_19, (start_1_1 = (length_2 | 0), (finish_1_1 = ((this$_4.length - 1) | 0), (((start_1_1 >= 0) && (start_1_1 <= this$_4.length)) && (finish_1_1 < max(comparePrimitives, start_1_1, this$_4.length))) ? ((len_1 = (max(comparePrimitives, 0, (finish_1_1 - start_1_1) + 1) | 0), (line_1 = this$_4.startLine, (column_1 = this$_4.startColumn, ((() => {
                for (let i_2 = 0; i_2 <= (start_1_1 - 1); i_2++) {
                    if (this$_4.underlying[this$_4.startIndex + i_2] === "\n") {
                        line_1 = ((line_1 + 1) | 0);
                        column_1 = 0;
                    }
                    else {
                        column_1 = ((column_1 + 1) | 0);
                    }
                }
            })(), new StringSegment(this$_4.startIndex + start_1_1, len_1, this$_4.underlying, line_1, column_1)))))) : ((clo_2 = toFail(printf("Index was out of range (GetSlice(%i, %i)).")), (clo_1_1 = clo_2(start_1_1), clo_1_1(finish_1_1)))))))), state_34]])) : (new FSharpResult$2(1, [[singleton([(this$_5 = s_19, new Position(this$_5.startLine, this$_5.startColumn)), singleton(new ErrorType(0, [("\'" + str_1) + "\'"]))]), state_34]])))))));
            return (matchValue_1_5.tag === 1) ? (new FSharpResult$2(1, [[append(matchValue_11.fields[0][0], matchValue_1_5.fields[0][0]), matchValue_1_5.fields[0][1]]])) : matchValue_1_5;
        }
        else {
            return matchValue_11;
        }
    });
    p_36 = ((tupledArg_26) => {
        let this$_6;
        const s_24 = tupledArg_26[1];
        const matchValue_12 = Result_MapError((tupledArg_27) => ParseError_sort(tupledArg_27[0], tupledArg_27[1]), p_33([void 0, s_24]));
        return (matchValue_12.tag === 1) ? (new FSharpResult$2(1, [[singleton([(this$_6 = s_24, new Position(this$_6.startLine, this$_6.startColumn)), singleton(new ErrorType(0, [errorMsg]))]), matchValue_12.fields[0][1]]])) : matchValue_12;
    });
    p_39 = ((tupledArg_28) => {
        const matchValue_13 = Result_MapError((tupledArg_29) => ParseError_sort(tupledArg_29[0], tupledArg_29[1]), p_25([void 0, tupledArg_28[1]]));
        if (matchValue_13.tag === 0) {
            const matchValue_1_6 = Result_MapError((tupledArg_30) => ParseError_sort(tupledArg_30[0], tupledArg_30[1]), p_36([matchValue_13.fields[0][2], matchValue_13.fields[0][1]]));
            return (matchValue_1_6.tag === 0) ? (new FSharpResult$2(0, [[matchValue_1_6.fields[0][0], matchValue_1_6.fields[0][1], matchValue_1_6.fields[0][2]]])) : (new FSharpResult$2(1, [matchValue_1_6.fields[0]]));
        }
        else {
            return new FSharpResult$2(1, [matchValue_13.fields[0]]);
        }
    });
    return (tupledArg_31) => {
        const matchValue_14 = Result_MapError((tupledArg_32) => ParseError_sort(tupledArg_32[0], tupledArg_32[1]), p_24([void 0, tupledArg_31[1]]));
        if (matchValue_14.tag === 0) {
            const matchValue_1_7 = Result_MapError((tupledArg_33) => ParseError_sort(tupledArg_33[0], tupledArg_33[1]), p_39([matchValue_14.fields[0][2], matchValue_14.fields[0][1]]));
            return (matchValue_1_7.tag === 0) ? (new FSharpResult$2(0, [[matchValue_14.fields[0][0], matchValue_1_7.fields[0][1], matchValue_1_7.fields[0][2]]])) : (new FSharpResult$2(1, [matchValue_1_7.fields[0]]));
        }
        else {
            return new FSharpResult$2(1, [matchValue_14.fields[0]]);
        }
    };
})();

function pAnyLoop(keyword, kind, withEndCond) {
    const errorMsg = blockNotClosedError(keyword);
    let loopCond;
    let p_3;
    const p = pKeyWordWithCond(keyword);
    p_3 = ((tupledArg) => {
        const matchValue = Result_MapError((tupledArg_1) => ParseError_sort(tupledArg_1[0], tupledArg_1[1]), p([void 0, tupledArg[1]]));
        return (matchValue.tag === 0) ? (new FSharpResult$2(0, [[matchValue.fields[0][0], matchValue.fields[0][1], matchValue.fields[0][2]]])) : (new FSharpResult$2(1, [matchValue.fields[0]]));
    });
    let p_7;
    const p_4 = pKeyWord(keyword);
    p_7 = ((tupledArg_2) => {
        const matchValue_1 = Result_MapError((tupledArg_3) => ParseError_sort(tupledArg_3[0], tupledArg_3[1]), p_4([void 0, tupledArg_2[1]]));
        return (matchValue_1.tag === 0) ? (new FSharpResult$2(0, [[void 0, matchValue_1.fields[0][1], matchValue_1.fields[0][2]]])) : (new FSharpResult$2(1, [matchValue_1.fields[0]]));
    });
    loopCond = ((tupledArg_4) => {
        const s_5 = tupledArg_4[1];
        const matchValue_2 = Result_MapError((tupledArg_5) => ParseError_sort(tupledArg_5[0], tupledArg_5[1]), p_3([void 0, s_5]));
        if (matchValue_2.tag === 1) {
            const matchValue_1_1 = Result_MapError((tupledArg_6) => ParseError_sort(tupledArg_6[0], tupledArg_6[1]), p_7([matchValue_2.fields[0][1], s_5]));
            return (matchValue_1_1.tag === 1) ? (new FSharpResult$2(1, [[append(matchValue_2.fields[0][0], matchValue_1_1.fields[0][0]), matchValue_1_1.fields[0][1]]])) : matchValue_1_1;
        }
        else {
            return matchValue_2;
        }
    });
    let loopEndCond;
    let p_13;
    const p_10 = pKeyWordWithCond(`end${keyword}`);
    p_13 = ((tupledArg_7) => {
        let s_6;
        const matchValue_3 = Result_MapError((tupledArg_8) => ParseError_sort(tupledArg_8[0], tupledArg_8[1]), p_10([void 0, tupledArg_7[1]]));
        return (matchValue_3.tag === 0) ? (new FSharpResult$2(0, [[(s_6 = matchValue_3.fields[0][0], (isEmptySequence(new Block(9, [s_6])) && withEndCond) ? (void 0) : s_6), matchValue_3.fields[0][1], matchValue_3.fields[0][2]]])) : (new FSharpResult$2(1, [matchValue_3.fields[0]]));
    });
    loopEndCond = ((tupledArg_9) => {
        let this$;
        const s_10 = tupledArg_9[1];
        const matchValue_4 = Result_MapError((tupledArg_10) => ParseError_sort(tupledArg_10[0], tupledArg_10[1]), p_13([void 0, s_10]));
        return (matchValue_4.tag === 1) ? (new FSharpResult$2(1, [[singleton([(this$ = s_10, new Position(this$.startLine, this$.startColumn)), singleton(new ErrorType(0, [errorMsg]))]), matchValue_4.fields[0][1]]])) : matchValue_4;
    });
    let p2_2;
    const resultFromState = reverse;
    const resultForEmptySequence = empty;
    const p_23 = pBlock;
    const go = (acc_mut, tupledArg_17_mut) => {
        let matchValue_8, s_12, matchValue_5, this$_1, matchValue_1_2, state_23, s_15, this$_2, index, this$_3, start_1, finish_1, len, line, column, clo, clo_1, this$_4;
        go:
        while (true) {
            const acc = acc_mut, tupledArg_17 = tupledArg_17_mut;
            const s_18 = tupledArg_17[1];
            const matchValue_9 = Result_MapError((tupledArg_18) => ParseError_sort(tupledArg_18[0], tupledArg_18[1]), (matchValue_8 = Result_MapError((tupledArg_15) => ParseError_sort(tupledArg_15[0], tupledArg_15[1]), (s_12 = s_18, (matchValue_5 = Result_MapError((tupledArg_12) => ParseError_sort(tupledArg_12[0], tupledArg_12[1]), loopEndCond([void 0, s_12])), (matchValue_5.tag === 1) ? (new FSharpResult$2(0, [[void 0, s_12, matchValue_5.fields[0][1]]])) : (new FSharpResult$2(1, [[singleton([(this$_1 = s_12, new Position(this$_1.startLine, this$_1.startColumn)), singleton(new ErrorType(2, ["notFollowedBy failed"]))]), matchValue_5.fields[0][2]]]))))), (matchValue_8.tag === 0) ? ((matchValue_1_2 = Result_MapError((tupledArg_16) => ParseError_sort(tupledArg_16[0], tupledArg_16[1]), (state_23 = (void 0), (s_15 = matchValue_8.fields[0][1], (((this$_2 = s_15, (index = 0, ((index < 0) ? true : (index >= this$_2.length)) ? "￿" : this$_2.underlying[this$_2.startIndex + index]))) === "\n") ? (new FSharpResult$2(0, [[void 0, (this$_3 = s_15, (start_1 = 1, (finish_1 = ((this$_3.length - 1) | 0), (((start_1 >= 0) && (start_1 <= this$_3.length)) && (finish_1 < max(comparePrimitives, start_1, this$_3.length))) ? ((len = (max(comparePrimitives, 0, (finish_1 - start_1) + 1) | 0), (line = this$_3.startLine, (column = this$_3.startColumn, ((() => {
                for (let i_1 = 0; i_1 <= (start_1 - 1); i_1++) {
                    if (this$_3.underlying[this$_3.startIndex + i_1] === "\n") {
                        line = ((line + 1) | 0);
                        column = 0;
                    }
                    else {
                        column = ((column + 1) | 0);
                    }
                }
            })(), new StringSegment(this$_3.startIndex + start_1, len, this$_3.underlying, line, column)))))) : ((clo = toFail(printf("Index was out of range (GetSlice(%i, %i)).")), (clo_1 = clo(start_1), clo_1(finish_1))))))), state_23]])) : (new FSharpResult$2(1, [[singleton([(this$_4 = s_15, new Position(this$_4.startLine, this$_4.startColumn)), singleton(new ErrorType(0, ["newline"]))]), state_23]]))))), (matchValue_1_2.tag === 0) ? (new FSharpResult$2(0, [[matchValue_1_2.fields[0][0], matchValue_1_2.fields[0][1], matchValue_1_2.fields[0][2]]])) : (new FSharpResult$2(1, [matchValue_1_2.fields[0]])))) : (new FSharpResult$2(1, [matchValue_8.fields[0]]))));
            if (matchValue_9.tag === 0) {
                const s_1_5 = matchValue_9.fields[0][1];
                const matchValue_1_3 = Result_MapError((tupledArg_19) => ParseError_sort(tupledArg_19[0], tupledArg_19[1]), p_23([matchValue_9.fields[0][2], s_1_5]));
                if (matchValue_1_3.tag === 0) {
                    acc_mut = cons(matchValue_1_3.fields[0][0], acc);
                    tupledArg_17_mut = [matchValue_1_3.fields[0][2], matchValue_1_3.fields[0][1]];
                    continue go;
                }
                else {
                    const state_3_1 = matchValue_1_3.fields[0][1];
                    return new FSharpResult$2(0, [[resultFromState(acc), s_1_5, state_3_1]]);
                }
            }
            else {
                return new FSharpResult$2(0, [[resultFromState(acc), s_18, matchValue_9.fields[0][1]]]);
            }
            break;
        }
    };
    p2_2 = ((tupledArg_1_1) => {
        const s_3_1 = tupledArg_1_1[1];
        const matchValue_2_1 = Result_MapError((tupledArg_20) => ParseError_sort(tupledArg_20[0], tupledArg_20[1]), p_23([tupledArg_1_1[0], s_3_1]));
        if (matchValue_2_1.tag === 0) {
            return go(singleton(matchValue_2_1.fields[0][0]), [matchValue_2_1.fields[0][2], matchValue_2_1.fields[0][1]]);
        }
        else {
            const state_6_1 = matchValue_2_1.fields[0][1];
            return (resultForEmptySequence == null) ? (new FSharpResult$2(1, [[matchValue_2_1.fields[0][0], state_6_1]])) : (new FSharpResult$2(0, [[(resultForEmptySequence == null) ? defaultOf() : resultForEmptySequence(), s_3_1, state_6_1]]));
        }
    });
    return (tupledArg_3_1) => {
        let tupledArg_2_1, matchValue_11, tupledArg_1_2, matchValue_10, x_6;
        const matchValue_12 = Result_MapError((tupledArg_26) => ParseError_sort(tupledArg_26[0], tupledArg_26[1]), loopCond([tupledArg_3_1[0], tupledArg_3_1[1]]));
        return (matchValue_12.tag === 0) ? Result_MapError((tupledArg_27) => ParseError_sort(tupledArg_27[0], tupledArg_27[1]), (tupledArg_2_1 = [matchValue_12.fields[0][2], matchValue_12.fields[0][1]], (matchValue_11 = Result_MapError((tupledArg_24) => ParseError_sort(tupledArg_24[0], tupledArg_24[1]), p2_2([tupledArg_2_1[0], tupledArg_2_1[1]])), (matchValue_11.tag === 0) ? Result_MapError((tupledArg_25) => ParseError_sort(tupledArg_25[0], tupledArg_25[1]), (tupledArg_1_2 = [matchValue_11.fields[0][2], matchValue_11.fields[0][1]], (matchValue_10 = Result_MapError((tupledArg_22) => ParseError_sort(tupledArg_22[0], tupledArg_22[1]), loopEndCond([tupledArg_1_2[0], tupledArg_1_2[1]])), (matchValue_10.tag === 0) ? Result_MapError((tupledArg_23) => ParseError_sort(tupledArg_23[0], tupledArg_23[1]), ((x_6 = (new Loop(kind, matchValue_12.fields[0][0], matchValue_11.fields[0][0], matchValue_10.fields[0][0])), (tupledArg_21) => (new FSharpResult$2(0, [[x_6, tupledArg_21[1], tupledArg_21[0]]]))))([matchValue_10.fields[0][2], matchValue_10.fields[0][1]])) : (new FSharpResult$2(1, [matchValue_10.fields[0]]))))) : (new FSharpResult$2(1, [matchValue_11.fields[0]]))))) : (new FSharpResult$2(1, [matchValue_12.fields[0]]));
    };
}

const pLoop = (() => {
    const ps = ofArray([pAnyLoop("loop:", new loops(1, []), true), pAnyLoop("for:", new loops(0, []), false)]);
    return (tupledArg) => {
        const s_1 = tupledArg[1];
        const go = (state_1_1_mut, errorsAcc_mut, _arg_mut) => {
            let this$;
            go:
            while (true) {
                const state_1_1 = state_1_1_mut, errorsAcc = errorsAcc_mut, _arg = _arg_mut;
                if (!isEmpty(_arg)) {
                    if (isEmpty(tail(_arg))) {
                        const matchValue = Result_MapError((tupledArg_1) => ParseError_sort(tupledArg_1[0], tupledArg_1[1]), head(_arg)([state_1_1, s_1]));
                        if (matchValue.tag === 1) {
                            return new FSharpResult$2(1, [[append(errorsAcc, matchValue.fields[0][0]), matchValue.fields[0][1]]]);
                        }
                        else {
                            return matchValue;
                        }
                    }
                    else {
                        const matchValue_1 = Result_MapError((tupledArg_2) => ParseError_sort(tupledArg_2[0], tupledArg_2[1]), head(_arg)([state_1_1, s_1]));
                        if (matchValue_1.tag === 1) {
                            state_1_1_mut = matchValue_1.fields[0][1];
                            errorsAcc_mut = append(matchValue_1.fields[0][0], errorsAcc);
                            _arg_mut = tail(_arg);
                            continue go;
                        }
                        else {
                            return matchValue_1;
                        }
                    }
                }
                else {
                    return new FSharpResult$2(1, [[singleton([(this$ = s_1, new Position(this$.startLine, this$.startColumn)), singleton(new ErrorType(2, ["No parsers given"]))]), state_1_1]]);
                }
                break;
            }
        };
        return go(void 0, empty(), ps);
    };
})();

function pSingleLineInstruction(keyword, blockType) {
    let p_3;
    let p;
    const str = keyword;
    p = ((tupledArg) => {
        let length, this$, start_1, finish_1, len, line, column, clo, clo_1, this$_1;
        const str_1 = str;
        const state_1 = tupledArg[0];
        const s_1 = tupledArg[1];
        return StringSegmentModule_startsWith(str_1, s_1) ? (new FSharpResult$2(0, [[str, (length = (str_1.length | 0), (this$ = s_1, (start_1 = (length | 0), (finish_1 = ((this$.length - 1) | 0), (((start_1 >= 0) && (start_1 <= this$.length)) && (finish_1 < max(comparePrimitives, start_1, this$.length))) ? ((len = (max(comparePrimitives, 0, (finish_1 - start_1) + 1) | 0), (line = this$.startLine, (column = this$.startColumn, ((() => {
            for (let i = 0; i <= (start_1 - 1); i++) {
                if (this$.underlying[this$.startIndex + i] === "\n") {
                    line = ((line + 1) | 0);
                    column = 0;
                }
                else {
                    column = ((column + 1) | 0);
                }
            }
        })(), new StringSegment(this$.startIndex + start_1, len, this$.underlying, line, column)))))) : ((clo = toFail(printf("Index was out of range (GetSlice(%i, %i)).")), (clo_1 = clo(start_1), clo_1(finish_1)))))))), state_1]])) : (new FSharpResult$2(1, [[singleton([(this$_1 = s_1, new Position(this$_1.startLine, this$_1.startColumn)), singleton(new ErrorType(0, [("\'" + str_1) + "\'"]))]), state_1]]));
    });
    p_3 = ((tupledArg_1) => {
        const matchValue_1 = Result_MapError((tupledArg_2) => ParseError_sort(tupledArg_2[0], tupledArg_2[1]), p([void 0, tupledArg_1[1]]));
        if (matchValue_1.tag === 0) {
            const matchValue_1_1 = Result_MapError((tupledArg_3) => ParseError_sort(tupledArg_3[0], tupledArg_3[1]), pSequence([matchValue_1.fields[0][2], matchValue_1.fields[0][1]]));
            return (matchValue_1_1.tag === 0) ? (new FSharpResult$2(0, [[matchValue_1_1.fields[0][0], matchValue_1_1.fields[0][1], matchValue_1_1.fields[0][2]]])) : (new FSharpResult$2(1, [matchValue_1_1.fields[0]]));
        }
        else {
            return new FSharpResult$2(1, [matchValue_1.fields[0]]);
        }
    });
    return (tupledArg_4) => {
        const matchValue_2 = Result_MapError((tupledArg_5) => ParseError_sort(tupledArg_5[0], tupledArg_5[1]), p_3([void 0, tupledArg_4[1]]));
        return (matchValue_2.tag === 0) ? (new FSharpResult$2(0, [[blockType(matchValue_2.fields[0][0].fields[0]), matchValue_2.fields[0][1], matchValue_2.fields[0][2]]])) : (new FSharpResult$2(1, [matchValue_2.fields[0]]));
    };
}

const pCaption = (() => {
    let p_3;
    let p;
    const str = "caption:";
    p = ((tupledArg) => {
        let length, this$, start_1, finish_1, len, line, column, clo, clo_1, this$_1;
        const str_1 = str;
        const state_1 = tupledArg[0];
        const s_1 = tupledArg[1];
        return StringSegmentModule_startsWith(str_1, s_1) ? (new FSharpResult$2(0, [[str, (length = (str_1.length | 0), (this$ = s_1, (start_1 = (length | 0), (finish_1 = ((this$.length - 1) | 0), (((start_1 >= 0) && (start_1 <= this$.length)) && (finish_1 < max(comparePrimitives, start_1, this$.length))) ? ((len = (max(comparePrimitives, 0, (finish_1 - start_1) + 1) | 0), (line = this$.startLine, (column = this$.startColumn, ((() => {
            for (let i = 0; i <= (start_1 - 1); i++) {
                if (this$.underlying[this$.startIndex + i] === "\n") {
                    line = ((line + 1) | 0);
                    column = 0;
                }
                else {
                    column = ((column + 1) | 0);
                }
            }
        })(), new StringSegment(this$.startIndex + start_1, len, this$.underlying, line, column)))))) : ((clo = toFail(printf("Index was out of range (GetSlice(%i, %i)).")), (clo_1 = clo(start_1), clo_1(finish_1)))))))), state_1]])) : (new FSharpResult$2(1, [[singleton([(this$_1 = s_1, new Position(this$_1.startLine, this$_1.startColumn)), singleton(new ErrorType(0, [("\'" + str_1) + "\'"]))]), state_1]]));
    });
    p_3 = ((tupledArg_1) => {
        const matchValue_1 = Result_MapError((tupledArg_2) => ParseError_sort(tupledArg_2[0], tupledArg_2[1]), p([void 0, tupledArg_1[1]]));
        if (matchValue_1.tag === 0) {
            const matchValue_1_1 = Result_MapError((tupledArg_3) => ParseError_sort(tupledArg_3[0], tupledArg_3[1]), pSequence([matchValue_1.fields[0][2], matchValue_1.fields[0][1]]));
            return (matchValue_1_1.tag === 0) ? (new FSharpResult$2(0, [[matchValue_1_1.fields[0][0], matchValue_1_1.fields[0][1], matchValue_1_1.fields[0][2]]])) : (new FSharpResult$2(1, [matchValue_1_1.fields[0]]));
        }
        else {
            return new FSharpResult$2(1, [matchValue_1.fields[0]]);
        }
    });
    return (tupledArg_4) => {
        const matchValue_2 = Result_MapError((tupledArg_5) => ParseError_sort(tupledArg_5[0], tupledArg_5[1]), p_3([void 0, tupledArg_4[1]]));
        return (matchValue_2.tag === 0) ? (new FSharpResult$2(0, [[new Block(0, [matchValue_2.fields[0][0].fields[0]]), matchValue_2.fields[0][1], matchValue_2.fields[0][2]]])) : (new FSharpResult$2(1, [matchValue_2.fields[0]]));
    };
})();

const pBreak = pSingleLineInstruction("break:", (arg) => (new Block(3, [arg])));

const pExit = pSingleLineInstruction("exit:", (arg) => (new Block(8, [arg])));

const pCall = pSingleLineInstruction("call:", (arg) => (new Block(6, [arg])));

const pReturn = pSingleLineInstruction("return:", (arg) => (new Block(7, [arg])));

pBlockRef.contents = (() => {
    let p;
    let cond;
    let clo;
    const set$ = new Set(" \t".split(""));
    clo = ((c) => set$.has(c));
    cond = (clo);
    const go = (i_mut, tupledArg_mut) => {
        let this$_2, start_1, finish_1, len, line, column, clo_1, clo_1_1;
        go:
        while (true) {
            const i = i_mut, tupledArg = tupledArg_mut;
            const state = tupledArg[0];
            const s = tupledArg[1];
            let c_1;
            const this$ = s;
            const index = i | 0;
            c_1 = (((index < 0) ? true : (index >= this$.length)) ? "￿" : this$.underlying[this$.startIndex + index]);
            if (i === 0) {
                if (cond(c_1)) {
                    i_mut = (i + 1);
                    tupledArg_mut = [state, s];
                    continue go;
                }
                else {
                    return new FSharpResult$2(0, [[void 0, s, state]]);
                }
            }
            else if (cond(c_1)) {
                i_mut = (i + 1);
                tupledArg_mut = [state, s];
                continue go;
            }
            else {
                return new FSharpResult$2(0, [[void 0, (this$_2 = s, (start_1 = (i | 0), (finish_1 = ((this$_2.length - 1) | 0), (((start_1 >= 0) && (start_1 <= this$_2.length)) && (finish_1 < max(comparePrimitives, start_1, this$_2.length))) ? ((len = (max(comparePrimitives, 0, (finish_1 - start_1) + 1) | 0), (line = this$_2.startLine, (column = this$_2.startColumn, ((() => {
                    for (let i_2 = 0; i_2 <= (start_1 - 1); i_2++) {
                        if (this$_2.underlying[this$_2.startIndex + i_2] === "\n") {
                            line = ((line + 1) | 0);
                            column = 0;
                        }
                        else {
                            column = ((column + 1) | 0);
                        }
                    }
                })(), new StringSegment(this$_2.startIndex + start_1, len, this$_2.underlying, line, column)))))) : ((clo_1 = toFail(printf("Index was out of range (GetSlice(%i, %i)).")), (clo_1_1 = clo_1(start_1), clo_1_1(finish_1))))))), state]]);
            }
            break;
        }
    };
    p = partialApply(1, go, [0]);
    return (tupledArg_12) => {
        let s_10, go_1;
        const matchValue_6 = Result_MapError((tupledArg_13) => ParseError_sort(tupledArg_13[0], tupledArg_13[1]), p([void 0, tupledArg_12[1]]));
        if (matchValue_6.tag === 0) {
            const matchValue_1_2 = Result_MapError((tupledArg_14) => ParseError_sort(tupledArg_14[0], tupledArg_14[1]), (s_10 = matchValue_6.fields[0][1], (go_1 = ((state_1_5_mut, errorsAcc_mut, _arg_mut) => {
                let this$_3;
                go_1:
                while (true) {
                    const state_1_5 = state_1_5_mut, errorsAcc = errorsAcc_mut, _arg = _arg_mut;
                    if (!isEmpty(_arg)) {
                        if (isEmpty(tail(_arg))) {
                            const matchValue_5 = Result_MapError((tupledArg_10) => ParseError_sort(tupledArg_10[0], tupledArg_10[1]), head(_arg)([state_1_5, s_10]));
                            if (matchValue_5.tag === 1) {
                                return new FSharpResult$2(1, [[append(errorsAcc, matchValue_5.fields[0][0]), matchValue_5.fields[0][1]]]);
                            }
                            else {
                                return matchValue_5;
                            }
                        }
                        else {
                            const matchValue_1_1 = Result_MapError((tupledArg_11) => ParseError_sort(tupledArg_11[0], tupledArg_11[1]), head(_arg)([state_1_5, s_10]));
                            if (matchValue_1_1.tag === 1) {
                                state_1_5_mut = matchValue_1_1.fields[0][1];
                                errorsAcc_mut = append(matchValue_1_1.fields[0][0], errorsAcc);
                                _arg_mut = tail(_arg);
                                continue go_1;
                            }
                            else {
                                return matchValue_1_1;
                            }
                        }
                    }
                    else {
                        return new FSharpResult$2(1, [[singleton([(this$_3 = s_10, new Position(this$_3.startLine, this$_3.startColumn)), singleton(new ErrorType(2, ["No parsers given"]))]), state_1_5]]);
                    }
                    break;
                }
            }), go_1(void 0, empty(), ofArray([(tupledArg_1) => {
                const matchValue_1 = Result_MapError((tupledArg_2) => ParseError_sort(tupledArg_2[0], tupledArg_2[1]), pIf([void 0, tupledArg_1[1]]));
                return (matchValue_1.tag === 0) ? (new FSharpResult$2(0, [[new Block(1, [matchValue_1.fields[0][0]]), matchValue_1.fields[0][1], matchValue_1.fields[0][2]]])) : (new FSharpResult$2(1, [matchValue_1.fields[0]]));
            }, (tupledArg_3) => {
                const matchValue_2 = Result_MapError((tupledArg_4) => ParseError_sort(tupledArg_4[0], tupledArg_4[1]), pLoop([void 0, tupledArg_3[1]]));
                return (matchValue_2.tag === 0) ? (new FSharpResult$2(0, [[new Block(2, [matchValue_2.fields[0][0]]), matchValue_2.fields[0][1], matchValue_2.fields[0][2]]])) : (new FSharpResult$2(1, [matchValue_2.fields[0]]));
            }, (tupledArg_5) => {
                const matchValue_3 = Result_MapError((tupledArg_6) => ParseError_sort(tupledArg_6[0], tupledArg_6[1]), pConcurrent([void 0, tupledArg_5[1]]));
                return (matchValue_3.tag === 0) ? (new FSharpResult$2(0, [[new Block(4, [matchValue_3.fields[0][0]]), matchValue_3.fields[0][1], matchValue_3.fields[0][2]]])) : (new FSharpResult$2(1, [matchValue_3.fields[0]]));
            }, pCall, pCaption, pBreak, pExit, pReturn, (tupledArg_7) => {
                const matchValue_4 = Result_MapError((tupledArg_8) => ParseError_sort(tupledArg_8[0], tupledArg_8[1]), pSequence([void 0, tupledArg_7[1]]));
                return (matchValue_4.tag === 0) ? (new FSharpResult$2(0, [[new Block(9, [matchValue_4.fields[0][0]]), matchValue_4.fields[0][1], matchValue_4.fields[0][2]]])) : (new FSharpResult$2(1, [matchValue_4.fields[0]]));
            }])))));
            return (matchValue_1_2.tag === 0) ? (new FSharpResult$2(0, [[matchValue_1_2.fields[0][0], matchValue_1_2.fields[0][1], matchValue_1_2.fields[0][2]]])) : (new FSharpResult$2(1, [matchValue_1_2.fields[0]]));
        }
        else {
            return new FSharpResult$2(1, [matchValue_6.fields[0]]);
        }
    };
})();

export function parseSource(src) {
    let tupledArg_1_1, str_1, stateFromFirstElement, resultForEmptySequence, p_4, p, fp, ep, go, state_4_1, s_3_1, matchValue_3, matchValue_4, matchValue_2_1;
    return Result_MapError((tupledArg_10) => ParseError_sort(tupledArg_10[0], tupledArg_10[1]), (tupledArg_1_1 = [void 0, (str_1 = replace(replace(src, "\r\n", "\n"), "\r", "\n"), new StringSegment(0, str_1.length, str_1, 0, 0))], (stateFromFirstElement = (singleton), (resultForEmptySequence = (void 0), (p_4 = ((p = CharParsers_spaces(), (tupledArg) => {
        const matchValue = Result_MapError((tupledArg_1) => ParseError_sort(tupledArg_1[0], tupledArg_1[1]), pBlock([void 0, tupledArg[1]]));
        if (matchValue.tag === 0) {
            const matchValue_1 = Result_MapError((tupledArg_2) => ParseError_sort(tupledArg_2[0], tupledArg_2[1]), p([matchValue.fields[0][2], matchValue.fields[0][1]]));
            return (matchValue_1.tag === 0) ? (new FSharpResult$2(0, [[matchValue.fields[0][0], matchValue_1.fields[0][1], matchValue_1.fields[0][2]]])) : (new FSharpResult$2(1, [matchValue_1.fields[0]]));
        }
        else {
            return new FSharpResult$2(1, [matchValue.fields[0]]);
        }
    })), (fp = p_4, (ep = ((tupledArg_3) => CharParsers_eof(void 0, tupledArg_3[1])), (go = ((acc_mut, tupledArg_4_mut) => {
        go:
        while (true) {
            const acc = acc_mut, tupledArg_4 = tupledArg_4_mut;
            const s_4 = tupledArg_4[1];
            const matchValue_2 = Result_MapError((tupledArg_5) => ParseError_sort(tupledArg_5[0], tupledArg_5[1]), ep([tupledArg_4[0], s_4]));
            if (matchValue_2.tag === 1) {
                const matchValue_1_1 = Result_MapError((tupledArg_6) => ParseError_sort(tupledArg_6[0], tupledArg_6[1]), p_4([matchValue_2.fields[0][1], s_4]));
                if (matchValue_1_1.tag === 1) {
                    return new FSharpResult$2(1, [matchValue_1_1.fields[0]]);
                }
                else {
                    acc_mut = cons(matchValue_1_1.fields[0][0], acc);
                    tupledArg_4_mut = [matchValue_1_1.fields[0][2], matchValue_1_1.fields[0][1]];
                    continue go;
                }
            }
            else {
                return new FSharpResult$2(0, [[reverse(acc), matchValue_2.fields[0][1], matchValue_2.fields[0][2]]]);
            }
            break;
        }
    }), (state_4_1 = tupledArg_1_1[0], (s_3_1 = tupledArg_1_1[1], (resultForEmptySequence != null) ? ((matchValue_3 = Result_MapError((tupledArg_8) => ParseError_sort(tupledArg_8[0], tupledArg_8[1]), fp([state_4_1, s_3_1])), (matchValue_3.tag === 0) ? go(stateFromFirstElement(matchValue_3.fields[0][0]), [matchValue_3.fields[0][2], matchValue_3.fields[0][1]]) : ((matchValue_4 = Result_MapError((tupledArg_9) => ParseError_sort(tupledArg_9[0], tupledArg_9[1]), ep([state_4_1, s_3_1])), (matchValue_4.tag === 1) ? (new FSharpResult$2(1, [matchValue_4.fields[0]])) : (new FSharpResult$2(0, [[(resultForEmptySequence == null) ? defaultOf() : resultForEmptySequence(matchValue_4.fields[0][0]), matchValue_4.fields[0][1], matchValue_4.fields[0][2]]])))))) : ((matchValue_2_1 = Result_MapError((tupledArg_7) => ParseError_sort(tupledArg_7[0], tupledArg_7[1]), fp([state_4_1, s_3_1])), (matchValue_2_1.tag === 0) ? go(stateFromFirstElement(matchValue_2_1.fields[0][0]), [matchValue_2_1.fields[0][2], matchValue_2_1.fields[0][1]]) : (new FSharpResult$2(1, [matchValue_2_1.fields[0]]))))))))))))));
}

