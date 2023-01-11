import { rejects } from "assert";
import * as Bcrypt from "bcryptjs";
import { resolve } from "dns";

export class Utils {
  public MAX_TOKEN_TIME = 600000;

  static generateVerificationToken(size: number = 5) {
    let digits = "0123456789";
    let otp = "";
    for (let i = 0; i < size; i++) {
      otp += digits[Math.floor(Math.random() * 10)];
    }
    return parseInt(otp);
  }

  static async encryptPassword(password: string): Promise<any> {
    return new Promise((resolve, reject) => {
      Bcrypt.hash(password, 10, (err, hash) => {
        if (err) {
          reject(err);
        }
        resolve(hash);
      });
    });
  }

  static async comparePassword(password: {
    plainPassword: string;
    encryptedPassword: string;
  }): Promise<any> {
    const { plainPassword, encryptedPassword } = password;
    return new Promise((resolve, reject) => {
      Bcrypt.compare(plainPassword, encryptedPassword, (err, isSame) => {
        if (err) {
          reject(err);
        } else if (!isSame) {
          reject(new Error("User and Password Does not Match"));
        } else {
          resolve(true);
        }
      });
    });
  }
}
