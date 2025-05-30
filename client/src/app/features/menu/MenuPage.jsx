import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMenu } from "./menuSlice";
import { useNavigate } from "react-router-dom";

// Dummy data for classy bakery menu
const dummyMenus = [
  {
    id: 1,
    name: "Classic Sourdough",
    description: "Handcrafted sourdough with a crispy crust and soft crumb.",
    price: 45000,
    image:
      "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=600&q=80",
    badge: "Best Seller",
  },
  {
    id: 2,
    name: "Chocolate Croissant",
    description: "Flaky croissant filled with premium Belgian chocolate.",
    price: 32000,
    image:
      "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=600&q=80",
    badge: "New",
  },
  {
    id: 3,
    name: "Red Velvet Cake",
    description: "Moist red velvet cake with cream cheese frosting.",
    price: 60000,
    image:
      "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=600&q=80",
    badge: "Signature",
  },
  {
    id: 4,
    name: "Almond Danish",
    description: "Buttery danish topped with roasted almonds and icing.",
    price: 35000,
    image:
      "https://images.unsplash.com/photo-1464306076886-debca5e8a6b0?auto=format&fit=crop&w=600&q=80",
    badge: "",
  },
  {
    id: 5,
    name: "Lemon Tart",
    description: "Tangy lemon curd in a crisp, buttery tart shell.",
    price: 38000,
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80",
    badge: "",
  },
  {
    id: 6,
    name: "Opera Cake",
    description: "Elegant French cake with coffee, chocolate, and almond.",
    price: 70000,
    image:
      "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=600&q=80",
    badge: "Premium",
  },
  {
    id: 7,
    name: "Cinnamon Roll",
    description: "Soft roll with cinnamon sugar and cream cheese glaze.",
    price: 30000,
    image:
      "https://images.unsplash.com/photo-1464306076886-debca5e8a6b0?auto=format&fit=crop&w=600&q=80",
    badge: "",
  },
  {
    id: 8,
    name: "Strawberry Shortcake",
    description: "Light sponge cake layered with cream and fresh strawberries.",
    price: 55000,
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80",
    badge: "Seasonal",
  },
];

const menus = [
  {
    id: 1,
    name: "Sourdough Bread",
    description: "Classic crusty sourdough with a tangy flavor.",
    price: 45000,
    image:
      "https://images.unsplash.com/photo-1502741338009-cac2772e18bc?auto=format&fit=crop&w=600&q=80", // Sourdough bread
    badge: "Best Seller",
  },
  {
    id: 2,
    name: "Chocolate Croissant",
    description: "Flaky pastry filled with rich chocolate.",
    price: 32000,
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80", // Chocolate croissant
    badge: "New",
  },
  {
    id: 3,
    name: "Strawberry Tart",
    description: "Buttery crust with creamy filling and fresh strawberries.",
    price: 38000,
    image:
      "https://images.unsplash.com/photo-1505250469679-203ad9ced0cb?auto=format&fit=crop&w=600&q=80", // Strawberry tart
    badge: "Seasonal",
  },
  {
    id: 4,
    name: "Cinnamon Roll",
    description: "Soft roll with cinnamon sugar and vanilla glaze.",
    price: 29000,
    image:
      "https://images.unsplash.com/photo-1464306076886-debca5e8a6b0?auto=format&fit=crop&w=600&q=80", // Cinnamon roll
    badge: "",
  },
  {
    id: 5,
    name: "Lemon Cheesecake",
    description: "Creamy cheesecake with a zesty lemon twist.",
    price: 42000,
    image:
      "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=600&q=80", // Lemon cheesecake
    badge: "",
  },
  {
    id: 6,
    name: "French Baguette",
    description: "Traditional French baguette, perfect for sandwiches.",
    price: 25000,
    image:
      "https://images.unsplash.com/photo-1506368083636-6defb67639f0?auto=format&fit=crop&w=600&q=80", // French baguette
    badge: "",
  },
  {
    id: 7,
    name: "Opera Cake",
    description: "Elegant French cake with coffee, chocolate, and almond.",
    price: 70000,
    image:
      "https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=600&q=80", // Opera cake
    badge: "Premium",
  },
  {
    id: 8,
    name: "Strawberry Shortcake",
    description: "Light sponge cake layered with cream and fresh strawberries.",
    price: 55000,
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80", // Strawberry shortcake
    badge: "",
  },
];

export default function MenuPage() {
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.menu);
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();

  // useEffect(() => {
  //   dispatch(fetchMenu());
  // }, [dispatch]);

  if (status === "loading") return <div>Loading...</div>;

  return (
    <div>
      <h2
        style={{
          textAlign: "center",
          fontFamily: "'Playfair Display', serif",
          color: "#a67c52",
          marginTop: "2rem",
        }}
      >
        Our Menu
      </h2>
      <div className="menu-list">
        {menus.map((menu) => (
          <div className="menu-card" key={menu.id}>
            <img src={menu.image} alt={menu.name} />
            {menu.badge && <span className="badge">{menu.badge}</span>}
            <h3>{menu.name}</h3>
            <p>{menu.description}</p>
            <span className="price">Rp {menu.price.toLocaleString()}</span>
            <button
              onClick={() => navigate(`/orders?menuId=${menu.id}`)}
              style={{
                backgroundColor: "#a67c52",
                color: "white",
                border: "none",
                padding: "0.5rem 1rem",
                borderRadius: "0.25rem",
                cursor: "pointer",
              }}
            >
              Order
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
