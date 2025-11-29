import { useState } from "react";
import { NavLink } from "react-router-dom";
import ThemeToggle from "@/components/ThemeToggle";
import { MenuIcon, CloseIcon } from "@/components/icons";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Active link style function with dark mode variants - pill shaped
  const getLinkClass = ({ isActive }: { isActive: boolean }) => {
    return isActive
      ? "bg-slate-700 dark:bg-slate-100 text-white dark:text-slate-900 px-4 sm:px-6 py-2.5 rounded-full font-medium transition-[background-color,box-shadow] duration-300 shadow-lg shadow-slate-700/20 dark:shadow-slate-100/20"
      : "hover:bg-slate-100 dark:hover:bg-slate-800 px-4 sm:px-6 py-2.5 rounded-full font-medium transition-[background-color] duration-300";
  };

  // Mobile active link style function with dark mode variants - pill shaped
  const getMobileLinkClass = ({ isActive }: { isActive: boolean }) => {
    return isActive
      ? "bg-slate-700 dark:bg-slate-100 text-white dark:text-slate-900 block px-4 sm:px-6 py-2.5 rounded-full text-base font-medium transition-[background-color,box-shadow] duration-300 shadow-lg shadow-slate-700/20 dark:shadow-slate-100/20"
      : "hover:bg-slate-100 dark:hover:bg-slate-800 block px-4 sm:px-6 py-2.5 rounded-full text-base font-medium transition-[background-color] duration-300";
  };

  return (
    <nav className="fixed top-0 left-1/2 -translate-x-1/2 z-50 mt-4 rounded-full px-4 sm:px-0 w-[calc(100%-2rem)] sm:w-auto max-w-full">
      <div className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border border-slate-200/50 dark:border-slate-700/50 shadow-xl shadow-slate-900/10 dark:shadow-slate-950/30 rounded-full px-4 sm:px-6 py-2">
        <div className="flex justify-center items-center h-12">
          {/* Desktop Menu - Centered */}
          <div className="hidden sm:block">
            <div className="flex items-center space-x-1 sm:space-x-2">
              <NavLink to="/" className={getLinkClass} end viewTransition>
                Home
              </NavLink>
              <NavLink to="/projects" className={getLinkClass} viewTransition>
                Projects
              </NavLink>
              <NavLink to="/contact" className={getLinkClass} viewTransition>
                Contact
              </NavLink>
              <ThemeToggle />
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="sm:hidden flex items-center justify-between w-full">
            <ThemeToggle />
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-full text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 focus:outline-none transition-all duration-300"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <CloseIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      {isOpen && (
        <div className="md:hidden mt-2 px-4 sm:px-0">
          <div className="bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl border border-slate-200/50 dark:border-slate-700/50 shadow-xl shadow-slate-900/10 dark:shadow-slate-950/30 rounded-3xl px-4 py-3 w-full">
            <div className="space-y-2 text-center">
              <NavLink
                to="/"
                className={getMobileLinkClass}
                end
                onClick={() => setIsOpen(false)}
                viewTransition
              >
                Home
              </NavLink>
              <NavLink
                to="/projects"
                className={getMobileLinkClass}
                onClick={() => setIsOpen(false)}
                viewTransition
              >
                Projects
              </NavLink>
              <NavLink
                to="/contact"
                className={getMobileLinkClass}
                onClick={() => setIsOpen(false)}
                viewTransition
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
