"use strict";

const _ = require("lodash");
const express = require("express");
const bodyParser = require("body-parser");
const config = require("./knexfile.js");

const User = require("./models/User");
const Comments = require("./models/Comment");
const Posts = require("./models/Post");

// Initialize Express.
const app = express();
app.use(bodyParser.json());

// Configure & Initialize Knex.
console.log("Running in environment: " + process.env.NODE_ENV);
const knex = require("knex")(config[process.env.NODE_ENV]);

// This is a good place to start!
app.post("/user", (req, res) => {
  const { body } = req;
  if (typeof body !== "object" || !Object.keys(body).length) {
    return res.sendStatus(400);
  }

  new User(body)
    .save()
    .then(user => {
      return res.status(200).json(user); // should be 201
    })
    .catch(err => {
      console.log(err);
      return res.sendStatus(500);
    });
});

app.get("/user/:id", (req, res) => {
  const { params } = req;

  new User({ id: params.id })
    .fetch()
    .then(user => {
      if (!user) {
        return res.sendStatus(404);
      }
      return res.status(200).json(user);
    })
    .catch(err => {
      console.log(err);
      return res.sendStatus(500);
    });
});

app.post("/post", (req, res) => {
  const { body } = req;
  if (typeof body !== "object" || !Object.keys(body).length) {
    return res.sendStatus(400);
  }

  new Posts(body)
    .save()
    .then(post => {
      return res.status(200).json(post); // should be 201
    })
    .catch(err => {
      console.log(err);
      return res.sendStatus(500);
    });
});

app.get("/post/:id", (req, res) => {
  const { params } = req;

  new Posts({ id: params.id })
    .fetch({ withRelated: ["author", "comments"] })
    .then(post => {
      if (!post) {
        return res.sendStatus(404);
      }
      return res.status(200).json(post);
    })
    .catch(err => {
      console.log(err);
      return res.sendStatus(500);
    });
});

app.get("/posts", (req, res) => {
  Posts.collection()
    .fetch()
    .then(posts => {
      if (!posts) {
        return res.sendStatus(404);
      }
      return res.status(200).json(posts);
    })
    .catch(err => {
      console.log(err);
      return res.sendStatus(500);
    });
});

app.post("/comment", (req, res) => {
  const { body } = req;
  if (typeof body !== "object" || !Object.keys(body).length) {
    return res.sendStatus(400);
  }

  new Comments(body)
    .save()
    .then(comment => {
      return res.status(200).json(comment); // should be 201
    })
    .catch(err => {
      console.log(err);
      return res.sendStatus(500);
    });
});

// Exports for Server hoisting.
const listen = port => {
  return new Promise((resolve, reject) => {
    app.listen(port, () => {
      resolve();
    });
  });
};

// runs our migration every time we start the server
exports.up = justBackend => {
  return knex.migrate
    .latest([process.env.NODE_ENV])
    .then(() => {
      return knex.migrate.currentVersion();
    })
    .then(val => {
      console.log("Done running latest migration:", val);
      return listen(3000);
    })
    .then(() => {
      console.log("Listening on port 3000...");
    });
};

// exports for tests
exports.User = User;
exports.Comments = Comments;
exports.Posts = Posts;
