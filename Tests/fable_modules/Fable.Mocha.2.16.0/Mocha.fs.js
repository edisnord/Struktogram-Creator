import { Record, toString, Union } from "../fable-library.4.0.1/Types.js";
import { record_type, tuple_type, equals as equals_1, decimal_type, float64_type, int32_type, bool_type, list_type, class_type, lambda_type, unit_type, string_type, union_type } from "../fable-library.4.0.1/Reflection.js";
import { iterate, choose, map, exists as exists_1, empty, isEmpty as isEmpty_1, filter, ofSeq, ofArray, contains, singleton } from "../fable-library.4.0.1/List.js";
import { Operators_Using } from "../fable-library.4.0.1/FSharp.Core.js";
import { int32ToString, structuralHash, assertEqual, defaultOf, equals, assertNotEqual, disposeSafe, getEnumerator } from "../fable-library.4.0.1/Util.js";
import { singleton as singleton_1 } from "../fable-library.4.0.1/AsyncBuilder.js";
import { isNullOrWhiteSpace, printf, toText, toFail } from "../fable-library.4.0.1/String.js";
import { isInfinity } from "../fable-library.4.0.1/Double.js";
import { singleton as singleton_2, append, collect, delay, toList, length, forAll, exists, isEmpty } from "../fable-library.4.0.1/Seq.js";
import { value as value_2 } from "../fable-library.4.0.1/Option.js";
import { newGuid } from "../fable-library.4.0.1/Guid.js";
import { startAsPromise, ignore, catchAsync, sleep, startImmediate } from "../fable-library.4.0.1/Async.js";

export class FocusState extends Union {
    "constructor"(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["Normal", "Pending", "Focused"];
    }
}

export function FocusState$reflection() {
    return union_type("Fable.Mocha.FocusState", [], FocusState, () => [[], [], []]);
}

export class TestCase extends Union {
    "constructor"(tag, fields) {
        super();
        this.tag = tag;
        this.fields = fields;
    }
    cases() {
        return ["SyncTest", "AsyncTest", "TestList", "TestListSequential"];
    }
}

export function TestCase$reflection() {
    return union_type("Fable.Mocha.TestCase", [], TestCase, () => [[["Item1", string_type], ["Item2", lambda_type(unit_type, unit_type)], ["Item3", FocusState$reflection()]], [["Item1", string_type], ["Item2", class_type("Microsoft.FSharp.Control.FSharpAsync`1", [unit_type])], ["Item3", FocusState$reflection()]], [["Item1", string_type], ["Item2", list_type(TestCase$reflection())]], [["Item1", string_type], ["Item2", list_type(TestCase$reflection())]]]);
}

export function Test_testCase(name, body) {
    return new TestCase(0, [name, body, new FocusState(0, [])]);
}

export function Test_ptestCase(name, body) {
    return new TestCase(0, [name, body, new FocusState(1, [])]);
}

export function Test_ftestCase(name, body) {
    return new TestCase(0, [name, body, new FocusState(2, [])]);
}

export function Test_testCaseAsync(name, body) {
    return new TestCase(1, [name, body, new FocusState(0, [])]);
}

export function Test_ptestCaseAsync(name, body) {
    return new TestCase(1, [name, body, new FocusState(1, [])]);
}

export function Test_ftestCaseAsync(name, body) {
    return new TestCase(1, [name, body, new FocusState(2, [])]);
}

export function Test_testList(name, tests) {
    return new TestCase(2, [name, tests]);
}

export function Test_testSequenced(test) {
    switch (test.tag) {
        case 1: {
            const name_1 = test.fields[0];
            return new TestCase(3, [name_1, singleton(new TestCase(1, [name_1, test.fields[1], test.fields[2]]))]);
        }
        case 2: {
            return new TestCase(3, [test.fields[0], test.fields[1]]);
        }
        case 3: {
            return new TestCase(3, [test.fields[0], test.fields[1]]);
        }
        default: {
            const name = test.fields[0];
            return new TestCase(3, [name, singleton(new TestCase(0, [name, test.fields[1], test.fields[2]]))]);
        }
    }
}

export class Test_TestCaseBuilder {
    "constructor"(name, focusState) {
        this.name = name;
        this.focusState = focusState;
    }
}

export function Test_TestCaseBuilder$reflection() {
    return class_type("Fable.Mocha.Test.TestCaseBuilder", void 0, Test_TestCaseBuilder);
}

export function Test_TestCaseBuilder_$ctor_Z7EF1EC3F(name, focusState) {
    return new Test_TestCaseBuilder(name, focusState);
}

export function Test_TestCaseBuilder__Zero(_) {
}

export function Test_TestCaseBuilder__Delay_1505(_, fn) {
    return fn;
}

export function Test_TestCaseBuilder__Using_Z3647408D(_, disposable, fn) {
    return Operators_Using(disposable, fn);
}

export function Test_TestCaseBuilder__While_Z4F211AEA(_, condition, fn) {
    while (condition()) {
        fn();
    }
}

export function Test_TestCaseBuilder__For_Z371464DD(_, sequence, fn) {
    const enumerator = getEnumerator(sequence);
    try {
        while (enumerator["System.Collections.IEnumerator.MoveNext"]()) {
            fn(enumerator["System.Collections.Generic.IEnumerator`1.get_Current"]());
        }
    }
    finally {
        disposeSafe(enumerator);
    }
}

export function Test_TestCaseBuilder__Combine_3A59D1F3(_, fn1, fn2) {
    fn2();
    return fn1;
}

export function Test_TestCaseBuilder__TryFinally_33907399(_, fn, compensation) {
    try {
        return fn();
    }
    finally {
        compensation();
    }
}

export function Test_TestCaseBuilder__TryWith_Z570AC55B(_, fn, catchHandler) {
    try {
        return fn();
    }
    catch (e) {
        return catchHandler(e);
    }
}

