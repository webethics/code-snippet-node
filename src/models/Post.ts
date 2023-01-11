import * as mongoose from "mongoose";
import Comment from "./Comment";
import { IPost } from "../interfaces/PostInterface";

const postSchema = new mongoose.Schema({
  user_id: { type: mongoose.Types.ObjectId, required: true },
  created_at: { type: Date, required: true },
  updated_at: { type: Date, required: true },
  content: { type: String, required: true },
  comments: [{ type: mongoose.Types.ObjectId, ref: "comments" }],
});

postSchema.virtual("commentCount").get(function () {
  return this.comments.length;
});

postSchema.post("remove", async (doc) => {
  for (let id of (doc as any).comments) {
    await Comment.findByIdAndRemove(id);
  }
});

const Post = mongoose.model<IPost>("posts", postSchema);

export default Post;
