const mongoose = require("mongoose");

const albumSchema = new mongoose.Schema(
  {
    // Album Name
    title: { type: String, required: true },

    // Artist Name (Saved as a simple string, removed the ObjectId reference)
    artist: { type: String, required: true },

    // Release Year
    releaseYear: { type: Number },

    // Tracklist (An array of strings)
    tracks: [{ type: String }], 

    // Cover Image Link
    coverImageUrl: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Album", albumSchema);