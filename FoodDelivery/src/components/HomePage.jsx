import React from "react";

const dummyFoods = [
  {
    id: 1,
    name: "Margherita Pizza",
    description: "Classic delight with 100% real mozzarella cheese.",
    price: 89900,
    image:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 2,
    name: "Veggie Burger",
    description: "Loaded with fresh veggies and a tangy sauce.",
    price: 64900,
    image:
      "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=400&q=80",
  },
  {
    id: 3,
    name: "Chicken Biryani",
    description: "Aromatic basmati rice with tender chicken pieces.",
    price: 105000,
    image:
      "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80",
  },
];

function HomePage() {
  return (
    <div style={{ maxWidth: 900, margin: "40px auto", padding: 24 }}>
      <header style={{ textAlign: "center", marginBottom: 32 }}>
        <h1
          style={{
            fontFamily: "Montserrat, Arial, sans-serif",
            fontWeight: 700,
            color: "#ff914d",
          }}
        >
          {" "}
          🍔 Cookies Boendakoe
        </h1>
        <p style={{ color: "#555", fontSize: 18 }}>
          Welcome! Choose your favorite meal and enjoy fast delivery.
        </p>
      </header>
      <div
        style={{
          display: "flex",
          gap: 24,
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {dummyFoods.map((food) => (
          <div
            key={food.id}
            style={{
              background: "#fff",
              borderRadius: 16,
              boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
              width: 260,
              padding: 16,
              textAlign: "center",
            }}
          >
            <img
              src={food.image}
              alt={food.name}
              style={{
                width: "100%",
                height: 140,
                objectFit: "cover",
                borderRadius: 12,
              }}
            />
            <h3
              style={{
                margin: "16px 0 8px 0",
                color: "#333",
              }}
            >
              {food.name}
            </h3>
            <p
              style={{
                color: "#777",
                fontSize: 15,
              }}
            >
              {food.description}
            </p>
            <div
              style={{
                marginTop: 12,
                fontWeight: 700,
                color: "#ff914d",
              }}
            >
              {food.price.toLocaleString("id-ID", {
                style: "currency",
                currency: "IDR",
                minimumFractionDigits: 0,
              })}
            </div>
            <button
              style={{
                marginTop: 16,
                padding: "8px 20px",
                background: "#ff914d",
                color: "#fff",
                border: "none",
                borderRadius: 8,
                cursor: "pointer",
                fontWeight: 600,
              }}
            >
              Order Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
