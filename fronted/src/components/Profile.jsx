import React, { useEffect, useState, useCallback } from "react";
import API from "./api";
import { useTranslation } from "react-i18next";
import "../css/Profile.css";

function Profile() {
  const { t } = useTranslation();

  const client_id = localStorage.getItem("client_id");

  const [profile, setProfile] = useState({
    id: "",
    name: "",
    email: "",
    phonenumber: "",
    address: "",
    created_at: ""
  });

  const [editMode, setEditMode] = useState(false);

  const fetchProfile = useCallback(async () => {
    try {
      const res = await API.get(`/client/profile/${client_id}`);
      setProfile(res.data);
    } catch (error) {
      console.log(error);
      alert(t("unable_load_profile"));
    }
  }, [client_id, t]);

  useEffect(() => {
    if (client_id) {
      fetchProfile();
    }
  }, [client_id, fetchProfile]);

  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value
    });
  };

  const updateProfile = async () => {
    try {
      const res = await API.put(`/client/profile/${client_id}`, {
        name: profile.name,
        phonenumber: profile.phonenumber,
        address: profile.address
      });

      alert(res.data.message);
      setEditMode(false);
      fetchProfile();
    } catch (error) {
      console.log(error);
      alert(t("update_failed"));
    }
  };

  return (
    <>
      {/* Page Header */}
      <div className="page-header">
        <h1>👤 {t("my_profile")}</h1>
        <p>{t("profile_description")}</p>
      </div>

      {/* Profile Card */}
      <div className="profile-card">
        <div className="profile-grid">
          <div className="input-group">
            <label>{t("client_id")}</label>
            <input type="text" value={profile.id} readOnly />
          </div>

          <div className="input-group">
            <label>{t("full_name")}</label>
            <input
              type="text"
              name="name"
              value={profile.name}
              readOnly={!editMode}
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <label>{t("email")}</label>
            <input type="email" value={profile.email} readOnly />
          </div>

          <div className="input-group">
            <label>{t("phone_number")}</label>
            <input
              type="text"
              name="phonenumber"
              value={profile.phonenumber}
              readOnly={!editMode}
              onChange={handleChange}
            />
          </div>

          <div className="input-group full-width">
            <label>{t("address")} </label>
            <textarea
              name="address"
              rows="4"
              value={profile.address}
              readOnly={!editMode}
              onChange={handleChange}
            />
          </div>

          <div className="input-group full-width">
            <label>{t("registration_date")}</label>
            <input
              type="text"
              value={
                profile.created_at
                  ? new Date(profile.created_at).toLocaleString()
                  : ""
              }
              readOnly
            />
          </div>
        </div>

        {!editMode ? (
          <button className="edit-btn" onClick={() => setEditMode(true)}>
            ✏️ {t("edit_profile")}
          </button>
        ) : (
          <div className="btn-group">
            <button className="save-btn" onClick={updateProfile}>
              💾 {t("save_changes")}
            </button>

            <button
              className="cancel-btn"
              onClick={() => {
                setEditMode(false);
                fetchProfile();
              }}
            >
              ❌ {t("cancel")}
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default Profile;