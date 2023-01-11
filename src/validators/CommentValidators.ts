import { body, param } from "express-validator";
import Post from "../models/Post";
import Comment from "../models/Comment";

export class CommentValidators {
  static addComment() {
    return [
      body("content", "Comment content is required").isString(),
      param("id").custom((id, { req }) => {
        return Post.findById(id).then((post) => {
          if (post) {
            req.post = post;
            return true;
          }
          throw new Error("Post does not exist!");
        });
      }),
    ];
  }
  static editComment() {
    return [body("content", "Content is required").isString()];
  }
  static deleteComment() {
    return [
      param("id").custom((id, { req }) => {
        return Comment.findById(id).then((comment) => {
          if (comment) {
            req.comment = comment;
            return true;
          }
          throw new Error("Comment does not exist!");
        });
      }),
    ];
  }
}
