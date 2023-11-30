module.exports = {
  root: true,
  extends: ["airbnb", "airbnb-typescript", "airbnb/hooks", "@react-native"],
  ignorePatterns: [".eslintrc.js"],
  rules: {
    quotes: ["error", "double"],
    "import/extensions": "off",
    "import/prefer-default-export": "off",
    "import/no-extraneous-dependencies": [
      "error",
      {
        devDependencies: ["**/__tests__/**", "metro.config.js"],
      },
    ],
    "react/jsx-no-constructed-context-values": "off",
    "react/jsx-filename-extension": "off",
  },
  settings: {
    "import/resolver": {
      typescript: {
        alwaysTryTypes: true,
        project: "tsconfig.json",
      },
    },
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "tsconfig.json",
  },
};
