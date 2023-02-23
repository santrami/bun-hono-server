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

app.get("/users", (c) => {
  const stmt = db.query("SELECT * FROM users");
  return c.json({users:stmt.all()});
});

app.post("/user", async (c) => {
  const body=await c.req.parseBody()
  const name = body['name']
  const email = body['email']
  const username = body['username']
  const password = body['password']  
  c.set('name', name)
  c.set('email', email)
  c.set('username', username)
  c.set('password', password)
  const params = ["santiago","santrami@hotmail.com", "santrami", "animando"];
  const sql = "INSERT INTO users (name, email, username, password) VALUES (?,?,?,?)";
  db.run(sql, params);
  

  return c.json({name:name, email:email, username:username, password:password});
})



console.log(`Running at http://localhost:${port}`);

export default {
  port,
  fetch: app.fetch
};