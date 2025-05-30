jest.mock("midtrans-client", () => {
  return {
    Snap: jest.fn().mockImplementation(() => ({
      createTransaction: jest.fn().mockResolvedValue({ token: "dummy-token" }),
    })),
  };
});

const request = require("supertest");
const app = require("../server");
const { sequelize, MenuItem } = require("../models");

let token;
let menuItemId;

beforeAll(async () => {
  // Register and login a user
  await request(app).post("/api/auth/register").send({
    username: "Order Tester",
    email: "ordertester@example.com",
    password: "password123",
  });
  const res = await request(app).post("/api/auth/login").send({
    email: "ordertester@example.com",
    password: "password123",
  });
  token = res.body.token;

  // Ensure at least one menu item exists
  const menu = await MenuItem.create({
    name: "Test Menu",
    price: 10000,
    imageUrl: "http://example.com/image.jpg",
    description: "Test menu item",
  });
  menuItemId = menu.id;
});

describe("POST /api/orders", () => {
  it("should create an order and return a midtrans token", async () => {
    const res = await request(app)
      .post("/api/orders")
      .set("Authorization", `Bearer ${token}`)
      .send({
        items: [{ menuItemId, quantity: 1, subtotal: 10000 }],
        orderType: "langsung",
      });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("token");
    expect(res.body).toHaveProperty("orderId");
  });
});

describe("GET /api/orders", () => {
  it("should return the user's orders", async () => {
    const res = await request(app)
      .get("/api/orders")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});

describe("DELETE /api/orders/:id", () => {
  it("should cancel an unpaid order", async () => {
    // Create an order first
    const orderRes = await request(app)
      .post("/api/orders")
      .set("Authorization", `Bearer ${token}`)
      .send({
        items: [{ menuItemId, quantity: 1, subtotal: 10000 }],
        orderType: "langsung",
      });
    const orderId = orderRes.body.orderId;
    const res = await request(app)
      .delete(`/api/orders/${orderId}`)
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("message");
  });
});

afterAll(async () => {
  await sequelize.close();
});
