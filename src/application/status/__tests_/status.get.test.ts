require('dotenv').config()

describe('tests end points /status', () => {
  test('returns 200',async  () => {
    const response = await fetch(`http://localhost:8080/api/status`);
    expect(response.status).toBe(200)
  })
})