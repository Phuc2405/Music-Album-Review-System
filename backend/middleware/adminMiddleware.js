const admin = (req, res, next) => {
  if (!req.user || req.user.type !== "admin") {
    return res.status(403).json({ message: "Access denied. Admin only." });
  }
  next();
};

module.exports = admin;
