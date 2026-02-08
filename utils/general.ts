export const getGreeting = (currentTime: Date) => {
  const hour = currentTime.getHours();
  if (hour < 11) return "Selamat Pagi";
  if (hour < 15) return "Selamat Siang";
  if (hour < 18) return "Selamat Sore";
  return "Selamat Malam";
};

export const capitalizeWords = (text: string) =>
  text.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
export const formatCurrency = (amount: number | undefined) => {
  if (amount === undefined) return "RP 0";
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  })
    .format(amount)
    .replace("Rp", "RP");
};
