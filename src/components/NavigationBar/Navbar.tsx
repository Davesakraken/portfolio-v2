import { useState } from "react";
import { NavLink } from "react-router-dom";
import ThemeToggle from "@/components/Darkmode";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Active link style function with dark mode variants - pill shaped
  const getLinkClass = ({ isActive }: { isActive: boolean }) => {
    return isActive
      ? "bg-[#213547] dark:bg-[#fed7aa] text-white dark:!text-[#1f1f1f] px-6 py-2.5 rounded-full font-medium transition-all duration-300 shadow-md"
      : "hover:bg-gray-200 dark:hover:bg-[#2a2a2a] px-6 py-2.5 rounded-full font-medium transition-all duration-300";
  };

  // Mobile active link style function with dark mode variants - pill shaped
  const getMobileLinkClass = ({ isActive }: { isActive: boolean }) => {
    return isActive
      ? "bg-[#213547] dark:bg-[#fed7aa] text-white dark:!text-[#1f1f1f] block px-6 py-2.5 rounded-full text-base font-medium transition-all duration-300 shadow-md"
      : "hover:bg-gray-200 dark:hover:bg-[#2a2a2a] block px-6 py-2.5 rounded-full text-base font-medium transition-all duration-300";
  };

  return (
    <nav className="fixed top-0 left-1/2 -translate-x-1/2 z-50 mt-4 rounded-full">
      <div className="bg-white/80 dark:bg-[#1f1f1f]/80 backdrop-blur-md shadow-lg rounded-full px-6 py-2">
        <div className="flex justify-center items-center h-12">
          {/* Desktop Menu - Centered */}
          <div className="hidden sm:block">
            <div className="flex items-center space-x-2">
              <NavLink to="/" className={getLinkClass} end>
                Home
              </NavLink>
              <NavLink to="/projects" className={getLinkClass}>
                Projects
              </NavLink>
              <NavLink to="/contact" className={getLinkClass}>
                Contact
              </NavLink>
              <ThemeToggle />
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="sm:hidden flex items-center justify-between min-w-[280px]">
            <ThemeToggle />
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-full text-[#4b5563] dark:text-[#fed7aa] hover:text-[#213547] dark:hover:text-[#fef7ed] hover:bg-gray-200 dark:hover:bg-[#2a2a2a] focus:outline-none transition-all duration-300"
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
      {isOpen && (
        <div className="md:hidden mt-2">
          <div className="bg-white/80 dark:bg-[#1f1f1f]/80 backdrop-blur-md shadow-lg rounded-3xl px-4 py-3 min-w-[280px]">
            <div className="space-y-2 text-center">
              <NavLink to="/" className={getMobileLinkClass} end onClick={() => setIsOpen(false)}>
                Home
              </NavLink>
              <NavLink
                to="/projects"
                className={getMobileLinkClass}
                onClick={() => setIsOpen(false)}
              >
                Projects
              </NavLink>
              <NavLink
                to="/contact"
                className={getMobileLinkClass}
                onClick={() => setIsOpen(false)}
              >
                Contact
              </NavLink>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
