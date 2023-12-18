package com.thermalprinter.methods.textparser;

import com.thermalprinter.methods.EscPosPrinterCommands;
import com.thermalprinter.methods.exceptions.EscPosConnectionException;
import com.thermalprinter.methods.exceptions.EscPosEncodingException;

public interface IPrinterTextParserElement {
    int length() throws EscPosEncodingException;
    IPrinterTextParserElement print(EscPosPrinterCommands printerSocket) throws EscPosEncodingException, EscPosConnectionException;
}
