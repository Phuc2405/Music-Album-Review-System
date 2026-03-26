const mongoose = require("mongoose");

const albumSchema = new mongoose.Schema(
  {
    albumName: { type: String, required: true },

    // Foreign key: link towards Artist
    artistID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Artist",
      required: true,
    },

    albumDetails: { type: String },
    singleDetails: { type: String },
    coverImageUrl: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Album", albumSchema);
