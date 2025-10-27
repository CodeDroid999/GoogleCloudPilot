// api
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

// ✅ Set EJS as the view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views")); // Looks inside "views"

// ✅ Middleware to parse URL-encoded form data (for POST forms)
app.use(bodyParser.urlencoded({ extended: true }));

// ✅ Home route - show form
app.get("/", (req, res) => {
  res.render("index"); // renders views/index.ejs
});

// ✅ Greeting route - display greeting message
app.post("/greeting", (req, res) => {
  const name = req.body.name || "Guest";
  res.render("greeting", { name }); // renders views/greeting.ejs and passes name
});

// ✅ Start the server only when run directly (not when imported for tests)
if (require.main === module) {
  const PORT = process.env.PORT || 8080;
  app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
}

// ✅ Export app for testing
module.exports = app;
