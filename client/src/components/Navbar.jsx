import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../app/features/auth/authSlice";

export default function Navbar() {
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();

  return (
    <nav>
      <span className="logo">UNION</span>
      <Link to="/">Home</Link>
      <Link to="/menu">Menu</Link>
      <Link to="/menu/search">AI Search</Link>
      {token ? (
        <>
          <Link to="/orders">Orders</Link>
          <Link to="/history">History</Link>
          <button onClick={() => dispatch(logout())}>Logout</button>
        </>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      )}
    </nav>
  );
}
