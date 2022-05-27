const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const port = 8000;
const app = express();
const db = require("./config/mongoose");

app.use(express.static("./assets"));
app.use(expressLayouts);
//extract styles and scripts from sub pages into the layout.ejs
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

//use express router
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
