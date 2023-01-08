"use strict";

require("dotenv").config();
const http = require("http");
const sessions = require("./sessions.json");
const port = process.env.PORT || 5000;

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.writeHead(200, { "Content-Type": "text/html" });
    res.write("<h1>Hello Salesforce Developers</h1>");
    res.write("<p>This is our first Node App</p>");
    res.end();
  } else if (req.url === "/api-sessions") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.write(JSON.stringify(sessions));
    return;
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.write(`404: Not found - ${req.url}`);
  }
});

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

// https://www.youtube.com/watch?v=vqPr64AZdTQ