export function Test_TestCaseBuilder__Run_3A5B6456(_, fn) {
    return new TestCase(0, [_.name, fn, _.focusState]);
}

export class Test_TestAsyncBuilder {
    "constructor"(name, focusState) {
        this.name = name;
        this.focusState = focusState;
    }
}

export function Test_TestAsyncBuilder$reflection() {
    return class_type("Fable.Mocha.Test.TestAsyncBuilder", void 0, Test_TestAsyncBuilder);
}

export function Test_TestAsyncBuilder_$ctor_Z7EF1EC3F(name, focusState) {
    return new Test_TestAsyncBuilder(name, focusState);
}

export function Test_TestAsyncBuilder__Zero(_) {
    return singleton_1.Zero();
}

export function Test_TestAsyncBuilder__Delay_Z5276B41B(_, fn) {
    return singleton_1.Delay(fn);
}

export function Test_TestAsyncBuilder__Return_1505(_, x) {
    return singleton_1.Return(x);
}

export function Test_TestAsyncBuilder__ReturnFrom_ZD4A93B1(_, x) {
    return singleton_1.ReturnFrom(x);
}

export function Test_TestAsyncBuilder__Bind_7A510B33(_, computation, fn) {
    return singleton_1.Bind(computation, fn);
}

export function Test_TestAsyncBuilder__Using_14BA44F9(_, disposable, fn) {
    return singleton_1.Using(disposable, fn);
}

export function Test_TestAsyncBuilder__While_49259930(_, condition, fn) {
    return singleton_1.While(condition, fn);
}

export function Test_TestAsyncBuilder__For_Z23956591(_, sequence, fn) {
    return singleton_1.For(sequence, fn);
}

export function Test_TestAsyncBuilder__Combine_Z3AE9B5C1(_, fn1, fn2) {
    return singleton_1.Combine(fn1, fn2);
}

export function Test_TestAsyncBuilder__TryFinally_73399279(_, fn, compensation) {
    return singleton_1.TryFinally(fn, compensation);
}

export function Test_TestAsyncBuilder__TryWith_48476DCF(_, fn, catchHandler) {
    return singleton_1.TryWith(fn, catchHandler);
}

export function Test_TestAsyncBuilder__Run_Z3C5FE790(_, fn) {
    return new TestCase(1, [_.name, fn, _.focusState]);
}

export function Test_failtest(msg) {
    throw new Error(msg);
}

export function Test_failtestf(fmt, msg) {
    return toFail(fmt)(msg);
}

export const Env_insideBrowser = (new Function("try {return this===window;}catch(e){ return false;}"))();

export function Expect_notEqual(actual, expected, msg) {
    assertNotEqual(actual, expected, msg);
}

function Expect_isNull$0027(cond) {
    if (equals(cond, defaultOf())) {
        return true;
    }
    else {
        return false;
    }
}

export function Expect_isNull(cond) {
    const actual = Expect_isNull$0027(cond);
    return (msg) => {
        let copyOfStruct, arg, arg_1, clo, clo_1, clo_2, clo_3, clo_4, clo_5;
        const actual_1 = actual;
        const expected_1 = true;
        const msg_1 = msg;
        if ((actual_1 === expected_1) ? true : (!(new Function("try {return this===window;}catch(e){ return false;}"))())) {
            assertEqual(actual_1, expected_1, msg_1);
        }
        else {
            throw new Error(contains((copyOfStruct = actual_1, bool_type), ofArray([int32_type, bool_type, float64_type, string_type, decimal_type, class_type("System.Guid")]), {
                Equals: equals_1,
                GetHashCode: structuralHash,
            }) ? ((arg = toString(expected_1), (arg_1 = toString(actual_1), (clo = toText(printf("<span style=\'color:black\'>Expected:</span> <br /><div style=\'margin-left:20px; color:crimson\'>%s</div><br /><span style=\'color:black\'>Actual:</span> </br ><div style=\'margin-left:20px;color:crimson\'>%s</div><br /><span style=\'color:black\'>Message:</span> </br ><div style=\'margin-left:20px; color:crimson\'>%s</div>")), (clo_1 = clo(arg), (clo_2 = clo_1(arg_1), clo_2(msg_1))))))) : ((clo_3 = toText(printf("<span style=\'color:black\'>Expected:</span> <br /><div style=\'margin-left:20px; color:crimson\'>%A</div><br /><span style=\'color:black\'>Actual:</span> </br ><div style=\'margin-left:20px;color:crimson\'>%A</div><br /><span style=\'color:black\'>Message:</span> </br ><div style=\'margin-left:20px; color:crimson\'>%s</div>")), (clo_4 = clo_3(expected_1), (clo_5 = clo_4(actual_1), clo_5(msg_1))))));
        }
    };
}

export function Expect_isNotNull(cond) {
    const actual = Expect_isNull$0027(cond);
    return (msg) => {
        Expect_notEqual(actual, true, msg);
    };
}

export function Expect_isNotNaN(cond, msg) {
    if (Number.isNaN(cond)) {
        throw new Error(msg);
    }
}

export function Expect_isNotInfinity(cond, msg) {
    if (isInfinity(cond)) {
        throw new Error(msg);
    }
}

