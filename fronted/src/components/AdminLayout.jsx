import React from "react";
import { Outlet, Link, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "../css/AdminLayout.css";

function AdminLayout() {

  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const logout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin-login");
  };

  return (

    <div className="admin-layout">

      {/* Sidebar */}
      <div className="admin-sidebar">

        <h2>🍌 BananaMart</h2>

        <ul>

          <li className={location.pathname === "/admin-dashboard" ? "active" : ""}>
            <Link to="/admin-dashboard">
              🏠 {t("dashboard")}
            </Link>
          </li>

          <li className={location.pathname === "/admin-clients" ? "active" : ""}>
            <Link to="/admin-clients">
              👥 {t("clients")}
            </Link>
          </li>

          <li className={location.pathname === "/admin-requests" ? "active" : ""}>
            <Link to="/admin-requests">
              📨 {t("requests")}
            </Link>
          </li>

          <li className={location.pathname === "/admin-reports" ? "active" : ""}>
            <Link to="/admin-reports">
              📊 {t("reports")}
            </Link>
          </li>

          <li
            className="logout"
            onClick={logout}
          >
            🚪 {t("logout")}
          </li>

        </ul>

      </div>

      {/* Dashboard Content */}
      <div className="admin-content">
        <Outlet />
      </div>

    </div>

  );

}

export default AdminLayout;