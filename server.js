const express = require("express");
const app = express();
const db = require("./db");
const bodyParser = require("body-parser");
app.use(bodyParser.json()); // req.body

app.get("/", function (req, res) {
  res.send("Welcom to my hotal.");
});

// app.get("/chicken", function (req, res) {
//   res.send("Love the chicken");
// });

// app.get("/idili", function (req, res) {
//   var customized_idili = {
//     name: "rava-idili",
//     size: "10 cm diameter",
//     is_sambhar: true,
//     is_chutney: false,
//   };
//   res.send(customized_idili);
// });

// Post route to add a person
// app.post("/person", (req, res) => {
// const data = req.body; // Assuming the request body contains the person data

// // Create  a new person document using the mongoose model
// const newPerson = new Person(data);

// // Save the new person in the database
// newPerson.save((error, person) => {
//   if (error) {
//     console.log("Error saving person:", error);
//     res.status(500).json({ error: "Internal server error" });
//   } else {
//     console.log("Data saved successfully");
//     res.status(200).json({ success });
//   }
// });

// Import the router files
const personRoutes = require("./routes/personRoutes");
const menuRoutes = require("./routes/menuRoutes");
// use the routers
app.use("/", personRoutes);
app.use("/", menuRoutes);

app.listen(3000, () => {
  console.log("Listening on port 3000");
});