export function Expect_isTrue(cond) {
    return (msg) => {
        let copyOfStruct, arg, arg_1, clo, clo_1, clo_2, clo_3, clo_4, clo_5;
        const actual = cond;
        const expected_1 = true;
        const msg_1 = msg;
        if ((actual === expected_1) ? true : (!(new Function("try {return this===window;}catch(e){ return false;}"))())) {
            assertEqual(actual, expected_1, msg_1);
        }
        else {
            throw new Error(contains((copyOfStruct = actual, bool_type), ofArray([int32_type, bool_type, float64_type, string_type, decimal_type, class_type("System.Guid")]), {
                Equals: equals_1,
                GetHashCode: structuralHash,
            }) ? ((arg = toString(expected_1), (arg_1 = toString(actual), (clo = toText(printf("<span style=\'color:black\'>Expected:</span> <br /><div style=\'margin-left:20px; color:crimson\'>%s</div><br /><span style=\'color:black\'>Actual:</span> </br ><div style=\'margin-left:20px;color:crimson\'>%s</div><br /><span style=\'color:black\'>Message:</span> </br ><div style=\'margin-left:20px; color:crimson\'>%s</div>")), (clo_1 = clo(arg), (clo_2 = clo_1(arg_1), clo_2(msg_1))))))) : ((clo_3 = toText(printf("<span style=\'color:black\'>Expected:</span> <br /><div style=\'margin-left:20px; color:crimson\'>%A</div><br /><span style=\'color:black\'>Actual:</span> </br ><div style=\'margin-left:20px;color:crimson\'>%A</div><br /><span style=\'color:black\'>Message:</span> </br ><div style=\'margin-left:20px; color:crimson\'>%s</div>")), (clo_4 = clo_3(expected_1), (clo_5 = clo_4(actual), clo_5(msg_1))))));
        }
    };
}

export function Expect_isFalse(cond) {
    return (msg) => {
        let copyOfStruct, arg, arg_1, clo, clo_1, clo_2, clo_3, clo_4, clo_5;
        const actual = cond;
        const expected_1 = false;
        const msg_1 = msg;
        if ((actual === expected_1) ? true : (!(new Function("try {return this===window;}catch(e){ return false;}"))())) {
            assertEqual(actual, expected_1, msg_1);
        }
        else {
            throw new Error(contains((copyOfStruct = actual, bool_type), ofArray([int32_type, bool_type, float64_type, string_type, decimal_type, class_type("System.Guid")]), {
                Equals: equals_1,
                GetHashCode: structuralHash,
            }) ? ((arg = toString(expected_1), (arg_1 = toString(actual), (clo = toText(printf("<span style=\'color:black\'>Expected:</span> <br /><div style=\'margin-left:20px; color:crimson\'>%s</div><br /><span style=\'color:black\'>Actual:</span> </br ><div style=\'margin-left:20px;color:crimson\'>%s</div><br /><span style=\'color:black\'>Message:</span> </br ><div style=\'margin-left:20px; color:crimson\'>%s</div>")), (clo_1 = clo(arg), (clo_2 = clo_1(arg_1), clo_2(msg_1))))))) : ((clo_3 = toText(printf("<span style=\'color:black\'>Expected:</span> <br /><div style=\'margin-left:20px; color:crimson\'>%A</div><br /><span style=\'color:black\'>Actual:</span> </br ><div style=\'margin-left:20px;color:crimson\'>%A</div><br /><span style=\'color:black\'>Message:</span> </br ><div style=\'margin-left:20px; color:crimson\'>%s</div>")), (clo_4 = clo_3(expected_1), (clo_5 = clo_4(actual), clo_5(msg_1))))));
        }
    };
}

export function Expect_isZero(cond) {
    return (msg) => {
        let copyOfStruct, arg, arg_1, clo, clo_1, clo_2, clo_3, clo_4, clo_5;
        const actual = cond | 0;
        const expected_1 = 0;
        const msg_1 = msg;
        if ((actual === expected_1) ? true : (!(new Function("try {return this===window;}catch(e){ return false;}"))())) {
            assertEqual(actual, expected_1, msg_1);
        }
        else {
            throw new Error(contains((copyOfStruct = actual, int32_type), ofArray([int32_type, bool_type, float64_type, string_type, decimal_type, class_type("System.Guid")]), {
                Equals: equals_1,
                GetHashCode: structuralHash,
            }) ? ((arg = int32ToString(expected_1), (arg_1 = int32ToString(actual), (clo = toText(printf("<span style=\'color:black\'>Expected:</span> <br /><div style=\'margin-left:20px; color:crimson\'>%s</div><br /><span style=\'color:black\'>Actual:</span> </br ><div style=\'margin-left:20px;color:crimson\'>%s</div><br /><span style=\'color:black\'>Message:</span> </br ><div style=\'margin-left:20px; color:crimson\'>%s</div>")), (clo_1 = clo(arg), (clo_2 = clo_1(arg_1), clo_2(msg_1))))))) : ((clo_3 = toText(printf("<span style=\'color:black\'>Expected:</span> <br /><div style=\'margin-left:20px; color:crimson\'>%A</div><br /><span style=\'color:black\'>Actual:</span> </br ><div style=\'margin-left:20px;color:crimson\'>%A</div><br /><span style=\'color:black\'>Message:</span> </br ><div style=\'margin-left:20px; color:crimson\'>%s</div>")), (clo_4 = clo_3(expected_1), (clo_5 = clo_4(actual), clo_5(msg_1))))));
        }
    };
}

export function Expect_isEmpty(x, msg) {
    if (!isEmpty(x)) {
        const clo = toFail(printf("%s. Should be empty."));
        clo(msg);
    }
}

