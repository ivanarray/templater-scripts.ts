import { defineConfig } from "eslint/config";
import tseslint from "typescript-eslint";
import prettierPlugin from "eslint-plugin-prettier";

export default defineConfig([
  {
    ignores: ["node_modules/**", "compiled/**"],
  },
  ...tseslint.configs.recommended,
  {
    files: ["**/*.ts", "**/*.js"],
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      "prettier/prettier": "error",
    },
  },
]);
