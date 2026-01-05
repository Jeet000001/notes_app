import mongoose from "mongoose";

const NoteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      maxLength: 100,
    },
    content: {
      type: String,
      required: true,
      maxLength: 2000,
    },
  },
  {
    timestamps: true, // ✅ handles createdAt & updatedAt automatically
  }
);

NoteSchema.pre("save", async function () {
  this.updatedAt = Date.now();
});


export default mongoose.models.Note ||
  mongoose.model("Note", NoteSchema);
