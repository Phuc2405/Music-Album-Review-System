const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const admin = require("../middleware/adminMiddleware");
const Review = require("../models/Review");

router.get("/reviews", protect, admin, async (req, res) => {
  try {
    const reviews = await Review.find()
      .populate("userID", "nickname email")
      .populate("albumID", "title artist");
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

router.delete("/reviews/:reviewID", protect, admin, async (req, res) => {
  try {
    const { reviewID } = req.params;

    const review = await Review.findById(reviewID);
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    await Review.findByIdAndDelete(reviewID);
    res.status(200).json({ message: "Review deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

module.exports = router;
