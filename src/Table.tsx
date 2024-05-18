import './App.css';

import { PricesWithChange } from './types/pricesSchema';
import { Store } from './Store';
import { observer } from 'mobx-react';

const TableContainer = observer(({ store }: { store: Store }) => {
  return <>
    <div>
      <button onClick={() => store.setTab('A')}>Tab A</button>
      <button onClick={() => store.setTab('B')}>Tab B</button>
    </div>
    <PricesTable store={store} />
  </>;
});

const PricesTable = observer(({ store }: { store: Store }) => {
  const tableData = store.pricesForCurrentTab;
  return <div className="relative overflow-x-auto">
    {tableData && <table className="w-full text-left text-gray-500 table-fixed">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50">
        <tr>
          <th scope="col" className="py-3">Symbol</th>
          <th scope="col" className="py-3">Price</th>
          <th scope="col" className="py-3 hidden lg:table-cell">Best Bid Price</th>
          <th scope="col" className="py-3 hidden lg:table-cell">Best Ask Price</th>
          <th scope="col" className="py-3 hidden lg:table-cell">Best Ask Size</th>
        </tr>
      </thead>
      <tbody>
        {tableData.map(d => <TableRow key={d.symbol} d={d} selectCoin={store.selectCoin} />)}
      </tbody>
    </table>}
  </div>;
});

const TableRow = observer(({ d, selectCoin }: { d: PricesWithChange, selectCoin: (symbol: string | null) => void }) => {
  return <tr onClick={() => selectCoin(d.symbol)} className="bg-white border-b">
    <td scope="row" className="py-4 font-medium text-black">
      {d.symbol}
    </td>
    <td key={d.price} className={`${d.change} py-4 font-medium text-black`}>
      {d.price}
      {/* "key={d.price}" это хак. Возможно есть найти решение получше */}
    </td>
    <td className="py-4 hidden lg:table-cell">{d.bestBidPrice}</td>
    <td className="py-4 hidden lg:table-cell">{d.bestAskPrice}</td>
    <td className="py-4 hidden lg:table-cell">{d.bestAskSize}</td>
  </tr>;
});

export default TableContainer;
