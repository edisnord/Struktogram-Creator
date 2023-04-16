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

let Return (text: string, exit: bool) =
    Html.p[prop.className "struct-break"
           prop.innerHtml <| (if exit then "exit " else "") + $"{text}"]

let Call (text: string) =
    Html.p[prop.className "struct-call"
           prop.innerHtml text]

let astNodeToComponent =
    function
    | Block.Return s | Block.Exit s -> Return(s, true)
    | Block.Break s -> Return(s, false)
    | Block.Sequence(Text s) -> (Sequence s)
    | Block.Call s -> Call s
    | _ -> (React.functionComponent (fun () -> Html.none) ())




[<ReactComponent>]
let Diagram (blocks: Block list) =
    let (Block.Caption caption) =
        try
            List.find
                (function
                | (Block.Caption _) -> true
                | _ -> false)
                blocks
        with Failure _ ->
            Block.Caption "Nassi–Shneiderman diagram"

    let children = Caption caption :: List.map astNodeToComponent blocks

    Html.div [ prop.classes [ "struct-diagram" ]; prop.children children ]
