import { FlatCompat } from "@eslint/eslintrc";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
   baseDirectory: __dirname,
});

const eslintConfig = [
   ...compat.extends("next/core-web-vitals", "next/typescript"),

   {
      // Apply to all JS/TS/JSX/TSX files
      files: ["**/*.{js,jsx,ts,tsx}"],
      plugins: {
         react: require("eslint-plugin-react"),
      },
      rules: {
         "react/no-unescaped-entities": "error",
      },
   },
];

export default eslintConfig;
