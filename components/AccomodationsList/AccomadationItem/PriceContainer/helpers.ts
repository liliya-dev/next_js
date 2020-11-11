export const getSalePercent = (oldPrice: string, price: string) => {
  const pattern = /[0-9]/g;
  const oldPriceNumber = +oldPrice.match(pattern).join('');
  const priceNumber = +price.match(pattern).join('');
  const percent = Math.round((oldPriceNumber - priceNumber) * 100 / oldPriceNumber);

  return percent;
}