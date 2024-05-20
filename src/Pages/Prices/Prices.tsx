import '../../index.css';

import { Store, Tabs } from './Store';
import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import ErrorMessage from './ErrorMessage';
import Modal from './Modal';
import NavBar from '../../Components/NavBar';
import PricesTable from './Table';
import { observer } from 'mobx-react';

const PricesPage = observer(() => {
  const { tab } = useParams();
  const { key } = useLocation();
  const [store] = useState(() => new Store(tab)); // Стор отдельно специально

  useEffect(() => () => store.dispose());
  useEffect(() => {
    store.setTab((tab ?? 'A') as Tabs);
  }, [key, store, tab]);


  return (
    <>
      <ErrorContainer store={store} />
      <NavBar />
      <div className="md:mx-60 my-20">
        <h1 className="text-6xl">Prices</h1>
        <div className="p-2">
          <ModalContainer store={store} />
        </div>
        <TableContainer store={store} />
      </div>
    </>
  );
});

const TableContainer = observer(({ store }: { store: Store }) => {
  const { selectedTab: tab } = store;
  return <div className="relative overflow-x-auto my-10">
    <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 ">
      <li className="me-2">
        <span onClick={() => store.setTab('A')}
          className={`cursor-pointer inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 ${tab === 'A' ? 'text-blue-600 bg-gray-100 active' : ''}`}>
          Tab A
        </span>
      </li>
      <li className="me-2">
        <span onClick={() => store.setTab('B')}
          className={`cursor-pointer inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 ${tab === 'B' ? 'text-blue-600 bg-gray-100 active' : ''}`}>
          Tab B
        </span>
      </li>
    </ul>
    <PricesTable store={store} />
  </div>;
});

const ErrorContainer = observer(({ store }: { store: Store }) => {
  if (!store.modalError) {
    return null;
  }
  return <ErrorMessage error={store.modalError} />;
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
