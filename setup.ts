import Database from "better-sqlite3";

const db = new Database("./data.db", {
  verbose: console.log,
});

db.exec(`
DROP TABLE IF EXISTS userSubreddits;
DROP TABLE IF EXISTS comments;
DROP TABLE IF EXISTS postsLikes;
DROP TABLE IF EXISTS commentUpvotes;
DROP TABLE IF EXISTS commentDownvotes;
DROP TABLE IF EXISTS posts;
DROP TABLE IF EXISTS subreddits;
DROP TABLE IF EXISTS users;

CREATE TABLE users(
    id INTEGER,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    password TEXT NOT NULL,
    displayName TEXT NOT NULL,
    PRIMARY KEY(id),
    CHECK(name <> ''),
    CHECK(email <> ''),
    CHECK(password <> ''),
    CHECK(displayName <> '')

  );

  CREATE TABLE posts(
    id INTEGER,
    userId INTEGER,
    subredditId INTEGER,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    createdAt TEXT NOT NULL,
    PRIMARY KEY(id),
    FOREIGN KEY (userId) REFERENCES users(id),
    FOREIGN KEY (subredditId) REFERENCES subreddits(id)

  );

  CREATE TABLE comments (
    id INTEGER,
    postId INTEGER,
    userId INTEGER,
    content TEXT NOT NULL,
    upvotes INTEGER,
    downvotes INTEGER,
    PRIMARY KEY (id),
    FOREIGN KEY (postId) REFERENCES posts(id),
    FOREIGN KEY (userId) REFERENCES users(id)
  );
   CREATE TABLE postsLikes(
    id INTEGER,
    userId INTEGER,
    postId INTEGER,
    PRIMARY KEY(id)
   );

   CREATE TABLE subreddits(
    id INTEGER,
    description TEXT NOT NULL,
    background TEXT NOT NULL,
    PRIMARY KEY(id)
   );

   CREATE TABLE userSubreddits(
    id INTEGER,
    userId INTEGER,
    subredditId INTEGER,
    dateJoined TEXT,
    PRIMARY KEY(id)
    FOREIGN KEY (userId) REFERENCES users(id)
   );

   CREATE TABLE commentUpvotes(
    id INTEGER,
    userId INTEGER,
    commentId INTEGER,
    PRIMARY KEY (id),
    FOREIGN KEY (userId) REFERENCES users(id),
    FOREIGN KEY (commentId) REFERENCES comments(id)
   );

  //  CREATE TABLE commentDownvotes(
  //   id INTEGER,
  //   userId INTEGER,
  //   commentId INTEGER,
  //   PRIMARY KEY (id),
  //   FOREIGN KEY (userId) REFERENCES users(id),
  //   FOREIGN KEY (commentId) REFERENCES comments(id)
  //  );


`);

const users = [
  {
    name: "Artiola",
    email: "artiola@email.com",
    password: "artiola1",
    displayName: "Artiola",
  },
  {
    name: "Arita",
    email: "arita@email.com",
    password: "arita1",
    displayName: "Arita",
  },
  {
    name: "Desintila",
    email: "desintila@email.com",
    password: "desintila1",
    displayName: "Desintila",
  },
  {
    name: "Ilir",
    email: "ilir@email.com",
    password: "ilir1",
    displayName: "Ilir",
  },
];
const createUsers = db.prepare(`
INSERT INTO users(name, email, password, displayName) VALUES (?, ?, ?, ?);
`);
for (const user of users) {
  createUsers.run(user.name, user.email, user.password, user.displayName);
}

const subreddits = [
  {
    description: "A cat",
    background: "Cool cat",
  },
  {
    description: "A dog",
    background: "Cool dog",
  },
  {
    description: "A mouse",
    background: "Cool mouse",
  },
];

const createSubreddits = db.prepare(`
INSERT INTO subreddits(description, background) VALUES (?, ?);
`);
for (const subreddit of subreddits) {
  createSubreddits.run(subreddit.description, subreddit.background);
}

const posts = [
  {
    userId: 1,
    subredditId: 1,
    title: "Cool",
    content: "So cool this museum!",
    createdAt: "01/01/2022",
  },
  {
    userId: 2,
    subredditId: 1,
    title: "Nice",
    content: "So Nice this museum!",
    createdAt: "02/01/2022",
  },
];

