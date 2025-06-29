import js from "@eslint/js";
import { defineConfig } from "eslint/config";
import pluginImport from "eslint-plugin-import";
import importNewlines from "eslint-plugin-import-newlines";
import pluginReact from "eslint-plugin-react";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import globals from "globals";
import tseslint from "typescript-eslint";

const OFF = 0;
const WARN = 1;
const ERROR = 2;

export default defineConfig([
  js.configs.recommended,
  tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,

  {
    files: ["**/*.{js,cjs,mjs,ts,cts,mts,jsx,tsx}"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parserOptions: {
        sourceType: "module",
        ecmaVersion: "latest",
      },
    },
    plugins: {
      import: pluginImport,
      "simple-import-sort": simpleImportSort,
      "import-newlines": importNewlines,
    },
    rules: {
      "react/no-unescaped-entities": OFF,
      "no-eval": [ERROR, { allowIndirect: true }],
      "object-curly-spacing": [
        ERROR,
        "always",
        {
          arraysInObjects: true,
          objectsInObjects: true,
        },
      ],
      "keyword-spacing": [WARN, { after: true }],
      eqeqeq: WARN,
      "import/export": WARN,
      "import-newlines/enforce": [
        WARN,
        {
          items: 5,
          "max-len": 120,
          semi: false,
        },
      ],
      "import/order": [
        WARN,
        {
          alphabetize: {
            caseInsensitive: true,
            order: "asc",
            orderImportKind: "asc",
          },
          distinctGroup: true,
          groups: ["external", "internal", "parent", "sibling", "type"],
          "newlines-between": "always",
          pathGroups: [
            {
              group: "external",
              pattern: "react",
              position: "before",
            },
            {
              group: "internal",
              pattern: "@/components/**",
              position: "after",
            },
          ],
          pathGroupsExcludedImportTypes: ["react", "type"],
        },
      ],
      "no-multi-spaces": [ERROR],
      "comma-spacing": [WARN, { before: false, after: true }],
      "comma-dangle": [
        WARN,
        {
          arrays: "only-multiline",
          exports: "always-multiline",
          functions: "only-multiline",
          imports: "always-multiline",
          objects: "always-multiline",
        },
      ],
      "simple-import-sort/imports": WARN,
      "simple-import-sort/exports": WARN,
      "padding-line-between-statements": [
        WARN,
        { blankLine: "always", prev: "import", next: "*" },
        { blankLine: "any", prev: "import", next: "import" },
        { blankLine: "always", prev: "import", next: "function" },
        { blankLine: "always", prev: "import", next: "const" },
        { blankLine: "always", prev: "import", next: "let" },
      ],
      "react/jsx-indent": [ERROR, 2],
      semi: [WARN, "always"],
      "no-undef": OFF,
      "no-unused-vars": OFF,
    },
  },
]);
