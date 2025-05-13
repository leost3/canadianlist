import { orquestrator } from "src/application/__utils__/orquestrator";
import { query } from "src/infrastructure/database";

import dotenv from 'dotenv';
dotenv.config();
const cleanDb = () => query("drop schema public cascade; create schema public")

describe("tests end points /migrations", () => {
  beforeAll(async () => {
    await orquestrator();
    await cleanDb();
  });
  test("GET to /api/migrations returns 200", async () => {
    const response1 = await fetch(`http://localhost:8080/api/migrations`, {
      method: "POST",
    });
    expect(response1.status).toBe(201);
    const response1Body = await response1.json();
    expect(Array.isArray(response1Body)).toBe(true);
    expect(response1Body.length).toBeGreaterThan(0);
    const response2 = await fetch(`http://localhost:8080/api/migrations`, {
      method: "POST",
    });
    expect(response2.status).toBe(200);
    const response2Body = await response2.json();
    expect(Array.isArray(response2Body)).toBe(true);
    expect(response2Body.length).toBe(0);
  });
});
