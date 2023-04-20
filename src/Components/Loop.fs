module App.Components.Loop
open App.Parser
open Feliz
open App.Parser.AST

[<ReactComponent>]
let Loop (input : {| kind: loops;
                     condition: Sequence option 
                     blocks: Block list
                     end_condition: Sequence option
                     mapper: (Block -> ReactElement)
         |})
    =
    let styleClass, condition =
        match input.kind, input.condition, input.end_condition with
        | loops.For, Some(Text a), _ -> prop.className "struct-for", a
        | loops.Loop, _, Some(Text a) -> prop.className "struct-loop", a

    let loopCond =
        React.functionComponent (fun () -> Html.div [ prop.id "loop-cond"; prop.children [ SingleLine.Sequence condition ] ])

    Html.div
        [ styleClass
          prop.children (
              match input.kind with
              | loops.For -> loopCond() :: (List.map input.mapper input.blocks)
              | loops.Loop -> List.append (List.map input.mapper input.blocks) [ loopCond() ]
          ) ]
