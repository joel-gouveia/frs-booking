import i18n from "@config/i18n/i18n";
import { Receipt } from "src/types/models/receipt";
import { currencyUtils } from "./currency";

i18n.init();

/**
 * Generates a printable receipt from a receipt object.
 * @param receipt The receipt object.
 * @returns The receipt in a printable string format.
 */
export const generatePrintableReceipt = (receipt: Receipt): string => {
  const { company, routeName, username, tse, sale, number } = receipt;

  // TODO: Everywhere I placed ????????? is because I don't know what to put there.
  //      Either the receipt is not clear about it or the endpoing returns nothing for it.
  //      We'll have to ask the client to know if some things will have to be hardcoded on the receipt.

  const tickets = sale.tickets.map(({ name, price, quantity }) => {
    const formattedPrice = currencyUtils.formatPrice(price.currency, price.amount);
    const formattedQuantity = quantity.toFixed(1);
    const vatPercentage = price.breakdown.vat.percentage.toFixed(1);

    return (
      `[L]${name}\n` +
      `[L]${i18n.t("printable-receipt.ticket.quantity-and-price", {
        quantity: formattedQuantity,
        price: formattedPrice,
      })}` +
      `[R]${formattedPrice}\n` +
      `[L]${i18n.t("printable-receipt.ticket.include-vat", { value: vatPercentage })}\n`
    );
  });

  const totalGross = currencyUtils.formatPrice(sale.price.currency, sale.price.amount);
  const totalNet = currencyUtils.formatPrice(sale.price.currency, sale.price.breakdown.netAmount);
  const vatPercentage = sale.price.breakdown.vat.percentage.toFixed(2);
  const vatAmount = currencyUtils.formatPrice(sale.price.currency, sale.price.breakdown.vat.amount);

  const payload =
    `[L]<b>${company.name}</b>` +
    "[R]<b>???????? ????????</b>\n" +
    "[L]<b>????</b>" +
    `[R]<b>${routeName}</b>\n` +
    "[L]\n" +
    "[L]\n" +
    `[C]<b>${routeName}</b>\n` +
    `[C]${company.website}\n` +
    `[C]${i18n.t("printable-receipt.user", { username })}\n` +
    `[C]????????????????????[C]${sale.date}\n` +
    "[L]\n" +
    `[L]------------------------------------------------\n${tickets.join("")}` +
    "[L]------------------------------------------------\n" +
    "[L]\n" +
    "[L]\n" +
    `[L]${i18n.t("printable-receipt.ticket-validation-message")}\n` +
    "[L]\n" +
    "[L]\n" +
    "[L]\n" +
    `[R]<b>${i18n.t("printable-receipt.total.gross", { value: totalGross })}</b>\n` +
    `[R]<b>${i18n.t("printable-receipt.total.net", { value: totalNet })}` +
    `${i18n.t("printable-receipt.vat-percentage", { value: vatPercentage })}: ${vatAmount}</b>\n` +
    "[L]\n" +
    "[L]\n" +
    `[C]<font size='normal'>${i18n.t("printable-receipt.thank-message")}</font>\n` +
    "[C]?????????????????????????????????????????\n" +
    `[C]${i18n.t("printable-receipt.user", { username })}\n` +
    "[L]<font size='tall'>??:</font>\n" +
    `[L]<font size='tall'>${number}</font>\n` +
    `[L]<font size='tall'>${number}</font>\n` +
    "[L]\n" +
    "[L]\n" +
    `[L]${i18n.t("printable-receipt.tse-info-divider")}\n` +
    `[L]${i18n.t("printable-receipt.tse.deviceNumber", { value: tse.deviceNumber })}\n` +
    `[L]${i18n.t("printable-receipt.tse.number", { value: tse.number })}\n` +
    `[L]${i18n.t("printable-receipt.tse.signature", { value: tse.signature })}\n` +
    `[L]${i18n.t("printable-receipt.tse.transaction", { value: tse.transaction })}\n` +
    `[L]${i18n.t("printable-receipt.tse.startDateTime", { value: tse.startDateTime })}\n` +
    `[L]${i18n.t("printable-receipt.tse.endDateTime", { value: tse.endDateTime })}\n` +
    `[L]${i18n.t("printable-receipt.tse.counterSignature", { value: tse.counterSignature })}\n` +
    `[L]${i18n.t("printable-receipt.tse.algorithm", { value: tse.algorithmSignature })}\n` +
    `[L]${i18n.t("printable-receipt.tse.timeFormat", { value: tse.timeFormat })}\n`;

  return payload;
};

export const receiptUtils = {
  generatePrintableReceipt,
};
