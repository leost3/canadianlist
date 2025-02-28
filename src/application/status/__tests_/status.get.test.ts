describe('tests end points /status', () => {
  test('returns 200',async  () => {
    const response = await fetch("http://localhost:3000/api/status");
    expect(response.status).toBe(200)
  })
})