import React, { useState } from "react";
import API from "./api";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "../css/SendRequest.css";

function SendRequest() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [data, setData] = useState({
    banana_name: "",
    quantity: "",
    price: "",
    location: "",
    description: "",
  });

  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const client_id = localStorage.getItem("client_id");

      const formData = new FormData();
      formData.append("client_id", client_id);
      formData.append("banana_name", data.banana_name);
      formData.append("quantity", data.quantity);
      formData.append("price", data.price);
      formData.append("location", data.location);
      formData.append("description", data.description);

      if (image) {
        formData.append("image", image);
      }

      const res = await API.post("/send-request", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert(res.data.message);
      navigate("/request-success");

      setData({
        banana_name: "",
        quantity: "",
        price: "",
        location: "",
        description: "",
      });
      setImage(null);
    } catch (error) {
      console.log(error);
      alert(t("server_error"));
    }
  };

  return (
    <>
      <div className="page-header">
        <h1>🍌 {t("send_banana_request")}</h1>
        <p>{t("request_description")}</p>
      </div>

      <div className="request-card">
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>{t("banana_type")}</label>
            <select
              name="banana_name"
              value={data.banana_name}
              onChange={handleChange}
              required
            >
              <option value="">{t("select_banana")}</option>
              <option value="Robusta">Robusta Banana</option>
              <option value="Cavendish">Cavendish Banana</option>
              <option value="Red Banana">Red Banana</option>
              <option value="Organic Banana">Organic Banana</option>
            </select>
          </div>

          <div className="input-group">
            <label>{t("quantity")}</label>
            <input
              type="number"
              name="quantity"
              placeholder={t("enter_quantity")}
              value={data.quantity}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>{t("expected_price")}</label>
            <input
              type="number"
              name="price"
              placeholder={t("enter_price")}
              value={data.price}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>{t("location")}</label>
            <input
              type="text"
              name="location"
              placeholder={t("enter_location")}
              value={data.location}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>{t("upload_image")}</label>
            <input
              type="file"
              accept=".jpg,.jpeg,.png"
              onChange={(e) => setImage(e.target.files[0])}
              required
            />
          </div>

          <div className="input-group">
            <label>{t("description")}</label>
            <textarea
              name="description"
              placeholder={t("write_description")}
              value={data.description}
              onChange={handleChange}
              rows="5"
              required
            />
          </div>

          <button type="submit" className="submit-btn">
            📨 {t("send_request")}
          </button>
        </form>
      </div>
    </>
  );
}

export default SendRequest;