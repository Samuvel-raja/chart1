import React, { useState } from "react";
import "../styles/login.css";
import { Link, useNavigate } from "react-router-dom";

import { LoginUser } from "../apicalls/LoginApi";
import axios from "axios";
const Login = () => {
  axios.defaults.withCredentials = true;
  const navigate = useNavigate();
  const [data, setdata] = useState({});

  const handleChange = (e) => {
    setdata({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await LoginUser(data)
      .then((res) => {
        if (res.data.token) navigate("/home");
      })
      .catch((err) => console.log(err.message));
  };
  return (
    <div className="form-container">
      <form action="post" onSubmit={handleSubmit}>
        <div className="form-header">
          <img
            src="https://superiorapp.s3.ap-south-1.amazonaws.com/appsmith_logo.png"
            alt=""
          />
          <h3>Sign in to your account</h3>
        </div>
        <div className="form-main">
          <div className="fields">
            <label htmlFor="">Email</label>
            <input
              type="text"
              placeholder="Enter your email"
              name="email"
              onChange={handleChange}
            />
          </div>
          <div className="fields">
            <label htmlFor="">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              name="password"
              onChange={handleChange}
            />
          </div>

          <div className="fields">
            <button>Sign in</button>
          </div>
        </div>
        <div className="form-footer">
          <Link to="/">Forgot Password</Link>
          <div className="form-footer-bottom">
            <span>Don't have an account ?</span>
            <Link to="/signup" className="sign-up-link">
              Sign Up
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