export function Expect_pass() {
    let copyOfStruct, arg, arg_1, clo, clo_1, clo_2, clo_3, clo_4, clo_5;
    const actual = true;
    const expected = true;
    const msg = "The test passed";
    if ((actual === expected) ? true : (!(new Function("try {return this===window;}catch(e){ return false;}"))())) {
        assertEqual(actual, expected, msg);
    }
    else {
        throw new Error(contains((copyOfStruct = actual, bool_type), ofArray([int32_type, bool_type, float64_type, string_type, decimal_type, class_type("System.Guid")]), {
            Equals: equals_1,
            GetHashCode: structuralHash,
        }) ? ((arg = toString(expected), (arg_1 = toString(actual), (clo = toText(printf("<span style=\'color:black\'>Expected:</span> <br /><div style=\'margin-left:20px; color:crimson\'>%s</div><br /><span style=\'color:black\'>Actual:</span> </br ><div style=\'margin-left:20px;color:crimson\'>%s</div><br /><span style=\'color:black\'>Message:</span> </br ><div style=\'margin-left:20px; color:crimson\'>%s</div>")), (clo_1 = clo(arg), (clo_2 = clo_1(arg_1), clo_2(msg))))))) : ((clo_3 = toText(printf("<span style=\'color:black\'>Expected:</span> <br /><div style=\'margin-left:20px; color:crimson\'>%A</div><br /><span style=\'color:black\'>Actual:</span> </br ><div style=\'margin-left:20px;color:crimson\'>%A</div><br /><span style=\'color:black\'>Message:</span> </br ><div style=\'margin-left:20px; color:crimson\'>%s</div>")), (clo_4 = clo_3(expected), (clo_5 = clo_4(actual), clo_5(msg))))));
    }
}

export function Expect_passWithMsg(message) {
    let copyOfStruct, arg, arg_1, clo, clo_1, clo_2, clo_3, clo_4, clo_5;
    const actual = true;
    const expected = true;
    const msg = message;
    if ((actual === expected) ? true : (!(new Function("try {return this===window;}catch(e){ return false;}"))())) {
        assertEqual(actual, expected, msg);
    }
    else {
        throw new Error(contains((copyOfStruct = actual, bool_type), ofArray([int32_type, bool_type, float64_type, string_type, decimal_type, class_type("System.Guid")]), {
            Equals: equals_1,
            GetHashCode: structuralHash,
        }) ? ((arg = toString(expected), (arg_1 = toString(actual), (clo = toText(printf("<span style=\'color:black\'>Expected:</span> <br /><div style=\'margin-left:20px; color:crimson\'>%s</div><br /><span style=\'color:black\'>Actual:</span> </br ><div style=\'margin-left:20px;color:crimson\'>%s</div><br /><span style=\'color:black\'>Message:</span> </br ><div style=\'margin-left:20px; color:crimson\'>%s</div>")), (clo_1 = clo(arg), (clo_2 = clo_1(arg_1), clo_2(msg))))))) : ((clo_3 = toText(printf("<span style=\'color:black\'>Expected:</span> <br /><div style=\'margin-left:20px; color:crimson\'>%A</div><br /><span style=\'color:black\'>Actual:</span> </br ><div style=\'margin-left:20px;color:crimson\'>%A</div><br /><span style=\'color:black\'>Message:</span> </br ><div style=\'margin-left:20px; color:crimson\'>%s</div>")), (clo_4 = clo_3(expected), (clo_5 = clo_4(actual), clo_5(msg))))));
    }
}

export function Expect_exists(x, a, msg) {
    if (!exists(a, x)) {
        throw new Error(msg);
    }
}

export function Expect_all(x, a, msg) {
    if (!forAll(a, x)) {
        throw new Error(msg);
    }
}

export function Expect_isNonEmpty(x, msg) {
    if (isEmpty(x)) {
        const clo = toFail(printf("%s. Should not be empty."));
        clo(msg);
    }
}

export function Expect_isNotEmpty(x, msg) {
    Expect_isNotNull(x)(msg);
    Expect_isNonEmpty(x, msg);
}

export function Expect_hasLength(x, number, msg) {
    let copyOfStruct, arg_3, arg_1_1, clo_3, clo_1_1, clo_2_1, clo_3_1, clo_4, clo_5;
    const actual = length(x) | 0;
    const expected = number | 0;
    let msg_1;
    const clo = toText(printf("%s. Expected %A to have length %i"));
    const clo_1 = clo(msg);
    const clo_2 = clo_1(x);
    msg_1 = clo_2(number);
    if ((actual === expected) ? true : (!(new Function("try {return this===window;}catch(e){ return false;}"))())) {
        assertEqual(actual, expected, msg_1);
    }
    else {
        throw new Error(contains((copyOfStruct = actual, int32_type), ofArray([int32_type, bool_type, float64_type, string_type, decimal_type, class_type("System.Guid")]), {
            Equals: equals_1,
            GetHashCode: structuralHash,
        }) ? ((arg_3 = int32ToString(expected), (arg_1_1 = int32ToString(actual), (clo_3 = toText(printf("<span style=\'color:black\'>Expected:</span> <br /><div style=\'margin-left:20px; color:crimson\'>%s</div><br /><span style=\'color:black\'>Actual:</span> </br ><div style=\'margin-left:20px;color:crimson\'>%s</div><br /><span style=\'color:black\'>Message:</span> </br ><div style=\'margin-left:20px; color:crimson\'>%s</div>")), (clo_1_1 = clo_3(arg_3), (clo_2_1 = clo_1_1(arg_1_1), clo_2_1(msg_1))))))) : ((clo_3_1 = toText(printf("<span style=\'color:black\'>Expected:</span> <br /><div style=\'margin-left:20px; color:crimson\'>%A</div><br /><span style=\'color:black\'>Actual:</span> </br ><div style=\'margin-left:20px;color:crimson\'>%A</div><br /><span style=\'color:black\'>Message:</span> </br ><div style=\'margin-left:20px; color:crimson\'>%s</div>")), (clo_4 = clo_3_1(expected), (clo_5 = clo_4(actual), clo_5(msg_1))))));
    }
}

export function Expect_isOk(x, message) {
    if (x.tag === 1) {
        const clo = toFail(printf("%s. Expected Ok, was Error(\"%A\")."));
        const clo_1 = clo(message);
        clo_1(x.fields[0]);
    }
    else {
        Expect_passWithMsg(message);
    }
}

export function Expect_wantOk(x, message) {
    if (x.tag === 1) {
        const clo = toFail(printf("%s. Expected Ok, was Error(\"%A\")."));
        const clo_1 = clo(message);
        return clo_1(x.fields[0]);
    }
    else {
        Expect_passWithMsg(message);
        return x.fields[0];
    }
}

