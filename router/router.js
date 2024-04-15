const express = require("express");
const { validateRegistration, validateLogin } = require("../validation/validation");
const { isEmpty } = require("../utilities/util");
const messages = require("../utilities/messages");
const { postRegister, postLogin } = require("../services/userService");

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

router.post("/register", async (req, res) => {
  const errors = validateRegistration(req.body);
  if (isEmpty(errors)) {
    try {
      await postRegister(req.body)

      res.render("login", {
        pagename: "Login", message: messages.successful_register
      });
    } catch (err) {
      res.render('register', {
        pagename: 'Register',
        message: err.response.data.error.message
      })
    }
  } else {
    res.render('register', {
      pagename: 'Register',
      body: req.body,
      errors,
      message: messages.failed_register
    })
  }
});

router.get("/login", (req, res) => {
  res.render("login", {
    pagename: "Login",
  });
});

router.post("/login", async (req, res) => {
  const errors = validateLogin(req.body);
  if (isEmpty(errors)) {
    try {
      const response = await postLogin(req.body)
      console.log('response :', response);

      res.render("index", {
        pagename: "Home", message: messages.successful_login
      });
    } catch (err) {
      res.render('login', {
        pagename: 'Login',
        message: err.response.data.error.message
      })
    }
  } else {
    res.render('login', {
      pagename: 'Login',
      body: req.body,
      errors,
      message: messages.failed_login
    })
  }
});

module.exports = router;
