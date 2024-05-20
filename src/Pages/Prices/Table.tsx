import '../../index.css';

import { PriceWithChange } from '../../types/pricesTypes';
import { Store } from './Store';
import { observer } from 'mobx-react';

const PricesTable = observer(({ store }: { store: Store }) => {
  return <table className="w-full text-left text-gray-500 table-fixed">
    <thead className="text-xs text-gray-700 bg-gray-50">
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

const SkeletonBody = () => <tbody className="animate-pulse">
  {Array.from({ length: 6 }).map((_, i) =>
    <tr className="border-b" key={i}>{Array.from({ length: 5 }).map((_, j) => <td key={j}>
      <div className={`h-4 ${i % 2 === 0 ? 'bg-gray-200' : 'bg-gray-300'} mt-3 mb-6 rounded`} />
    </td>)}
    </tr>)}
</tbody>;

const TableBody = observer(({ store }: { store: Store }) => {
  const tableData = store.pricesForCurrentTab;
  return <>
    {tableData.length
      ? <tbody>
        {tableData.map(price => <TableRow key={price.symbol} price={price} selectCoin={store.selectCoin} />)}
      </tbody>
      : <SkeletonBody />
    }
  </>;
});

interface TableRowProps {
  price: PriceWithChange,
  selectCoin: (symbol: string | null) => void
}
const TableRow = observer(({ price, selectCoin }: TableRowProps) => {
  return <tr onClick={() => selectCoin(price.symbol)} className="bg-white border-b cursor-pointer hover:bg-slate-100">
    <td scope="row" className="py-4 font-medium text-black">
      {price.symbol}
    </td>
    <td key={price.price} className={`${price.change} py-4 font-medium text-black`}>
      {price.price}
    </td>
    <td className="py-4 hidden lg:table-cell">{price.bestBidPrice}</td>
    <td className="py-4 hidden lg:table-cell">{price.bestAskPrice}</td>
    <td className="py-4 hidden lg:table-cell">{price.bestAskSize}</td>
  </tr>;
});

export default PricesTable;
