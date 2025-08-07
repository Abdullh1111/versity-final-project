import { model, Schema } from "mongoose";
import { TUser } from "./user.interface";

const userSchema = new Schema<TUser>(
  {
    fullName: { type: String, required: true },
    password: { type: String, required: true },
    avatar: { type: String, required: true },
    email: {type: String, required: true, unique: true},
    role: { type: String, required: true, default: "USER" },
  },
  {
    timestamps: true,
  }
);

export const user = model<TUser>("user", userSchema);
