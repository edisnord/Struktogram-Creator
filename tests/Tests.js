import { Mocha_runTests, Expect_throws, Test_TestCaseBuilder__Zero, Test_TestCaseBuilder__Delay_1505, Test_TestCaseBuilder__Run_3A5B6456, FocusState, Test_testList } from "./fable_modules/Fable.Mocha.2.16.0/Mocha.fs.js";
import { Test_TestCaseBuilder_$ctor_Z7EF1EC3F } from "./fable_modules/Fable.Mocha.2.16.0/Mocha.fs.js";
import { extractResult } from "./Utils.js";
import { Block$reflection, Sequence, Block } from "./src/Parser.js";
import { ofArray, contains, singleton } from "./fable_modules/fable-library.4.0.1/List.js";
import { structuralHash, assertEqual, equals } from "./fable_modules/fable-library.4.0.1/Util.js";
import { equals as equals_1, class_type, decimal_type, string_type, float64_type, bool_type, int32_type, list_type } from "./fable_modules/fable-library.4.0.1/Reflection.js";
import { seqToString } from "./fable_modules/fable-library.4.0.1/Types.js";
import { printf, toText } from "./fable_modules/fable-library.4.0.1/String.js";
import { parserIfTests } from "./IfTests.js";

export const sequenceTagEscapeTests = Test_testList("Parser sequence tag escape tests", singleton((() => {
    const builder$0040 = Test_TestCaseBuilder_$ctor_Z7EF1EC3F("Tag escape works #1", new FocusState(0, []));
    return Test_TestCaseBuilder__Run_3A5B6456(builder$0040, Test_TestCaseBuilder__Delay_1505(builder$0040, () => {
        let copyOfStruct, arg, arg_1, clo, clo_1, clo_2, clo_3, clo_4, clo_5;
        const actual = extractResult(" test<koqe>");
        const expected = singleton(new Block(9, [new Sequence(0, ["test&ltkoqe&gt"])]));
        const msg = "Tag escape";
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

export const parserSingleLineBlocksTests = Test_testList("Parser single line blocks tests", ofArray([sequenceTagEscapeTests, (() => {
    const builder$0040 = Test_TestCaseBuilder_$ctor_Z7EF1EC3F("Caption parsing works", new FocusState(0, []));
    return Test_TestCaseBuilder__Run_3A5B6456(builder$0040, Test_TestCaseBuilder__Delay_1505(builder$0040, () => {
        let copyOfStruct, arg, arg_1, clo, clo_1, clo_2, clo_3, clo_4, clo_5;
        const actual = extractResult("caption: test");
        const expected = singleton(new Block(0, ["test"]));
        const msg = "Caption";
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
})(), (() => {
    const builder$0040_1 = Test_TestCaseBuilder_$ctor_Z7EF1EC3F("Break parsing works", new FocusState(0, []));
    return Test_TestCaseBuilder__Run_3A5B6456(builder$0040_1, Test_TestCaseBuilder__Delay_1505(builder$0040_1, () => {
        let copyOfStruct_1, arg_6, arg_1_1, clo_6, clo_1_1, clo_2_1, clo_3_1, clo_4_1, clo_5_1;
        const actual_1 = extractResult("break: test");
        const expected_1 = singleton(new Block(3, ["test"]));
        const msg_1 = "Break";
        if (equals(actual_1, expected_1) ? true : (!(new Function("try {return this===window;}catch(e){ return false;}"))())) {
            assertEqual(actual_1, expected_1, msg_1);
        }
        else {
            throw new Error(contains((copyOfStruct_1 = actual_1, list_type(Block$reflection())), ofArray([int32_type, bool_type, float64_type, string_type, decimal_type, class_type("System.Guid")]), {
                Equals: equals_1,
                GetHashCode: structuralHash,
            }) ? ((arg_6 = seqToString(expected_1), (arg_1_1 = seqToString(actual_1), (clo_6 = toText(printf("<span style=\'color:black\'>Expected:</span> <br /><div style=\'margin-left:20px; color:crimson\'>%s</div><br /><span style=\'color:black\'>Actual:</span> </br ><div style=\'margin-left:20px;color:crimson\'>%s</div><br /><span style=\'color:black\'>Message:</span> </br ><div style=\'margin-left:20px; color:crimson\'>%s</div>")), (clo_1_1 = clo_6(arg_6), (clo_2_1 = clo_1_1(arg_1_1), clo_2_1(msg_1))))))) : ((clo_3_1 = toText(printf("<span style=\'color:black\'>Expected:</span> <br /><div style=\'margin-left:20px; color:crimson\'>%A</div><br /><span style=\'color:black\'>Actual:</span> </br ><div style=\'margin-left:20px;color:crimson\'>%A</div><br /><span style=\'color:black\'>Message:</span> </br ><div style=\'margin-left:20px; color:crimson\'>%s</div>")), (clo_4_1 = clo_3_1(expected_1), (clo_5_1 = clo_4_1(actual_1), clo_5_1(msg_1))))));
        }
        Test_TestCaseBuilder__Zero(builder$0040_1);
    }));
})(), (() => {
    const builder$0040_2 = Test_TestCaseBuilder_$ctor_Z7EF1EC3F("Return parsing works", new FocusState(0, []));
    return Test_TestCaseBuilder__Run_3A5B6456(builder$0040_2, Test_TestCaseBuilder__Delay_1505(builder$0040_2, () => {
        let copyOfStruct_2, arg_7, arg_1_2, clo_7, clo_1_2, clo_2_2, clo_3_2, clo_4_2, clo_5_2;
        const actual_2 = extractResult("return: test");
        const expected_2 = singleton(new Block(7, ["test"]));
        const msg_2 = "Return";
        if (equals(actual_2, expected_2) ? true : (!(new Function("try {return this===window;}catch(e){ return false;}"))())) {
            assertEqual(actual_2, expected_2, msg_2);
        }
        else {
            throw new Error(contains((copyOfStruct_2 = actual_2, list_type(Block$reflection())), ofArray([int32_type, bool_type, float64_type, string_type, decimal_type, class_type("System.Guid")]), {
                Equals: equals_1,
                GetHashCode: structuralHash,
            }) ? ((arg_7 = seqToString(expected_2), (arg_1_2 = seqToString(actual_2), (clo_7 = toText(printf("<span style=\'color:black\'>Expected:</span> <br /><div style=\'margin-left:20px; color:crimson\'>%s</div><br /><span style=\'color:black\'>Actual:</span> </br ><div style=\'margin-left:20px;color:crimson\'>%s</div><br /><span style=\'color:black\'>Message:</span> </br ><div style=\'margin-left:20px; color:crimson\'>%s</div>")), (clo_1_2 = clo_7(arg_7), (clo_2_2 = clo_1_2(arg_1_2), clo_2_2(msg_2))))))) : ((clo_3_2 = toText(printf("<span style=\'color:black\'>Expected:</span> <br /><div style=\'margin-left:20px; color:crimson\'>%A</div><br /><span style=\'color:black\'>Actual:</span> </br ><div style=\'margin-left:20px;color:crimson\'>%A</div><br /><span style=\'color:black\'>Message:</span> </br ><div style=\'margin-left:20px; color:crimson\'>%s</div>")), (clo_4_2 = clo_3_2(expected_2), (clo_5_2 = clo_4_2(actual_2), clo_5_2(msg_2))))));
        }
        Test_TestCaseBuilder__Zero(builder$0040_2);
    }));
})(), (() => {
    const builder$0040_3 = Test_TestCaseBuilder_$ctor_Z7EF1EC3F("Exit parsing works", new FocusState(0, []));
    return Test_TestCaseBuilder__Run_3A5B6456(builder$0040_3, Test_TestCaseBuilder__Delay_1505(builder$0040_3, () => {
        let copyOfStruct_3, arg_8, arg_1_3, clo_8, clo_1_3, clo_2_3, clo_3_3, clo_4_3, clo_5_3;
        const actual_3 = extractResult("exit: test");
        const expected_3 = singleton(new Block(8, ["test"]));
        const msg_3 = "Exit";
        if (equals(actual_3, expected_3) ? true : (!(new Function("try {return this===window;}catch(e){ return false;}"))())) {
            assertEqual(actual_3, expected_3, msg_3);
        }
        else {
            throw new Error(contains((copyOfStruct_3 = actual_3, list_type(Block$reflection())), ofArray([int32_type, bool_type, float64_type, string_type, decimal_type, class_type("System.Guid")]), {
                Equals: equals_1,
                GetHashCode: structuralHash,
            }) ? ((arg_8 = seqToString(expected_3), (arg_1_3 = seqToString(actual_3), (clo_8 = toText(printf("<span style=\'color:black\'>Expected:</span> <br /><div style=\'margin-left:20px; color:crimson\'>%s</div><br /><span style=\'color:black\'>Actual:</span> </br ><div style=\'margin-left:20px;color:crimson\'>%s</div><br /><span style=\'color:black\'>Message:</span> </br ><div style=\'margin-left:20px; color:crimson\'>%s</div>")), (clo_1_3 = clo_8(arg_8), (clo_2_3 = clo_1_3(arg_1_3), clo_2_3(msg_3))))))) : ((clo_3_3 = toText(printf("<span style=\'color:black\'>Expected:</span> <br /><div style=\'margin-left:20px; color:crimson\'>%A</div><br /><span style=\'color:black\'>Actual:</span> </br ><div style=\'margin-left:20px;color:crimson\'>%A</div><br /><span style=\'color:black\'>Message:</span> </br ><div style=\'margin-left:20px; color:crimson\'>%s</div>")), (clo_4_3 = clo_3_3(expected_3), (clo_5_3 = clo_4_3(actual_3), clo_5_3(msg_3))))));
        }
        Test_TestCaseBuilder__Zero(builder$0040_3);
    }));
})(), (() => {
    const builder$0040_4 = Test_TestCaseBuilder_$ctor_Z7EF1EC3F("Call parsing works", new FocusState(0, []));
    return Test_TestCaseBuilder__Run_3A5B6456(builder$0040_4, Test_TestCaseBuilder__Delay_1505(builder$0040_4, () => {
        let copyOfStruct_4, arg_9, arg_1_4, clo_9, clo_1_4, clo_2_4, clo_3_4, clo_4_4, clo_5_4;
        const actual_4 = extractResult("call: test");
        const expected_4 = singleton(new Block(6, ["test"]));
        const msg_4 = "Call";
        if (equals(actual_4, expected_4) ? true : (!(new Function("try {return this===window;}catch(e){ return false;}"))())) {
            assertEqual(actual_4, expected_4, msg_4);
        }
        else {
            throw new Error(contains((copyOfStruct_4 = actual_4, list_type(Block$reflection())), ofArray([int32_type, bool_type, float64_type, string_type, decimal_type, class_type("System.Guid")]), {
                Equals: equals_1,
                GetHashCode: structuralHash,
            }) ? ((arg_9 = seqToString(expected_4), (arg_1_4 = seqToString(actual_4), (clo_9 = toText(printf("<span style=\'color:black\'>Expected:</span> <br /><div style=\'margin-left:20px; color:crimson\'>%s</div><br /><span style=\'color:black\'>Actual:</span> </br ><div style=\'margin-left:20px;color:crimson\'>%s</div><br /><span style=\'color:black\'>Message:</span> </br ><div style=\'margin-left:20px; color:crimson\'>%s</div>")), (clo_1_4 = clo_9(arg_9), (clo_2_4 = clo_1_4(arg_1_4), clo_2_4(msg_4))))))) : ((clo_3_4 = toText(printf("<span style=\'color:black\'>Expected:</span> <br /><div style=\'margin-left:20px; color:crimson\'>%A</div><br /><span style=\'color:black\'>Actual:</span> </br ><div style=\'margin-left:20px;color:crimson\'>%A</div><br /><span style=\'color:black\'>Message:</span> </br ><div style=\'margin-left:20px; color:crimson\'>%s</div>")), (clo_4_4 = clo_3_4(expected_4), (clo_5_4 = clo_4_4(actual_4), clo_5_4(msg_4))))));
        }
        Test_TestCaseBuilder__Zero(builder$0040_4);
    }));
})(), (() => {
    const builder$0040_5 = Test_TestCaseBuilder_$ctor_Z7EF1EC3F("Sequence keyword detection works", new FocusState(0, []));
    return Test_TestCaseBuilder__Run_3A5B6456(builder$0040_5, Test_TestCaseBuilder__Delay_1505(builder$0040_5, () => {
        Expect_throws(() => {
            extractResult("else: ");
        }, "Sequence kw detection");
        Test_TestCaseBuilder__Zero(builder$0040_5);
    }));
})()]));

export const parserMultiLineBlocksTests = Test_testList("Parser multiline blocks tests", singleton(parserIfTests));

export const parserAllTests = Test_testList("All parser tests", ofArray([parserSingleLineBlocksTests, parserMultiLineBlocksTests]));

Mocha_runTests(parserAllTests);

