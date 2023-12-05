module.exports = {
  root: true,
  extends: [
    "airbnb",
    "airbnb-typescript",
    "airbnb/hooks",
    "@react-native",
    "plugin:prettier/recommended",
    "prettier",
  ],
  ignorePatterns: [".eslintrc.js", "yarn.lock"],
  rules: {
    quotes: ["error", "double"],
    "react/require-default-props": "off",
    "react/jsx-props-no-spreading": "off",
    "react/destructuring-assignment": "off",
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
