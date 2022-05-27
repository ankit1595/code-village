const express = require("express");
const port = 8000;
const app = express();

app.use("/", require("./routes/index"));

app.listen(port, function (err) {
  if (err) {
    console.log("Error in running the server");
    return;
  }
  console.log("Server is up and running on port: ", port);
});
