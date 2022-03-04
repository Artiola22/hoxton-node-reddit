import express  from "express";
import cors from 'cors'
import Database from "better-sqlite3";

const app= express();
app.use(cors())
app.use(express.json())

const db = new Database('./data.db', {
    verbose: console.log
})
//Welcome message
app.get('/', (req, res) => {
    res.send(` <h1>Welcome to Reddit API</h1>
    <p>Here are all the <b>endpoints</b> you need to work with.. </p>
    `)
})

//User endpoint
const createUser = db.prepare(`
INSERT INTO users(name, email, password, displayName) VALUES (?, ?, ?, ?);
`)

const getUsers = db.prepare(`
SELECT * FROM users;
`)

const getUserById = db.prepare(`
SELECT * FROM users WHERE id=?;
`)

// app.get('/users')
// app.get('/posts')
// app.post('/posts')
// app.delete('/posts/:id')
// app.get('/subreddits')

app.post('/sign-in', (req, res ) => {
    // to sign in a user needs to send us their email and password
    const {email, password} = req.body
    // check if the email exists
  // check if the password matches
  // give them back the user if they match
  // give them back an error if they don't
  res.send({ error: 'Noop'})
})

app.post('/users', (req, res ) => {
    const{ name, email, password, displayName } = req.body
    const info = createUser.run(name, email, password, displayName)
    const user = getUserById.get(info.lastInsertRowid)
    res.send(user)
})

// const createSubreddit = db.prepare(`
// INSERT INTO subreddit(description, background) VALUES (?, ?);
// `)
// const getSubreddits = db.prepare(`
// SELECT * FROM subreddits;
// `)

// const getSubredditById = db.prepare(`
// SELECT * FROM subreddits WHERE id=?;
// `)
// app.post('/subreddits', (req, res) => {
//     const { description, background} = req.body
//     const info = createSubreddit.run(description , background)
//     const subreddit = getSubredditById.get(info.lastInsertRowid)
//     res.send(subreddit)
// })
// app.get('/post', (req, res) => {
//  const users = getUsers.all()
//  for(const user of users){
//     getUsers.run()
//  }
// })

app.listen(4000, () => {
    console.log(`Running on : http://localhost:4000`)
})