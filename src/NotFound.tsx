import './App.css';

import { NavLink } from 'react-router-dom';
import viteLogo from '/vite.svg';

const NotFound = () => {

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
      </div>
      <h1>Страница не найдена</h1>
      <div className="card">
        <NavLink to="/">На главную</NavLink>
      </div>
    </>
  );
};

export default NotFound;
