import { LRLanguage } from "@codemirror/language";
import { EditorView } from "@codemirror/view";
import { basicSetup } from "codemirror";
import { parser } from "./src/index.ts";

const pythonRegexLanguage = LRLanguage.define({
  parser,
  languageData: { name: "python-regex" },
});

new EditorView({
  doc: "(?i)^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,}$",
  parent: document.body,
  extensions: [basicSetup, pythonRegexLanguage],
});
