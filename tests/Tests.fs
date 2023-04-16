module tests.Tests

open Fable.Mocha
open App.Parser

let extractResult src =
    match parseSource src with
    | Ok(res, _, _) ->
        [ for x in res do
              if (not <| isEmptySequence x) then
                  yield x ]
    | Error errorValue ->
        printfn $"{errorValue.ToString()}"
        failwith <| errorValue.ToString()

let parserSingleLineBlocksTests =
    testList
        "Parser single line blocks tests"
        [ test "Caption parsing works" { Expect.equal (extractResult "caption: test") [ Caption "test" ] "Caption" }
          test "Break parsing works" { Expect.equal (extractResult "break: test") [ Break "test" ] "Break" }
          test "Return parsing works" { Expect.equal (extractResult "return: test") [ Return "test" ] "Return" }
          test "Exit parsing works" { Expect.equal (extractResult "exit: test") [ Exit "test" ] "Exit" }
          test "Call parsing works" { Expect.equal (extractResult "call: test") [ Call "test" ] "Call" }
          test "Sequence keyword detection works" {
              Expect.throws (fun () -> extractResult "else: " |> ignore) "Sequence kw detection"
          } ]

let parserIfTests =
    testList
        "Parser if tests"
        [ test "If with condition no body works" {
              Expect.equal
                  (extractResult "if: test\nendif:")
                  [ If
                        { condition = Sequence.Text "test"
                          blocks = []
                          else_ifs = []
                          opt_else = None } ]
                  "If no body"
          }
          test "If no condition with body works" {
              Expect.equal
                  (extractResult "if:\n    test\nendif:")
                  [ If
                        { condition = Sequence.Text ""
                          blocks = [ Block.Sequence <| Text "test" ]
                          else_ifs = []
                          opt_else = None } ]
                  "If with body, no condition"
          }
          test "If with else works" {
              Expect.equal
                  (extractResult "if: test1\n    test\nelse:\n    test2\nendif:")
                  [ If
                        { condition = Sequence.Text "test1"
                          blocks = extractResult "test"
                          else_ifs = []
                          opt_else = Some(Blocks <| extractResult "test2") } ]
                  "If with body, no condition"
          }
          test "If with empty else works" {
              Expect.equal
                  (extractResult "if: test1\n    test\nelse:\nendif:")
                  [ If
                        { condition = Sequence.Text "test1"
                          blocks = extractResult "test"
                          else_ifs = []
                          opt_else = Some(Blocks []) } ]
                  "If with body, no condition"
          }
          test "Empty if with empty else works" {
              Expect.equal
                  (extractResult "if: test1\nelse:\nendif:")
                  [ If
                        { condition = Sequence.Text "test1"
                          blocks = []
                          else_ifs = []
                          opt_else = Some(Blocks []) } ]
                  "If with body, no condition"
          }
          test "Empty if with no condition and empty else works" {
              Expect.equal
                  (extractResult "if: \nelse:\nendif:")
                  [ If
                        { condition = Sequence.Text ""
                          blocks = []
                          else_ifs = []
                          opt_else = Some(Blocks []) } ]
                  "If with body, no condition"
          }
          test "Empty if with no condition, empty else if and empty else works" {
              Expect.equal
                  (extractResult "if: \nelseif:\nelse:\nendif:")
                  [ If
                        { condition = Sequence.Text ""
                          blocks = []
                          else_ifs = [ElseIf {
                              condition = Text ""
                              blocks = [] 
                          }]
                          opt_else = Some(Blocks []) } ]
                  "If with body, no condition"
          }
          test "If with elseif works" {
              Expect.equal
                  (extractResult "if: test1\n    test\nelseif: test2\n    test2\nendif:")
                  [ If
                        { condition = Sequence.Text "test1"
                          blocks = extractResult "test"
                          else_ifs =
                            [ ElseIf
                                  { condition = Text "test2"
                                    blocks = extractResult "test2" } ]
                          opt_else = None } ]
                  "If with body, no condition"
          }
          test "If with elseif and else works" {
              Expect.equal
                  (extractResult "if: test1\n    test\nelseif: test2\n    test2\nendif:")
                  [ If
                        { condition = Sequence.Text "test1"
                          blocks = extractResult "test"
                          else_ifs =
                            [ ElseIf
                                  { condition = Text "test2"
                                    blocks = extractResult "test2" } ]
                          opt_else = None } ]
                  "If with body, no condition"
          } 
          test "If with multiple else-ifs and an else at the end" {
              Expect.equal
                  (extractResult "if: test\nbruh\nelseif: bruh2\nbruh3\nelse:\nbruh4\nbruh5\nendif:")
                  [ If
                        { condition = Sequence.Text "test"
                          blocks = extractResult "bruh" 
                          else_ifs = [ElseIf {
                              condition = Text "bruh2"
                              blocks = extractResult "bruh3" 
                          }]
                          opt_else = Some(Blocks <| extractResult "bruh4\nbruh5\n") } ]
                  "If with body, no condition"
          } ]

let parserMultiLineBlocksTests =
    testList "Parser multiline blocks tests" [ parserIfTests ]

let parserAllTests =
    testList "All parser tests" [ parserSingleLineBlocksTests; parserMultiLineBlocksTests ]

Mocha.runTests parserAllTests |> ignore
