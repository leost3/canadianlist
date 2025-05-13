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
    const response = await fetch(`http://localhost:8080/api/migrations`);
    expect(response.status).toBe(200);
    const responseBody = await response.json();
    expect(Array.isArray(responseBody)).toBe(true);
    expect(responseBody.length).toBeGreaterThan(0);
  });
});
