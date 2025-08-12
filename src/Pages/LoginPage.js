import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const LoginPage = () => {
  const [usernameOrEmail, setUsernameOrEmail] = useState(""); // Unified username/email field
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);
  const { userInfo, setUserInfo } = useContext(UserContext);
  const navigate = useNavigate();

  async function login(ev) {
    ev.preventDefault();

    try {
      const response = await fetch("https://blog-backend-5tkj.onrender.com/login", {
        method: "POST",
        body: JSON.stringify({ usernameOrEmail, password }), // Unified request body
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();

      if (response.ok) {
        setUserInfo({ username: data.username });
        setMessage("Login successful!");
        setIsSuccess(true);
        localStorage.setItem('token', data.token);
        setTimeout(() => {
          navigate('/homepage');
        }, 1000);
      } else {
        setMessage(data.message || "Invalid credentials. Please try again.");
        setIsSuccess(false);
      }
    } catch (error) {
      console.error("Fetch error:", error); 
      setMessage("An error occurred. Please try again later.");
      setIsSuccess(false);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={login}>
        <h1 className="login-title">Login</h1>
        <h1 className="login-title">Welcome Back ✌️</h1>
        <input
          type="text"
          className="input-field"
          placeholder="Username or Email"
          value={usernameOrEmail}
          onChange={(ev) => setUsernameOrEmail(ev.target.value)}
          required
        />
        <input
          type="password"
          className="input-field"
          placeholder="Password"
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
          required
        />
        <button className="login-btn" type="submit">Login</button>

        {message && (
          <p className={`message ${isSuccess ? "success" : "error"}`}>{message}</p>
        )}

        <p className="register-redirect">
          If you don't have an account? <Link className="register-link" to="/register">Create New Account</Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;
