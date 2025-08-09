# lezer-python-regex

[![npm](https://img.shields.io/npm/v/lezer-python-regex)](https://www.npmjs.com/package/lezer-python-regex/v/latest) [![npm bundle size](https://img.shields.io/bundlephobia/minzip/lezer-python-regex)](https://www.npmjs.com/package/lezer-python-regex/v/latest) [![jsDelivr hits](https://img.shields.io/jsdelivr/npm/hm/lezer-python-regex?color=%23ff5627)](https://cdn.jsdelivr.net/npm/lezer-python-regex@latest/)

A [Lezer](https://lezer.codemirror.net/) grammar for parsing Python regular expressions with incremental parsing support and TypeScript definitions.

## Install

```bash
npm i lezer-python-regex
```

## Features

- Basic patterns, character classes, quantifiers, groups
- Lookarounds, backreferences, conditionals, alternation
- Inline flags, embedded comments, escape sequences
- Named groups `(?P<name>)`, atomic groups `(?>)`
- Broad coverage of Python regex syntax (groups, lookarounds, conditionals, inline flags, character classes, octal/hex/unicode escapes, anchors including \A and \Z, possessive quantifiers and atomic groups from Python 3.11+)

## Usage

### Basic

```ts
import { parser } from "lezer-python-regex";

const tree = parser.parse(`(?P<word>\w+)\s+(?P=word)`);
console.log(tree.toString());
```

### With CodeMirror

```ts
import { parser, pythonRegexHighlighting } from "lezer-python-regex";
import { LRLanguage } from "@codemirror/language";
import { HighlightStyle, syntaxHighlighting } from "@codemirror/language";

const pythonRegexLanguage = LRLanguage.define({
  parser,
  languageData: { name: "python-regex" },
});

const highlightStyle = HighlightStyle.define([pythonRegexHighlighting]);
const extensions = [pythonRegexLanguage, syntaxHighlighting(highlightStyle)];
```

### Tree Navigation

```ts
import { parser } from "lezer-python-regex";
import * as terms from "lezer-python-regex";

const tree = parser.parse(`(?P<email>[^@]+@[^@]+)`);
const cursor = tree.cursor();

// Find named groups
cursor.iterate((node) => {
  if (node.type.id === terms.NamedCapturingGroup) {
    console.log("Named group found:", node);
  }
});
```

### Error Handling

```ts
import { parser } from "lezer-python-regex";

function parseWithErrors(pattern: string) {
  const tree = parser.parse(pattern);
  const errors: any[] = [];

  tree.cursor().iterate((node) => {
    if (node.type.isError) {
      errors.push({
        from: node.from,
        to: node.to,
        message: `Syntax error at ${node.from}-${node.to}`,
      });
    }
  });

  return { tree, errors };
}
```

## API

### Exports

- `parser` - Lezer parser instance
- `pythonRegexHighlighting` - CodeMirror syntax highlighting
- Grammar terms - Node type constants for tree navigation

### Types

```ts
parser.parse(input: string, fragments?: TreeFragment[], ranges?: {from: number, to: number}[]): Tree
```

## Development

```bash
git clone https://github.com/Sec-ant/lezer-python-regex
cd lezer-python-regex
pnpm install
pnpm build
pnpm test
```

Commands:

- `pnpm test:run` - Run all tests
- `pnpm test:ui` - Interactive test UI

## Contributing

1. Fork the repository
2. Create a feature branch
3. Add tests in `tests/fixtures/`
4. Ensure tests pass
5. Submit a pull request

## License

MIT

## Limitations

- Inline flags without a scope (e.g. `(?ims)`) are parsed but their required position at the start of the pattern (per Python 3.11+) isn’t enforced by the grammar.
- Verbose mode semantics (re.X / `(?x)`)—whitespace skipping and `#` comments outside character classes—are not modeled; only `(?#...)` embedded comments are recognized.
- Lookbehind fixed-length requirement isn’t validated by the grammar.
- Group existence for numbered/named backreferences isn’t validated by the grammar.