export function Expect_stringContains(subject, substring, message) {
    if (!(subject.indexOf(substring) >= 0)) {
        const clo = toFail(printf("%s. Expected subject string \'%s\' to contain substring \'%s\'."));
        const clo_1 = clo(message);
        const clo_2 = clo_1(subject);
        clo_2(substring);
    }
    else {
        Expect_passWithMsg(message);
    }
}

export function Expect_isError(x, message) {
    if (x.tag === 0) {
        const clo = toFail(printf("%s. Expected Error _, was Ok(%A)."));
        const clo_1 = clo(message);
        clo_1(x.fields[0]);
    }
    else {
        Expect_passWithMsg(message);
    }
}

export function Expect_isSome(x, message) {
    if (x == null) {
        const clo = toFail(printf("%s. Expected Some _, was None."));
        clo(message);
    }
    else {
        Expect_passWithMsg(message);
    }
}

export function Expect_wantSome(x, message) {
    if (x == null) {
        const clo = toFail(printf("%s. Expected Some _, was None."));
        return clo(message);
    }
    else {
        const x$0027 = value_2(x);
        Expect_passWithMsg(message);
        return x$0027;
    }
}

export function Expect_wantError(x, message) {
    if (x.tag === 0) {
        const clo = toFail(printf("%s. Expected Error _, was Ok(%A)."));
        const clo_1 = clo(message);
        return clo_1(x.fields[0]);
    }
    else {
        Expect_passWithMsg(message);
        return x.fields[0];
    }
}

export function Expect_isNone(x, message) {
    if (x != null) {
        const x$0027 = value_2(x);
        const clo = toFail(printf("%s. Expected None, was Some(%A)."));
        const clo_1 = clo(message);
        clo_1(x$0027);
    }
    else {
        Expect_passWithMsg(message);
    }
}

function Expect_throws$0027(f) {
    try {
        f();
        return void 0;
    }
    catch (exn) {
        return exn;
    }
}

export function Expect_throws(f, msg) {
    const matchValue = Expect_throws$0027(f);
    if (matchValue != null) {
    }
    else {
        const clo = toFail(printf("%s. Expected f to throw."));
        clo(msg);
    }
}

export function Expect_throwsC(f, cont) {
    const matchValue = Expect_throws$0027(f);
    if (matchValue != null) {
        return cont(matchValue);
    }
    else {
        return toFail(printf("Expected f to throw."));
    }
}

export function Expect_containsAll(actual, expected, message) {
    let clo, clo_1, clo_2;
    const matchValue = ofSeq(actual);
    const expectedEls = ofSeq(expected);
    const actualEls = matchValue;
    const matchingEls = filter((a) => contains(a, expectedEls, {
        Equals: equals,
        GetHashCode: structuralHash,
    }), actualEls);
    const extraEls = filter((a_1) => (!contains(a_1, matchingEls, {
        Equals: equals,
        GetHashCode: structuralHash,
    })), actualEls);
    const missingEls = filter((e) => (!contains(e, matchingEls, {
        Equals: equals,
        GetHashCode: structuralHash,
    })), expectedEls);
    if (isEmpty_1(missingEls)) {
    }
    else {
        Test_failtest((clo = toText(printf("%s. Sequence `actual` does not contain all `expected` elements. Missing elements from `actual`: %A. Extra elements in `actual`: %A")), (clo_1 = clo(message), (clo_2 = clo_1(missingEls), clo_2(extraEls)))));
    }
}

class Html_Node extends Record {
    "constructor"(Tag, Attributes, Content, Children) {
        super();
        this.Tag = Tag;
        this.Attributes = Attributes;
        this.Content = Content;
        this.Children = Children;
    }
}

function Html_Node$reflection() {
    return record_type("Fable.Mocha.Html.Node", [], Html_Node, () => [["Tag", string_type], ["Attributes", list_type(tuple_type(string_type, string_type))], ["Content", string_type], ["Children", list_type(Html_Node$reflection())]]);
}

function Html_createNode(node) {
    const el = document.createElement(node.Tag);
    el.innerHTML = node.Content;
    const enumerator = getEnumerator(node.Attributes);
    try {
        while (enumerator["System.Collections.IEnumerator.MoveNext"]()) {
            const forLoopVar = enumerator["System.Collections.Generic.IEnumerator`1.get_Current"]();
            el.setAttribute(forLoopVar[0], forLoopVar[1]);
        }
    }
    finally {
        disposeSafe(enumerator);
    }
    const enumerator_1 = getEnumerator(node.Children);
    try {
        while (enumerator_1["System.Collections.IEnumerator.MoveNext"]()) {
            const childElement = Html_createNode(enumerator_1["System.Collections.Generic.IEnumerator`1.get_Current"]());
            el.appendChild(childElement);
        }
    }
    finally {
        disposeSafe(enumerator_1);
    }
    return el;
}

function Html_simpleDiv(attrs, content) {
    return new Html_Node("div", attrs, content, empty());
}

function Html_div(attrs, children) {
    return new Html_Node("div", attrs, "", children);
}

export function Mocha_isFocused(test) {
    let matchResult, tests, tests_1;
    if (test.tag === 1) {
        if (test.fields[2].tag === 2) {
            matchResult = 1;
        }
        else {
            matchResult = 4;
        }
    }
    else if (test.tag === 2) {
        matchResult = 2;
        tests = test.fields[1];
    }
    else if (test.tag === 3) {
        matchResult = 3;
        tests_1 = test.fields[1];
    }
    else if (test.fields[2].tag === 2) {
        matchResult = 0;
    }
    else {
        matchResult = 4;
    }
    switch (matchResult) {
        case 0: {
            return true;
        }
        case 1: {
            return true;
        }
        case 2: {
            return exists_1(Mocha_isFocused, tests);
        }
        case 3: {
            return exists_1(Mocha_isFocused, tests_1);
        }
        case 4: {
            return false;
        }
    }
}

