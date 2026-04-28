export default class Format {
  static formatToRupiah(value: number | string, includePrefix = false) {
    const numberValue = typeof value === "string" ? parseFloat(value) : value;
    if (isNaN(numberValue)) return includePrefix ? "Rp 0" : "0";

    const formatted = new Intl.NumberFormat("id-ID", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(numberValue);

    return includePrefix ? `Rp ${formatted}` : formatted;
  }

  static parseRupiah(value: string): number {
    if (!value) return 0;
    // Remove everything except numbers
    const cleanValue = value.replace(/[^0-9]/g, "");
    return cleanValue ? parseInt(cleanValue, 10) : 0;
  }
}
