module StruktogramViewer.Components.SingleLine

open Feliz

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
