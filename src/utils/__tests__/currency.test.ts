import { describe, expect, it, jest } from "@jest/globals";
import * as i18nConfig from "@config/i18n/i18n";
import { currencyUtils } from "../currency";

const { formatPrice } = currencyUtils;

const normalizeWhitespace = (str: string) => str.replace(/\s+/g, " ").trim();

jest.mock("@config/i18n/i18n", () => {
  const requireActual = jest.requireActual("@config/i18n/i18n") as typeof i18nConfig;

  return {
    ...requireActual,
    NativeLocaleIdentifier: "de-DE",
  };
});

describe("utils/currency", () => {
  it("Should format price with currency for EUR(DE)", () => {
    // @ts-ignore
    const expected = normalizeWhitespace("10,00 €");
    const received = normalizeWhitespace(formatPrice("EUR", 10));
    expect(received).toEqual(expected);
  });

  it("Should still format price to EUR(EU) even if NativeLocaleIdentifier is undefined/unavailable", () => {
    // eslint-disable-next-line global-require
    require("@config/i18n/i18n").NativeLocaleIdentifier = undefined;

    const expected = normalizeWhitespace("€10.00");
    const received = normalizeWhitespace(formatPrice("EUR", 10));
    expect(received).toEqual(expected);
  });

  it("Should format price with currency for USD", () => {
    const expected = normalizeWhitespace("$10.00");
    const received = normalizeWhitespace(formatPrice("USD", 10));
    expect(received).toEqual(expected);
  });

  it("Should format price with currency for PLN (Polish złoty)", () => {
    const expected = normalizeWhitespace("PLN 10.00");
    const received = normalizeWhitespace(formatPrice("PLN", 10));
    expect(received).toEqual(expected);
  });

  it("Should format price with currency for SEK (Swedish Krona)", () => {
    const expected = normalizeWhitespace("SEK 10.00");
    const received = normalizeWhitespace(formatPrice("SEK", 10));
    expect(received).toEqual(expected);
  });
});
