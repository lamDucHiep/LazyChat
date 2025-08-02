require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;
const routeClient = require("./routes/client/index.route");
const mongoose = require("mongoose");
const mongoConnect = require("./config/db");
const cookieParser = require("cookie-parser");
const session = require("express-session");

mongoConnect();

app.get("/", (req, res) => {
  res.redirect("/login");
});

app.set("views", "./views");
app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

routeClient.index(app);

app.listen(PORT, "0.0.0.0", () => {
  console.log(`App listen on port ${PORT}`);
});