function Mocha_runSyncTestInBrowser(name, test, padding) {
    let clo_2, clo_3, clo, clo_1;
    try {
        test();
        return Html_simpleDiv(ofArray([["data-test", name], ["class", "passed"], ["style", (clo = toText(printf("font-size:16px; padding-left:%dpx; color:green")), clo(padding))]]), (clo_1 = toText(printf("✔ %s")), clo_1(name)));
    }
    catch (ex) {
        const error = new Html_Node("div", singleton(["style", "font-size:16px;color:red;margin:10px; padding:10px; border: 1px solid red; border-radius: 10px;"]), ex.message, empty());
        return Html_div(empty(), ofArray([Html_simpleDiv(ofArray([["data-test", name], ["class", "failed"], ["style", (clo_2 = toText(printf("font-size:16px; padding-left:%dpx; color:red")), clo_2(padding))]]), (clo_3 = toText(printf("✘ %s")), clo_3(name))), error]));
    }
}

function Mocha_runAsyncTestInBrowser(name, test, padding) {
    let clo_4, clo_5;
    let id;
    let copyOfStruct = newGuid();
    id = copyOfStruct;
    startImmediate(singleton_1.Delay(() => singleton_1.Bind(sleep(1000), () => singleton_1.Bind(catchAsync(test), (_arg_1) => {
        let clo_2, clo_3, clo, clo_1;
        if (_arg_1.tag === 1) {
            const div_1 = document.getElementById(id);
            div_1.innerHTML = ((clo_2 = toText(printf("✘ %s")), clo_2(name)));
            const error = new Html_Node("div", singleton(["style", "margin:10px; padding:10px; border: 1px solid red; border-radius: 10px"]), _arg_1.fields[0].message, empty());
            div_1.setAttribute("style", ((clo_3 = toText(printf("font-size:16px; padding-left:%dpx;color:red")), clo_3(padding))));
            div_1.setAttribute("class", "failed");
            div_1.appendChild(Html_createNode(error));
            return singleton_1.Zero();
        }
        else {
            const div = document.getElementById(id);
            div.innerHTML = ((clo = toText(printf("✔ %s")), clo(name)));
            div.setAttribute("class", "passed");
            div.setAttribute("style", ((clo_1 = toText(printf("font-size:16px; padding-left:%dpx;color:green")), clo_1(padding))));
            return singleton_1.Zero();
        }
    }))));
    return Html_simpleDiv(ofArray([["id", id], ["data-test", name], ["class", "executing"], ["style", (clo_4 = toText(printf("font-size:16px; padding-left:%dpx;color:gray")), clo_4(padding))]]), (clo_5 = toText(printf("⏳ %s")), clo_5(name)));
}

function Mocha_runAsyncSequentialTestInBrowser(name, test, padding) {
    let clo_4, clo_5;
    let id;
    let copyOfStruct = newGuid();
    id = copyOfStruct;
    return [singleton_1.Delay(() => singleton_1.Bind(sleep(1000), () => singleton_1.Bind(catchAsync(test), (_arg_1) => {
        let clo_2, clo_3, clo, clo_1;
        if (_arg_1.tag === 1) {
            const div_1 = document.getElementById(id);
            div_1.innerHTML = ((clo_2 = toText(printf("✘ %s")), clo_2(name)));
            const error = new Html_Node("div", singleton(["style", "margin:10px; padding:10px; border: 1px solid red; border-radius: 10px"]), _arg_1.fields[0].message, empty());
            div_1.setAttribute("style", ((clo_3 = toText(printf("font-size:16px; padding-left:%dpx;color:red")), clo_3(padding))));
            div_1.setAttribute("class", "failed");
            div_1.appendChild(Html_createNode(error));
            return singleton_1.Zero();
        }
        else {
            const div = document.getElementById(id);
            div.innerHTML = ((clo = toText(printf("✔ %s")), clo(name)));
            div.setAttribute("class", "passed");
            div.setAttribute("style", ((clo_1 = toText(printf("font-size:16px; padding-left:%dpx;color:green")), clo_1(padding))));
            return singleton_1.Zero();
        }
    }))), Html_simpleDiv(ofArray([["id", id], ["data-test", name], ["class", "executing"], ["style", (clo_4 = toText(printf("font-size:16px; padding-left:%dpx;color:gray")), clo_4(padding))]]), (clo_5 = toText(printf("⏳ %s")), clo_5(name)))];
}

function Mocha_flattenTests(lastName, _arg) {
    let clo_2, clo_3, clo, clo_1;
    switch (_arg.tag) {
        case 1: {
            const name_1 = _arg.fields[0];
            return singleton(new TestCase(1, [isNullOrWhiteSpace(lastName) ? name_1 : ((clo_2 = toText(printf("%s - %s")), (clo_3 = clo_2(lastName), clo_3(name_1)))), _arg.fields[1], _arg.fields[2]]));
        }
        case 2: {
            return toList(delay(() => collect((test_2) => Mocha_flattenTests(_arg.fields[0], test_2), _arg.fields[1])));
        }
        case 3: {
            return toList(delay(() => collect((test_3) => Mocha_flattenTests(_arg.fields[0], test_3), _arg.fields[1])));
        }
        default: {
            const name = _arg.fields[0];
            return singleton(new TestCase(0, [isNullOrWhiteSpace(lastName) ? name : ((clo = toText(printf("%s - %s")), (clo_1 = clo(lastName), clo_1(name)))), _arg.fields[1], _arg.fields[2]]));
        }
    }
}

