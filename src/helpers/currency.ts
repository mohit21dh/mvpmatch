const USDollar = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

export const formatCurrency = (amount: number): string => {
  const formattedCurrencyAmount = USDollar.format(amount);

  return `${formattedCurrencyAmount.replace(/\$/g, '')} USD`;
};
