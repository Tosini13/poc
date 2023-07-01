export const formatPrice =
  (local?: string, currency?: string) => (number: number) =>
    new Intl.NumberFormat(local, {
      style: "currency",
      currency,
      currencyDisplay: "narrowSymbol",
    }).format(number);
