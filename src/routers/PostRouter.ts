import { Router } from "express";
import { PostValidators } from "../validators/PostValidators";
import { GlobalMiddleware } from "../middlewares/GlobalMiddleware";
import { PostController } from "../controllers/PostController";

class PostRouter {
  public router;
  constructor() {
    this.router = Router();
    this.getRoutes();
    this.postRoutes();
    this.patchRoutes();
    this.deleteRoutes();
  }

  getRoutes() {
    this.router.get(
      "/me",
      GlobalMiddleware.authenticate,
      GlobalMiddleware.checkErrors,
      PostController.getPostByUser
    );
    this.router.get(
      "/:id",
      GlobalMiddleware.authenticate,
      PostValidators.getPostById(),
      GlobalMiddleware.checkErrors,
      PostController.getPostById
    );
  }

  postRoutes() {
    this.router.post(
      "/add",
      GlobalMiddleware.authenticate,
      PostValidators.addPost(),
      GlobalMiddleware.checkErrors,
      PostController.addPost
    );
  }

  patchRoutes() {
    this.router.patch(
      "/edit/:id",
      GlobalMiddleware.authenticate,
      PostValidators.editPost(),
      GlobalMiddleware.checkErrors,
      PostController.editPost
    );
  }

  deleteRoutes() {
    this.router.delete(
      "/delete/:id",
      GlobalMiddleware.authenticate,
      PostValidators.deletePost(),
      GlobalMiddleware.checkErrors,
      PostController.deletePost
    );
  }
}

export default new PostRouter().router;
