const adminAuth = (req, res, next) => {
  const providedKey = req.headers["x-admin-key"];
  const expectedKey = (process.env.ADMIN_KEY || "").trim();

  if (!providedKey || providedKey.trim() !== expectedKey) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  next();
};

module.exports = adminAuth;