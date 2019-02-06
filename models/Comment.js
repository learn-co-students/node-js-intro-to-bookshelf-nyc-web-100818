const bookshelf = require("./bookshelf");
require("./User");
require("./Post");

module.exports = bookshelf.model("Comments", {
  tableName: "comments",
  hasTimestamps: true,
  user: function() {
    return this.belongsTo("User");
  },
  post: function() {
    return this.belongsTo("Posts");
  }
});
