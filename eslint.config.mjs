import js from "@eslint/js";
import { defineConfig } from "eslint/config";
import pluginImport from "eslint-plugin-import";
import pluginNewlines from "eslint-plugin-import-newlines";
import pluginReact from "eslint-plugin-react";
import pluginSimpleImportSort from "eslint-plugin-simple-import-sort";
import globals from "globals";
import tseslint from "typescript-eslint";

const OFF = 0;
const WARN = 1;
const ERROR = 2;

export default defineConfig([
  // Base JavaScript rules
  {
    files: ["**/*.{js,mjs,cjs}"],
    languageOptions: {
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
      globals: globals.browser,
    },
    plugins: {
      js,
    },
    extends: ["js/recommended"],
  },

  // TypeScript support
  ...tseslint.configs.recommended,

  // React + custom rules + all plugins
  {
    files: ["**/*.{js,cjs,mjs,ts,cts,mts,jsx,tsx}"],
    languageOptions: {
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    plugins: {
      react: pluginReact,
      import: pluginImport,
      "import-newlines": pluginNewlines,
    },
    rules: {
      ...pluginReact.configs.recommended.rules,
      "react/no-unescaped-entities": OFF,
      "react/jsx-indent": [ERROR, 2],

      eqeqeq: WARN,
      "no-eval": [ERROR, { allowIndirect: true }],
      "no-multi-spaces": [ERROR],
      "no-undef": OFF,
      "no-unused-vars": OFF,
      "comma-spacing": [WARN, { before: false, after: true }],
      semi: [WARN, "always"],
      "object-curly-spacing": [
        ERROR,
        "always",
        {
          arraysInObjects: true,
          objectsInObjects: true,
        },
      ],
      "keyword-spacing": [WARN, { after: true }],

      // Import rules
      "import/export": WARN,
      "import/order": [
        WARN,
        {
          alphabetize: {
            order: "asc",
            caseInsensitive: true,
            orderImportKind: "asc",
          },
          distinctGroup: true,
          groups: [
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "index",
            "type",
          ],
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
      "import-newlines/enforce": [
        WARN,
        {
          items: 5,
          "max-len": 120,
          semi: false,
        },
      ],

      // Statement formatting
      "padding-line-between-statements": [
        WARN,
        { blankLine: "always", prev: "import", next: "*" },
        { blankLine: "any", prev: "import", next: "import" },
        {
          blankLine: "always",
          prev: "import",
          next: ["const", "let", "var", "function"],
        },
      ],
    },
  },
]);
