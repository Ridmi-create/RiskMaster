// Login.js
import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [userID, setUserID] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userType, setUserType] = useState("");
  const [error, setError] = useState('');
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    if (userType === "Admin") {
      try {
        const adminID = userID;
        const adminPwd = userPassword;
        const newLog = {
          adminID,
          adminPwd
        };
        console.log(newLog);

        const response = await axios.post("http://localhost:8070/Admin/login", newLog);

        if (response && response.data && response.data.token) {
          const { token } = response.data;

          // Store the token in local storage or state for future requests
          // Example: localStorage.setItem('token', token);

          // Redirect the user to the dashboard or protected route
          navigate("/dashboard");
        } else {
          setError('Invalid response format');
        }
        

      } catch (e) {
        setError(e.response.data.message);
        alert(error);
      }
      
    }
  }

  return (
    <div className="Auth-form-container">
      <form className="Auth-form" onSubmit={handleSubmit}>
        <h3 className="Auth-form-title">Login</h3>
        <div className="Auth-form-content">
          {/* Rest of your form code */}
          <div className="form-group mt-3">
              <label>User ID</label>
              <input
                type="String"
                className="form-control mt-1"
                placeholder="Enter User ID"
                onChange={(e) => {
                  setUserID(e.target.value);
                }}
              />
              <br></br>

            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input
                type="password"
                className="form-control mt-1"
                placeholder="Enter password"
                onChange={(e) => {
                  setUserPassword(e.target.value);
                }}
              />
            </div>
            <div className="form-group mt-3">
              <label>User Type</label>
              <select className="form-control mt-1"
                onChange={(e) => {
                  setUserType(e.target.value);
                }}>
                <option selected>Select User Type</option>
                <option value="Admin">Admin</option>
                <option value="RiskOwner">Risk Owner</option>
                <option value="RiskGovernance">Risk Governance</option>
              </select>

              <br></br><br></br><br></br>
            </div>
            <div className="d-grid gap-2 mt-3">
              <button className="btn btn-primary" href="/dashboard">
                Submit
              </button>
            </div>
        </div>
      </form>
    </div>
  )
}

export default Login;
