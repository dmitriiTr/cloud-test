import { Store, Tabs } from './Store';
import { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import ErrorMessage from '../../ui/ErrorMessage';
import Modal from './components/Modal';
import PricesTable from './components/Table';
import { createPortal } from 'react-dom';
import { observer } from 'mobx-react';

const Prices = observer(() => {
  const { tab } = useParams();
  const { key } = useLocation();
  const [store] = useState(() => new Store(tab));

  useEffect(() => () => store.dispose());
  useEffect(() => {
    store.setTab((tab ?? 'A') as Tabs);
  }, [key, store, tab]);

  return (
    <div className="mx-5 md:mx-20 xl:mx-60 my-20">
      <ErrorContainer store={store} />
      {createPortal(<ModalContainer store={store} />, document.body)}
      <TableContainer store={store} />
    </div>
  );
});

const ErrorContainer = observer(({ store }: { store: Store }) => {
  if (!store.error) {
    return null;
  }
  return <ErrorMessage error={store.error} />;
});

const TableContainer = observer(({ store }: { store: Store }) => {
  const { selectedTab: tab } = store;
  return (
    <div className="relative overflow-x-auto my-10">
      <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 ">
        <li className="me-2">
          <span
            onClick={() => store.setTab('A')}
            className={`cursor-pointer inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 
          ${tab === 'A' ? 'text-blue-600 bg-gray-100 active' : ''}`}
          >
            Tab A
          </span>
        </li>
        <li className="me-2">
          <span
            onClick={() => store.setTab('B')}
            className={`cursor-pointer inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50 
          ${tab === 'B' ? 'text-blue-600 bg-gray-100 active' : ''}`}
          >
            Tab B
          </span>
        </li>
      </ul>
      <PricesTable store={store} />
    </div>
  );
});

const ModalContainer = observer(({ store }: { store: Store }) => {
  const { selectedCoin, selectCoin } = store;
  return (
    <Modal isOpen={!!selectedCoin} onClose={() => selectCoin(null)}>
      <>
        {selectedCoin && (
          <table className="w-full text-left text-gray-500 table-fixed">
            <tbody>
              <tr className="bg-white border-b">
                <td className="py-4 font-medium text-black">Symbol</td>
                <td className="py-4 font-medium text-black">
                  {selectedCoin.symbol}
                </td>
              </tr>
              <tr className="bg-white border-b">
                <td className="py-4 font-medium text-black">Price</td>
                <td className="py-4 font-medium text-black">
                  {selectedCoin.price}
                </td>
              </tr>
              <tr className="bg-white border-b">
                <td className="py-4 font-medium text-black">Best Bid Price</td>
                <td className="py-4 font-medium text-black">
                  {selectedCoin.bestBidPrice}
                </td>
              </tr>
              <tr className="bg-white border-b">
                <td className="py-4 font-medium text-black">Best Ask Price</td>
                <td className="py-4 font-medium text-black">
                  {selectedCoin.bestAskPrice}
                </td>
              </tr>
              <tr className="bg-white border-b">
                <td className="py-4 font-medium text-black">Best Ask Size</td>
                <td className="py-4 font-medium text-black">
                  {selectedCoin.bestAskSize}
                </td>
              </tr>
            </tbody>
          </table>
        )}
      </>
    </Modal>
  );
});

export default Prices;
