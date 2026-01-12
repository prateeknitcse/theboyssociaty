export const protect = (req, res, next) => {
  // later: verify JWT
  req.user = { id: "mockUserId" }; // TEMP
  next();
};
