import './App.css';

import { PriceWithChange } from './types/pricesSchema';
import { Store } from './Store';
import { observer } from 'mobx-react';

const PricesTable = observer(({ store }: { store: Store }) => {
  return <table className="w-full text-left text-gray-500 table-fixed">
    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
      <tr>
        <th scope="col" className="py-3">Symbol</th>
        <th scope="col" className="py-3">Price</th>
        <th scope="col" className="py-3 hidden lg:table-cell">Best Bid Price</th>
        <th scope="col" className="py-3 hidden lg:table-cell">Best Ask Price</th>
        <th scope="col" className="py-3 hidden lg:table-cell">Best Ask Size</th>
      </tr>
    </thead>
    <TableBody store={store} />
  </table>;
});

const TableBody = observer(({ store }: { store: Store }) =>
  <tbody>
    {store.pricesForCurrentTab.map(price => <TableRow key={price.symbol} price={price} selectCoin={store.selectCoin} />)}
  </tbody>);

interface TableRowProps {
  price: PriceWithChange,
  selectCoin: (symbol: string | null) => void
}
const TableRow = observer(({ price, selectCoin }: TableRowProps) => {
  return <tr onClick={() => selectCoin(price.symbol)} className="bg-white border-b">
    <td scope="row" className="py-4 font-medium text-black">
      {price.symbol}
    </td>
    <td key={price.price} className={`${price.change} py-4 font-medium text-black`}>
      {/* Решение через ключи пишется проще альтернативы, меньше рендеров */}
      {price.price}
    </td>
    <td className="py-4 hidden lg:table-cell">{price.bestBidPrice}</td>
    <td className="py-4 hidden lg:table-cell">{price.bestAskPrice}</td>
    <td className="py-4 hidden lg:table-cell">{price.bestAskSize}</td>
  </tr>;
});

export default PricesTable;
