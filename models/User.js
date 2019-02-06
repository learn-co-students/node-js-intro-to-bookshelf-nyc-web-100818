const bookshelf = require("./bookshelf");
require("./Post");
require("./Comment");

module.exports = bookshelf.model("User", {
  tableName: "users",
  posts: function() {
    return this.hasMany("Posts", "author");
  },
  comments: function() {
    return this.hasMany("Comments");
  }
});
