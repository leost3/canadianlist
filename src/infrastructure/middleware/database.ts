import pg from 'pg'
const { Client } = pg

require('dotenv').config()


export const query = async (queryObject: any) => {
  const client = new Client({
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    host: process.env.POSTGRES_HOST,
    port: parseInt(process.env.POSTGRES_PORT ?? '5432'),
    database: process.env.POSTGRES_DB,
  })
  try {
    await client.connect()
    const result = await client.query(queryObject)
    return result
  } catch (e) {
    console.error(e);
    throw new Error(`error: ${e}`)
  } finally {
    await client.end()
  }
}