import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';
import pg from 'pg';
const { Client } = pg

const config = dotenv.config();
dotenvExpand.expand(config);

export const query = async (queryObject: any) => {
  let client: pg.Client | undefined;
  try {
    client = await getNewClient()
    const result = await client.query(queryObject)
    return result
  } catch (e) {
    console.error(e);
    throw new Error(`error: ${e}`)
  } finally {
    if (client) {
      await client.end()
    }
  }
}


export async function getNewClient(): Promise<pg.Client> {
  const client = new Client({
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    host: process.env.POSTGRES_HOST,
    port: parseInt(process.env.POSTGRES_PORT ?? '5432'),
    database: process.env.POSTGRES_DB,
    ssl: process.env.NODE_ENV === 'production' ? true : false
  })

  await client.connect()
  return client
}