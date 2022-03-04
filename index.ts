import express  from "express";
import cors from 'cors'
import Database from "better-sqlite3";

const app= express();
app.use(cors())
app.use(express.json())

const db = new Database('./data.db', {
    verbose: console.log
})
const getUsers = db.prepare(`
SELECT * FROM users;
`)

const createUsers = db.prepare(`
INSERT INTO users(name, email, password, displayName) VALUES (?, ?, ?, ?);
`)

const getUserById = db.prepare(`
SELECT * FROM users WHERE id=?;
`)

// app.get('/post', (req, res) => {
//  const users = getUsers.all()
//  for(const user of users){
//     getUsers.run()
//  }
// })

app.listen(4000, () => {
    console.log(`Running on : http://localhost:4000`)
})