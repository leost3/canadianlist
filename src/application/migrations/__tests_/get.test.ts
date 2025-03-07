require('dotenv').config()
describe('tests end points /migrations', () => {
  test('GET to /api/migrations returns 200', async () => {
    const response = await fetch(`http://localhost:8080/api/migrations`);
    expect(response.status).toBe(200)
    const responseBody = await response.json()
    expect(Array.isArray(responseBody)).toBe(true)
  })
})