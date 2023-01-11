import * as nodemailer from "nodemailer";
import { getEnvironmentVariables } from "../environments/env";

export class NodeMailer {
  private static initializeTransport() {
    return nodemailer.createTransport({
      host: getEnvironmentVariables().mail_host,
      port: getEnvironmentVariables().mail_port,
      auth: {
        user: getEnvironmentVariables().mail_username,
        pass: getEnvironmentVariables().mail_password,
      },
    });
  }
  static sendEmail(data: {
    to: [string];
    subject: string;
    html: string;
  }): Promise<any> {
    return NodeMailer.initializeTransport().sendMail({
      from: getEnvironmentVariables().mail_from_email,
      to: data.to,
      subject: data.subject,
      html: data.html,
    });
  }
}
