"use client";

import { useState } from "react";
import toast from "react-hot-toast";

const NotesClient = ({ initialNotes }) => {
  const [notes, setNotes] = useState(initialNotes);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const createNote = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    setLoading(true);
    try {
      const response = await fetch("/api/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content }),
      });
      const result = await response.json();
      if (result.success) {
        setNotes([result.data, ...notes]);
        toast.success("Notes created successfully")
        setTitle("");
        setContent("");
      }
      setLoading(false);
    } catch (error) {
      console.error("Error creating note:", error);
      toast.error("Something went wrong")

    }
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
              <div className="flex justify-between items-start mb-2">
                <h2 className="text-lg font-semibold">{note.title}</h2>
                <div className="flex gap-2">
                  <button className="text-blue-500 hover:text-blue-700 text-sm">
                    Edit
                  </button>
                  <button className="text-red-500 hover:text-red-700 text-sm">
                    Delete
                  </button>
                </div>
              </div>
              <p className="text-gray-700 mb-2">{note.content}</p>
              <p>
                Created at:{" "}
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
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NotesClient;
