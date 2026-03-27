const Album = require("../models/Album");
//This is to browse/list album feature
const getAllAlbums = async (req, res) => {
  try {
    const albums = await Album.find();
    res.json(albums);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//This is to see album details
const getAlbumById = async (req, res) => {
  try {
    const album = await Album.findById(req.params.id)       
    .populate("artistID", "artistName");
    if (!album) return res.status(404).json({ message: "Album not found" });

    res.json(album);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
//This is to search album
const searchAlbums = async (req, res) => {
  const { keyword } = req.query;
  try {
    const albums = await Album.find({
      $or: [
        { albumName: { $regex: keyword, $options: "i" } },
      ],
    });

    res.json(albums);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = {
  getAllAlbums,
  getAlbumById,
  searchAlbums,
};
