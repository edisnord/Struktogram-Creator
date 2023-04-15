module Main

open Feliz
open App
open Fable.Core
open Fable.Core.JsInterop
open Browser.Dom

[<Import("*", from = "ace-builds")>]
let ace: obj = jsNative

let codeArea = document.getElementById "codeEditor" :?> Browser.Types.HTMLDivElement
let createButton = document.getElementById("createButton") :?> Browser.Types.HTMLButtonElement
let root = ReactDOM.createRoot(document.getElementById "feliz-app")

let editor: obj = ace?edit codeArea
editor?setFontSize 20

let public parseCode () =
    match Parser.parseSource (editor?getValue()) with
                    | Ok(res, _, _) -> res
                    | Error errorValue -> failwith <| errorValue.ToString()

createButton.addEventListener("click",
                              fun _ -> root.render <| DisplayDiagram.Diagram (parseCode ())    
                              )