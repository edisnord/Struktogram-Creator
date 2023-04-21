module App.Components.Concurrent
open Feliz
open App.Parser.AST

[<ReactComponent>]
let private ConcurrentGraphic top =
    Svg.svg [
        svg.className "concurrent-graphic"
        svg.children [
            Svg.rect [
                svg.custom("width", "100%")
                svg.custom("height", "100%")
                svg.strokeWidth 1
                svg.stroke "#000"
                svg.fill "none"
            ]
            Svg.line [
                svg.custom("x1", "0%")
                svg.custom("y1", if top then "100%" else "0%")
                svg.custom("x2", "10%")
                svg.custom("y2", if top then "0%" else "100%")
                svg.strokeWidth 1
                svg.stroke "#000"
                svg.fill "none"

            ]
            Svg.line [
                svg.custom("x1", "100%")
                svg.custom("y1", if top then "100%" else "0%")
                svg.custom("x2", "90%")
                svg.custom("y2", if top then "0%" else "100%")
                svg.strokeWidth 1
                svg.stroke "#000"
                svg.fill "none"
            ]
        ]
    ]

[<ReactComponent>]
let private Thread (thread: Block list, mapper) =
    Html.div [
        prop.className "struct-thread"
        prop.children (List.map mapper thread)
    ]

let private ConcurrentThreads (threads: Block list list, mapper) =
    Html.div [
        prop.className "struct-thread-pool"
        prop.children (List.map (fun thread -> Thread (thread, mapper)) threads)
    ]

[<ReactComponent>] 
let Concurrent (threads: Block list list, mapper) =
    Html.div [
        prop.className "struct-concurrent"
        prop.children [
            ConcurrentGraphic true
            ConcurrentThreads (threads, mapper)
            ConcurrentGraphic false
        ]
    ]