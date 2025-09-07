/* ESLint para Astro + React + TypeScript */
module.exports = {
  root: true,
  env: {
    browser: true,
    es2022: true,
    node: true,
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    ecmaFeatures: { jsx: true },
  },
  plugins: ["@typescript-eslint", "react", "react-hooks", "astro"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:astro/recommended",
    // Opcional: descomenta si usas importaciones complejas
    // "plugin:import/recommended",
    // "plugin:import/typescript",
  ],
  settings: {
    react: { version: "detect" },
  },
  rules: {
    // Estilo/seguridad suave y pragmático
    "react/react-in-jsx-scope": "off", // no hace falta en Vite/Astro
    "react/prop-types": "off", // usamos TS
    "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }],
    "no-console": ["warn", { allow: ["warn", "error"] }],
    "no-debugger": "warn",
    // Accesibilidad: anima a describir imágenes
    "jsx-a11y/alt-text": "off", // si instalas eslint-plugin-jsx-a11y, cámbialo a "warn"
  },
  ignorePatterns: [
    "dist/",
    "node_modules/",
    ".astro/",
    ".vercel/",
    ".netlify/",
    "coverage/",
    "build/",
  ],
  overrides: [
    // Reglas para archivos .astro
    {
      files: ["**/*.astro"],
      parser: "astro-eslint-parser",
      parserOptions: {
        parser: "@typescript-eslint/parser",
        extraFileExtensions: [".astro"],
      },
      rules: {
        "astro/no-set-html-directive": "warn",
      },
    },
    // Node/Config files
    {
      files: ["*.cjs", "*.mjs", "astro.config.*", "tailwind.config.*", "vite.config.*"],
      env: { node: true },
    },
  ],
};
