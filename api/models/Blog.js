const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    blogTitle: { type: String, required: true },
    imagePath: String,
    blogDescription: String,
    blogData: { type: String, required: true },
  },
  { timestamps: true }
);
const BlogModel = mongoose.model("Blog", blogSchema);
module.exports = BlogModel;
