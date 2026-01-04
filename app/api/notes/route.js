import dbConnect from "@/lib/db";
import Note from "@/models/note";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    await dbConnect();
    const notes = await Note.find({}).sort({ createdAt: -1 });
    // Note.find({}) = mongodb ar collection theke data ano, ar empty object {} mane sob Note data niye aso.
    // .sort({ createdAt: -1 } = new theke old order aa short kore ante hbe
    return NextResponse.json({ success: true, data: notes });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
};

export const POST = async (request) => {
  try {
    await dbConnect(); // first connect the DB then move forward.
    const body = await request.json(); // client(frontend/postman) theke j data asbe setake json js object aa convert kore.
    const note = await Note.create(body); // body theke j data asbe stake mongodb te seve korte hbe (".create" mongodb ar akta methode jta new document create kore).
    return NextResponse.json({ success: true, data: note }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 400 }
    );
  }
};
