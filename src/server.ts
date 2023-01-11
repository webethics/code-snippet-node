import { getEnvironmentVariables } from "./environments/env";
import * as mongoose from "mongoose";
import * as express from "express";
import UserRouter from "./routers/UserRouter";
import PostRouter from "./routers/PostRouter";
import CommentRouter from "./routers/CommentRouter";

export class Server {
  public app = express();

  constructor() {
    this.setConfigurations();
    this.setRoutes();
    this.error404Handler();
    this.handleErrors();
  }

  setConfigurations() {
    this.connectToMongoDB();
    this.configureBodyParser();
  }

  connectToMongoDB() {
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    };
    mongoose
      .connect(getEnvironmentVariables().db_url, options)
      .then(() => {
        console.log("Database is connected");
      })
      .catch((error) => {
        console.log(error);
      });
  }

  configureBodyParser() {
    this.app.use(express.urlencoded({ extended: true }));
  }

  setRoutes() {
    this.app.use("/api/user", UserRouter);
    this.app.use("/api/post", PostRouter);
    this.app.use("/api/comment", CommentRouter);
  }

  error404Handler() {
    this.app.use((req, res) => {
      res.status(404).json({
        message: "Not Found",
        status_code: 404,
      });
    });
  }

  handleErrors() {
    this.app.use((error, req, res, next) => {
      const errorStatus = req.errorStatus || 500;
      res.status(errorStatus).json({
        message: error.message || "Something Went Wrong. Please try again!",
        status_code: errorStatus,
      });
    });
  }
}
