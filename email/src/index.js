const express = require("express");
const app = express();
const { port } = require("./configuration");

app.get("/", (request, response) => {
  response.send("Email test");
});

app.get("/api/sendemail", (request, response) => {
  response.send("Sending email");
});

app.listen(3003, () => {
  console.log(`Email service is listening port ${port} ...`);
});
