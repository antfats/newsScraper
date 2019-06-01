const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const NoteSchema = new Schema({

    tite: String,
    body: String
});

const Note = mongoose.model("Note",NoteSchema);

module.exports = Note;
