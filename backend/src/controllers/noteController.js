import express from "express";
import Note from "../models/noteModel.js";

export const getNotes = async (req, res) => {
  try {
    const notes = await Note.find({ userId: req.user._id }); // 👈 only their notes
    res.json(notes);
  } catch (error) {
    console.error("Error fetching notes:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

// Create note
export const createNote = async (req, res) => {
  try {
    const { text } = req.body;
    const userId = req.user._id; // safer to use _id (from middleware)

    const newNote = new Note({
      text,
      userId
    });

    await newNote.save();
    res.status(201).json(newNote);
  } catch (error) {
    console.log("Error in creating Note:", error);
    res.status(500).json({ message: "Internal server error in creating Note" });
  }
};


// Delete note

export const deleteNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({ error: "Note not found" });
    }

    // ✅ Check ownership
    if (note.userId.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ error: "Not authorized to delete this note" });
    }

    await note.deleteOne();
    res.json({ message: "Note deleted successfully" });
  } catch (error) {
    console.error("Error deleting note:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
};