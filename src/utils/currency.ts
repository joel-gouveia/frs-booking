import { NativeLocaleIdentifier } from "@config/i18n/i18n";

/**
 * @description Format price with currency
 * @param {string} currency
 * @param {number} amount
 * @returns {string}
 * @example
 * formatPrice("EUR", 10) // "10,00 €"
 * @example
 * formatPrice("USD", 10) // "$10.00"
 */
const formatPrice = (currency: string, amount: number): string => {
  return amount.toLocaleString(NativeLocaleIdentifier, {
    style: "currency",
    currency,
  });
};

export const currencyUtils = {
  formatPrice,
};
