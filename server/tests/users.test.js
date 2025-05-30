const request = require("supertest");
const app = require("../server");
const { sequelize } = require("../models");

beforeEach(async () => {
  await sequelize.models.User.destroy({ where: {} });
});

describe("POST /api/auth/register", () => {
  it("should create a new user with valid data", async () => {
    const res = await request(app)
      .post("/api/auth/register")
      .send({
        username: "John Doe",
        email: `john${Date.now()}@example.com`,
        password: "password123",
      });
    expect(res.statusCode).toBe(201);
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

describe("POST /api/auth/login", () => {
  beforeEach(async () => {
    await request(app).post("/api/auth/register").send({
      username: "Jane Doe",
      email: "jane@example.com",
      password: "password123",
    });
  });

  it("should login with correct credentials", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: "jane@example.com",
      password: "password123",
    });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("token");
  });

  it("should fail with wrong password", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: "jane@example.com",
      password: "wrongpassword",
    });
    expect(res.statusCode).toBe(401);
    expect(res.body).toHaveProperty("error");
  });
});

afterAll(async () => {
  await sequelize.close();
});
