module Main

open Feliz
open Fable.Core
open Fable.Core.JsInterop
open Browser.Dom


[<Import("*", from = "ace-builds")>]
let ace: obj = jsNative

let codeArea = document.getElementById "codeEditor" :?> Browser.Types.HTMLDivElement

let createButton =
    document.getElementById ("createButton") :?> Browser.Types.HTMLButtonElement

let hideButton =
    document.getElementById ("clearButton") :?> Browser.Types.HTMLButtonElement

let saveImageButton =
    document.getElementById ("saveImageButton") :?> Browser.Types.HTMLButtonElement

let slider =
    document.getElementById ("myRange") :?> Browser.Types.HTMLInputElement
 

let toggleAutoWidth =
    document.getElementById ("auto-width") :?> Browser.Types.HTMLInputElement

let mutable root = ReactDOM.createRoot (document.getElementById "feliz-app")

let editor: obj = ace?edit codeArea
editor?setFontSize 20

let public parseCode () =
    match Parser.Parsing.parseSource (editor?getValue ()) with
    | Ok(res, _, _) ->
        let value =
            [ for x in res do
                  if (not <| Parser.Parsing.isEmptySequence x) then
                      yield x ]

        printfn $"{value}"
        value
    | Error (a, b) -> failwith <| a.ToString() + "\n\n" + b.ToString()

createButton.addEventListener ("click", (fun _ -> let width = if toggleAutoWidth.checked then "auto" else slider.value + "%"  
                                                  root.render <| StruktogramViewer.DisplayDiagram.Diagram(parseCode (), width)))

hideButton.addEventListener (
    "click",
    (fun _ ->
        root.unmount ()
        root <- ReactDOM.createRoot (document.getElementById "feliz-app"))
)