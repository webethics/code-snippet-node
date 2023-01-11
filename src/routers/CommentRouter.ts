import { Router } from "express";
import { CommentController } from "../controllers/CommentController";
import { GlobalMiddleware } from "../middlewares/GlobalMiddleware";
import { CommentValidators } from "../validators/CommentValidators";

class CommentRouter {
  public router;

  constructor() {
    this.router = Router();
    this.getRoutes();
    this.postRoutes();
    this.patchRoutes();
    this.deleteRoutes();
  }

  getRoutes() {}

  postRoutes() {
    this.router.post(
      "/add/:id",
      GlobalMiddleware.authenticate,
      CommentValidators.addComment(),
      GlobalMiddleware.checkErrors,
      CommentController.addComment
    );
  }

  patchRoutes() {
    this.router.patch(
      "/edit/:id",
      GlobalMiddleware.authenticate,
      CommentValidators.editComment(),
      GlobalMiddleware.checkErrors,
      CommentController.editComment
    );
  }

  deleteRoutes() {
    this.router.delete(
      "/delete/:id",
      GlobalMiddleware.authenticate,
      CommentValidators.deleteComment(),
      GlobalMiddleware.checkErrors,
      CommentController.deleteComment
    );
  }
}

export default new CommentRouter().router;
