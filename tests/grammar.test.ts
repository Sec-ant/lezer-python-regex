/// <reference types="../src/vite-env.d.ts" />

import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { parser } from "../src/index";

// Utility function to load patterns from fixture files
function loadPatterns(filename: string): string[] {
  const content = readFileSync(`./tests/fixtures/${filename}`, "utf-8");
  return content
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line && !line.startsWith("#"));
}

// Utility function to test patterns for errors
function testPatternsForErrors(patterns: string[], allowErrors = false) {
  patterns.forEach((pattern) => {
    const tree = parser.parse(pattern);

    // Basic sanity checks
    expect(tree.length).toBe(pattern.length);
    expect(tree.type.name).toBe("Pattern");

    if (!allowErrors) {
      // Check that there are no error nodes
      let hasError = false;
      tree.iterate({
        enter: (node) => {
          if (node.type.isError) {
            hasError = true;
          }
        },
      });

      if (hasError) {
        console.log(`Unexpected error in pattern: "${pattern}"`);
      }
      expect(hasError).toBe(false);
    }
  });
}

describe("Python Regex Grammar", () => {
  describe("Basic Patterns", () => {
    it("should parse basic literal patterns and anchors", () => {
      const patterns = loadPatterns("basic.txt");
      testPatternsForErrors(patterns);
    });
  });

  describe("Character Classes", () => {
    it("should parse character classes correctly", () => {
      const patterns = loadPatterns("character-classes.txt");
      testPatternsForErrors(patterns);
    });
  });

  describe("Quantifiers", () => {
    it("should parse all types of quantifiers", () => {
      const patterns = loadPatterns("quantifiers.txt");
      testPatternsForErrors(patterns);
    });
  });

  describe("Escape Sequences", () => {
    it("should parse escape sequences correctly", () => {
      const patterns = loadPatterns("escapes.txt");
      testPatternsForErrors(patterns);
    });
  });

  describe("Groups", () => {
    it("should parse different group types", () => {
      const patterns = loadPatterns("groups.txt");
      testPatternsForErrors(patterns);
    });
  });

  describe("Lookarounds", () => {
    it("should parse lookahead and lookbehind assertions", () => {
      const patterns = loadPatterns("lookarounds.txt");
      testPatternsForErrors(patterns);
    });
  });

  describe("Backreferences", () => {
    it("should parse backreferences correctly", () => {
      const patterns = loadPatterns("backreferences.txt");
      testPatternsForErrors(patterns);
    });
  });

  describe("Alternation", () => {
    it("should parse alternation patterns", () => {
      const patterns = loadPatterns("alternation.txt");
      testPatternsForErrors(patterns);
    });
  });

  describe("Flags", () => {
    it("should parse flag expressions", () => {
      const patterns = loadPatterns("flags.txt");
      testPatternsForErrors(patterns);
    });
  });

  describe("Anchors", () => {
    it("should parse anchor escapes \\A and \\Z", () => {
      const patterns = loadPatterns("anchors.txt");
      testPatternsForErrors(patterns);
    });
  });

  describe("Unicode names", () => {
    it("should parse named unicode escapes \\N{...}", () => {
      const patterns = loadPatterns("unicode-names.txt");
      testPatternsForErrors(patterns);
    });
  });

  describe("Octal escapes", () => {
    it("should parse octal escapes and numeric backrefs disambiguation", () => {
      const patterns = loadPatterns("octal.txt");
      testPatternsForErrors(patterns);
    });
  });

  describe("Conditionals", () => {
    it("should parse conditional expressions", () => {
      const patterns = loadPatterns("conditionals.txt");
      testPatternsForErrors(patterns);
    });
  });

  describe("Complex Patterns", () => {
    it("should parse real-world complex patterns", () => {
      const patterns = loadPatterns("complex.txt");
      testPatternsForErrors(patterns);
    });
  });

  describe("Edge Cases", () => {
    it("should handle problematic patterns gracefully", () => {
      const patterns = loadPatterns("edge-cases.txt");

      patterns.forEach((pattern) => {
        const tree = parser.parse(pattern);

        // Should still create a valid tree structure
        expect(tree.length).toBe(pattern.length);
        expect(tree.type.name).toBe("Pattern");

        // Count errors and valid nodes
        let errorCount = 0;
        let validNodeCount = 0;

        tree.iterate({
          enter: (node) => {
            if (node.type.isError) {
              errorCount++;
            } else {
              validNodeCount++;
            }
          },
        });

        // Should have at least some valid structure
        expect(validNodeCount).toBeGreaterThan(0);

        if (errorCount > 0) {
          console.log(
            `Pattern "${pattern}" has ${errorCount} errors (expected for edge cases)`,
          );
        }
      });
    });
  });
});
