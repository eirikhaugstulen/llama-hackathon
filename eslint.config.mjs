import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
      "object-curly-spacing": ["error", "always"],
      "indent": ["error", 4],
      "react/jsx-indent": ["error", 4],
      "react/jsx-indent-props": ["error", 4],
      "object-curly-newline": ["error", {
        ObjectPattern: {
          minProperties: 5,
          multiline: true,
          consistent: true
        },
        ImportDeclaration: {
          minProperties: 5,
          multiline: true,
          consistent: true
        },
        ExportDeclaration: {
          minProperties: 5,
          multiline: true,
          consistent: true
        },
        ObjectExpression: {
          minProperties: 5,
          multiline: true,
          consistent: true
        }
      }],
      "object-property-newline": ["error", {
        allowAllPropertiesOnSameLine: true
      }],
      "no-console": ["error", { allow: ["error", "info", "warn"] }]
    }
  }
];

export default eslintConfig;
