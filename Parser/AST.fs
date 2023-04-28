module Parser.AST

type loops =
    | For
    | Loop

type cases = 
    | Case
    | Default

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
    | Switch of Switch

and Else = Block list

and If =
    { condition: Sequence
      blocks: Block list
      opt_else: Else option }

and Switch =
    { condition: Sequence
      cases: (Sequence * Block list) list
      opt_default: (Sequence * Block list) option
    }

and Loop =
    { kind: loops
      opt_condition: Sequence option
      block: Block list
      opt_end_condition: Sequence option }

and Concurrent = { threads: Block list list }
