import "dotenv/config";

import { drizzle } from "drizzle-orm/node-postgres"; // drizzle is used to create a drizzle instance
import { Client } from "pg"; //client is used to connect to the database
import * as schema from "./schema";  //import the schema file

export const client = new Client({
  connectionString: process.env.DATABASE_URL as string,
});

const main = async () => {
  await client.connect(); //connect to the database
};

main();

const db = drizzle(client, { schema, logger: true }); //create a drizzle instance

export default db;
