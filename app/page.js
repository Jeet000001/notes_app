import NotesClient from "@/components/NotesClient";
import dbConnect from "@/lib/db";
import note from "@/models/note";

const getNotes = async () => {
  await dbConnect(); // database connection
  const notes = await note.find({}).sort({ createdAt: -1 }).lean();
  // note = mongoDB te akta note namer model ache.
  // .find() = mongoDB ar akta merthod jta mongoDB ar modhe theke document/note khoje.
  // {} = beacuse collection ar modhe joto data ache sob sata ane daw
  // .sort() = data k organize kore.
  // { createdAt: -1 } = notun first aa ar purono last aa ai vabe sajai
  // .lean() = mongoDB ar document k plain js object aa convert kore. jodi ata na likhei the mongoDb document ar kache onek extra info thake jta memory consume kore.
  return notes.map((note) => ({
    ...note, // notes namer array ar modhe kar note ak individual object
    _id: note._id.toString(), // mongoDB te id "_id" name thake ar sei id nimber ar charecter mix thake tai jate future kono problem na hoi tai amra otake string aa convert kore niy.
  }));
};

const page = async () => {
  const notes = await getNotes(); //getNotes namer function k notes namer variable aa store koreche.

  return (
    <div className="mx-auto p-4">
      <h1 className="text-3xl font-black mb-6">Notes App</h1>
      {/* props ar through amra notes k pass korche */}
      <NotesClient initialNotes={notes} />
    </div>
  );
};

export default page;
