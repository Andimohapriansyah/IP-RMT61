import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register, setCredentials } from "./authSlice";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await dispatch(register({ email, password }));
    navigate("/");
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const idToken = credentialResponse.credential; // Rename to idToken
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/auth/google`,
        { idToken }
      );
      // Save token, update state, redirect, etc.
      localStorage.setItem("token", res.data.token);
      dispatch(
        setCredentials({
          token: res.data.token,
          user: { email: res.data.email },
        })
      );
      navigate("/");
    } catch (err) {
      alert("Google registration failed");
    }
  };

  return (
    <div className="form-container">
      <h2>Register</h2>
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
          Register
        </button>
      </form>
      <div style={{ margin: "1.5rem 0", textAlign: "center" }}>
        <GoogleLogin
          onSuccess={handleGoogleSuccess}
          onError={() => alert("Google Sign Up Failed")}
          width="100%"
          shape="pill"
          theme="filled_black"
        />
        <div
          style={{
            fontSize: "0.95rem",
            color: "#a67c52",
            marginTop: "0.5rem",
          }}
        >
          Or sign up with Google
        </div>
      </div>
      {error && <div className="error">{error}</div>}
    </div>
  );
}
