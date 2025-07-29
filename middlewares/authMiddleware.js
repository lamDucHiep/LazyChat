const jwt = require("jsonwebtoken");

module.exports.authMiddleware = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    res.redirect("/login");
    return;
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.render("client/pages/login", {
      message: "Phiên đăng nhập đã hết hạn.",
    });
  }
};
