const express = require("express");
const app = express();
const { connectDb } = require("./helpers/db");
const { port, host, db, api_url } = require("./configuration");
const axios = require("axios");

app.get("/test", (request, response) => {
  response.send("Our auth service is working correctly");
});
app.get("/api/currentUser", (request, response) => {
  response.json({
    id: "1234",
    email: "foo@gmail.foo",
  });
});

app.get("/api/testwithapidata", (request, response) => {
  axios
    .get(api_url + "/testapidata")
    .then((res) => {
      response.json({
        data: res.data,
      });
    })
    .catch((err) =>
      console.log("Error occurred while trying to get api response", err)
    );
});

const startServer = () => {
  app.listen(port, () => {
    console.log(`Started auth service at port ${port}...`);
    console.log(`On host ${host}`);
    console.log(`Our DB ${db}`);
  });
};

connectDb()
  .on("error", console.log)
  .on("disconnect", connectDb)
  .once("open", startServer);
