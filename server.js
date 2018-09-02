// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
// =============================================================
var express = require("express");
var passport = require("passport");
var passportSetup = require("./config/passport-setup.js");
// Sets up the Express App
// =============================================================
var app = express();

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

var PORT = process.env.PORT || 8000;

// Requiring our models for syncing
var db = require("./models");


// Static directory
app.use(express.static("public"));

// Routes
// =============================================================
require("./routes/api-routes.js")(app);
require("./routes/html-routes.js")(app);
app.use("/auth", require("./routes/auth-routes.js"));
app.use("/profile", require("./routes/profile-routes.js"));

// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync().then(function () {
  app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
  });
});
