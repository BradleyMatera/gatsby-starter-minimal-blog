import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import jsxA11yPlugin from "eslint-plugin-jsx-a11y";

const reactRecommended =
  (reactPlugin.configs?.flat?.recommended ?? reactPlugin.configs?.recommended ?? {});

const reactHooksRecommended = reactHooksPlugin.configs?.recommended ?? {};
const jsxA11yRecommended = jsxA11yPlugin.configs?.recommended ?? {};

export default tseslint.config(
  {
    ignores: [
      "node_modules/**",
      "public/**",
      ".cache/**",
      "static/**",
      "src/@lekoarts/gatsby-theme-minimal-blog/components/**",
      "scripts/**",
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      react: reactPlugin,
      "react-hooks": reactHooksPlugin,
      "jsx-a11y": jsxA11yPlugin,
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      ...(reactRecommended.rules ?? {}),
      ...(reactHooksRecommended.rules ?? {}),
      ...(jsxA11yRecommended.rules ?? {}),
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "react/no-unknown-property": "off",
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/ban-ts-comment": [
        "error",
        {
          "ts-nocheck": false,
        },
      ],
    },
  }
);
