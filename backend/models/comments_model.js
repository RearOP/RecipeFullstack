const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  recipe: { type: mongoose.Schema.Types.ObjectId, ref: "recipe" },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  text: String,
  createdAt: { type: Date, default: Date.now },
});
module.exports = mongoose.model("commments", CommentSchema);
