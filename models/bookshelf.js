const config = require("../knexfile.js");
const knex = require("knex")(config[process.env.NODE_ENV]);
const bookshelf = require("bookshelf")(knex);

bookshelf.plugin("registry");

// create a single instance for all models to reference
module.exports = bookshelf;
