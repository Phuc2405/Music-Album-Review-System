const express = require("express");
const router = express.Router();

const {
  writeReview,
  updateReview,
  deleteReview,
  getMyReviews,
} = require("../controllers/reviewController");

const { protect } = require("../middleware/authMiddleware");

// Get my reviews (user only)
router.get("/", protect, getMyReviews);
router.get("/my-reviews", protect, getMyReviews); // alias for compatibility

// Write a review (guest users are blocked)
router.post("/", protect, writeReview);

// Update a review (only the owner can edit)
router.put("/:id", protect, updateReview);

// Delete a review (only the owner can delete)
router.delete("/:id", protect, deleteReview);

module.exports = router;
