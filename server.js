"use strict";

const express = require("express");
const app = express();

const fs = require("fs");
const path = require("path");
const jsforce = require("jsforce");
const sessions = fs.readFileSync(path.join(__dirname, "sessions.json"));

require("dotenv").config();
const { PORT, SF_LOGIN_URL, SF_USERNAME, SF_PASSWORD, SF_TOKEN } = process.env;
const conn = new jsforce.Connection({ loginUrl: SF_LOGIN_URL });

conn.login(SF_USERNAME, SF_PASSWORD + SF_TOKEN, (err, userInfo) => {
  if (err) {
    console.log(err);
  } else {
    console.log("User Id: " + userInfo.id);
    console.log("Org Id: " + userInfo.organizationId);
  }
});

app.get("/", (req, res) => {
  conn.query("SELECT Id, Name FROM Account", (err, result) => {
    if (err) {
      res.send(err);
    } else {
      console.log("Total records" + result.totalSize);
      // console.log(result.records);
      // res.send("Hello salesforce World");
      res.json(result.records);
    }
  });
});

app.get("/api/sessions", (req, res) => {
  res.json(JSON.parse(sessions));
});

app.listen(PORT, () => {
  console.log(`Express server running on http://localhost:${PORT}`);
});
