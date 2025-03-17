import request from "supertest";

import app from "../app.ts";

describe('Authentication',() => {
  test('login',async () => {
    const res = await request(app).post("/api/login");

  })
})

describe("Test app.ts", () => {
  test("Catch-all route", async () => {
    const res = await request(app).post("/api/post");
    expect(res.body).toEqual({ message: "Allo! Catch-all route." });
  });
});