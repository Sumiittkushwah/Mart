import React from "react";
import { Link, Outlet, useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "../css/ClientLayout.css";

function ClientLayout() {

  const navigate = useNavigate();
  const location = useLocation();

  const { t } = useTranslation();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="dashboard">

      {/* Sidebar */}
      <div className="sidebar">

        <h2>🍌 BananaMart</h2>

        <ul>

          <li className={location.pathname === "/client-dashboard" ? "active" : ""}>
            <Link to="/client-dashboard">
              🏠 {t("dashboard")}
            </Link>
          </li>

          <li className={location.pathname === "/send-request" ? "active" : ""}>
            <Link to="/send-request">
              📨 {t("send_request")}
            </Link>
          </li>

          <li className={location.pathname === "/my-requests" ? "active" : ""}>
            <Link to="/my-requests">
              📋 {t("my_requests")}
            </Link>
          </li>

          <li className={location.pathname === "/profile" ? "active" : ""}>
            <Link to="/profile">
              👤 {t("profile")}
            </Link>
          </li>

          <li onClick={handleLogout}>
            🚪 {t("logout")}
          </li>

        </ul>

      </div>

      {/* Main Content */}
      <div className="main-content">
        <Outlet />
      </div>

    </div>
  );
}

export default ClientLayout;