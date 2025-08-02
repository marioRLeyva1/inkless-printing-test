import ReceiptPrinterEncoder from '@point-of-sale/receipt-printer-encoder';


export const buildMessage = (message: string) : string => {
  const encoder = new ReceiptPrinterEncoder();
  const result = encoder
    .initialize()
    .text(message)
    .newline()
    .cut()
    .encode();
    

    const binaryString = Array.from(result)
    .map((byte: number) => String.fromCharCode(byte))
    .join('');

    const base64 = btoa(binaryString);

    return `intent:base64,${base64}#Intent;scheme=rawbt;package=ru.a402d.rawbtprinter;end;`;
}