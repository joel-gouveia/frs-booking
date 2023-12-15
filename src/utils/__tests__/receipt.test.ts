import { describe, expect, it } from "@jest/globals";
import { receiptMocks } from "@mocks/index";
import { currencyUtils, receiptUtils } from "..";

describe("receipt/generatePrintableReceipt", () => {
  const { receipt } = receiptMocks;

  it("should generate a printable receipt string", () => {
    const { company, routeName, username, tse, sale, number } = receipt;
    const printableReceipt = receiptUtils.generatePrintableReceipt(receipt);

    expect(printableReceipt).toContain(`[L]<b>${company.name}</b>`);
    expect(printableReceipt).toContain(`[R]<b>${routeName}</b>`);
    expect(printableReceipt).toContain(`[C]<b>${routeName}</b>`);
    expect(printableReceipt).toContain(`[C]${company.website}`);
    expect(printableReceipt).toContain(`<font size='tall'>${number}</font>`);
    expect(printableReceipt).toContain(username);
    expect(printableReceipt).toContain(sale.date);

    sale.tickets.forEach(({ name, price, quantity }) => {
      const formattedPrice = currencyUtils.formatPrice(price.currency, price.amount);
      const vatPercentage = price.breakdown.vat.percentage.toFixed(1);
      const quantityString = quantity.toFixed(1);

      expect(printableReceipt).toContain(name);
      expect(printableReceipt).toContain(quantityString);
      expect(printableReceipt).toContain(formattedPrice);
      expect(printableReceipt).toContain(vatPercentage);
    });

    const totalGross = currencyUtils.formatPrice(sale.price.currency, sale.price.amount);
    expect(printableReceipt).toContain(totalGross);

    const totalNet = currencyUtils.formatPrice(sale.price.currency, sale.price.breakdown.netAmount);
    expect(printableReceipt).toContain(totalNet);

    const vatPercentage = sale.price.breakdown.vat.percentage.toFixed(2);
    expect(printableReceipt).toContain(vatPercentage);

    const vatAmount = currencyUtils.formatPrice(
      sale.price.currency,
      sale.price.breakdown.vat.amount,
    );
    expect(printableReceipt).toContain(vatAmount);
    expect(printableReceipt).toContain(tse.deviceNumber.toString());
    expect(printableReceipt).toContain(tse.number.toString());
    expect(printableReceipt).toContain(tse.signature.toString());
    expect(printableReceipt).toContain(tse.transaction.toString());
    expect(printableReceipt).toContain(tse.startDateTime.toString());
    expect(printableReceipt).toContain(tse.endDateTime.toString());
    expect(printableReceipt).toContain(tse.counterSignature.toString());
    expect(printableReceipt).toContain(tse.algorithmSignature.toString());
    expect(printableReceipt).toContain(tse.timeFormat.toString());
  });
});
