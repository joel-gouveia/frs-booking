import mockAsyncStorage from "@react-native-async-storage/async-storage/jest/async-storage-mock";
// @ts-ignore
jest.mock("@react-native-async-storage/async-storage", () => mockAsyncStorage);
