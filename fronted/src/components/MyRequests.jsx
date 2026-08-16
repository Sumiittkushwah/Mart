import React, { useEffect, useState, useCallback } from "react";
import API from "./api";
import { useTranslation } from "react-i18next";
import "../css/MyRequests.css";

const API_BASE_URL = process.env.REACT_APP_API_URL || "https://mart-backend-jyt2.onrender.com";

function MyRequests() {
  const { t } = useTranslation();

  const [requests, setRequests] = useState([]);

  const fetchRequests = useCallback(async () => {
    try {
      const client_id = localStorage.getItem("client_id");

      if (!client_id) return;

      const res = await API.get(`/my-requests/${client_id}`);
      setRequests(res.data);
    } catch (error) {
      console.log(error);
      alert(t("unable_load_requests"));
    }
  }, [t]);

  useEffect(() => {
    fetchRequests();
  }, [fetchRequests]);

  return (
    <>
      {/* Page Header */}
      <div className="page-header">
        <h1>
          📋 {t("my_banana_requests")}
        </h1>
        <p>
          {t("view_submitted_requests")}
        </p>
      </div>

      {/* Requests */}
      <div className="request-grid">
        {requests.length > 0 ? (
          requests.map((item) => (
            <div className="request-card" key={item.id}>
              {item.image ? (
                <img
                  src={`${API_BASE_URL}/uploads/${item.image}`}
                  alt={item.banana_name}
                />
              ) : (
                <div className="no-image-placeholder">🍌</div>
              )}

              <div className="request-info">
                <h2>{item.banana_name}</h2>

                <p>
                  <strong>📦 {t("quantity")}:</strong> {item.quantity} KG
                </p>

                <p>
                  <strong>💰 {t("price")}:</strong> ₹{item.price}
                </p>

                <p>
                  <strong>📍 {t("location")}:</strong> {item.location}
                </p>

                <p>
                  <strong>📝 {t("description")}:</strong>
                  <br />
                  {item.description}
                </p>

                <p>
                  <strong>📅 {t("date")}:</strong>
                  <br />
                  {new Date(item.created_at).toLocaleString()}
                </p>

                <span
                  className={`status ${
                    item.status ? item.status.toLowerCase() : "pending"
                  }`}
                >
                  {item.status || t("pending")}
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className="empty-state">
            <h2>📭 {t("no_requests")}</h2>
            <p>{t("no_request_message")}</p>
          </div>
        )}
      </div>
    </>
  );
}

export default MyRequests;