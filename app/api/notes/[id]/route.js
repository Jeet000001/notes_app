import dbConnect from "@/lib/db";
import Note from "@/models/note";
import { NextResponse } from "next/server";

export const PUT = async (request, { params }) => {
  try {
    const { id } = await params; //params return aa boject and we destracture it by using {id}
    await dbConnect(); //conect the database
    const body = await request.json(); // frontend theke j data json format aa ase, otake body te store kore.
    const note = await Note.findByIdAndUpdate(
      // Note = ata mongoDB ar akta model jta notes collection store kore.
      // .findByIdAndUpdate = ata mongoDB ar akta method, ata id theke document find kore ar otake update kore ar update document return kore.
      id, //ata oi noter unique id jtake update korte hbe.
      { ...body, updatedAt: new Date() },
      // ...body = sprade operator, mane frontend theke asa sob data (jmon - title, content) update hoye jbe?
      // updatedAt: new Date() = bole note last kokhone update hoyeche.
      { new: true, runValidators: true }
      // new: true = ata updated document return kore
      // runValidators: true = schemar rule/validation apply kore
      // ex-      title: {
      //   type: String,
      //   required: true,
      //   maxLength: 100
      // }
    );
    // jdi note find na korte pare then ai part kaj korbe
    if (!note) {
      return NextResponse.json(
        { success: false, error: "Note Not Found" },
        { success: 404 }
      );
    }

    return NextResponse.json({ success: true, data: note });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
};

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
