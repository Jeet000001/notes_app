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

// this is a middleware ehich automaticly update the time when we edit and save the note.
NoteSchema.pre("save", async function () { // ".pre" = seve hower age "save" = mongoDB to note seve kore
  this.updatedAt = Date.now(); // ata jokhone amra kono note k update kori tokhone rim eupdate kore
});


export default mongoose.models.Note ||
  mongoose.model("Note", NoteSchema);
// mongoose.models.Note = ata sudhu already existing model k return kore notun model create kore na.
// mongoose.model("Note", NoteSchema) = protek bar notun model banai, sudhu ata likhle dev mode aa app crash korbe.
// tai both likhte hbe "mongoose.models.Note || mongoose.model("Note", NoteSchema)" = jodi model exist kore then first part run hbe ar jodi model exist na kore then second part run hbe.