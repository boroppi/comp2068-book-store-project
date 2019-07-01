// Our Express app module
const express = require("express");
const app = express();

// Importing the pageRoutes
const booksRoutes = require("./routes/books");
const usersRoutes = require("./routes/users");
const sessionsRoutes = require("./routes/sessions");
const genresRoutes = require("./routes/genres");

// Our home page
app.get("/", (req, res) => {
  res.render("pages/home");
});

// registering paageRoutes
app.use("/books", booksRoutes);
app.use("/users", usersRoutes);
app.use("/", sessionsRoutes);
app.use("/genres", genresRoutes);
// Exporting the changes
module.exports = app;
