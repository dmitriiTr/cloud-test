import './App.css';

import { NavLink } from 'react-router-dom';
import viteLogo from '/vite.svg';

const About = () => {

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
      </div>
      <h1>О приложении</h1>
      <div className="card">
        <NavLink to="/prices/A">Перейти к котировкам A</NavLink>
        <NavLink to="/prices/B">Перейти к котировкам B</NavLink>
      </div>
    </>
  );
};

export default About;
