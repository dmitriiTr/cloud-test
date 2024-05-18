module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
  ],
  ignorePatterns: ['dist', '.eslintrc.cjs'],
  parser: '@typescript-eslint/parser',
  plugins: ['react-refresh'],
  rules: {
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    "no-unused-expressions": 1,
    "curly": 1,
    "@typescript-eslint/naming-convention": 0,
    "semi": 1,
    "eqeqeq": 1,
    "indent": [1, 2],
    "no-debugger": 0, // 1
    "@typescript-eslint/quotes": [1, "single"],
    "no-trailing-spaces": 1,
    "sort-imports": [1, { "allowSeparatedGroups": true }],
    "linebreak-style": [1, "windows"],
    "no-multiple-empty-lines": 1,
    //"no-console": [1, { "allow": ["warn", "error", "info"] }],

    "func-style": [
      1,
      "expression",
      { "allowArrowFunctions": true }
    ],
    //"max-len": 1
  },
}
