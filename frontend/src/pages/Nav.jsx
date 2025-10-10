


import { useState, useEffect } from "react";
import { MegaMenu, NavbarBrand, NavbarCollapse } from "flowbite-react";
import { Link } from "react-router-dom";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toggleDarkMode } from "../redux/themeslice";

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.theme.darkMode);

  // Shadow on scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Apply dark mode class globally
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <MegaMenu
      className={`sticky  top-0 z-50 transition-shadow duration-300  ${
        scrolled ? "shadow-md" : ""
      } bg-white dark:bg-gray-900`}
    >
      {/* Logo / Brand */}
     <Link to="/" className="m-2 flex items-center gap-3">
  <div className="flex items-center justify-center w-12 h-12 rounded-full overflow-hidden">
  
  </div>
  <span
    className={`text-2xl font-bold tracking-wide ${
      darkMode ? "text-white" : "text-blue-900"
    }`}
  >
    My<span className="text-blue-500">Platform</span>
  </span>
</Link>


      {/* Mobile Toggle */}
      <div className="flex items-center gap-2 md:hidden">
        <button
          onClick={() => dispatch(toggleDarkMode())}
          className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition"
          aria-label="Toggle dark mode"
        >
          {darkMode ? (
            <Sun className="w-6 h-6 text-yellow-400" />
          ) : (
            <Moon className="w-6 h-6 text-gray-800" />
          )}
        </button>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="inline-flex items-center p-2 w-10 h-10 justify-center rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
          aria-label="Toggle navigation"
        >
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Navbar Links */}
      <NavbarCollapse
        className={`transition-all duration-500 leading-relaxed text-center ${
          isOpen ? "block" : "hidden"
        } md:flex md:items-center md:gap-6`}
      >
        {[
          { to: "/", label: "Home" },
          { to: "/about", label: "About" },
          { to: "/contact", label: "Contact" },
        ].map((link, idx) => (
          <Link
            key={idx}
            className={`font-medium py-2   hover:outline-1 hover:rounded-md min-md:text-md transition-colors ${
              darkMode
                ? "text-white hover:text-blue-400"
                : "text-blue-900 hover:text-blue-600"
            }`}
            to={link.to}
            onClick={() => setIsOpen(false)}
          >
            {link.label}
          </Link>
        ))}

        {/* Desktop Dark Mode Toggle */}
        <button
          onClick={() => dispatch(toggleDarkMode())}
          className="hidden md:inline-flex p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 transition"
          aria-label="Toggle dark mode"
        >
          {darkMode ? (
            <Sun className="w-6 h-6 text-yellow-400" />
          ) : (
            <Moon className="w-6 h-6 text-gray-800" />
          )}
        </button>
      </NavbarCollapse>
    </MegaMenu>
  );
};

export default Nav;
