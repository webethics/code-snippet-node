import { Document } from "mongoose";

export interface IComment extends Document {
  _id: string;
  content: string;
  created_at: Date;
  updated_at: Date;
  __v: number;
}
