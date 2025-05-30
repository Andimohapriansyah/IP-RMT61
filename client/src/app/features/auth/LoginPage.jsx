import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login, setCredentials } from "./authSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { GoogleLogin } from "@react-oauth/google";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const resultAction = await dispatch(login({ email, password }));
    if (login.fulfilled.match(resultAction)) {
      navigate("/");
    }
    // If login fails, error will be shown from Redux state
  };

  // Google login handler
  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const idToken = credentialResponse.credential;
      const res = await axios.post("http://localhost:3000/api/auth/google", {
        idToken,
      });
      // Save token to Redux and localStorage
      dispatch(
        setCredentials({
          token: res.data.token,
          user: { email: res.data.email },
        })
      );
      localStorage.setItem("token", res.data.token);
      navigate("/");
    } catch (err) {
      alert("Google login failed");
    }
  };

  return (
    <div className="form-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>Email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <label>Password</label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
          required
        />
        <button type="submit" disabled={status === "loading"}>
          Login
        </button>
      </form>
      <div style={{ margin: "1.5rem 0", textAlign: "center" }}>
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={() => alert("Google Sign In Failed")}
          width="100%"
          shape="pill"
          theme="filled_black"
        />
        <div
          style={{ fontSize: "0.95rem", color: "#a67c52", marginTop: "0.5rem" }}
        >
          Or sign in with Google
        </div>
      </div>
      {error && <div className="error">{error}</div>}
    </div>
  );
}
