import '../index.css';

import { useCallback, useEffect, useRef, useState } from 'react';

import { NavLink } from 'react-router-dom';

const NavBar = () => {
  const menu = useRef<HTMLLIElement>(null);
  const [openDropdown, setOpenDropdown] = useState(false);
  const toggleDropdown = useCallback(
    (e: MouseEvent) => {
      if (openDropdown && !menu.current?.contains(e.target as Node)) {
        setOpenDropdown(false);
      }
    },
    [openDropdown],
  );
  useEffect(() => {
    document.addEventListener('mousedown', toggleDropdown);
    return () => {
      document.removeEventListener('mousedown', toggleDropdown);
    };
  }, [toggleDropdown]);

  return (
    <nav className="bg-white border-gray-200">
      <div className="justify-between p-4">
        <div className="w-full">
          <ul
            className="flex font-medium p-0  border-gray-100 rounded-lg space-x-8 rtl:space-x-reverse flex-row
         mt-0 border-0 bg-white"
          >
            <li>
              <NavLink
                className="block py-2 px-3 text-gray-900 rounded bg-transparent p-0 hover:text-blue-700"
                to="/"
              >
                About
              </NavLink>
            </li>
            <li ref={menu}>
              <button
                onClick={() => setOpenDropdown(true)}
                className="flex items-center justify-between py-2 px-3 text-gray-900 rounded hover:bg-gray-100
               hover:bg-transparent border-0 hover:text-blue-700 p-0 w-auto"
              >
                Prices
                <svg
                  className="w-2.5 h-2.5 ms-2.5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg>
              </button>
              <div
                className={`absolute z-10 ${!openDropdown ? 'hidden' : ''} font-normal bg-white divide-y
            divide-gray-100 rounded-lg shadow w-44`}
              >
                <ul className="py-2 text-sm text-gray-700">
                  <li>
                    <NavLink
                      className="block px-4 py-2 hover:bg-gray-100"
                      to="/prices/A"
                    >
                      Prices A
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      className="block px-4 py-2 hover:bg-gray-100"
                      to="/prices/B"
                    >
                      Prices B
                    </NavLink>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
