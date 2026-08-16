import "../css/Login.css";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useTranslation } from "react-i18next";

function Login() {

  const { t } = useTranslation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const navigate = useNavigate();


  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:5000/login", {
        email,
        password,
      });

      alert(response.data.message);

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("client_id", response.data.id);
      localStorage.setItem("client_name", response.data.name);

      if (rememberMe) {
        localStorage.setItem("rememberMe", "true");
      }

      navigate("/client-dashboard");

    } catch (error) {

      if (error.response) {
        alert(error.response.data.message);
      } else {
        alert(t("server_error"));
      }

    }
  };


  return (
    <div className="login-page">


      <header className="login-header">

        <div className="logo">
          🍌 <span>BananaMart</span>
        </div>


        <Link to="/" className="home-btn">
          🏠 {t("back_home")}
        </Link>


      </header>




      <div className="login-wrapper">


        <div className="login-banner">


          <h1>
            {t("welcome_back")} 👋
          </h1>


          <p>
            {t("login_description")}
          </p>


          <div className="banner-features">

            <p>✅ {t("secure_login")}</p>
            <p>🍌 {t("fresh_marketplace")}</p>
            <p>📦 {t("order_management")}</p>
            <p>🚚 {t("delivery_support")}</p>

          </div>


        </div>





        <div className="login-card">


          <h2>
            {t("client_login")}
          </h2>


          <p>
            {t("dashboard_access")}
          </p>




          <form onSubmit={handleLogin}>


            <div className="input-box">

              <label>
                📧 {t("email")}
              </label>


              <input
                type="email"
                placeholder={t("email_placeholder")}
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
                required
              />

            </div>





            <div className="input-box">


              <label>
                🔒 {t("password")}
              </label>



              <div className="password-field">

                <input
                  type={showPassword ? "text":"password"}
                  placeholder={t("password_placeholder")}
                  value={password}
                  onChange={(e)=>setPassword(e.target.value)}
                  required
                />


                <button
                  type="button"
                  className="show-btn"
                  onClick={()=>setShowPassword(!showPassword)}
                >

                  {showPassword ? t("hide") : t("show")}

                </button>


              </div>


            </div>





            <div className="login-options">


              <label className="remember">

                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e)=>setRememberMe(e.target.checked)}
                />

                {t("remember_me")}

              </label>



              <Link 
                to="/forgot-password" 
                className="forgot-link"
              >

                {t("forgot_password")}

              </Link>



            </div>




            <button type="submit" className="login-btn">

              {t("login")}

            </button>



          </form>





          <div className="register-section">

            <p>
              {t("no_account")}
            </p>


            <Link to="/register" className="register-btn">

              {t("create_account")}

            </Link>


          </div>



        </div>


      </div>


    </div>
  );
}


export default Login;