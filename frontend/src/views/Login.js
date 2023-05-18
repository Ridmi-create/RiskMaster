import React from "react";

function Login() {
    return (
        <div className="Auth-form-container">
      <form className="Auth-form">
      <h3 className="Auth-form-title">Login</h3>
        <div className="Auth-form-content">
          <div className="form-group mt-3">
            <label>User ID</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="Enter User ID"
            />
            <br></br>
            
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Enter password"
            />
            <br></br><br></br><br></br>
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
    
        </div>
      </form>
    </div>
  )
}

export default Login;