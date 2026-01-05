import NotesClient from "@/components/NotesClient";
import dbConnect from "@/lib/db";
import note from "@/models/note";


const getNotes = async () => {
  await dbConnect();
  const notes = await note.find({}).sort({ createdAt: -1 }).lean();;
  return notes.map((note) => ({
    ...note,
    _id: note._id.toString(),
  }));
};

const page = async () => {

  const notes = await getNotes()
  console.log(notes);
  

  return (
    <div className="mx-auto p-4">
      <h1 className="text-3xl font-black mb-6">Notes App</h1>
      <NotesClient initialNotes={notes} />
    </div>
  );
};

export default page;
