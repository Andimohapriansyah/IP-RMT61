import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchMenuAI } from "./menuSlice";

export default function MenuSearchAI() {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const { searchResults, status } = useSelector((state) => state.menu);

  const handleSearch = () => {
    dispatch(searchMenuAI(query));
  };

  return (
    <div className="section">
      <h2>Search Menu with AI</h2>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Describe what you want..."
        style={{
          width: "80%",
          padding: "0.7rem",
          borderRadius: "8px",
          border: "1.5px solid #e0c9a6",
        }}
      />
      <button onClick={handleSearch} style={{ marginLeft: "1rem" }}>
        Search
      </button>
      <ul className="menu-list">
        {searchResults.map((menu) => (
          <li className="menu-card" key={menu.id}>
            <h3>{menu.name}</h3>
            <p>{menu.price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
