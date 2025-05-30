jest.mock("../services/gemini", () =>
  jest.fn(() => Promise.resolve(["ayam goreng", "nasi goreng"]))
);

const request = require("supertest");
const app = require("../server");

describe("POST /api/menu/search", () => {
  it("should return AI search results", async () => {
    const res = await request(app)
      .post("/api/menu/search")
      .send({ query: "ayam goreng" });
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
