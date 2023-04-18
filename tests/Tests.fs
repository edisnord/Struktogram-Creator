module tests.Tests

open Fable.Mocha
open App.Parser
open Utils

let sequenceTagEscapeTests =
    testList
        "Parser sequence tag escape tests"
        [
            test "Tag escape works #1" {Expect.equal (extractResult " test<koqe>") [Sequence(Text"test&ltkoqe&gt")] "Tag escape" }
        ]

let parserSingleLineBlocksTests =
    testList
        "Parser single line blocks tests"
        [ sequenceTagEscapeTests
          test "Caption parsing works" { Expect.equal (extractResult "caption: test") [ Caption "test" ] "Caption" }
          test "Break parsing works" { Expect.equal (extractResult "break: test") [ Break "test" ] "Break" }
          test "Return parsing works" { Expect.equal (extractResult "return: test") [ Return "test" ] "Return" }
          test "Exit parsing works" { Expect.equal (extractResult "exit: test") [ Exit "test" ] "Exit" }
          test "Call parsing works" { Expect.equal (extractResult "call: test") [ Call "test" ] "Call" }
          test "Sequence keyword detection works" {
              Expect.throws (fun () -> extractResult "else: " |> ignore) "Sequence kw detection"
          }
          ]


let parserMultiLineBlocksTests =
    testList "Parser multiline blocks tests" [ IfTests.parserIfTests ]

let parserAllTests =
    testList "All parser tests" [ parserSingleLineBlocksTests; parserMultiLineBlocksTests ]

Mocha.runTests parserAllTests |> ignore
