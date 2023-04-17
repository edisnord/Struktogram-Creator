import { Block$reflection, Block, isEmptySequence, parseSource } from "./src/Parser.js";
import { seqToString, toString } from "./fable_modules/fable-library.4.0.1/Types.js";
import { empty, singleton, collect, delay, toList } from "./fable_modules/fable-library.4.0.1/Seq.js";
import { Test_TestCaseBuilder__Zero, Test_TestCaseBuilder__Delay_1505, Test_TestCaseBuilder__Run_3A5B6456, FocusState, Test_testList } from "./fable_modules/Fable.Mocha.2.16.0/Mocha.fs.js";
import { Test_TestCaseBuilder_$ctor_Z7EF1EC3F } from "./fable_modules/Fable.Mocha.2.16.0/Mocha.fs.js";
import { ofArray, contains, singleton as singleton_1 } from "./fable_modules/fable-library.4.0.1/List.js";
import { structuralHash, assertEqual, equals } from "./fable_modules/fable-library.4.0.1/Util.js";
import { equals as equals_1, class_type, decimal_type, string_type, float64_type, bool_type, int32_type, list_type } from "./fable_modules/fable-library.4.0.1/Reflection.js";
import { printf, toText } from "./fable_modules/fable-library.4.0.1/String.js";

export function extractResult(src) {
    const matchValue = parseSource(src);
    if (matchValue.tag === 1) {
        throw new Error(toString(matchValue.fields[0]));
    }
    else {
        return toList(delay(() => collect((x) => ((!isEmptySequence(x)) ? singleton(x) : empty()), matchValue.fields[0][0])));
    }
}

export const parserTests = Test_testList("Parser Tests", singleton_1((() => {
    const builder$0040 = Test_TestCaseBuilder_$ctor_Z7EF1EC3F("Caption parsing works", new FocusState(0, []));
    return Test_TestCaseBuilder__Run_3A5B6456(builder$0040, Test_TestCaseBuilder__Delay_1505(builder$0040, () => {
        let copyOfStruct, arg, arg_1, clo, clo_1, clo_2, clo_3, clo_4, clo_5;
        const actual = extractResult("caption: test");
        const expected = singleton_1(new Block(0, ["test"]));
        const msg = "Caption tested";
        if (equals(actual, expected) ? true : (!(new Function("try {return this===window;}catch(e){ return false;}"))())) {
            assertEqual(actual, expected, msg);
        }
        else {
            throw new Error(contains((copyOfStruct = actual, list_type(Block$reflection())), ofArray([int32_type, bool_type, float64_type, string_type, decimal_type, class_type("System.Guid")]), {
                Equals: equals_1,
                GetHashCode: structuralHash,
            }) ? ((arg = seqToString(expected), (arg_1 = seqToString(actual), (clo = toText(printf("<span style=\'color:black\'>Expected:</span> <br /><div style=\'margin-left:20px; color:crimson\'>%s</div><br /><span style=\'color:black\'>Actual:</span> </br ><div style=\'margin-left:20px;color:crimson\'>%s</div><br /><span style=\'color:black\'>Message:</span> </br ><div style=\'margin-left:20px; color:crimson\'>%s</div>")), (clo_1 = clo(arg), (clo_2 = clo_1(arg_1), clo_2(msg))))))) : ((clo_3 = toText(printf("<span style=\'color:black\'>Expected:</span> <br /><div style=\'margin-left:20px; color:crimson\'>%A</div><br /><span style=\'color:black\'>Actual:</span> </br ><div style=\'margin-left:20px;color:crimson\'>%A</div><br /><span style=\'color:black\'>Message:</span> </br ><div style=\'margin-left:20px; color:crimson\'>%s</div>")), (clo_4 = clo_3(expected), (clo_5 = clo_4(actual), clo_5(msg))))));
        }
        Test_TestCaseBuilder__Zero(builder$0040);
    }));
})()));

