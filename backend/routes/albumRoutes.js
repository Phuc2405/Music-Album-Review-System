const express = require("express");
const router = express.Router();

const {
  getAllAlbums,
  getAlbumById,
  searchAlbums,
} = require("../controllers/albumController");

// Public routes

// Browse albums
router.get("/", getAllAlbums); 

// Search album by title
router.get("/search", searchAlbums);        

// Album details
router.get("/:id", getAlbumById);           

module.exports = router;
