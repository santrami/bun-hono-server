import { Hono } from "hono";
import { serveStatic } from 'hono/serve-static.bun';
import { Database } from "bun:sqlite";

const db= new Database('mydb.sqlite');

db.run(
  "CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT, username TEXT, password TEXT)",
);

const port = parseInt(process.env.PORT) || 3000;

const app = new Hono();

app.use('/favicon.ico', serveStatic({ path: './public/favicon.ico' }));

app.get("/", (c) => {
  return c.json({ message: "Hello World again and again!" });
});

console.log(`Running at http://localhost:${port}`);

export default {
  port,
  fetch: app.fetch
};
