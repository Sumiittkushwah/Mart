import React, { useEffect, useState, useCallback } from "react";
import API from "./api";
import { useTranslation } from "react-i18next";
import "../css/AdminRequests.css";

const API_BASE_URL = process.env.REACT_APP_API_URL || "https://mart-backend-jyt2.onrender.com";

function AdminRequests() {
    const { t } = useTranslation();

    const [requests, setRequests] = useState([]);

    const fetchRequests = useCallback(async () => {
        try {
            const res = await API.get("/admin/requests");
            setRequests(res.data);
        } catch (error) {
            console.log(error);
        }
    }, []);

    useEffect(() => {
        fetchRequests();
    }, [fetchRequests]);

    // Approve / Reject
    const updateStatus = async (id, status) => {
        try {
            const res = await API.put(`/admin/request-status/${id}`, { status });
            alert(res.data.message);

            setRequests(
                requests.map((item) =>
                    item.id === id ? { ...item, status: status } : item
                )
            );
        } catch (error) {
            console.log(error);
            alert(t("status_update_failed"));
        }
    };

    // Delete Request
    const deleteRequest = async (id) => {
        const confirmDelete = window.confirm(t("delete_request_confirm"));
        if (!confirmDelete) return;

        try {
            const res = await API.delete(`/admin/request/${id}`);
            alert(res.data.message);

            setRequests(requests.filter((item) => item.id !== id));
        } catch (error) {
            console.log(error);
            alert(t("delete_failed"));
        }
    };

    return (
        <div className="admin-request-container">
            <div className="request-header">
                <h1>📨 {t("client_requests")}</h1>
                <p>{t("manage_marketplace_orders")}</p>
            </div>

            <div className="table-responsive">
                <table>
                    <thead>
                        <tr>
                            <th>{t("id")}</th>
                            <th>{t("client")}</th>
                            <th>{t("contact_info")}</th>
                            <th>{t("item_details")}</th>
                            <th>{t("price")}</th>
                            <th>{t("location")}</th>
                            <th>{t("image")}</th>
                            <th>{t("status")}</th>
                            <th>{t("date")}</th>
                            <th>{t("action")}</th>
                        </tr>
                    </thead>

                    <tbody>
                        {requests.length > 0 ? (
                            requests.map((item) => (
                                <tr key={item.id}>
                                    <td className="font-bold">#{item.id}</td>

                                    <td>
                                        <div className="client-info">
                                            <strong>{item.name}</strong>
                                        </div>
                                    </td>

                                    <td>
                                        <div className="contact-info">
                                            <span>✉️ {item.email}</span>
                                            <span>📞 {item.phonenumber}</span>
                                        </div>
                                    </td>

                                    <td>
                                        <div className="item-details">
                                            <strong>🍌 {item.banana_name}</strong>
                                            <span className="qty-badge">
                                                {item.quantity} KG
                                            </span>
                                        </div>
                                    </td>

                                    <td className="price-tag">₹{item.price}</td>

                                    <td>📍 {item.location}</td>

                                    <td>
                                        {item.image ? (
                                            <img
                                                src={`${API_BASE_URL}/uploads/${item.image}`}
                                                alt="banana"
                                            />
                                        ) : (
                                            <span>No Image</span>
                                        )}
                                    </td>

                                    <td>
                                        <span
                                            className={`status ${
                                                item.status
                                                    ? item.status.toLowerCase()
                                                    : "pending"
                                            }`}
                                        >
                                            {item.status || t("pending")}
                                        </span>
                                    </td>

                                    <td className="date-cell">
                                        {new Date(
                                            item.created_at
                                        ).toLocaleDateString()}
                                        <small>
                                            {new Date(
                                                item.created_at
                                            ).toLocaleTimeString([], {
                                                hour: "2-digit",
                                                minute: "2-digit"
                                            })}
                                        </small>
                                    </td>

                                    <td>
                                        <div className="action-buttons">
                                            <button
                                                className="approve-btn"
                                                onClick={() =>
                                                    updateStatus(item.id, "Approved")
                                                }
                                            >
                                                ✅ {t("approve")}
                                            </button>

                                            <button
                                                className="reject-btn"
                                                onClick={() =>
                                                    updateStatus(item.id, "Rejected")
                                                }
                                            >
                                                ❌ {t("reject")}
                                            </button>

                                            <button
                                                className="delete-btn"
                                                onClick={() =>
                                                    deleteRequest(item.id)
                                                }
                                            >
                                                🗑 {t("delete")}
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="10" className="empty-state">
                                    📦 {t("no_requests_found")}
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default AdminRequests;