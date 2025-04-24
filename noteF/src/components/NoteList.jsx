import React, { useEffect, useState } from 'react';
import axios from 'axios';

const NoteList = () => {
  const [notes, setNotes] = useState([]);
  const [editing, setEditing] = useState(null);
  const [editData, setEditData] = useState({ title: '', content: '' });

  const fetchNotes = async () => {
    try {
      const response = await axios.get('http://localhost:5689/api/notes');
      setNotes(response.data);
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5689/api/notes/${id}`);
      setNotes(notes.filter((note) => note._id !== id));
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  const handleUpdate = async (id) => {
    try {
      const response = await axios.put(`http://localhost:5689/api/notes/${id}`, editData);
      setNotes(notes.map((note) => (note._id === id ? response.data : note)));
      setEditing(null);
    } catch (error) {
      console.error('Error updating note:', error);
    }
  };

  const handleCancel = () => {
    setEditing(null);
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4 text-center">Your Notes</h2>
      <div className="space-y-4">
        {notes.map((note) => (
          <div
            key={note._id}
            className="border border-gray-300 rounded-lg p-4 shadow-sm hover:shadow-md transition"
          >
            {editing === note._id ? (
              <div className="space-y-2">
                <input
                  type="text"
                  value={editData.title}
                  onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                  className="w-full p-2 border rounded-md"
                  placeholder="Title"
                />
                <input
                  type="text"
                  value={editData.content}
                  onChange={(e) => setEditData({ ...editData, content: e.target.value })}
                  className="w-full p-2 border rounded-md"
                  placeholder="Content"
                />
                <div className="flex gap-2">
                  <button
                    onClick={() => handleUpdate(note._id)}
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  >
                    Save
                  </button>
                  <button
                    onClick={handleCancel}
                    className="bg-gray-300 text-black px-3 py-1 rounded hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <h3 className="text-lg font-bold">{note.title}</h3>
                <p className="text-gray-700 mb-2">{note.content}</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setEditing(note._id);
                      setEditData({ title: note.title, content: note.content });
                    }}
                    className="bg-yellow-400 text-white px-3 py-1 rounded hover:bg-yellow-500"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(note._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default NoteList;
