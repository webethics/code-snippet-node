import Comment from "../models/Comment";

export class CommentController {
  static async addComment(req, res, next) {
    const { content } = req.body;
    const post = req.post;
    try {
      const comment = new Comment({
        content: content,
        created_at: new Date(),
        updated_at: new Date(),
      });
      post.comments.push(comment);
      await Promise.all([comment.save(), post.save()]);
      res.send(post);
    } catch (error) {
      next(error);
    }
  }
  static async editComment(req, res, next) {
    const { id } = req.params;
    const content = req.body.content;

    try {
      const comment = await Comment.findByIdAndUpdate(
        id,
        {
          content: content,
          updated_at: new Date(),
        },
        {
          new: true,
        }
      );
      if (comment) {
        res.send(comment);
      } else {
        throw new Error("Comment does not exist!");
      }
    } catch (error) {
      next(error);
    }
  }
  static async deleteComment(req, res, next) {
    const comment = req.comment;
    comment.remove();
    res.send(req.comment);
  }
}
