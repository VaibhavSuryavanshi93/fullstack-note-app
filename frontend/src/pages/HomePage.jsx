import { useState } from "react";
import NoteCard from "./NoteCard";
import Navbar from "../components/Navbar";
import { useAuthStore } from "../store/userAuthStore";

const HomePage = ({ notes, onAddNote, onDeleteNote }) => {
  const [text, setText] = useState("");
  const [showModal, setShowModal] = useState(false);
  const {authUser} = useAuthStore();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      onAddNote(text);
      setText("");
      setShowModal(false);
    }

  };
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-2 py-4">
      <Navbar />
      <div className="w-full max-w-md flex flex-col items-center gap-4">
        {/* User Details Card */}
        <div className="w-full shadow rounded-lg p-4 mb-2">
          <h2 className="font-bold mb-1 text-xl text-justify tracking-widest">Welcome, {authUser?.fullName}!</h2>
          <p className="">Email:  {authUser?.email}</p>
        </div>
        {/* Create Note Button */}
        <button
          className="w-full bg-blue-500 hover:bg-blue-600 text-white p-2 rounded font-semibold transition-colors mb-2"
          onClick={() => setShowModal(true)}
        >
          Create Note
        </button>
        {/* Notes List */}
        <div className="w-full">
          <h3 className="font-semibold mb-2">Notes</h3>
          <div className="space-y-2">
            {Array.isArray(notes) && notes.length > 0 ? (
              notes.map((note) => (
                <NoteCard key={note._id} note={note} onDelete={onDeleteNote} />
              ))
            ) : (
              <p className="text-center">No notes yet.</p>
            )}
          </div>
        </div>
      </div>
      {/* Modal Dialog for Note Input */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-30 z-50" >
          <div className=" rounded-lg shadow-lg p-6 w-80 flex flex-col   bg-white">
            <h2 className="text-lg font-bold mb-4 text-center ">Create Note</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-2">
              <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter note"
                className="border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                autoFocus
              />
              <div className="flex gap-2 mt-2">
                <button
                  type="submit"
                  className="flex-1 bg-blue-500 hover:bg-blue-600  p-2 rounded font-semibold transition-colors"
                >
                  Add
                </button>
                <button
                  type="button"
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-700 p-2 rounded font-semibold transition-colors"
                  onClick={() => {
                    setShowModal(false);
                    setText("");
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
