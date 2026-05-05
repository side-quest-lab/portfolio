import { defineConfig } from "oxlint";

export default defineConfig({
  env: {
    browser: true,
    node: true,
  },
  plugins: ["typescript", "vue"],
  ignorePatterns: ["node_modules", ".nuxt", ".output", "dist", "*.config.*", "*.d.ts"],
  rules: {
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-empty-object-type": "off",
  },
});
