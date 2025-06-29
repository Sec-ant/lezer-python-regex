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
- Full Python regex syntax compliance

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

Test categories: basic patterns, character classes, quantifiers, groups, lookarounds, backreferences, conditionals, alternation, comments, complex patterns, edge cases.

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
