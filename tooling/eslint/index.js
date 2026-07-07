module.exports = {
  extends: ["@vercel/style-guide/eslint/node", "turbo"].map(require.resolve),
  parserOptions: {
    project: "./tsconfig.json",
  },
  globals: {
    React: true,
    JSX: true,
  },
  ignorePatterns: ["node_modules/", "dist/"],
};
