import { orquestrator } from "src/application/__utils__/orquestrator"

require('dotenv').config()

describe('tests end points /status', () => {
  beforeAll(async () => {
    await orquestrator()
  })
  test('returns 200', async () => {
    const response = await fetch(`http://localhost:8080/api/status`);
    expect(response.status).toBe(200)
    const responseBody = await response.json()
    expect(responseBody).not.toBeNull()
    expect(typeof responseBody.updatedAt).toBe("string")

    expect(responseBody.dependencies.database.version).toBe("16.0")
    expect(responseBody.dependencies.database.maxConnections).toBe("100")
    expect(responseBody.dependencies.database.openConnections).toBe(1)


  })
})