// create tables in order to ensure foreign keys work
exports.up = function(knex, Promise) {
  return knex.schema
    .createTableIfNotExists("users", tbl => {
      tbl.increments("id").primary();
      tbl.string("name");
      tbl.string("username");
      tbl.string("email");
      tbl.timestamps();
    })
    .then(() => {
      knex.schema.createTableIfNotExists("posts", tbl => {
        tbl.increments().primary();
        tbl.string("title");
        tbl.string("body");
        tbl
          .integer("author")
          .references("id")
          .inTable("users");
        tbl.timestamps();
      });
    })
    .then(() => {
      knex.schema.createTableIfNotExists("comments", tbl => {
        tbl.increments().primary();
        tbl.string("body");
        tbl
          .integer("user_id")
          .references("id")
          .inTable("users");
        tbl
          .integer("post_id")
          .references("id")
          .inTable("posts");
        tbl.timestamps();
      });
    });
};

// remove in reverse order
exports.down = function(knex, Promise) {
  return knex.schema
    .dropTableIfExists("comments")
    .dropTableIfExists("posts")
    .dropTableIfExists("users");
};
