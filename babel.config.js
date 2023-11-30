module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["module:metro-react-native-babel-preset"],
    plugins: [
      [
        "module-resolver",
        {
          extensions: [
            ".ios.js",
            ".android.js",
            ".ios.jsx",
            ".android.jsx",
            ".js",
            ".jsx",
            ".json",
            ".ts",
            ".tsx",
          ],
          root: ["."],
          alias: {
            "@screens": "./src/screens",
            "@components": "./src/components",
            "@constants": "./src/constants",
            "@utils": "./src/utils",
            "@layout": "./src/layout",
            "@navigation": "./src/navigation",
            "@hooks": "./src/hooks",
            "@api": "./src/api",
            "@types": "./src/types",
            "@context": "./src/context",
          },
        },
      ],
    ],
  };
};
