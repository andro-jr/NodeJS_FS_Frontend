const express = require("express");
const cors = require("cors");
const router = require("../router/router");
const app = express();

// CORS
app.use(cors());


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// middleware templateing

app.set("view engine", "ejs");
app.engine("ejs", require("ejs").__express);

// Static site for middleware use
app.use(express.static("public"));
app.use(express.static("views"));

app.use('/', router)

module.exports = app;
