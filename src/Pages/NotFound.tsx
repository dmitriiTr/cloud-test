import '../index.css';

import NavBar from '../Components/NavBar';

const NotFound = () => {

  return (
    <>
      <NavBar />
      <div className="md:mx-60 my-20">
        <h1 className="text-6xl">Page Not Found</h1>
      </div>
    </>
  );
};

export default NotFound;
