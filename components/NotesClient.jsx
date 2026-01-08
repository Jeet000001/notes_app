"use client";

import { useState } from "react";
import toast from "react-hot-toast";

const NotesClient = ({ initialNotes }) => {
  const [notes, setNotes] = useState(initialNotes); // app.js thelke props ar through pathano data state variable aa store kora holo
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  // states for eaditing notes
  const [editingId, setEditingId] = useState(null);
  const [editTitale, setEditTitale] = useState("");
  const [editContent, setEditContent] = useState("");

  const createNote = async (e) => {
    e.preventDefault(); // form ar default behavior change kore dai.
    if (!title.trim() || !content.trim()) return; // jodi title ar content aa kono data na thake then note create hbe na okhan theke return hoye jba.

    setLoading(true); // note create ar process start howar sathe sathe setLoading(true) hoye jbe
    try {
      const response = await fetch("/api/notes", {
        // fetch akta http request pathanor functio, "/api/notes" ata route ar end point jai route aa amra data send kori.
        method: "POST", // POST ar mane server aa notun data send kore notun note banano.
        headers: { "Content-Type": "application/json" },
        // headers = extra info jta request ar sathe server aa pathano hoi.
        // Content = ekta standerd http header jta server k bole request body kon formate aa ache.
        // application/json = ata through bojha jai data JSON formate aa pathano ho6he.
        body: JSON.stringify({ title, content }),
        // body = actual data k=jta server aa pathano hobe.
        // JSON.stringify = s object k JSON string aa convert kore.
        // { title, content } = js ae object
      });
      const result = await response.json(); // server ar responce k JSON theke JS object aa convert kore.
      if (result.success) {
        // result = backend theke asa responce, success = backend ar flag(true/false)
        setNotes([result.data, ...notes]);
        // setNotes → React ar state update function
        // notes → already existing notes array
        // result.data → notun note ja backend theke asache.
        toast.success("Notes created successfully");
        setTitle("");
        setContent("");
      }
      setLoading(false);
    } catch (error) {
      // jdi error ase then agulo run hbe
      console.error("Error creating note:", error);
      toast.error("Something went wrong");
    }
  };

  const deleteNote = async (id) => {
    try {
      const response = await fetch(`/api/notes/${id}`, {
        // fetch akta http request pathanor functio, "/api/notes/${id}" ata route ar end point jai route aa amra data send kori.
        method: "DELETE", // DELETE ar mane server theke data delete kora.
      });
      const result = await response.json(); // server ar responce k JSON theke JS object aa convert kore.
      if (result.success) {
        // result = backend theke asa responce, success = backend ar flag(true/false)
        setNotes(notes.filter((note) => note._id !== id));
        // notes = array of multiple objects.
        // filter() = array ar protek element k check kore ar j element dulo consition follow/true kore tader rakhe
        // note._id = mongoBD ar note model ar _id
        // id = j note delete hbe setar id
        toast.success("Note Deleted Successfully");
      }
    } catch (error) {
      // jdi error ase then agulo run hbe
      console.error("Error deleting note:", error);
      toast.error("Something Went Wrong");
    }
  };

  const updateNote = async (id) => {
    if (!editTitale.trim() || !editContent.trim()) return;
    setLoading(true);
    try {
      const response = await fetch(`/api/notes/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: editTitale, content: editContent }),
      });
      const result = await response.json();
      if (result.success) {
        toast.success("Notes Updated Successfully");
        setNotes(notes.map((note) => (note._id === id ? result.data : note)));
        // “Notes list me jis note ka _id given id ke equal hai usko backend se aaye updated data se replace kar do aur baaki sab notes ko unchanged rehne do”
        setEditingId(null);
        setEditTitale("");
        setEditContent("");
      }
      setLoading(false);
    } catch (error) {
      console.error("Error updating Note: ", error);
      toast.error("Something went wrong");
    }
  };

  const startEdit = (note) => {
    setEditingId(note._id);
    setEditTitale(note.title);
    setEditContent(note.content);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditTitale("");
    setEditContent("");
  };

  return (
    <div className="space-y-6">
      <form onSubmit={createNote} className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl text-gray-800 font-semibold mb-4">
          Create New Note
        </h2>
        <div className="space-y-4">
          <input
            required
            type="text"
            placeholder="Note Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <textarea
            required
            placeholder="Note Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 disabled:opacity-50"
          >
            {loading ? "Creating..." : "Created Note"}
          </button>
        </div>
      </form>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Your Notes({notes.length})</h2>
        {notes.length === 0 ? (
          <p className="text-gray-500">
            No Notes Yet. Create Your First Note Above
          </p>
        ) : (
          notes.map((note) => (
            <div key={note._id} className="bg-white p-6 rounded-lg shadow-md">
              {editingId === note._id ? (
                <>
                  <div>
                    <input
                      type="text"
                      value={editTitale}
                      onChange={(e) => setEditTitale(e.target.value)}
                      required
                      className="w-full p-3 mb-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <textarea
                      required
                      placeholder="Note Content"
                      value={editContent}
                      onChange={(e) => setEditContent(e.target.value)}
                      className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={() => updateNote(note._id)}
                        disabled={loading}
                        className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 disabled:opacity-50"
                      >
                        {loading ? "Saving..." : "save"}
                      </button>
                      <button
                        onClick={cancelEdit}
                        className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                // view mode
                <>
                  <div className="flex justify-between items-start mb-2">
                    <h2 className="text-lg font-semibold">{note.title}</h2>
                    <div className="flex gap-2">
                      <button
                        onClick={() => startEdit(note)}
                        className="text-blue-500 hover:text-blue-700 text-sm"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => deleteNote(note._id)}
                        className="text-red-500 hover:text-red-700 text-sm"
                      >
                        Delete
                      </button>
                    </div>
                  </div>

                  <p className="text-gray-700 mb-2">{note.content}</p>
                  <p>
                    Created at:
                    {new Date(note.createdAt).toLocaleString("en-IN", {
                      timeZone: "Asia/Kolkata",
                    })}
                  </p>
                  {new Date(note.createdAt).getTime() !==
                    new Date(note.updatedAt).getTime() && (
                    <p className="text-xs text-gray-400">
                      Updated:{" "}
                      {new Date(note.updatedAt).toLocaleString("en-IN", {
                        timeZone: "Asia/Kolkata",
                      })}
                    </p>
                  )}
                </>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NotesClient;
