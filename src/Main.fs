module Main

open Feliz
open App
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

let mutable root = ReactDOM.createRoot (document.getElementById "feliz-app")

let editor: obj = ace?edit codeArea
editor?setFontSize 20

let public parseCode () =
    match Parser.parseSource (editor?getValue ()) with
    | Ok(res, _, _) ->
        let value = [ for x in res do
                        if (not <| Parser.isEmptySequence x) then
                            yield x ]
        printfn $"{value}"
        value
    | Error errorValue -> failwith <| errorValue.ToString()

createButton.addEventListener ("click", (fun _ -> root.render <| DisplayDiagram.Diagram(parseCode ())))
hideButton.addEventListener ("click", (fun _ -> root.unmount()
                                                root <- ReactDOM.createRoot (document.getElementById "feliz-app")))
