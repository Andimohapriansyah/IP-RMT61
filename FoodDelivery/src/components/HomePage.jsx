import React from "react";

const dummyFoods = [
  {
    id: 1,
    name: "Chocolate Lava Cake",
    description: "Warm chocolate cake with a gooey molten center.",
    price: 45000,
    image:
      "https://images.pexels.com/photos/533325/pexels-photo-533325.jpeg?auto=compress&w=400&h=300&fit=crop",
  },
  {
    id: 2,
    name: "Strawberry Shortcake",
    description: "Soft sponge cake layered with fresh cream and strawberries.",
    price: 55000,
    image:
      "https://images.pexels.com/photos/704971/pexels-photo-704971.jpeg?auto=compress&w=400&h=300&fit=crop",
  },
  {
    id: 3,
    name: "Classic Croissant",
    description: "Flaky, buttery croissant baked fresh every morning.",
    price: 25000,
    image:
      "https://images.pexels.com/photos/461382/pexels-photo-461382.jpeg?auto=compress&w=400&h=300&fit=crop",
  },
  {
    id: 4,
    name: "Red Velvet Cupcake",
    description: "Moist red velvet cupcake topped with cream cheese frosting.",
    price: 30000,
    image:
      "https://images.pexels.com/photos/14105/pexels-photo-14105.jpeg?auto=compress&w=400&h=300&fit=crop",
  },
];

function HomePage() {
  return (
    <div style={{ maxWidth: 1000, margin: "40px auto", padding: 24 }}>
      <header style={{ textAlign: "center", marginBottom: 32 }}>
        <h1
          style={{
            fontFamily: "Montserrat, Arial, sans-serif",
            fontWeight: 700,
            color: "#ff914d",
          }}
        >
          🧁 Boendakoe Bakery & Cakes
        </h1>
        <p style={{ color: "#555", fontSize: 18 }}>
          Freshly baked cakes, pastries, and breads delivered to your door!{" "}
          <br />
          <span style={{ color: "#ff914d", fontWeight: 600 }}>
            Order now and enjoy fast delivery 🍰
          </span>
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
              Order Delivery
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
