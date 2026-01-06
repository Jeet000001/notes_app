import dbConnect from "@/lib/db";
import Note from "@/models/note";
import { NextResponse } from "next/server";

export const DELETE = async (request, { params }) => {
  try {
    const { id } = await params; //params return aa boject and we destracture it by using {id}
    await dbConnect(); //conect the database
    const note = await Note.findByIdAndDelete(id); // findByIdAndDelete mongoDB ar akta bulitin method, jta id ar through document/note finde kore delete kore dai.

    // jdi note find na korte pare then ai part kaj korbe
    if (!note) {
      return NextResponse.json(
        { success: false, error: "Note not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: {} }); // data: {} - karon jate frontend aa error na ade ar jodi amra na likhe ata then "data: undefine / null" hbe jta some times frontend aa error dai
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
};
