import React, { useEffect, useState, useCallback } from "react";
import API from "./api";
import { useTranslation } from "react-i18next";
import "../css/AdminReports.css";

function AdminReports() {
    const { t } = useTranslation();

    const [report, setReport] = useState({
        totalClients: 0,
        totalRequests: 0,
        approved: 0,
        rejected: 0,
        pending: 0
    });

    const fetchReports = useCallback(async () => {
        try {
            const res = await API.get("/admin/reports");
            setReport(res.data);
        } catch (error) {
            console.log(error);
            alert(t("unable_load_reports"));
        }
    }, [t]);

    useEffect(() => {
        fetchReports();
    }, [fetchReports]);

    return (
        <div className="reports-container">
            <h1>📊 {t("admin_reports")}</h1>

            <div className="report-cards">
                <div className="report-card clients">
                    <h2>👥 {t("total_clients")}</h2>
                    <p>{report.totalClients}</p>
                </div>

                <div className="report-card requests">
                    <h2>📨 {t("total_requests")}</h2>
                    <p>{report.totalRequests}</p>
                </div>

                <div className="report-card approved">
                    <h2>✅ {t("approved")}</h2>
                    <p>{report.approved}</p>
                </div>

                <div className="report-card rejected">
                    <h2>❌ {t("rejected")}</h2>
                    <p>{report.rejected}</p>
                </div>

                <div className="report-card pending">
                    <h2>⏳ {t("pending")}</h2>
                    <p>{report.pending}</p>
                </div>
            </div>

            <div className="report-summary">
                <h2>📈 {t("summary")}</h2>

                <table>
                    <tbody>
                        <tr>
                            <td>{t("total_clients")}</td>
                            <td>{report.totalClients}</td>
                        </tr>
                        <tr>
                            <td>{t("total_requests")}</td>
                            <td>{report.totalRequests}</td>
                        </tr>
                        <tr>
                            <td>{t("approved_requests")}</td>
                            <td>{report.approved}</td>
                        </tr>
                        <tr>
                            <td>{t("rejected_requests")}</td>
                            <td>{report.rejected}</td>
                        </tr>
                        <tr>
                            <td>{t("pending_requests")}</td>
                            <td>{report.pending}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default AdminReports;