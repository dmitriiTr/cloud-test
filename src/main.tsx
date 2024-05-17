import './index.css';

import { Store, StoreContext } from './Store.ts';

import App from './App.tsx';
import ReactDOM from 'react-dom/client';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <>
    <StoreContext.Provider value={new Store()}>
      <App />
    </StoreContext.Provider>
  </>,
);
