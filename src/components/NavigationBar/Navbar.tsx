import { useState } from "react";
import { NavLink } from "react-router-dom";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Active link style function
  const getLinkClass = ({ isActive }: { isActive: boolean }) => {
    return isActive
      ? "bg-gray-900 text-white px-3 py-2 rounded-md font-medium"
      : "text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md font-medium";
  };

  // Mobile active link style function
  const getMobileLinkClass = ({ isActive }: { isActive: boolean }) => {
    return isActive
      ? "bg-gray-900 text-white block px-3 py-2 rounded-md text-base font-medium"
      : "text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium";
  };

  return (
    <nav className="bg-gray-800 shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-center items-center h-16">
          {/* Desktop Menu - Centered */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-8">
              <NavLink to="/" className={getLinkClass} end>
                Home
              </NavLink>
              <NavLink to="/projects" className={getLinkClass}>
                Projects
              </NavLink>
              <NavLink to="/contact" className={getLinkClass}>
                Contact
              </NavLink>
            </div>
          </div>

          {/* Mobile menu button - Now centered */}
          <div className="md:hidden absolute right-4">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {/* Icon when menu is closed */}
              <svg
                className={`${isOpen ? "hidden" : "block"} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              {/* Icon when menu is open */}
              <svg
                className={`${isOpen ? "block" : "hidden"} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      <div className={`${isOpen ? "block" : "hidden"} md:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 text-center">
          <NavLink to="/" className={getMobileLinkClass} end>
            Home
          </NavLink>
          <NavLink to="/projects" className={getMobileLinkClass}>
            Projects
          </NavLink>
          <NavLink to="/contact" className={getMobileLinkClass}>
            Contact
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
