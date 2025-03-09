import { query } from "src/infrastructure/database"

require('dotenv').config()
describe('tests end points /migrations', () => {

  const cleanDb = () => query("drop schema public cascade; create schema public")
  beforeAll(cleanDb)

  test('GET to /api/migrations returns 200', async () => {

    const response = await fetch(`http://localhost:8080/api/migrations`);
    expect(response.status).toBe(200)
    const responseBody = await response.json()
    expect(Array.isArray(responseBody)).toBe(true)
    expect((responseBody.length)).toBeGreaterThan(0)
  })
})