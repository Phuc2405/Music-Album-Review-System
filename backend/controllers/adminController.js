const Review = require("../models/Review");

const deleteReviewByAdmin = async (req, res) => {
  if (!req.user || req.user.type !== "admin") {
    return res.status(403).json({ message: "Access denied. Admins only." });
  }

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
};

module.exports = { deleteReviewByAdmin };