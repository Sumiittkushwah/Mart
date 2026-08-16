import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "../css/BuyBanana.css";

function BuyBanana() {
  const { t } = useTranslation();

  return (
    <div className="buy-container">

      {/* Hero */}
      <section className="buy-hero">

        <h1>{t("buy.title")}</h1>

        <p>{t("buy.subtitle")}</p>

        <Link to="/register">
          <button className="sell-now-btn">
            {t("buy.sell_now")}
          </button>
        </Link>

      </section>

      {/* Why Choose */}
      <section className="why-section">

        <h2>{t("buy.why")}</h2>

        <p>{t("buy.why_desc1")}</p>

        <p>{t("buy.why_desc2")}</p>

      </section>

      {/* Accepted Bananas */}
      <section className="accepted-section">

        <h2>{t("buy.accepted")}</h2>

        <div className="accepted-grid">

          <div className="accepted-card">🍌 Robusta</div>

          <div className="accepted-card">🍌 Cavendish</div>

          <div className="accepted-card">🍌 Red Banana</div>

          <div className="accepted-card">🍌 Organic Banana</div>

          <div className="accepted-card">
            🍌 {t("buy.fresh")}
          </div>

          <div className="accepted-card">
            🍌 Overripe Bananas
          </div>

        </div>

      </section>

      {/* Products */}
      <section className="product-section">

        <h2>{t("buy.products")}</h2>

        <div className="product-grid">

          <div className="product-card">
            <h3>🍌 {t("buy.chips")}</h3>
            <p>{t("buy.chips_desc")}</p>
          </div>

          <div className="product-card">
            <h3>🍯 {t("buy.powder")}</h3>
            <p>{t("buy.powder_desc")}</p>
          </div>

          <div className="product-card">
            <h3>🥤 {t("buy.shake")}</h3>
            <p>{t("buy.shake_desc")}</p>
          </div>

          <div className="product-card">
            <h3>🍪 {t("buy.cookies")}</h3>
            <p>{t("buy.cookies_desc")}</p>
          </div>

          <div className="product-card">
            <h3>🍰 {t("buy.cake")}</h3>
            <p>{t("buy.cake_desc")}</p>
          </div>

          <div className="product-card">
            <h3>🐄 {t("buy.feed")}</h3>
            <p>{t("buy.feed_desc")}</p>
          </div>

        </div>

      </section>

      {/* Purchase Details */}
      <section className="purchase-section">

        <h2>{t("buy.bulk")}</h2>

        <div className="details-grid">

          <div className="detail-card">
            <h3>📦 5 KG+</h3>
            <p>{t("buy.min_qty")}</p>
          </div>

          <div className="detail-card">
            <h3>💰</h3>
            <p>{t("buy.price")}</p>
          </div>

          <div className="detail-card">
            <h3>🚚</h3>
            <p>{t("buy.pickup")}</p>
          </div>

          <div className="detail-card">
            <h3>⚡</h3>
            <p>{t("buy.payment")}</p>
          </div>

        </div>

      </section>

      {/* How It Works */}
      <section className="benefit-section">

        <h2>{t("buy.how")}</h2>

        <div className="step-grid">

          <div className="step-card">
            <span>1️⃣</span>
            <h3>{t("buy.step1")}</h3>
            <p>{t("buy.step1_desc")}</p>
          </div>

          <div className="step-card">
            <span>2️⃣</span>
            <h3>{t("buy.step2")}</h3>
            <p>{t("buy.step2_desc")}</p>
          </div>

          <div className="step-card">
            <span>3️⃣</span>
            <h3>{t("buy.step3")}</h3>
            <p>{t("buy.step3_desc")}</p>
          </div>

          <div className="step-card">
            <span>4️⃣</span>
            <h3>{t("buy.step4")}</h3>
            <p>{t("buy.step4_desc")}</p>
          </div>

        </div>

      </section>

      {/* Benefits */}
      <section className="benefit-section">

        <h2>{t("buy.benefits")}</h2>

        <div className="product-grid">

          <div className="product-card">
            <h3>💰 {t("buy.loss")}</h3>
            <p>{t("buy.loss_desc")}</p>
          </div>

          <div className="product-card">
            <h3>⚡ {t("buy.payment_title")}</h3>
            <p>{t("buy.payment_desc")}</p>
          </div>

          <div className="product-card">
            <h3>🚚 {t("buy.pickup_title")}</h3>
            <p>{t("buy.pickup_desc")}</p>
          </div>

          <div className="product-card">
            <h3>🤝 {t("buy.partner")}</h3>
            <p>{t("buy.partner_desc")}</p>
          </div>

        </div>

      </section>

      {/* CTA */}
      <section className="cta-section">

        <h2>{t("buy.ready")}</h2>

        <p>{t("buy.ready_desc")}</p>

        <Link to="/register">
          <button className="sell-now-btn">
            {t("buy.register")}
          </button>
        </Link>

      </section>

    </div>
  );
}

export default BuyBanana;