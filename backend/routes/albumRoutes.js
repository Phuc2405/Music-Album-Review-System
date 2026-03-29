const express = require("express");
const router = express.Router();

const {
  getAlbumById,
  searchAlbums,
} = require("../controllers/albumController"); 

// Search album by title
router.get("/search", searchAlbums);        

// Album details
router.get("/:id", getAlbumById);           

module.exports = router;
