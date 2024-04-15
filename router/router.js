const express = require("express");
const {
  validateRegistration,
  validateLogin,
} = require("../validation/validation");
const { isEmpty } = require("../utilities/util");
const messages = require("../utilities/messages");
const { postRegister, postLogin } = require("../services/userService");
let session = require("express-session");

const router = express.Router();
require("dotenv").config();

router.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

// Define custom middleware to add current year to response locals
router.use((req, res, next) => {
  res.locals.currentYear = new Date().getFullYear();
  next();
});

router.get("/", (req, res) => {
  session = req.session

  res.render("index", {
    pagename: "Home",
    session
  });
});

router.get("/about", (req, res) => {
  session = req.session
  res.render("about", {
    pagename: "About",
    session
  });
});

router.get("/register", (req, res) => {
  res.render("register", {
    pagename: "Register",
  });
});

router.post("/register", async (req, res) => {
  const errors = validateRegistration(req.body);
  if (isEmpty(errors)) {
    try {
      await postRegister(req.body);

      res.render("login", {
        pagename: "Login",
        message: messages.successful_register,
      });
    } catch (err) {
      res.render("register", {
        pagename: "Register",
        message: err.response.data.error.message,
      });
    }
  } else {
    res.render("register", {
      pagename: "Register",
      body: req.body,
      errors,
      message: messages.failed_register,
    });
  }
});

router.get("/login", (req, res) => {
  res.render("login", {
    pagename: "Login",
  });
});

router.post("/login", async (req, res) => {
  session = req.session;
  const errors = validateLogin(req.body);
  if (isEmpty(errors)) {
    try {
      const response = await postLogin(req.body);
      console.log("response :", response);
      session.name = response.data.user.firstName;
      session.logged = response.data.logged;
      session.token = response.data.token;

      console.log(session)

      res.render("index", {
        pagename: "Home",
        message: messages.successful_login,
        session: session,
      });
    } catch (err) {
      res.render("login", {
        pagename: "Login",
        message: err.response.data.error.message,
      });
    }
  } else {
    res.render("login", {
      pagename: "Login",
      body: req.body,
      errors,
      message: messages.failed_login,
    });
  }
});

module.exports = router;
