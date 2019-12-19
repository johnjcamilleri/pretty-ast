# Pretty AST

Pretty-print an abstract syntax tree (AST).
Primarily written with [GF](http://www.grammaticalframework.org) ASTs in mind, but probably useful for other things.

Before:
```
PhrUtt otherwise_PConj (UttImpSg PNeg (ImpVP (ComplSlash (Slash2V3 talk_V3 something_NP) (DetNP every_Det)))) (VocNP something_NP)
```

After:
```
PhrUtt
  otherwise_PConj
  UttImpSg
    PNeg
    ImpVP
      ComplSlash
        Slash2V3
          talk_V3
          something_NP
        DetNP
          every_Det
  VocNP
    something_NP
```

## Usage

Choose **Pretty print AST** from a context menu or the command `pretty-ast:pretty-print` from the command palette.
