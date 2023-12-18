package com.thermalprinter.methods.barcode;

import com.thermalprinter.methods.EscPosPrinterCommands;
import com.thermalprinter.methods.EscPosPrinterSize;
import com.thermalprinter.methods.exceptions.EscPosBarcodeException;

public class BarcodeUPCA extends BarcodeNumber {

    public BarcodeUPCA(EscPosPrinterSize printerSize, String code, float widthMM, float heightMM, int textPosition) throws EscPosBarcodeException {
        super(printerSize, EscPosPrinterCommands.BARCODE_TYPE_UPCA, code, widthMM, heightMM, textPosition);
    }

    @Override
    public int getCodeLength() {
        return 12;
    }
}
