import { BrowserRouter, Route, Routes } from 'react-router-dom';

import About from './About';
import NotFound from './NotFound';
import PricesPage from './Prices';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<About />} />
        <Route path="prices/:tab?" element={<PricesPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
