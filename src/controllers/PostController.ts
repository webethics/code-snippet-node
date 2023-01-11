import Post from "../models/Post";

export class PostController {
  static addPost(req, res, next) {
    const { content } = req.body;

    const post = new Post({
      user_id: req.user.user_id,
      content: content,
      created_at: new Date(),
      updated_at: new Date(),
    });

    post
      .save()
      .then((post: any) => {
        res.send(post);
      })
      .catch((err: any) => {
        next(err);
      });
  }
  static async getPostByUser(req, res, next) {
    try {
      const posts = await Post.find({
        user_id: req.user.user_id,
      }).populate("comments");
      res.send(posts);
    } catch (error) {
      next(error);
    }
  }
  static async getPostById(req, res, next) {
    res.json({
      post: req.post,
      comment_counts: req.post.commentCount,
    });
  }
  static async editPost(req, res, next) {
    const { id } = req.params;
    const content = req.body.content;
    try {
      const post = await Post.findByIdAndUpdate(
        id,
        {
          content: content,
          updated_at: new Date(),
        },
        {
          new: true,
        }
      );

      if (post) {
        res.send(post);
      } else {
        throw new Error("Post does not exist!");
      }
    } catch (error) {
      next(error);
    }
  }
  static async deletePost(req, res, next) {
    const post = req.post;
    try {
      post.remove();
      res.send(post);
    } catch (error) {
      next(error);
    }
  }
}
