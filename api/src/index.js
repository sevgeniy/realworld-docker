const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { connectDb } = require("./helpers/db");
const { port, host, db, authApiUrl, emailApiUrl } = require("./configuration");
const axios = require("axios");

const postSchema = new mongoose.Schema({
  name: String,
});
const Post = mongoose.model("Post", postSchema);

app.get("/test", (request, response) => {
  response.send("Our api service is working correctly");
});

app.get("/testWithCurrentUser", (request, response) => {
  axios(`${authApiUrl}/currentUser`)
    .then((res) => {
      response.json({
        testWithCurrentUser: true,
        currentUserFromAuth: res.data,
      });
    })
    .catch((error) => console.log("Cant get current user", error));
});

app.get("/api/testapidata", (request, response) => {
  response.json({
    testwithapi: true,
  });
});

app.get("/sendemail", (request, response) => {
  console.log("emailApiUrl", emailApiUrl);

  axios
    .get(`${emailApiUrl}/sendemail`)
    .then((res) => {
      console.log("getting response from email service", res.data);
      response.send(res.data);
    })
    .then((error) => {
      console.log("Error while getting response from email service", error);
    });
});

const startServer = () => {
  app.listen(port, () => {
    console.log(`Started api service at port ${port}...`);
    console.log(`On host ${host}`);
    console.log(`Our DB ${db}`);

    Post.find(function (err, posts) {
      if (err) return console.log("error", err);
      console.log("posts", posts);
    });

    const silence = new Post({ name: "Silence" });
    silence.save((err, savedSilence) => {
      if (err) return console.log("saveError", err);
      console.log("savedSilence", savedSilence);
    });
    console.log("silence.name", silence.name);
  });
};

connectDb()
  .on("error", console.log)
  .on("disconnect", connectDb)
  .once("open", startServer);
