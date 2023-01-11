import * as mongoose from "mongoose";
import Post from "./Post";
import { IComment } from "../interfaces/CommentInterface";

const commentSchema = new mongoose.Schema({
  created_at: { type: Date, required: true },
  updated_at: { type: Date, required: true },
  content: { type: String, required: true },
});

commentSchema.post("remove", async (doc) => {
  const comment = doc as any;
  const post = await Post.findOne({ comments: { $in: comment._id } });
  await Post.findOneAndUpdate({ _id: post._id }, { $pull: comment._id });
});

const Comment = mongoose.model<IComment>("comments", commentSchema);

export default Comment;
