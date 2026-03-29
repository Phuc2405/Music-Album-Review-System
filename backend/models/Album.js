const mongoose = require("mongoose");

const albumSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    artist: { type: String, required: true },
    releaseYear: { type: Number },
    coverImageUrl: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Album", albumSchema);