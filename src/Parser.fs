module App.Parser

open Parsec

type private Parser<'a> = Parser<'a, unit>

type loops =
    | For
    | Loop

type Sequence = Text of string

and Block =
    | Caption of string
    | If of If
    | Loop of Loop
    | Break of string
    | Concurrent of Concurrent
    | Thread of Block list
    | Call of string
    | Return of string
    | Exit of string
    | Sequence of Sequence

and Else = Block list

and If =
    { condition: Sequence
      blocks: Block list
      opt_else: Else option }


and Loop =
    { kind: loops
      opt_condition: Sequence option
      block: Block list
      opt_end_condition: Sequence option }

and Concurrent = { threads: Block list list }

let public isEmptySequence =
    function
    | Block.Sequence(Text s) -> s.Equals ""
    | _ -> false

let private pBlock, private pBlockRef = createParserForwardedToRef ()

let private blockNotClosedError block =
    $"{block} block not closed with \"end{block}\":"

let private keywords: Parser<unit> =
    choice
        [ skipString "endif:"
          skipString "if:"
          skipString "else:"
          skipString "loop:"
          skipString "endloop:"
          skipString "for:"
          skipString "endfor:"
          skipString "concurrent:"
          skipString "thread:"
          skipString "break:"
          skipString "exit:"
          skipString "return:" ]

let private pCondition: Parser<Sequence> =
    (manyChars (satisfy (isNoneOf "\n")) |>> Sequence.Text)
    |>> (fun (Sequence.Text s) -> Sequence.Text <| s.Trim())

let private pSequence =
    let escape =
        anyOf "<>" .>> opt eof
        |>> function
            | '<' -> "&lt"
            | '>' -> "&gt"
            | s -> string s

    let normalSnippet =
        many1Till
            (manySatisfy (fun c -> c <> '\n' && c <> '<' && c <> '>' && c <> '\uffff'))
            (followedBy (eof <|> (anyOf "<>\n" |>> ignore)))
        .>> opt eof
        |>> (Array.ofList >> System.String.Concat)

    notFollowedByL (spaces >>. keywords) "Keyword detected at start of sequence"
    >>. (stringsSepBy normalSnippet escape |>> Sequence.Text)
    |>> (fun (Sequence.Text s) -> Sequence.Text <| s.Trim())

let private pKeyWordWithCond keyword =
    spaces >>. skipString keyword >>. (pCondition <?> "Condition required")
    .>> (skipNewline <|> eof)

let private pKeyWord kw =
    spaces >>. skipString kw
    .>> skipManyTill (anyOf " \t") (followedBy (skipNewline <|> eof))


let private pElse: Parser<Else> =
    pKeyWord "else:"
    >>. skipNewline
    >>. manyTill (pBlock .>> skipNewline) (followedBy ((pKeyWordWithCond "endif:") |>> ignore <|> eof)) <|> (spaces |>> fun _ -> [])
    |>> List.filter (not << isEmptySequence)


let private pIf =
    let pIfBody =
        (sepEndBy (pBlock .>> skipNewline) (notFollowedBy (pKeyWord "endif:" <|> pKeyWord "else:")))
        <|> (spaces |>> fun _ -> [])

    pipe4
        (pKeyWordWithCond "if:" <|> (pKeyWord "if:" |>> fun _ -> Sequence.Text ""))
        pIfBody
        (opt pElse)
        (pKeyWordWithCond "endif:" <?> blockNotClosedError "if")
        (fun x1 x2 x3 _ ->
            { condition = x1
              blocks = List.filter (not << isEmptySequence) x2
              opt_else = x3 })


let private pThread =
    let errorMsg = blockNotClosedError "concurrent"

    (pKeyWordWithCond "thread:")
    >>. skipNewline
    >>. manyTill (pBlock .>> skipNewline) (followedBy (pKeyWord "endconcurrent:" <|> pKeyWord "thread:"))
    <?> errorMsg
    |>> List.filter (function
        | Block.Sequence(Sequence.Text(el)) -> not (el.Equals "")
        | _ -> true)

let private pConcurrent =
    let errorMsg = blockNotClosedError "concurrent"

    pKeyWordWithCond "concurrent:"
    >>. (sepEndBy (pThread <|> (pBlock |>> fun a -> [ a ])) (notFollowedBy (pKeyWord "endconcurrent:") >>. skipNewline))
    |>> fun threads -> { threads = threads }
    .>> (spaces
         >>. (((pKeyWordWithCond "endconcurrent:" |>> fun _ -> ())
               <|> skipString "endconcurrent:")
              <?> errorMsg))



let private pAnyLoop keyword kind withEndCond =
    let errorMsg = blockNotClosedError keyword

    let loopCond =
        pKeyWordWithCond keyword |>> Some <|> (pKeyWord keyword |>> fun _ -> None)

    let loopEndCond: Parser<Sequence option> =
        (pKeyWordWithCond $"end{keyword}"
         |>> fun s ->
             if isEmptySequence (Sequence s) && withEndCond then
                 None
             else
                 Some s)
        <?> errorMsg

    pipe3 loopCond (sepEndBy pBlock (notFollowedBy loopEndCond >>. skipNewline)) loopEndCond (fun x1 x2 x3 ->
        { kind = kind
          opt_condition = x1
          block = x2
          opt_end_condition = x3 })

let private pLoop =
    choice [ pAnyLoop "loop:" loops.Loop true; pAnyLoop "for:" loops.For false ]

let private pSingleLineInstruction keyword blockType =
    pstring keyword >>. pSequence
    |>> function
        | Sequence.Text s -> blockType s

let private pCaption =
    pstring "caption:" >>. pSequence
    |>> function
        | Sequence.Text s -> Block.Caption s

let private pBreak = pSingleLineInstruction "break:" Block.Break

let private pExit = pSingleLineInstruction "exit:" Block.Exit

let private pCall = pSingleLineInstruction "call:" Block.Call

let private pReturn = pSingleLineInstruction "return:" Block.Return

pBlockRef.Value <-
    skipManySatisfy (isAnyOf " \t")
    >>. choice
        [ pIf |>> Block.If
          pLoop |>> Block.Loop
          pConcurrent |>> Block.Concurrent
          pCall
          pCaption
          pBreak
          pExit
          pReturn
          pSequence |>> Block.Sequence ]

let public parseSource src =
    run (many1Till (pBlock .>> spaces) eof) () (StringSegment.ofString src)
