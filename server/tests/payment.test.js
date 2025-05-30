const request = require("supertest");
const app = require("../server");

describe("POST /api/payment/notification", () => {
  it("should update order status based on notification", async () => {
    const notification = {
      order_id: 1,
      transaction_status: "settlement",
    };
    const res = await request(app)
      .post("/api/payment/notification")
      .send(notification);
    expect(res.statusCode).toBe(200);
  });
});
