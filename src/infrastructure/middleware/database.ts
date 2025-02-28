import pg from 'pg'
const { Client } = pg



export const query = async (queryObject: any) => {
  const client = new Client({
    user: 'postgres',
    password: 'local_password',
    host: 'localhost',
    port: 5432,
    database:'postgres',
  })
  await client.connect()
  const result = await client.query(queryObject)
  await client.end()
  return result
}