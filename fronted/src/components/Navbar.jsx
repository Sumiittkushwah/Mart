import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "../css/Navbar.css";

function Navbar() {

  const [menuOpen, setMenuOpen] = useState(false);

  const { t, i18n } = useTranslation();


  const changeLanguage = () => {

    const lang = i18n.language === "en" ? "hi" : "en";

    i18n.changeLanguage(lang);

    localStorage.setItem("language", lang);

  };


  return (
    <nav className="navbar">


      {/* Logo */}
      <div className="logo">
        🍌 BananaMart
      </div>


      {/* Hamburger */}
      <div
        className="hamburger"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? "✖" : "☰"}
      </div>



      {/* Navigation */}
      <ul className={menuOpen ? "nav-links active" : "nav-links"}>


        <li>
          <Link to="/" onClick={() => setMenuOpen(false)}>
            {t("home")}
          </Link>
        </li>


        <li>
          <Link to="/bananas" onClick={() => setMenuOpen(false)}>
            {t("bananas")}
          </Link>
        </li>


        <li>
          <Link to="/about" onClick={() => setMenuOpen(false)}>
            {t("about")}
          </Link>
        </li>


        <li>
          <Link to="/contact" onClick={() => setMenuOpen(false)}>
            {t("contact")}
          </Link>
        </li>



        {/* Mobile Login */}
        <li className="mobile-btn">

          <Link to="/login" onClick={() => setMenuOpen(false)}>

            <button className="login-btn">
              {t("login")}
            </button>

          </Link>

        </li>



        {/* Mobile Admin */}
        <li className="mobile-btn">

          <Link to="/admin-login" onClick={() => setMenuOpen(false)}>

            <button className="admin-btn">
              {t("admin")}
            </button>

          </Link>

        </li>


      </ul>





      {/* Desktop Buttons */}
      <div className="nav-buttons">


        <Link to="/login">
          <button className="login-btn">
            {t("login")}
          </button>
        </Link>



        <Link to="/admin-login">
          <button className="admin-btn">
            {t("admin")}
          </button>
        </Link>



        {/* Language Button Last */}
        <button
          className="lang-btn"
          onClick={changeLanguage}
        >
          {i18n.language === "en" ? "हिंदी" : "English"}
        </button>


      </div>


    </nav>
  );
}

export default Navbar;