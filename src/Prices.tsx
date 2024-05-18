import './App.css';
import './index.css';

import { PricesWithChange } from './types/pricesSchema';
import { Store } from './Store';
import { observer } from 'mobx-react';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import viteLogo from '/vite.svg';

const PricesPage = observer(() => {
  const { tab } = useParams();
  const [store] = useState(() => new Store(tab)); // Стор отдельно специально
  const error = store.modalError;

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
      </div>
      <h1>Prices</h1>
      {error && <ErrorMessage error={error} />}
      <div className="card">
        <TableContainer store={store} />
      </div>
    </>
  );
});

const ErrorMessage = observer(({ error }: { error: Error }) => {
  return <div>
    <h1>{error.message}</h1>
  </div>;
});

const TableContainer = observer(({ store }: { store: Store }) => {
  const tableData = store?.pricesForCurrentTab;
  return <>
    <div>
      <button onClick={() => store.setTab('A')}>Tab A</button>
      <button onClick={() => store.setTab('B')}>Tab B</button>
    </div>
    {tableData && <PricesTable tableData={tableData} />}
  </>;
});

const PricesTable = observer(({ tableData }: { tableData: PricesWithChange[] }) => {
  return <div className="relative overflow-x-auto">
    {tableData && <table className="w-full text-left text-gray-500 table-fixed">
      <thead className="text-xs text-gray-700 uppercase bg-gray-50">
        <tr>
          <th scope="col" className="py-3">Symbol</th>
          <th scope="col" className="py-3">Price</th>
          <th scope="col" className="py-3">Best Bid Price</th>
          <th scope="col" className="py-3">Best Ask Price</th>
          <th scope="col" className="py-3">Best Ask Size</th>
        </tr>
      </thead>
      <tbody>
        {tableData.map(d => <tr className="bg-white border-b" key={d.symbol}>
          <td scope="row" className="py-4 font-medium text-black">
            {d.symbol}
          </td>
          <td key={d.tradeId} className={`${d.change} py-4 font-medium text-black`}>
            {d.price}
            {/* "key={d.tradeId}" это хак. Можно найти решение получше */}
          </td>
          <td className="py-4">{d.bestBidPrice}</td>
          <td className="py-4">{d.bestAskPrice}</td>
          <td className="py-4">{d.bestAskSize}</td>
        </tr>)}
      </tbody>
    </table>}
  </div>;
});
export default PricesPage;
