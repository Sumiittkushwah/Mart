import "../css/Register.css";
import { Link, useNavigate } from "react-router-dom";
import API from "./api";
import React, { useState } from "react";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phonenumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/reg", {
        name,
        email,
        phonenumber,
        address,
        password,
      });

      alert(res.data.message);

      setName("");
      setEmail("");
      setPhoneNumber("");
      setAddress("");
      setPassword("");

      navigate("/login");
    } catch (err) {
      if (err.response) {
        alert(err.response.data.message);
      } else {
        alert("Server Not Responding");
      }
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h1>🍌 Client Registration</h1>
        <p>Create your account to start selling bananas.</p>

        <form onSubmit={handleSubmit}>
          <div className="input-box">
            <label>Full Name</label>
            <input
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="input-box">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-box">
            <label>Phone Number</label>
            <input
              type="text"
              placeholder="Enter your phone number"
              value={phonenumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
          </div>

          <div className="input-box">
            <label>Village / Address</label>
            <input
              type="text"
              placeholder="Enter your address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>

          <div className="input-box">
            <label>Password</label>
            <input
              type="password"
              placeholder="Create password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="register-btn">
            Register
          </button>
        </form>

        <div className="login-link">
          Already have an account?
          <Link to="/login"> Login</Link>
        </div>
      </div>
    </div>
  );
}

export default Register;