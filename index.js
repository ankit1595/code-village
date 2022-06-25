const express = require("express");
const cookieParser = require("cookie-parser");
const expressLayouts = require("express-ejs-layouts");
const port = 8000;
const app = express();
const db = require("./config/mongoose");
//used for session cookie
const session = require("express-session");
const passport = require("passport");
const passportLocal = require("./config/passport-local-strategy");
const MongoStore = require("connect-mongo");
const sassMiddleware = require("node-sass-middleware");
const flash = require("connect-flash");
const customMware = require("./config/middleware");

app.use(
  sassMiddleware({
    src: "./assets/scss",
    dest: "./assets/css",
    debug: true,
    outputStyle: "expanded",
    prefix: "/css",
  })
);

app.use(express.urlencoded());

app.use(cookieParser());

app.use(express.static("./assets"));
///make the uploads path available to the browser
app.use("/uploads", express.static(__dirname + "/uploads"));

app.use(expressLayouts);
//extract styles and scripts from sub pages into the layout.ejs
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

//set up the view engine
app.set("view engine", "ejs");
app.set("views", "./views");

//mongo store is used to store the session cookie in the db
app.use(
  session({
    name: "code-village",
    //TODO change the secret before deployment in production mode
    //used for encrypt and decrypt the key
    secret: "randomText",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 100,
    },
    store: MongoStore.create(
      {
        mongoUrl: "mongodb://localhost:27017/codeVillage_development",
        autoRemove: "disabled",
      },
      function (err) {
        console.log(err || "connect-mongodb setup ok");
      }
    ),
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use(flash());
app.use(customMware.setFlash);

//use express router
app.use("/", require("./routes/index"));

app.listen(port, function (err) {
  if (err) {
    console.log("Error in running the server");
    return;
  }
  console.log("Server is up and running on port: ", port);
});
