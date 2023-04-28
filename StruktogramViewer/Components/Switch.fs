module StruktogramViewer.Components.Switch

open Feliz
open Parser.AST

let Switch (input: {|
                        condition: string
                        cases: (Sequence * Block list) list
                        opt_default: (Sequence * Block list) option |})
            =
            Html.none