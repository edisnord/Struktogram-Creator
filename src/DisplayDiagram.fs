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

let IfElseBranchContents =
    function
    | [] ->
        [ Html.h1
              [ prop.width (length.percent 100)
                prop.height (length.percent 100)
                prop.fontSize 20
                prop.innerHtml "𝝓"
                prop.className "phi" ] ]
    | blocks -> (List.map astNodeToComponent.Value blocks)

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
                          [ Html.div [ prop.className "if-else-branch"; prop.children (IfElseBranchContents blocks) ]
                            Html.div
                                [ prop.className "if-else-branch"
                                  prop.children (IfElseBranchContents(Option.defaultValue [] opt_else)) ] ] ] ] ]



[<ReactComponent>]
let Loop
    { kind = kind
      opt_condition = condition
      block = blocks
      opt_end_condition = end_condition }
    =

    let styleClass, condition =
        match kind, condition, end_condition with
        | loops.For, Some(Text a), _ -> prop.className "struct-for", a
        | loops.Loop, _, Some(Text a) -> prop.className "struct-loop", a

    let loopCond =
        React.functionComponent (fun () -> Html.div [ prop.id "loop-cond"; prop.children [ Sequence condition ] ])

    Html.div
        [ styleClass
          prop.children (
              match kind with
              | loops.For -> loopCond() :: (List.map astNodeToComponent.Value blocks)
              | loops.Loop -> List.append (List.map astNodeToComponent.Value blocks) [ loopCond() ]
          ) ]


[<ReactComponent>]
let Diagram (blocks: Block list, width: int) =
    let caption =
        Option.map
            (function
            | Block.Caption s -> Caption s
            | _ -> Html.none)
            (List.tryFind
                (function
                | (Block.Caption _) -> true
                | _ -> false)
                blocks)

    let children =
        Option.defaultValue Html.none caption
        :: List.map astNodeToComponent.Value blocks

    Html.div
        [ prop.id "main-diagram"
          prop.classes [ "struct-diagram" ]
          prop.style [ style.width (length.percent width) ]
          prop.children children ]


astNodeToComponent.Value <-
    function
    | Block.Return s
    | Block.Exit s -> Return(s, true)
    | Block.Break s -> Return(s, false)
    | Block.Sequence(Text s) -> (Sequence s)
    | Block.Call s -> Call s
    | Block.If b -> If b
    | Block.Loop l -> Loop l
    | _ -> (React.functionComponent (fun () -> Html.none) ())
