module DisplayDiagram

open System.Collections.Generic
open Feliz
open Parser

[<ReactComponent>]
let Caption (caption: string) =
    Html.p[prop.classes [ "struct-caption" ]
           prop.innerHtml caption]

let Sequence (text: string) =
    Html.p[prop.className "struct-sequence"
           prop.innerHtml text]

let Return (text: string) =
    Html.p[prop.className "struct-break"
           prop.innerHtml <| $"exit {text}"]

let astNodeToComponent =
    function
    | Block.Return s -> (Return s)
    | Block.Sequence(Text s) -> (Sequence s)
    | block -> (React.functionComponent (fun () -> Html.div []) ())



[<ReactComponent>]
let Diagram (blocks: Block list) =
    let (Block.Caption caption) =
        try
            List.find
                (function
                | (Block.Caption _) -> true
                | _ -> false)
                blocks
        with :? KeyNotFoundException ->
            Block.Caption "Nassi–Shneiderman diagram"
    let children = (Seq.append [ Caption caption ] <| List.map astNodeToComponent blocks)

    Html.div
        [ prop.classes [ "struct-diagram" ]
          prop.children children ]
        
