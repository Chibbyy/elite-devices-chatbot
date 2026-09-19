const adminAuth = (req, res, next) => {
  const providedKey = req.headers["x-admin-key"];

  if (!providedKey || providedKey !== process.env.ADMIN_KEY) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  next();
};

module.exports = adminAuth;