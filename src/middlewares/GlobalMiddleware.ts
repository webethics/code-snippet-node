import { validationResult } from "express-validator";
import * as Jwt from "jsonwebtoken";
import { getEnvironmentVariables } from "../environments/env";

export class GlobalMiddleware {
  static checkErrors(req, res, next) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      req.errorStatus = 422;
      return next(new Error(errors.array()[0].msg));
    }

    return next();
  }
  static async authenticate(req, res, next) {
    const authHeader = req.headers.authorization;
    const token = authHeader ? authHeader.slice(7, authHeader.length) : null;
    try {
      req.errorStatus = 401;
      Jwt.verify(
        token,
        getEnvironmentVariables().jwt_secret,
        (err, decoded) => {
          if (err) {
            next(err);
          } else if (!decoded) {
            next(new Error("User Not Authorised!"));
          } else {
            req.user = decoded;
            next();
          }
        }
      );
    } catch (error) {
      next(error);
    }
  }
}
