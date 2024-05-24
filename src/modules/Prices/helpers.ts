import { Price, PriceWithChange } from '../../types/pricesTypes';

const toPriceWithChange = (oldData: PriceWithChange, newPrices: Price[]) => {
  const newData = newPrices.filter((n) => n.symbol === oldData.symbol).at(0);
  const changed = newData?.tradeId !== oldData.tradeId;
  if (changed && newData) {
    const newPriceNumber = parseFloat(newData.price);
    const oldPriceNumber = parseFloat(oldData.price);
    const change =
      newPriceNumber === oldPriceNumber
        ? null
        : newPriceNumber > oldPriceNumber
          ? 'priceUp'
          : 'priceDown';
    const newPrice: PriceWithChange = { ...newData, change };
    return newPrice;
  }
  return oldData;
};

export { toPriceWithChange };
