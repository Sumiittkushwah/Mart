import React from "react";
import { Link } from "react-router-dom";
import "../css/RequestSuccess.css";

function RequestSuccess() {

  return (
    <div className="success-container">

      <div className="success-card">

        <div className="icon">
          ✅
        </div>

        <h1>Your Request Submitted</h1>

        <p>
          Your banana request has been sent successfully.
          Admin will review your request soon.
        </p>

        <Link to="/client-dashboard">
          <button>
            Go To Dashboard
          </button>
        </Link>

      </div>

    </div>
  );
}

export default RequestSuccess;