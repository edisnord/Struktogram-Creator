module public tests.IfTests

open Fable.Mocha
open App.Parser
open Utils

let parserIfTests =
    testList
        "Parser if tests"
        [ test "If with condition no body works" {
              Expect.equal
                  (extractResult "if: test\nendif:")
                  [ If
                        { condition = Sequence.Text "test"
                          blocks = []
                          opt_else = None } ]
                  "If no body"
          }
          test "If no condition with body works" {
              Expect.equal
                  (extractResult "if:\n    test\nendif:")
                  [ If
                        { condition = Sequence.Text ""
                          blocks = [ Block.Sequence <| Text "test" ]
                          opt_else = None } ]
                  "If with body, no condition"
          }
          test "If with else works" {
              Expect.equal
                  (extractResult "if: test1\n    test\nelse:\n    test2\nendif:")
                  [ If
                        { condition = Sequence.Text "test1"
                          blocks = extractResult "test"
                          opt_else = Some <| extractResult "test2" } ]
                  "If with body, no condition"
          }
          test "If with empty else works" {
              Expect.equal
                  (extractResult "if: test1\n    test\nelse:\nendif:")
                  [ If
                        { condition = Sequence.Text "test1"
                          blocks = extractResult "test"
                          opt_else = Some [] } ]
                  "If with body, no condition"
          }
          test "Empty if with empty else works" {
              Expect.equal
                  (extractResult "if: test1\nelse:\nendif:")
                  [ If
                        { condition = Sequence.Text "test1"
                          blocks = []
                          opt_else = Some [] } ]
                  "If with body, no condition"
          }
          test "Empty if with no condition and empty else works" {
              Expect.equal
                  (extractResult "if: \nelse:\nendif:")
                  [ If
                        { condition = Sequence.Text ""
                          blocks = []
                          opt_else = Some [] } ]
                  "If with body, no condition"
          }
          test "If without endif throws" {
              Expect.throws
                  (fun () -> extractResult "if: test1\ntest2" |> ignore)
                  "if without endif"
          }
          test "If-else without endif throws" {
              Expect.throws
                  (fun () -> extractResult "if: test1\n else:\ntest2" |> ignore)
                  "if without endif"
          }
 ]
