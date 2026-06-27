import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  // ── Relaxed rules for plain Node.js scripts (use require, CommonJS) ──
  {
    files: ["bot/**/*.js", "scripts/**/*.js", "supabase/**/*.js"],
    rules: {
      "@typescript-eslint/no-require-imports": "off",
      "@typescript-eslint/no-explicit-any": "warn",
    },
  },
  // ── Relaxed rules for bot TypeScript ──
  {
    files: ["bot/**/*.ts"],
    rules: {
      "@typescript-eslint/no-explicit-any": "warn",
    },
  },
  // ── Relaxed rules for app source (pre-existing any types) ──
  {
    files: ["app/**/*.tsx", "app/**/*.ts", "components/**/*.tsx", "components/**/*.ts", "lib/**/*.ts"],
    rules: {
      "@typescript-eslint/no-explicit-any": "warn",
      // React hooks — many pre-existing, will fix gradually
      "react-hooks/exhaustive-deps": "warn",
    },
  },
]);

export default eslintConfig;
