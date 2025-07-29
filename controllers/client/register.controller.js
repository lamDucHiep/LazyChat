const User = require("./../../model/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
//[GET]
module.exports.getRegister = (req, res) => {
  res.render("client/pages/register");
};

module.exports.postRegister = async (req, res) => {
  try {
    const { username, email, password, confirmPassword } = req.body;
    if (password !== confirmPassword) {
      return res.render("client/pages/register", {
        error: "Password and confirm password do not match !!!",
      });
    }

    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.render("client/pages/register", {
        error: "This Username already in use !!!",
      });
    }

    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.render("client/pages/register", {
        error: "This email already in use !!!",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    res.render("client/pages/login", {
      message: "Registration successful",
    });
  } catch (error) {
    res.render("client/pages/register", {
      error: "Server error, please try again",
    });
  }
};
