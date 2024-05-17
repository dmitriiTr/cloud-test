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
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
};

export default NotFound;
