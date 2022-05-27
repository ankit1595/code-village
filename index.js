const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const port = 8000;
const app = express();

app.use(expressLayouts);
app.use("/", require("./routes/index"));

//set up the view engine
app.set("view engine", "ejs");
app.set("views", "./views");

app.listen(port, function (err) {
  if (err) {
    console.log("Error in running the server");
    return;
  }
  console.log("Server is up and running on port: ", port);
});
