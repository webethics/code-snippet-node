import User from "../models/User";
import { Utils } from "../utils/Utils";
import * as Jwt from "jsonwebtoken";
import { getEnvironmentVariables } from "../environments/env";
import { NodeMailer } from "../utils/NodeMailer";

export class UserController {
  static async signUp(req, res, next) {
    const verificationToken = Utils.generateVerificationToken();
    try {
      const hash = await Utils.encryptPassword(req.body.password);
      const data = {
        email: req.body.email,
        password: hash,
        username: req.body.username,
        verification_token: verificationToken,
        verification_token_time: Date.now() + new Utils().MAX_TOKEN_TIME,
      };
      let user = await new User(data).save();
      res.send(user);
      await NodeMailer.sendEmail({
        to: [req.body.email],
        subject: "Email Verification",
        html: `<h1>${verificationToken}</h1>`,
      });
    } catch (error) {
      next(error);
    }
  }
  static async verifyUser(req, res, next) {
    const { email, verification_token } = req.body;
    try {
      const user = await User.findOneAndUpdate(
        {
          email: email,
          verification_token: verification_token,
          verification_token_time: { $gt: Date.now() },
        },
        {
          verified: true,
          updated_at: new Date(),
          verification_token: null,
          verification_token_time: null,
        },
        {
          new: true,
        }
      );
      if (user) {
        res.send(user);
      } else {
        throw new Error(
          "Verification Token Is Expired.Please Request For a new One"
        );
      }
    } catch (error) {
      next(error);
    }
  }
  static async login(req, res, next) {
    const password = req.body.password;
    const user = req.body.user;
    try {
      await Utils.comparePassword({
        plainPassword: password,
        encryptedPassword: user.password,
      });
      const payload = {
        user_id: req.body.user._id,
        email: req.body.email,
      };
      const token = Jwt.sign(payload, getEnvironmentVariables().jwt_secret, {
        expiresIn: 60 * 60,
      });
      return res.send({
        token: token,
        user: req.body.user,
      });
    } catch (error) {
      next(error);
    }
  }
  static async updatePassword(req, res, next) {
    const {
      user_id: userId,
      current_password: currentPassword,
      confirm_password: confirmPassword,
      new_password: newPassword,
    } = req.body;
    try {
      User.findOne({
        _id: userId,
      }).then(async (user: any) => {
        await Utils.comparePassword({
          plainPassword: currentPassword,
          encryptedPassword: user.password,
        });
        const encryptedPassword = await Utils.encryptPassword(newPassword);
        const newUser = await User.findOneAndUpdate(
          {
            _id: userId,
          },
          {
            password: encryptedPassword,
          }
        );
        res.send(newUser);
      });
    } catch (error) {
      next(error);
    }
  }
}
