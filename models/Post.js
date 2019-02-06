const bookshelf = require("./bookshelf");
require("./User");
require("./Comment");

module.exports = bookshelf.model("Posts", {
  tableName: "posts",
  author: function() {
    return this.belongsTo("User", "author");
  },
  comments: function() {
    return this.hasMany("Comments");
  }
});
