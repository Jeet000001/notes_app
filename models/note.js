import mongoose from "mongoose";
import { Content } from "next/font/google";

const NoteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    maxLength: 100,
  },
  Content: {
    type: String,
    required: true,
    maxLength: 2000,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

NoteSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

export default mongoose.models.Note || mongoose.model("Note", NoteSchema);
