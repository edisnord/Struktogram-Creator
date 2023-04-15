module DisplayDiagram

open Feliz
open Parser

[<ReactComponent>]
let Counter() =
    let (count, setCount) = React.useState(0)
    Html.div [
        Html.h1 count
        Html.button [
            prop.text "Increment"
            prop.onClick (fun _ -> setCount(count + 1))
        ]
    ]


[<ReactComponent>]
let Diagram (blocks: Block list) =
    Html.div [
        prop.id ""
    ]