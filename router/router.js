const express = require("express");

const router = express.Router();

// Define custom middleware to add current year to response locals
router.use((req, res, next) => {
  res.locals.currentYear = new Date().getFullYear();
  next();
});

router.get("/", (req, res) => {
  res.render("index", {
    pagename: "Home"
  });
});

router.get("/about", (req, res) => {
  res.render("about", {
    pagename: "About"
  });
});

router.get("/register", (req, res) => {
  res.render("register", {
    pagename: "Register",
  });
});

router.get("/login", (req, res) => {
  res.render("login", {
    pagename: "Login",
  });
});

module.exports = router;
