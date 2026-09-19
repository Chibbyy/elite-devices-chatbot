const adminAuth = (req, res, next) => {
  const providedKey = req.headers["x-admin-key"];

  console.log("DEBUG - Provided key:", JSON.stringify(providedKey));
  console.log("DEBUG - Expected key:", JSON.stringify(process.env.ADMIN_KEY));

  if (!providedKey || providedKey !== process.env.ADMIN_KEY) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  next();
};

module.exports = adminAuth;