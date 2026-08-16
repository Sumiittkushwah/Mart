import React, { useEffect, useState, useCallback } from "react";
import API from "../api";
import { useTranslation } from "react-i18next";
import "../css/AdminClients.css";

function AdminClients() {
    const { t } = useTranslation();

    const [clients, setClients] = useState([]);
    const [search, setSearch] = useState("");

    const getClients = useCallback(async () => {
        try {
            const res = await API.get("/admin/clients");
            setClients(res.data);
        } catch (error) {
            console.log(error);
            alert(t("unable_fetch_clients"));
        }
    }, [t]);

    useEffect(() => {
        getClients();
    }, [getClients]);

    const deleteClient = async (id) => {
        const confirmDelete = window.confirm(
            t("delete_client_confirm")
        );

        if (!confirmDelete) return;

        try {
            const res = await API.delete(`/admin/client/${id}`);
            alert(res.data.message);
            getClients();
        } catch (error) {
            console.log(error);
            alert(t("delete_failed"));
        }
    };

    return (
        <div className="admin-clients-container">
            <h1>👥 {t("registered_clients")}</h1>

            {/* Search + Total Clients */}
            <div className="top-bar">
                <input
                    type="text"
                    placeholder={`🔍 ${t("search_client")}`}
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <h3>
                    {t("total_clients")} : {clients.length}
                </h3>
            </div>

            <table>
                <thead>
                    <tr>
                        <th>{t("id")}</th>
                        <th>{t("name")}</th>
                        <th>{t("email")}</th>
                        <th>{t("phone")}</th>
                        <th>{t("address")}</th>
                        <th>{t("register_date")}</th>
                        <th>{t("action")}</th>
                    </tr>
                </thead>

                <tbody>
                    {clients
                        .filter(
                            (client) =>
                                client.name
                                    ?.toLowerCase()
                                    .includes(search.toLowerCase()) ||
                                client.email
                                    ?.toLowerCase()
                                    .includes(search.toLowerCase())
                        )
                        .map((client) => (
                            <tr key={client.id}>
                                <td>{client.id}</td>
                                <td>{client.name}</td>
                                <td>{client.email}</td>
                                <td>{client.phonenumber}</td>
                                <td>{client.address}</td>
                                <td>
                                    {new Date(
                                        client.created_at
                                    ).toLocaleDateString()}
                                </td>
                                <td>
                                    <button
                                        className="delete-btn"
                                        onClick={() => deleteClient(client.id)}
                                    >
                                        {t("delete")}
                                    </button>
                                </td>
                            </tr>
                        ))}

                    {clients.length === 0 && (
                        <tr>
                            <td colSpan="7">{t("no_clients_found")}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default AdminClients;