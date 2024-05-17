import './App.css';

import { Prices } from './types/pricesSchema';
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

const PricesTable = observer(({ tableData }: { tableData: Prices[] }) => {
  return <>
    {tableData && <table>
      <thead>
        <tr>
          <th>Symbol</th>
          <th>Price</th>
          <th>Best Bid Price</th>
          <th>Best Ask Price</th>
          <th>Best Ask Size</th>
        </tr>
      </thead>
      <tbody>
        {tableData.map(d => <tr key={d.tradeId}>
          <td>{d.symbol}</td>
          <td>{d.price}</td>
          <td>{d.bestBidPrice}</td>
          <td>{d.bestAskPrice}</td>
          <td>{d.bestAskSize}</td>
        </tr>)}
      </tbody>
    </table>}
  </>;
});
export default PricesPage;
