const express = require("express");
const router = express.Router();

const {
  getReviewDetails,
  writeReview,
  updateReview,
  deleteReview
} = require("../controllers/reviewController");

const { protect } = require("../middleware/authMiddleware");

// Get review history (only logged‑in users)
router.get("/my-reviews", protect, getReviewDetails);

// Write a review (guest users are blocked)
router.post("/", protect, writeReview);

// Update a review (only the owner can edit)
router.put("/:id", protect, updateReview);

// Delete a review (only the owner can delete)
router.delete("/:id", protect, deleteReview);

module.exports = router;
