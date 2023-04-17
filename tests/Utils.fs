module tests.Utils
open App
open Parser

let public extractResult src =
    match parseSource src with
    | Ok(res, _, _) ->
        [ for x in res do
              if (not <| isEmptySequence x) then
                  yield x ]
    | Error errorValue ->
        printfn $"{errorValue.ToString()}"
        failwith <| errorValue.ToString()
