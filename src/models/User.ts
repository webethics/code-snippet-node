import * as mongoose from "mongoose";
import { IUser } from "../interfaces/UserInterface";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  username: { type: String, required: true },
  verified: { type: Boolean, required: true, default: false },
  verification_token: { type: Number, required: true },
  verification_token_time: { type: Date, required: true },
  created_at: { type: Date, required: true, default: new Date() },
  updated_at: { type: Date, required: true, default: new Date() },
});

const User = mongoose.model<IUser>("users", userSchema);

export default User;