function Mocha_renderBrowserTests(hasFocusedTests, tests, padding) {
    return map((_arg) => {
        let clo_6, clo_7, clo_4, clo_5, clo_8, clo_17, clo_2, clo_3, clo, clo_1;
        switch (_arg.tag) {
            case 1: {
                const test_1 = _arg.fields[1];
                const name_1 = _arg.fields[0];
                const focus_1 = _arg.fields[2];
                if (focus_1.tag === 1) {
                    return Html_simpleDiv(ofArray([["class", "pending"], ["data-test", name_1], ["style", (clo_6 = toText(printf("font-size:16px; padding-left:%dpx; color:#B8860B")), clo_6(padding))]]), (clo_7 = toText(printf("🚧 skipping \'%s\' due to it being marked as pending")), clo_7(name_1)));
                }
                else if (focus_1.tag === 2) {
                    return Mocha_runAsyncTestInBrowser(name_1, test_1, padding);
                }
                else if (hasFocusedTests) {
                    return Html_simpleDiv(ofArray([["class", "pending"], ["data-test", name_1], ["style", (clo_4 = toText(printf("font-size:16px; padding-left:%dpx; color:#B8860B")), clo_4(padding))]]), (clo_5 = toText(printf("🚧 skipping \'%s\' due to other focused tests")), clo_5(name_1)));
                }
                else {
                    return Mocha_runAsyncTestInBrowser(name_1, test_1, padding);
                }
            }
            case 2: {
                const name_2 = _arg.fields[0];
                const tests_1 = Html_div(empty(), Mocha_renderBrowserTests(hasFocusedTests, _arg.fields[1], padding + 10));
                return Html_div(empty(), singleton(new Html_Node("div", ofArray([["class", "module"], ["data-module", name_2], ["style", (clo_8 = toText(printf("font-size:20px; padding:%dpx")), clo_8(padding))]]), name_2, singleton(tests_1))));
            }
            case 3: {
                const name_3 = _arg.fields[0];
                const xs = choose((_arg_1) => {
                    let clo_9, clo_10, clo_11, clo_12, clo_13, clo_14, clo_15, clo_16;
                    switch (_arg_1.tag) {
                        case 0: {
                            const focusedState = _arg_1.fields[2];
                            let matchResult;
                            if (focusedState.tag === 1) {
                                matchResult = 1;
                            }
                            else if (focusedState.tag === 2) {
                                matchResult = 2;
                            }
                            else if (hasFocusedTests) {
                                matchResult = 0;
                            }
                            else {
                                matchResult = 2;
                            }
                            switch (matchResult) {
                                case 0: {
                                    return [singleton_1.Delay(() => singleton_1.Bind(sleep(10), () => singleton_1.Return(void 0))), Html_simpleDiv(ofArray([["class", "pending"], ["data-test", name_3], ["style", (clo_9 = toText(printf("font-size:16px; padding-left:%dpx; color:#B8860B")), clo_9(padding))]]), (clo_10 = toText(printf("🚧 skipping \'%s\' due to other focused tests")), clo_10(name_3)))];
                                }
                                case 1: {
                                    return [singleton_1.Delay(() => singleton_1.Bind(sleep(10), () => singleton_1.Return(void 0))), Html_simpleDiv(ofArray([["class", "pending"], ["data-test", name_3], ["style", (clo_11 = toText(printf("font-size:16px; padding-left:%dpx; color:#B8860B")), clo_11(padding))]]), (clo_12 = toText(printf("🚧 skipping \'%s\' due to it being marked as pending")), clo_12(name_3)))];
                                }
                                case 2: {
                                    return Mocha_runAsyncSequentialTestInBrowser(_arg_1.fields[0], singleton_1.Delay(() => singleton_1.Bind(sleep(10), () => {
                                        _arg_1.fields[1]();
                                        return singleton_1.Zero();
                                    })), padding + 10);
                                }
                            }
                        }
                        case 1: {
                            const focusedState_1 = _arg_1.fields[2];
                            let matchResult_1;
                            if (focusedState_1.tag === 1) {
                                matchResult_1 = 1;
                            }
                            else if (focusedState_1.tag === 2) {
                                matchResult_1 = 2;
                            }
                            else if (hasFocusedTests) {
                                matchResult_1 = 0;
                            }
                            else {
                                matchResult_1 = 2;
                            }
                            switch (matchResult_1) {
                                case 0: {
                                    return [singleton_1.Delay(() => singleton_1.Bind(sleep(10), () => singleton_1.Return(void 0))), Html_simpleDiv(ofArray([["class", "pending"], ["data-test", name_3], ["style", (clo_13 = toText(printf("font-size:16px; padding-left:%dpx; color:#B8860B")), clo_13(padding))]]), (clo_14 = toText(printf("🚧 skipping \'%s\' due to other focused tests")), clo_14(name_3)))];
                                }
                                case 1: {
                                    return [singleton_1.Delay(() => singleton_1.Bind(sleep(10), () => singleton_1.Return(void 0))), Html_simpleDiv(ofArray([["class", "pending"], ["data-test", name_3], ["style", (clo_15 = toText(printf("font-size:16px; padding-left:%dpx; color:#B8860B")), clo_15(padding))]]), (clo_16 = toText(printf("🚧 skipping \'%s\' due to it being marked as pending")), clo_16(name_3)))];
                                }
                                case 2: {
                                    return Mocha_runAsyncSequentialTestInBrowser(_arg_1.fields[0], _arg_1.fields[1], padding + 10);
                                }
                            }
                        }
                        default: {
                            return void 0;
                        }
                    }
                }, Mocha_flattenTests("", new TestCase(3, ["", _arg.fields[1]])));
                const tests_2 = Html_div(empty(), map((tuple) => tuple[1], xs));
                const header_1 = new Html_Node("div", ofArray([["class", "module"], ["data-module", name_3], ["style", (clo_17 = toText(printf("font-size:20px; padding:%dpx")), clo_17(padding))]]), name_3, singleton(tests_2));
                const asyncOps = map((tuple_1) => tuple_1[0], xs);
                startImmediate(ignore(singleton_1.Delay(() => singleton_1.Combine(singleton_1.For(asyncOps, (_arg_7) => singleton_1.Bind(_arg_7, () => {
                    return singleton_1.Zero();
                })), singleton_1.Delay(() => singleton_1.Return(void 0))))));
                return Html_div(empty(), singleton(header_1));
            }
            default: {
                const test = _arg.fields[1];
                const name = _arg.fields[0];
                const focus = _arg.fields[2];
                if (focus.tag === 1) {
                    return Html_simpleDiv(ofArray([["class", "pending"], ["data-test", name], ["style", (clo_2 = toText(printf("font-size:16px; padding-left:%dpx; color:#B8860B")), clo_2(padding))]]), (clo_3 = toText(printf("🚧 skipping \'%s\' due to it being marked as pending")), clo_3(name)));
                }
                else if (focus.tag === 2) {
                    return Mocha_runSyncTestInBrowser(name, test, padding);
                }
                else if (hasFocusedTests) {
                    return Html_simpleDiv(ofArray([["class", "pending"], ["data-test", name], ["style", (clo = toText(printf("font-size:16px; padding-left:%dpx; color:#B8860B")), clo(padding))]]), (clo_1 = toText(printf("🚧 skipping \'%s\' due to other focused tests")), clo_1(name)));
                }
                else {
                    return Mocha_runSyncTestInBrowser(name, test, padding);
                }
            }
        }
    }, tests);
}

