import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import UserMenu from "./UserMenu";
import "./Navbar.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  // Close the menu with the Escape key
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <>
      <nav className="navbar">

        {/* home button + website name */}
        <div className="brand">

          <Link
            to="/"
            className="home-button"
            onClick={closeMenu}
            aria-label="Home"
            title="Home"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M3 11.5 12 4l9 7.5" />
              <path d="M5.5 10v9.5a1 1 0 0 0 1 1H10v-6h4v6h3.5a1 1 0 0 0 1-1V10" />
            </svg>
          </Link>

          <Link to="/" className="logo" onClick={closeMenu}>
            VLSI Learn
          </Link>

        </div>

        {/* navigation links (dropdown panel on phones/tablets) */}
        <div id="nav-links" className={`nav-links ${menuOpen ? "active" : ""}`}>

          <Link to="/" onClick={closeMenu}>
            Tutorials
          </Link>

          <Link to="/" onClick={closeMenu}>
            Exercises
          </Link>

          <Link to="/" onClick={closeMenu}>
            Projects
          </Link>

          <Link to="/" onClick={closeMenu}>
            Interview
          </Link>

        </div>

        {/* login circle + menu button (menu button only shows on phones/tablets) */}
        <div className="nav-actions">

          <UserMenu />

          <button
            type="button"
            className={`menu-button ${menuOpen ? "menu-open" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
            aria-controls="nav-links"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

        </div>

      </nav>

      {/* tap outside the dropdown to close it (phones/tablets only) */}
      {menuOpen && <div className="nav-backdrop" onClick={closeMenu} />}
    </>
  );
}

export default Navbar;