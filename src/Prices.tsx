import './App.css';

import { useContext, useEffect } from 'react';

import { StoreContext } from './Store';
import { observer } from 'mobx-react';
import viteLogo from '/vite.svg';

const Prices = observer(() => {
  const store = useContext(StoreContext);
  useEffect(() => {
    store?.init();
    return () => {
      store?.dispose();
    };
  }, [store]);
  //console.log(data);

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
      </div>
      <h1>Prices</h1>
      <div className="card">
        <PricesTable />
      </div>
    </>
  );
});

const PricesTable = observer(() => {
  const store = useContext(StoreContext);
  const data = store?.dashboard?.data;
  return <>
    {data && <table>
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
        {data.map(d => <tr key={d.tradeId}>
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
export default Prices;
