import './App.css';
import './index.css';

import Modal from './Modal';
import PricesTable from './Table';
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
      <div className="card">
        <ModalContainer store={store} />
      </div>
      {error && <ErrorMessage error={error} />}
      <>
        <button onClick={() => store.setTab('A')}>Tab A</button>
        <button onClick={() => store.setTab('B')}>Tab B</button>
      </>
      <div className="relative overflow-x-auto">
        <PricesTable store={store} />
      </div>
    </>
  );
});

const ErrorMessage = observer(({ error }: { error: Error }) => {
  return <div>
    <h1>{error.message}</h1>
  </div>;
});

const ModalContainer = observer(({ store }: { store: Store }) => {
  const { selectedCoin, selectCoin } = store;
  return <Modal isOpen={!!selectedCoin} onClose={() => selectCoin(null)}>
    <>
      {selectedCoin && <table className="w-full text-left text-gray-500 table-fixed">
        <tbody>
          <tr className="bg-white border-b">
            <td className="py-4 font-medium text-black">
              Symbol
            </td>
            <td className="py-4 font-medium text-black">
              {selectedCoin.symbol}
            </td>
          </tr>
          <tr className="bg-white border-b">
            <td className="py-4 font-medium text-black">
              Price
            </td>
            <td className="py-4 font-medium text-black">
              {selectedCoin.price}
            </td>
          </tr>
          <tr className="bg-white border-b">
            <td className="py-4 font-medium text-black">
              Best Bid Price
            </td>
            <td className="py-4 font-medium text-black">
              {selectedCoin.bestBidPrice}
            </td>
          </tr>
          <tr className="bg-white border-b">
            <td className="py-4 font-medium text-black">
              Best Ask Price
            </td>
            <td className="py-4 font-medium text-black">
              {selectedCoin.bestAskPrice}
            </td>
          </tr>
          <tr className="bg-white border-b">
            <td className="py-4 font-medium text-black">
              Best Ask Size
            </td>
            <td className="py-4 font-medium text-black">
              {selectedCoin.bestAskSize}
            </td>
          </tr>
        </tbody>
      </table>}
    </>
  </Modal>;
});

export default PricesPage;
