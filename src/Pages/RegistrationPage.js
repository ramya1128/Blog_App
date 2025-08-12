import { useState } from "react";
import { Link } from "react-router-dom";
import "../App.css";

export default function RegistrationPage({ onLogin }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  async function register(ev) {
    ev.preventDefault();

    try {
      const response = await fetch(
        "https://blog-backend-5tkj.onrender.com/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, email, password }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setMessage(data.message || "Registration successful! You can now log in.");
        setIsSuccess(true);
      } else {
        setMessage(data.message || "Registration failed. Please try again.");
        setIsSuccess(false);
      }
    } catch (error) {
      console.error("Error during registration:", error);
      setMessage("An error occurred. Please try again later.");
      setIsSuccess(false);
    }
  }

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={register}>
        <h1 className="register-title">Register</h1>

        <input
          className="input-field1"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(ev) => setUsername(ev.target.value)}
          required
        />

        <input
          className="input-field1"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(ev) => setEmail(ev.target.value)}
          required
        />

        <input
          className="input-field1"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(ev) => setPassword(ev.target.value)}
          required
        />

        <button className="register-btn" type="submit">
          Sign Up
        </button>

        {message && (
          <p className={`message ${isSuccess ? "success" : "error"}`}>
            {message}
          </p>
        )}

        <p className="login-redirect">
          Already have an account?{" "}
          <Link className="login-link" to="/login">
            Sign In
          </Link>
        </p>
      </form>
    </div>
  );
}
