import React, { useEffect, useState, useCallback } from "react";
import API from "./api";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "../css/AdminDashboard.css";

function AdminDashboard() {
    const { t } = useTranslation();

    const [counts, setCounts] = useState({
        totalClients: 0,
        totalRequests: 0,
        approved: 0,
        rejected: 0
    });

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const fetchCounts = useCallback(async () => {
        try {
            setLoading(true);
            const res = await API.get("/admin/counts");
            setCounts(res.data);
        } catch (err) {
            console.log(err);
            setError(t("unable_load_dashboard"));
        } finally {
            setLoading(false);
        }
    }, [t]);

    useEffect(() => {
        fetchCounts();
    }, [fetchCounts]);

    const percentage = counts.totalRequests
        ? Math.round((counts.approved / counts.totalRequests) * 100)
        : 0;

    if (loading) {
        return (
            <div className="dashboard-loading">
                🍌
                <br />
                {t("loading_admin_dashboard")}
            </div>
        );
    }

    return (
        <div className="admin-page">
            {/* Top Header */}
            <div className="dashboard-top">
                <div>
                    <h1>{t("good_morning_admin")} 👨‍💼</h1>
                    <p>{t("welcome_admin")}</p>
                    <div className="status">🟢 {t("marketplace_active")}</div>
                </div>

                <div className="admin-profile">
                    <div className="admin-logo">🍌</div>
                    <div>
                        <h3>{t("administrator")}</h3>
                        <span>{t("banana_owner")}</span>
                    </div>
                </div>
            </div>

            {error && <div className="error-box">⚠️ {error}</div>}

            {/* Statistics */}
            <div className="cards">
                <div className="card total">
                    <div className="card-icon">👥</div>
                    <div>
                        <h3>{t("total_clients")}</h3>
                        <p>{counts.totalClients}</p>
                        <span>{t("registered_sellers")}</span>
                    </div>
                </div>

                <div className="card request">
                    <div className="card-icon">📦</div>
                    <div>
                        <h3>{t("total_requests")}</h3>
                        <p>{counts.totalRequests}</p>
                        <span>{t("banana_orders")}</span>
                    </div>
                </div>

                <div className="card approved">
                    <div className="card-icon">✅</div>
                    <div>
                        <h3>{t("approved")}</h3>
                        <p>{counts.approved}</p>
                        <span>{t("completed_deals")}</span>
                    </div>
                </div>

                <div className="card rejected">
                    <div className="card-icon">❌</div>
                    <div>
                        <h3>{t("rejected")}</h3>
                        <p>{counts.rejected}</p>
                        <span>{t("cancelled")}</span>
                    </div>
                </div>
            </div>

            {/* Analytics */}
            <div className="analytics-box">
                <h2>📊 {t("request_analytics")}</h2>
                <div className="progress-area">
                    <div className="progress-text">
                        {t("approval_rate")}
                        <strong>{percentage}%</strong>
                    </div>
                    <div className="progress">
                        <div style={{ width: `${percentage}%` }} />
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="quick-box">
                <h2>🚀 {t("quick_actions")}</h2>
                <div className="quick-grid">
                    <Link to="/admin-requests">📨 {t("manage_requests")}</Link>
                    <Link to="/admin-clients">👥 {t("manage_clients")}</Link>
                    <Link to="/admin-reports">📊 {t("view_reports")}</Link>
                </div>
            </div>

            {/* Information */}
            <div className="welcome-box">
                <h2>🍌 {t("banana_admin_panel")}</h2>
                <p>{t("admin_panel_description")}</p>
            </div>
        </div>
    );
}

export default AdminDashboard;