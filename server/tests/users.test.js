const request = require("supertest");
const app = require("../server");
const { sequelize } = require("../models");

beforeEach(async () => {
  // Clean up Users table before each test to avoid duplicate email errors
  await sequelize.models.User.destroy({ where: {} });
});

describe("POST /api/auth/register", () => {
  it("should create a new user with valid data", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({
        username: "John Doe",
        email: `john${Date.now()}@example.com`, // unique email for each test run
        password: "password123",
      });
    expect(res.statusCode).toBe(201); // Or 200, depending on your implementation
    expect(res.body).toHaveProperty("user");
    expect(res.body).toHaveProperty("token");
  });

  it("should return 400 if email is missing", async () => {
    const res = await request(app).post("/api/auth/register").send({
      username: "John Doe",
      password: "password123",
    });
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty("error");
  });
});

afterAll(async () => {
  await sequelize.close();
});