function Mocha_configureAsyncTest(test, unitVar) {
    return startAsPromise(test);
}

export function Mocha_invalidateTestResults() {
    startImmediate(singleton_1.Delay(() => {
        let clo, clo_1, clo_2, clo_3, clo_4;
        const passedCount = (document.getElementsByClassName("passed").length) | 0;
        const failedCount = (document.getElementsByClassName("failed").length) | 0;
        const executingCount = (document.getElementsByClassName("executing").length) | 0;
        const skippedCount = (document.getElementsByClassName("pending").length) | 0;
        const total = (((passedCount + failedCount) + executingCount) + skippedCount) | 0;
        (document.getElementById("total-tests")).innerHTML = ((clo = toText(printf("Test Results (%d total)")), clo(total)));
        (document.getElementById("passed-tests")).innerHTML = ((clo_1 = toText(printf("✔ %d passed")), clo_1(passedCount)));
        (document.getElementById("failed-tests")).innerHTML = ((clo_2 = toText(printf("✘ %d failed")), clo_2(failedCount)));
        (document.getElementById("executing-tests")).innerHTML = ((clo_3 = toText(printf("⏳ %d being executed (async)")), clo_3(executingCount)));
        (document.getElementById("skipped-tests")).innerHTML = ((clo_4 = toText(printf("🚧 %d pending")), clo_4(skippedCount)));
        return (executingCount > 0) ? singleton_1.Bind(sleep(50), () => {
            Mocha_invalidateTestResults();
            return singleton_1.Zero();
        }) : singleton_1.Return(void 0);
    }));
}

function Mocha_runViaMocha(test) {
    switch (test.tag) {
        case 1: {
            const test_2 = test.fields[1];
            const msg_1 = test.fields[0];
            const focus_1 = test.fields[2];
            switch (focus_1.tag) {
                case 1: {
                    it.skip(msg_1, (() => Mocha_configureAsyncTest(test_2, void 0)));
                    break;
                }
                case 2: {
                    it.only(msg_1, (() => Mocha_configureAsyncTest(test_2, void 0)));
                    break;
                }
                default: {
                    it(msg_1, (() => Mocha_configureAsyncTest(test_2, void 0)));
                }
            }
            break;
        }
        case 2: {
            describe(test.fields[0], () => {
                iterate((test_3) => {
                    Mocha_runViaMocha(test_3);
                }, test.fields[1]);
            });
            break;
        }
        case 3: {
            describe(test.fields[0], () => {
                iterate((test_4) => {
                    Mocha_runViaMocha(test_4);
                }, test.fields[1]);
            });
            break;
        }
        default: {
            const test_1 = test.fields[1];
            const msg = test.fields[0];
            const focus = test.fields[2];
            switch (focus.tag) {
                case 1: {
                    it.skip(msg, test_1);
                    break;
                }
                case 2: {
                    it.only(msg, test_1);
                    break;
                }
                default: {
                    it(msg, test_1);
                }
            }
        }
    }
}

export function Mocha_runViaDotnet(test) {
    throw new Error("Currently not implemented, use Expecto for now.");
    return 1;
}

export function Mocha_runTests(test) {
    if (Env_insideBrowser ? true : (typeof WorkerGlobalScope !== 'undefined' && self instanceof WorkerGlobalScope)) {
        const renderedTests = Mocha_renderBrowserTests(Mocha_isFocused(test), singleton(test), 0);
        const testResults = Html_div(singleton(["style", "margin-bottom: 20px"]), ofArray([Html_simpleDiv(ofArray([["id", "total-tests"], ["style", "font-size:20px; margin-bottom:5px"]]), "Test Results"), Html_simpleDiv(ofArray([["id", "passed-tests"], ["style", "color:green; margin-left:5px;"]]), "Passed"), Html_simpleDiv(ofArray([["id", "skipped-tests"], ["style", "color:#B8860B"]]), "Pending"), Html_simpleDiv(ofArray([["id", "failed-tests"], ["style", "color:red;margin-left:5px"]]), "Failed"), Html_simpleDiv(ofArray([["id", "executing-tests"], ["style", "color:gray;margin-left:5px"]]), "Executing")]));
        const element = Html_createNode(Html_div(singleton(["style", "padding:20px;"]), toList(delay(() => append(singleton_2(testResults), delay(() => renderedTests))))));
        (document.body).appendChild(element);
        Mocha_invalidateTestResults();
        return 0;
    }
    else {
        Mocha_runViaMocha(test);
        return 0;
    }
}

