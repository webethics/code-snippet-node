import { Router } from "express";
import { UserController } from "../controllers/UserController";
import { GlobalMiddleware } from "../middlewares/GlobalMiddleware";
import { UserValidators } from "../validators/UserValidators";

export class UserRouter {
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
      "/sign-up",
      UserValidators.signUp(),
      GlobalMiddleware.checkErrors,
      UserController.signUp
    );
    this.router.post(
      "/verify",
      UserValidators.verifyUser(),
      UserController.verifyUser,
      GlobalMiddleware.checkErrors
    );
    this.router.post(
      "/login",
      UserValidators.login(),
      GlobalMiddleware.checkErrors,
      UserController.login
    );
  }
  patchRoutes() {
    this.router.patch(
      "/update/password",
      UserValidators.updatePassword(),
      GlobalMiddleware.checkErrors,
      UserController.updatePassword
    );
  }
  deleteRoutes() {}
}

export default new UserRouter().router;
