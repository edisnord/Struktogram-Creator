module DisplayDiagram

open Feliz
open App.Parser

let declare<'a> = ref Unchecked.defaultof<'a>

let astNodeToComponent = declare<Block -> ReactElement>

[<ReactComponent>]
let Caption (caption: string) =
    Html.p[prop.classes [ "struct-caption" ]
           prop.innerHtml caption]

[<ReactComponent>]
let Sequence (text: string) =
    Html.p[prop.className "struct-sequence"
           prop.innerHtml text]

[<ReactComponent>]
let Return (text: string, exit: bool) =
    Html.p[prop.className "struct-break"
           prop.innerHtml <| (if exit then "exit " else "") + $"{text}"]

[<ReactComponent>]
let Call (text: string) =
    Html.p[prop.className "struct-call"
           prop.innerHtml text]

[<ReactComponent>]
let DesicisonGraphic (condition: string) =
    Svg.svg
        [ svg.className "decision-graphic"
          svg.children
              [ Svg.text
                    [ svg.fontSize 16
                      svg.custom ("x", "50%")
                      svg.custom ("y", "30%")
                      svg.dominantBaseline.middle
                      svg.textAnchor.middle
                      svg.text condition ]
                Svg.line
                    [ svg.custom ("x1", "0%")
                      svg.custom ("y1", "0%")
                      svg.custom ("x2", "50%")
                      svg.custom ("y2", "100%")
                      svg.fill "none"
                      svg.stroke "#000"
                      svg.strokeWidth 1 ]
                Svg.line
                    [ svg.custom ("x1", "100%")
                      svg.custom ("y1", "0%")
                      svg.custom ("x2", "50%")
                      svg.custom ("y2", "100%")
                      svg.fill "none"
                      svg.stroke "#000"
                      svg.strokeWidth 1 ]
                Svg.text
                    [ svg.custom ("x", "1%")
                      svg.custom ("y", "90%")
                      svg.className "small-text"
                      svg.dominantBaseline.middle
                      svg.textAnchor.startOfText
                      svg.text "true" ]
                Svg.text
                    [ svg.custom ("x", "99%")
                      svg.custom ("y", "90%")
                      svg.className "small-text"
                      svg.dominantBaseline.middle
                      svg.textAnchor.endOfText
                      svg.text "false" ] ] ]

[<ReactComponent>]
let If
    { condition = Text condition
      blocks = blocks
      opt_else = opt_else }
    =
    Html.div
        [ prop.className "struct-if"
          prop.children
              [ DesicisonGraphic condition
                Html.div
                    [ prop.className "decision-branches"
                      prop.children
                          [ Html.div
                                [ prop.className "if-else-branch"
                                  prop.children (List.map astNodeToComponent.Value blocks) ]
                            Html.div
                                [ prop.className "if-else-branch"
                                  prop.children (List.map astNodeToComponent.Value (Option.defaultValue [] opt_else)) ] ] ] ] ]


[<ReactComponent>]
let Diagram (blocks: Block list) =
    let (Block.Caption caption) =
        Option.defaultValue
            (Block.Caption "Nassi–Shneiderman diagram")
            (List.tryFind
                (function
                | (Block.Caption _) -> true
                | _ -> false)
                blocks)

    let children = Caption caption :: List.map astNodeToComponent.Value blocks

    Html.div [ prop.classes [ "struct-diagram" ]; prop.children children ]


astNodeToComponent.Value <-
    function
    | Block.Return s
    | Block.Exit s -> Return(s, true)
    | Block.Break s -> Return(s, false)
    | Block.Sequence(Text s) -> (Sequence s)
    | Block.Call s -> Call s
    | Block.If b -> If b
    | _ -> (React.functionComponent (fun () -> Html.none) ())