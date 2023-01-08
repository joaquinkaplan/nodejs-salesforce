"use strict";

const express = require("express");
const app = express();

const fs = require("fs");
const path = require("path");
const sessions = fs.readFileSync(path.join(__dirname, "sessions.json"));

require("dotenv").config();
const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Hello salesforce World");
});

app.get("/api/sessions", (req, res) => {
  res.json(JSON.parse(sessions));
});

app.listen(port, () => {
  console.log(`Express server running on http://localhost:${port}`);
});
