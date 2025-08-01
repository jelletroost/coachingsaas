import js from "@eslint/js";
import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";
import globals from "globals";
import tseslint from "typescript-eslint";

export default defineConfig([
   {
      ignores: ["supabase/**/*"],
   },
   {
      files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
      plugins: { js },
      extends: ["js/recommended"],
   },
   {
      files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
      languageOptions: { globals: globals.browser },
   },
   tseslint.configs.recommended,
   {
      ...pluginReact.configs.flat.recommended,
      rules: {
         ...pluginReact.configs.flat.recommended.rules,
         "react/react-in-jsx-scope": "off",
         "no-unused-vars": "off",
         "@typescript-eslint/no-explicit-any": "off",
      },
   },
]);
