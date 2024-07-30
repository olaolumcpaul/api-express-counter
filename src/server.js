//Include the express library
const express = require("express");
//Include the morgan middleware
const morgan = require("morgan");
//Include the cors middleware
const cors = require("cors");

//Create a new express application
const app = express();

//Tell express we want to use the morgan library
app.use(morgan("dev"));
//Tell express we want to use the cors library
app.use(cors());
//Tell express to parse JSON in the request body
app.use(express.json());

// ENDPONTS
// Counter variable
let counter = 0;

// GET /counter - Returns the current value of the counter
app.get("/counter", (req, res) => {
  res.json({ counter });
});

// POST /counter/increment - Increments the counter
app.post("/counter/increment", (req, res) => {
  counter++;
  res.status(201).json({ counter });
});

// POST /counter/decrement - Decrements the counter
app.post("/counter/decrement", (req, res) => {
  counter--;
  res.status(201).json({ counter });
});

// POST /counter/double - Doubles the counter
app.post("/counter/double", (req, res) => {
  counter *= 2;
  res.status(201).json({ counter });
});

// DELETE /counter - Resets the counter to 0
app.delete("/counter", (req, res) => {
  counter = 0;
  res.status(200).json({ counter });
});

// Extension 1
// PUT /counter - Sets the counter to a specific value
app.put("/counter", (req, res) => {
  const value = parseInt(req.query.value);
  if (!isNaN(value)) {
    counter = value;
  }
  res.json({ counter });
});

// Extension 2
// Track multiple counters using route parameters
const counters = {};

// GET /counter/:name - Returns the current value of the named counter
app.get("/counter/:name", (req, res) => {
  const name = req.params.name;
  if (!(name in counters)) {
    counters[name] = 0;
  }
  res.json({ counter: counters[name] });
});

// POST /counter/:name/increment - Increments the named counter
app.post("/counter/:name/increment", (req, res) => {
  const name = req.params.name;
  if (!(name in counters)) {
    counters[name] = 0;
  }
  counters[name]++;
  res.status(201).json({ counter: counters[name] });
});

// POST /counter/:name/decrement - Decrements the named counter
app.post("/counter/:name/decrement", (req, res) => {
  const name = req.params.name;
  if (!(name in counters)) {
    counters[name] = 0;
  }
  counters[name]--;
  res.status(201).json({ counter: counters[name] });
});

// POST /counter/:name/double - Doubles the named counter
app.post("/counter/:name/double", (req, res) => {
  const name = req.params.name;
  if (!(name in counters)) {
    counters[name] = 0;
  }
  counters[name] *= 2;
  res.status(201).json({ counter: counters[name] });
});

// DELETE /counter/:name - Resets the named counter to 0
app.delete("/counter/:name", (req, res) => {
  const name = req.params.name;
  counters[name] = 0;
  res.status(200).json({ counter: counters[name] });
});

// PUT /counter - Sets the counter to a specific value
app.put("/counter", (req, res) => {
  const value = parseInt(req.query.value);
  if (!isNaN(value)) {
    counter = value;
  }
  res.status(201).json({ counter });
});

//Export our app so other files can run it
module.exports = app;
