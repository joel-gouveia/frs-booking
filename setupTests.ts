import mockAsyncStorage from "@react-native-async-storage/async-storage/jest/async-storage-mock";
import i18n from "src/config/i18n/i18n";

// @ts-ignore
// Set up async storage mock
jest.mock("@react-native-async-storage/async-storage", () => mockAsyncStorage);

// Set up i18n
i18n.init();
