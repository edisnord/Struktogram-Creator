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
    | ElseIf of ElseIf
    | Loop of Loop
    | Break of string
    | Concurrent of Concurrent
    | Thread of Block list
    | Call of string
    | Return of string
    | Exit of string
    | Sequence of Sequence

and Else = Blocks of Block list

and If =
    { condition: Sequence
      blocks: Block list
      else_ifs: Block list
      opt_else: Else option }

and ElseIf =
    { condition: Sequence
      blocks: Block list }

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
          skipString "elseif:"
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

let private pSequence =
    notFollowedByL (spaces >>. keywords) "Keyword detected at start of sequence"
    >>. (manyChars (satisfy (isNoneOf "\n")) |>> Sequence.Text)
    |>> (fun (Sequence.Text s) -> Sequence.Text <| s.Trim())

let private pKeyWordWithCond keyword =
    spaces
    >>. skipString keyword
    >>. (skipSatisfy <| isAnyOf " \t")
    >>. (pSequence <|> fail "Condition required")
    .>> (skipNewline <|> eof)

let private pKeyWord kw =
    spaces >>. skipString kw
    .>> (skipManyTill (anyOf " \t") <| followedBy (skipNewline <|> eof))


let private pElse =
    (pKeyWord "else:")
    >>. skipNewline
    >>. manyTill (pBlock .>> skipNewline) (followedBy (pKeyWord "endif:"))
    |>> List.filter (function
        | Block.Sequence(Sequence.Text(el)) -> not (el.Equals "")
        | _ -> true)
    |>> Else.Blocks

let private pElseIf =
    pipe2
        (pKeyWordWithCond "elseif:"
         <|> (pKeyWord "elseif:" |>> fun _ -> Sequence.Text ""))
        ((sepEndBy
            pBlock
            (notFollowedBy (pKeyWord "endif:" <|> pKeyWord "elseif:" <|> pKeyWord "else")
             >>. skipNewline))
         <|> (spaces |>> fun _ -> []))
        (fun x1 x2 ->
            { condition = x1
              blocks =
                List.filter
                    (function
                    | Block.Sequence(Sequence.Text(el)) -> not (el.Equals "")
                    | _ -> true)
                    x2 })
    |>> Block.ElseIf

let pIfBody =
    (sepEndBy (pElseIf <|> pBlock) (notFollowedBy (pKeyWord "endif:" <|> pKeyWord "else:") >>. skipNewline))
    <|> (spaces |>> fun _ -> [])

let private pIf =
    pipe4
        (pKeyWordWithCond "if:" <|> (pKeyWord "if:" |>> fun _ -> Sequence.Text ""))
        pIfBody
        (opt pElse)
        (spaces >>. ((pKeyWordWithCond "endif:" |>> ignore) <|> skipString "endif:")
         <?> blockNotClosedError "if")
        (fun x1 x2 x3 _ ->
            { condition = x1
              blocks =
                List.filter
                    (function
                    | Block.Sequence(Sequence.Text(el)) -> not (el.Equals "")
                    | Block.ElseIf _ -> false
                    | _ -> true)
                    x2
              else_ifs =
                [ for x in x2 do
                      if
                          (match x with
                           | Block.ElseIf _ -> true
                           | _ -> false)
                      then
                          yield x ]
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
