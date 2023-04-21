module DisplayDiagram

open Feliz
open App.Parser.AST
open App.Components.SingleLine

let rec astNodeToComponent =
    function
    | Block.Return s
    | Block.Exit s -> Return(s, true)
    | Block.Break s -> Return(s, false)
    | Block.Sequence(Text s) -> (Sequence s)
    | Block.Call s -> Call s
    | Block.If { condition = Text condition
                 blocks = blocks
                 opt_else = opt_else } ->
        App.Components.If.If
            {| condition = condition
               blocks = blocks
               opt_else = opt_else
               mapper = astNodeToComponent |}
    | Block.Loop l ->
        App.Components.Loop.Loop
            {| condition = l.opt_condition
               blocks = l.block
               kind = l.kind
               end_condition = l.opt_end_condition
               mapper = astNodeToComponent |}
    | Block.Concurrent concurrent -> App.Components.Concurrent.Concurrent (concurrent.threads, astNodeToComponent)
    | _ -> (React.functionComponent (fun () -> Html.none) ())

[<ReactComponent>]
let Diagram (blocks: Block list, width: string) =
    let caption =
        Option.map
            (function
            | Block.Caption s -> Caption s
            | _ -> Html.none)
            (List.tryFind
                (function
                | Block.Caption _ -> true
                | _ -> false)
                blocks)

    let children =
        Option.defaultValue Html.none caption :: List.map astNodeToComponent blocks

    Html.div
        [ prop.id "main-diagram"
          prop.classes [ "struct-diagram" ]
          prop.style [ style.custom("width", width) ]
          prop.children children ]
