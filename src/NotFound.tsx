import './index.css';

import NavBar from './NavBar';

const NotFound = () => {

  return (
    <>
      <NavBar />
      <div className='md:mx-60 my-20'>
        <h1 className="text-6xl">Страница не найдена</h1>
      </div>
    </>
  );
};

export default NotFound;
