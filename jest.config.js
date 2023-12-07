module.exports = {
  preset: "react-native",
  transform: {
    "^.+\\.(ts|tsx)?$": "ts-jest",
    "^.+\\.(js|jsx)$": "babel-jest",
  },
  moduleNameMapper: {
    "^src/(.*)$": "<rootDir>/src/$1",
    "^@screens/(.*)$": "<rootDir>/src/screens/$1",
    "^@components/(.*)$": "<rootDir>/src/components/$1",
    "^@constants/(.*)$": "<rootDir>/src/constants/$1",
    "^@utils/(.*)$": "<rootDir>/src/utils/$1",
    "^@layout/(.*)$": "<rootDir>/src/layout/$1",
    "^@navigation/(.*)$": "<rootDir>/src/navigation/$1",
    "^@hooks/(.*)$": "<rootDir>/src/hooks/$1",
    "^@api/(.*)$": "<rootDir>/src/api/$1",
    "^@types/(.*)$": "<rootDir>/src/types/$1",
    "^@context/(.*)$": "<rootDir>/src/context/$1",
    "^@styles/(.*)$": "<rootDir>/src/styles/$1",
    "^@assets/(.*)$": "<rootDir>/src/assets/$1",
  },
  transformIgnorePatterns: [
    "node_modules/(?!(react-native-config|react-native|@react-native|@react-navigation|react-navigation|react-native-vector-icons)/)",
  ],
  setupFilesAfterEnv: ["<rootDir>/jestSetup.ts"],
};
