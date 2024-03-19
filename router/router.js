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

router.post("/register", (req, res) => {
  console.log('registering')
  res.render("index", {
    pagename: "Home",
  });
});

router.get("/login", (req, res) => {
  res.render("login", {
    pagename: "Login",
  });
});

router.post("/login", (req, res) => {
  console.log('logging')
  res.render("index", {
    pagename: "Home",
  });
});

module.exports = router;
