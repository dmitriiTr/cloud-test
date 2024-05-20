import './App.css';
import './index.css';

import Modal from './Modal';
import PricesTable from './Table';
import { Store } from './Store';
import { observer } from 'mobx-react';
import { useParams } from 'react-router-dom';
import { useState } from 'react';

const PricesPage = observer(() => {
  const { tab } = useParams();
  const [store] = useState(() => new Store(tab)); // Стор отдельно специально

  return (
    <>
      <h1>Prices</h1>
      <div className="card">
        <ModalContainer store={store} />
      </div>
      {<ErrorMessage store={store} />}
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

const ErrorMessage = observer(({ store }: { store: Store }) => {
  if (!store.modalError) {
    return null;
  }
  return <div className="p-4 mb-4 text-sm text-yellow-800 rounded-lg bg-yellow-50 border border-yellow-400" role="alert">
    <span className="font-medium">Server Error</span> {store.modalError.message}
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
