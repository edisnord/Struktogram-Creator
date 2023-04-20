module App.Components.If

open Feliz
open App.Parser.AST

[<ReactComponent>]
let private DecisionGraphic (condition: string) =
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

let private IfElseBranchContents blocks mapper =
    match (blocks, mapper) with
    | [], _ ->
        [ Html.h1
              [ prop.width (length.percent 100)
                prop.height (length.percent 100)
                prop.style [ style.minHeight (length.px 36) ]
                prop.fontSize 20
                prop.className "phi" ] ]
    | blocks, mapper -> (List.map mapper blocks)

[<ReactComponent>]
let If
    (input:
        {| condition: string
           blocks: Block list
           opt_else: Else option
           mapper: (Block -> ReactElement) |})
    =
    Html.div
        [ prop.className "struct-if"
          prop.children
              [ DecisionGraphic input.condition
                Html.div
                    [ prop.className "decision-branches"
                      prop.children
                          [ Html.div
                                [ prop.className "if-else-branch"
                                  prop.children (IfElseBranchContents input.blocks input.mapper) ]
                            Html.div
                                [ prop.className "if-else-branch"
                                  prop.children (
                                      IfElseBranchContents (Option.defaultValue [] input.opt_else) input.mapper
                                  ) ] ] ] ] ]
