import { styleTags, tags as t } from "@lezer/highlight";

export const pythonRegexHighlighting = styleTags({
  // Basic pattern elements
  AnyCharacter: t.special(t.string),
  "StartAssertion EndAssertion": t.keyword,
  PatternCharacter: t.string,

  // Quantifiers
  "ZeroOrMore OneOrMore Optional CountQuantifier": t.operator,
  LazyModifier: t.modifier,
  "QuantifierRange DecimalDigits": t.number,

  // Character classes
  CharacterClass: t.bracket,
  "[ ]": t.bracket,
  CharacterClassNegation: t.operatorKeyword,
  ClassCharacter: t.string,

  // Escape sequences - aligned with TextMate grammar patterns
  "BoundaryAssertion NonBoundaryAssertion": t.regexp,
  CharacterClassEscape: t.regexp, // \d\D\s\S\w\W\A\Z - special escape sequences
  "BackreferenceNumber BackreferenceExtended BackreferenceK NamedBackreference":
    t.escape,
  "ControlEscape ControlEscapeNull": t.escape,
  BackslashEscape: t.escape,
  "HexEscape UnicodeEscape": t.escape,
  IdentityEscape: t.escape,
  "ClassCharacterEscape ClassControlEscape ClassBackslashEscape": t.escape,
  "ClassHexEscape ClassUnicodeEscape ClassOctalEscape ClassIdentityEscape":
    t.escape,

  // General escape containers
  EscapeSequence: t.escape,
  ClassEscape: t.escape,
  ClassItem: t.string,

  // Groups and constructs - aligned with TextMate patterns
  "AnonymousCapturingGroup NamedCapturingGroup NonCapturingGroup": t.bracket,
  AtomicGroup: t.bracket,
  "( )": t.bracket,
  GroupName: t.labelName, // Better semantic alignment with TextMate's entity.name.tag

  // Lookarounds - consistent with TextMate's keyword.operator approach
  "PositiveLookahead NegativeLookahead PositiveLookbehind NegativeLookbehind":
    t.regexp,
  LookaroundAssertion: t.regexp,

  // Inline flags - consistent with TextMate's storage.modifier approach
  InlineFlagsGroup: t.meta,
  "FlagsExpression Flags": t.modifier,

  // Remove over-specified structural elements - these don't need distinct highlighting
  // Pattern, Alternation, Term, Atom, SimpleAtom are structural and should inherit styling
  GroupConstruct: t.bracket,
  Quantifier: t.operator,
  CharacterClassContent: t.string,

  // Comments - consistent with TextMate's comment.regexp
  "Comment CommentContent": t.lineComment,
  "(?# )": t.lineComment,

  // Conditionals - aligned with TextMate's keyword.operator.conditional approach
  "ConditionalExpression ConditionalTest ConditionalContent": t.regexp,

  // Alternation operator
  "|": t.operator,

  // Special regex punctuation - consistent with TextMate approach
  ".": t.regexp, // Any character - special regex meaning
  "^": t.regexp, // Start assertion
  $: t.regexp, // End assertion
  '"*"': t.operator, // Quoted to avoid conflicts with wildcard selector
  "+": t.operator,
  "?": t.operator,
  "{": t.bracket,
  "}": t.bracket,
});
