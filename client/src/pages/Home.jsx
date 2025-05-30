import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <div className="hero">
        <span>
          Welcome to <b style={{ color: "#d4af7a" }}>UNION Bakery</b>
        </span>
      </div>
      <div
        style={{
          textAlign: "center",
          margin: "2.5rem 0",
          maxWidth: 600,
          marginLeft: "auto",
          marginRight: "auto",
          background: "rgba(255,255,255,0.93)",
          borderRadius: "18px",
          boxShadow: "0 4px 24px rgba(166, 124, 82, 0.13)",
          padding: "2rem 1.5rem",
          border: "1.5px solid #e0c9a6",
        }}
      >
        <h2
          style={{
            fontFamily: "'Playfair Display', serif",
            color: "#a67c52",
            fontSize: "2rem",
            marginBottom: "1rem",
          }}
        >
          Artisanal Breads, Cakes & Pastries
        </h2>
        <p
          style={{
            color: "#6d4c2b",
            fontSize: "1.15rem",
            marginBottom: "2rem",
          }}
        >
          Order your favorite menu, pay securely, and discover new delights with
          our AI-powered search!
        </p>
        <Link to="/menu">
          <button
            style={{
              fontSize: "1.1rem",
              padding: "0.7rem 2.2rem",
              borderRadius: "30px",
              background: "linear-gradient(90deg, #a67c52 60%, #d4af7a 100%)",
              color: "#fff",
              border: "none",
              fontWeight: "bold",
              boxShadow: "0 2px 8px rgba(166, 124, 82, 0.08)",
              cursor: "pointer",
            }}
          >
            Explore Menu
          </button>
        </Link>
      </div>
    </div>
  );
}
