import "../css/Hero.css";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

function Hero() {

  const { t } = useTranslation();

  return (
    <section className="hero">

      <div className="hero-left">

        <span className="tag">
          🍌 {t("hero.tag")}
        </span>


        <h1>
          {t("hero.title")} <br />
          <span>{t("hero.highlight")}</span>
        </h1>


        <p>
          {t("hero.description")}
        </p>


        <div className="hero-btns">

          <Link to="/register">
            <button className="sell-btn">
              {t("hero.start")}
            </button>
          </Link>


          <Link to="/login">
            <button className="buy-btn">
              {t("hero.login")}
            </button>
          </Link>

        </div>

      </div>


      <div className="hero-right">

        <img
          src="https://images.unsplash.com/photo-1603833665858-e61d17a86224?auto=format&fit=crop&w=700&q=80"
          alt="Fresh Bananas"
        />

      </div>


    </section>
  );
}

export default Hero;