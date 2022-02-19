const { Schema, model } = require("mongoose");

/** Model for song */
const songSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  bpm: {
    type: Number,
    required: true
  },
  note: String
});

module.exports = model("Song", songSchema);
