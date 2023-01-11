import { body, param } from "express-validator";
import Post from "../models/Post";

export class PostValidators {
  static addPost() {
    return [body("content", "Post content is required").isString()];
  }

  static getPostById() {
    return [
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

  static editPost() {
    return [body("content", "Content is required").isString()];
  }

  static deletePost() {
    return [
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
}
