import React, { useEffect, useState } from "react";
import API from "../api";
import { useTranslation } from "react-i18next";
import "../css/ClientDashboard.css";

function ClientDashboard() {
  const { t } = useTranslation();

  const [counts, setCounts] = useState({
    total: 0,
    pending: 0,
    approved: 0,
    rejected: 0,
  });

  useEffect(() => {
    getDashboardData();
  }, []);

  const getDashboardData = async () => {
    try {
      const client_id = localStorage.getItem("client_id");

      if (!client_id) return;

      const res = await API.get(`/client/dashboard/${client_id}`);
      setCounts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {/* Welcome Header */}
      <div className="dashboard-header">
        <h1>
          {t("welcome")}, {localStorage.getItem("client_name")} 👋
        </h1>
        <p>{t("dashboard_description")}</p>
      </div>

      {/* Dashboard Cards */}
      <div className="cards">
        <div className="card">
          <h3>📦 {t("total_requests")}</h3>
          <p>{counts.total}</p>
        </div>

        <div className="card">
          <h3>⏳ {t("pending")}</h3>
          <p>{counts.pending}</p>
        </div>

        <div className="card">
          <h3>✅ {t("approved")}</h3>
          <p>{counts.approved}</p>
        </div>

        <div className="card">
          <h3>❌ {t("rejected")}</h3>
          <p>{counts.rejected}</p>
        </div>
      </div>

      {/* Welcome Box */}
      <div className="welcome-box">
        <h2>🍌 {t("banana_portal")}</h2>
        <p>{t("portal_description")}</p>

        <ul>
          <li>📨 {t("send_requests")}</li>
          <li>📋 {t("track_status")}</li>
          <li>👤 {t("manage_profile")}</li>
          <li>📦 {t("view_requests")}</li>
        </ul>
      </div>
    </>
  );
}

export default ClientDashboard;