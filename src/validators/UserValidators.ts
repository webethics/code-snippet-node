import { body } from "express-validator";
import User from "../models/User";

export class UserValidators {
  static signUp() {
    return [
      body("email", "Email is required")
        .isEmail()
        .custom((email, { req }) => {
          return User.findOne({ email: email }).then((user) => {
            if (user) {
              throw new Error("User Already Exist");
            }
            return false;
          });
        }),
      body("password", "Password is required")
        .isAlphanumeric()
        .isLength({
          min: 8,
          max: 20,
        })
        .withMessage("Password can be from 8-20 Character only"),
      body("username", "Username is required").isString(),
    ];
  }
  static verifyUser() {
    return [
      body("email", "Email is required").isEmail(),
      body("verification_token", "Verification Token is Required").isNumeric(),
    ];
  }
  static login() {
    return [
      body("email", "Email is required")
        .isEmail()
        .custom((email, { req }) => {
          return User.findOne({ email: email }).then((user) => {
            if (!user) {
              throw new Error("Email not exist!");
            } else if (!user.verified) {
              throw new Error("Please verify your email.");
            }
            req.body.user = user;
            return true;
          });
        }),
      body("password", "Password is requied"),
    ];
  }
  static updatePassword() {
    return [
      body("current_password", "Password is required").isAlphanumeric(),
      body("confirm_password", "Confirm Password is required").isAlphanumeric(),
      body("new_password", "New password is Required")
        .isAlphanumeric()
        .custom((newPassword, { req }) => {
          if (newPassword === req.body.current_password) {
            return true;
          }
          req.errorStatus = 422;
          throw new Error("Password and Confirm Password Does Not Match.");
        }),
    ];
  }
}
