import React, { useState } from "react";

function Login() {
  const [userID,setUserID] = useState("");
  const [userPassword,setUserPassword] = useState("");

  function handleSubmit(e){
    e.preventDefault();
    
    const newLog ={
      userID,
      userPassword
    }

    console.log(newLog);
    
  }
  return (
    <div className="Auth-form-container">
      <form className="Auth-form" onSubmit={handleSubmit}>
        <h3 className="Auth-form-title">Login</h3>
        <div className="Auth-form-content">
          <div className="form-group mt-3">
            <label>User ID</label>
            <input
              type="String"
              className="form-control mt-1"
              placeholder="Enter User ID"
              onChange={(e)=>{
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
              onChange={(e)=>{
                setUserPassword(e.target.value);
              }}
            />
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