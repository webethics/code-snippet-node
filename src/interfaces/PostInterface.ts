import { Document } from "mongoose";

export interface IPost extends Document {
  comments: any[];
  _id: string;
  user_id: string;
  content: string;
  created_at: Date;
  updated_at: Date;
  __v: number;
}
