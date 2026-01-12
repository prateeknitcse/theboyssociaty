export const protect = (req, res, next) => {
  // TEMP mock user (replace with JWT later)
  req.user = {
    id: "PUT_ADMIN_USER_ID_HERE",
    role: "admin",
  };
  next();
};

export const adminOnly = (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).json({
      message: "Admin access only",
    });
  }
  next();
};
