import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { AboutPage } from './pages/About';
import { NotFoundPage } from './pages/NotFound';
import { PricesPage } from './pages/Prices';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<AboutPage />} />
        <Route path="prices/:tab?" element={<PricesPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
