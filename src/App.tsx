import { BrowserRouter, Route, Routes } from 'react-router-dom';

import About from './Pages/About';
import NotFound from './Pages/NotFound';
import PricesPage from './Pages/Prices/Prices';

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
