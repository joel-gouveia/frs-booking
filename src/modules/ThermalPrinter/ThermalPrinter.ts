import { NativeModules } from "react-native";

const { ThermalPrinterModule }: NativeModuleType = NativeModules as NativeModuleType;

type NativeModuleType = typeof NativeModules & { ThermalPrinterModule: ThermalPrinterModuleType };

type ThermalPrinterModuleType = {
  printTcp(
    ip: string,
    port: number,
    timeout: number,
    payload: string,
    autoCut: boolean,
    openCashbox: boolean,
    mmFeedPaper: number,
    printerDpi: number,
    printerWidthMM: number,
    printerNbrCharactersPerLine: number,
  ): Promise<void>;
  printBluetooth(
    macAddress: string,
    payload: string,
    autoCut: boolean,
    openCashbox: boolean,
    mmFeedPaper: number,
    printerDpi: number,
    printerWidthMM: number,
    printerNbrCharactersPerLine: number,
  ): Promise<void>;
  getBluetoothDeviceList(): Promise<BluetoothPrinter[]>;
};

interface PrinterInterface {
  payload: string;
  autoCut: boolean;
  openCashbox: boolean;
  mmFeedPaper: number;
  printerDpi: number;
  printerWidthMM: number;
  printerNbrCharactersPerLine: number;
}

type BluetoothPrinter = {
  deviceName: string;
  macAddress: string;
};

interface PrintTcpInterface extends PrinterInterface {
  ip: string;
  port: number;
  timeout: number;
}

interface PrintBluetoothInterface extends PrinterInterface {
  macAddress: string;
}

type ConfigOptions = PrintTcpInterface & PrintBluetoothInterface;

class ThermalPrinter {
  public defaultConfig: ConfigOptions = {
    macAddress: "",
    ip: "192.168.1.1",
    timeout: 30000,
    port: 9100,
    payload: "",
    autoCut: true,
    openCashbox: false,
    mmFeedPaper: 20,
    printerDpi: 203,
    printerWidthMM: 80,
    printerNbrCharactersPerLine: 48,
  };

  constructor(config?: Partial<ConfigOptions>) {
    this.defaultConfig = { ...this.defaultConfig, ...config };
  }

  /**
   * Sets the configuration options for the printer.
   * @param {Partial<ConfigOptions>} config - Partial configuration options.
   * @returns {ConfigOptions} - Merged configuration options.
   */
  getConfig(config: Partial<ConfigOptions>): ConfigOptions {
    return { ...this.defaultConfig, ...config };
  }

  /**
   * Prints content using TCP connection.
   * @param {Partial<PrintTcpInterface> & Pick<PrinterInterface, 'payload'>} options - Print options.
   * @returns {Promise<void>} - A Promise that resolves when the printing is complete.
   * @example
   * await Printer.printTcp({
   *   ip: '192.168.1.1',
   *   port: 9100,
   *   payload: 'Hello, world!',
   *   timeout: 30000, // milliseconds
   * });
   */
  async printTcp(
    options: Partial<PrintTcpInterface> & Pick<PrinterInterface, "payload">,
  ): Promise<void> {
    const {
      ip,
      port,
      timeout,
      payload,
      autoCut,
      openCashbox,
      mmFeedPaper,
      printerDpi,
      printerWidthMM,
      printerNbrCharactersPerLine,
    } = this.getConfig(options);

    return ThermalPrinterModule.printTcp(
      ip,
      port,
      timeout,
      payload,
      autoCut,
      openCashbox,
      mmFeedPaper,
      printerDpi,
      printerWidthMM,
      printerNbrCharactersPerLine,
    );
  }

  /**
   * Prints content using Bluetooth connection.
   * @param {Partial<PrintBluetoothInterface> & Pick<PrinterInterface, 'payload'>} options - Print options.
   * @returns {Promise<void>} - A Promise that resolves when the printing is complete.
   * @example
   * const Printer = new ThermalPrinter();
   * await Printer.printBluetooth({
   *   macAddress: '00:11:22:33:44:55',
   *   payload: 'Hello, Bluetooth!',
   * });
   */
  // Not being used but defined just in case...
  // async printBluetooth(
  //   options: Partial<PrintBluetoothInterface> & Pick<PrinterInterface, "payload">,
  // ): Promise<void> {
  //   const {
  //     macAddress,
  //     payload,
  //     autoCut,
  //     openCashbox,
  //     mmFeedPaper,
  //     printerDpi,
  //     printerWidthMM,
  //     printerNbrCharactersPerLine,
  //   } = this.getConfig(options);

  //   return ThermalPrinterModule.printBluetooth(
  //     macAddress,
  //     payload,
  //     autoCut,
  //     openCashbox,
  //     mmFeedPaper,
  //     printerDpi,
  //     printerWidthMM,
  //     printerNbrCharactersPerLine,
  //   );
  // }

  /**
   * Retrieves a list of available Bluetooth devices.
   * @returns {Promise<BluetoothPrinter[]>} - A Promise that resolves with an array of Bluetooth devices.
   * @example
   * const bluetoothDevices = await ThermalPrinter.getBluetoothDeviceList();
   * console.log(bluetoothDevices);
   */
  // Not being used but defined just in case...
  // static getBluetoothDeviceList(): Promise<BluetoothPrinter[]> {
  //   return ThermalPrinterModule.getBluetoothDeviceList();
  // }
}

export default ThermalPrinter;
export const Printer = new ThermalPrinter();