const createPosts = db.prepare(`
INSERT INTO posts( userId, subredditId, title, content, createdAt) VALUES (?, ?, ? , ?,?);
`);
for (const post of posts) {
  createPosts.run(
    post.userId,
    post.subredditId,
    post.title,
    post.content,
    post.createdAt
  );
}

const comments = [
  {
    postId: 1,
    userId: 1,
    content: "Looks great!",
    upvotes: 1,
    downvotes: 0,
  },
  {
    postId: 2,
    userId: 1,
    content: "Looks nice!",
    upvotes: 1,
    downvotes: 1,
  },
  {
    postId: 1,
    userId: 2,
    content: "What is this?",
    upvotes: 0,
    downvotes: 0,
  },
];

const createComments = db.prepare(`
INSERT INTO comments( postId, userId, content, upvotes, downvotes )VALUES (?, ?, ?, ?, ?);
`);

for (const comment of comments) {
  createComments.run(
    comment.postId,
    comment.userId,
    comment.content,
    comment.upvotes,
    comment.downvotes
  );
}

const postsLikes = [
  {
    userId: 1,
    postId: 1,
  },
  {
    userId: 1,
    postId: 2,
  },
  {
    userId: 2,
    postId: 1,
  },
  {
    userId: 2,
    postId: 2,
  },
];
const createPostsLikes = db.prepare(`
INSERT INTO postsLikes( userId, postId) VALUES (?, ?);
`);

for (const postsLike of postsLikes) {
  createPostsLikes.run(postsLike.userId, postsLike.postId);
}

const userSubreddits = [
  {
    userId: 1,
    subredditId: 1,
    dateJoined: "01/02/2022",
  },
  {
    userId: 2,
    subredditId: 1,
    dateJoined: "02/02/2022",
  },
  {
    userId: 3,
    subredditId: 2,
    dateJoined: "01/03/2022",
  },{
    userId: 3,
    subredditId: 4,
    dateJoined: "01/02/2022",
  },{
    userId: 2,
    subredditId: 2,
    dateJoined: "11/02/2022",
  },{
    userId: 1,
    subredditId: 3,
    dateJoined: "01/02/2022",
  },{
    userId: 1,
    subredditId: 4,
    dateJoined: "01/02/2021",
  }
];

const createUserSubreddits = db.prepare(`
INSERT INTO userSubreddits( userId, subredditId, dateJoined) VALUES (?, ?, ?);
`)

for(const userSubreddit of userSubreddits){
    createUserSubreddits.run(userSubreddit.userId, userSubreddit.subredditId, userSubreddit.dateJoined);
}

const commentUpvotes = [
    {
        userId: 1,
        commentId: 1
    },
    {
        userId: 1,
        commentId: 2
    },
    {
        userId: 1,
        commentId: 3
    },
    {
        userId: 2,
        commentId: 1
    },
    {
        userId: 2,
        commentId: 2
    },
    {
        userId: 3,
        commentId: 2
    },
    {
        userId: 4,
        commentId: 2
    }
];
const createCommentUpvotes = db.prepare(`
INSERT INTO commentUpvotes(userId, commentId) VALUES (?, ?);
`)
for(const commentUpvote of commentUpvotes){
    createCommentUpvotes.run(commentUpvote.userId, commentUpvote.commentId)
}

// const commentDownvotes = [
//     {
//         userId: 1,
//         commentId: 1
//     },
//     {
//         userId: 1,
//         commentId: 2
//     },
//     {
//         userId: 1,
//         commentId: 3
//     },
//     {
//         userId: 2,
//         commentId: 1
//     },
//     {
//         userId: 2,
//         commentId: 2
//     },
//     {
//         userId: 3,
//         commentId: 2
//     },
//     {
//         userId: 4,
//         commentId: 2
//     }
// ];
// const createCommentDownvotes = db.prepare(`
// INSERT INTO commentDownvotes(userId, commentId) VALUES (?, ?);
// `)
// for(const commentDownvote of commentDownvotes){
//     createCommentDownvotes.run(commentDownvote.userId, commentDownvote.commentId)
// }