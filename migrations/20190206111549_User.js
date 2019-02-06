exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists("users").then(tbl => {
    tbl.increments().primary();
    tbl.text("name");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists("users");
};
