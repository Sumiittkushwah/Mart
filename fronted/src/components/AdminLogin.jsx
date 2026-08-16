import React, { useState } from "react";
import API from "./api";
import { useNavigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "../css/AdminLogin.css";

function AdminLogin() {
    const { t } = useTranslation();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await API.post("/admin/login", {
                email,
                password
            });

            alert(res.data.message);

            localStorage.setItem(
                "adminToken",
                res.data.token
            );

            navigate("/admin-dashboard");

        } catch (error) {
            if (error.response) {
                alert(error.response.data.message);
            } else {
                alert(t("server_error"));
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="admin-login-page">
            {/* Left Branding Panel */}
            <div className="admin-info">
                <h1>🍌 BananaMart</h1>
                <h2>{t("admin_control_center")}</h2>
                <p>{t("admin_description")}</p>

                <div className="feature">
                    <span>👥</span>
                    {t("manage_clients")}
                </div>

                <div className="feature">
                    <span>📋</span>
                    {t("handle_requests")}
                </div>

                <div className="feature">
                    <span>📊</span>
                    {t("view_reports")}
                </div>
            </div>

            {/* Right Login Box */}
            <div className="admin-login-card">
                <div className="admin-avatar">👨‍💼</div>
                <h1>{t("admin_login")}</h1>
                <p>🔒 {t("secure_admin_access")}</p>

                <form onSubmit={handleLogin}>
                    <label>{t("email")}</label>
                    <input
                        type="email"
                        placeholder={t("enter_admin_email")}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        autoComplete="email"
                        required
                    />

                    <label>{t("password")}</label>
                    <div className="password-field">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder={t("enter_password")}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            autoComplete="current-password"
                            required
                        />
                        <span
                            onClick={() =>
                                setShowPassword(!showPassword)
                            }
                        >
                            {showPassword ? "🙈" : "👁️"}
                        </span>
                    </div>

                    <button type="submit" disabled={loading}>
                        {loading
                            ? `⏳ ${t("authenticating")}`
                            : t("login_dashboard")}
                    </button>
                </form>

                <Link to="/" className="home-btn">
                    🏠 {t("back_home")}
                </Link>
            </div>
        </div>
    );
}

export default AdminLogin;