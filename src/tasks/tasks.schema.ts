import { Optional } from "@nestjs/common";
import { Schema } from "mongoose";

export const TaskSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String },
  completed: { type: Boolean, default: false },

  createdAt: { type: Date, default: Date.now },
});
