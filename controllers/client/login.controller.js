const User = require("./../../model/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

//[GET]
module.exports.getLogin = (req, res) => {
  res.render("client/pages/login.ejs");
};

//[GET]
module.exports.getLogout = (req, res) => {
  res.clearCookie("token");
  res.clearCookie("username");
  res.redirect("/login");
};

//[POST]
module.exports.postLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.render("client/pages/login", {
        message: "Incorrect username or password.",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.render("client/pages/login", {
        message: "Incorrect username or password.",
      });
    }
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
    });
    const username = user.username;
    res.cookie("username", username, {
      httpOnly: false,
      secure: false,
    });
    res.redirect(`/chat`);
  } catch (error) {
    res.render("client/pages/login", {
      message: "Server error, please try again.",
    });
  }
};
