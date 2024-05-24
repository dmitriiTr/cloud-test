import NavBar from '../../components/NavBar';
import PageTitle from '../../ui/Header';
import { Prices } from '../../modules/Prices';
import { observer } from 'mobx-react';

const PricesPage = observer(() => {
  return (
    <>
      {/* <ErrorContainer store={store} /> */}
      <NavBar />
      <PageTitle text='Prices' />
      <Prices />
    </>
  );
});

export default PricesPage;
