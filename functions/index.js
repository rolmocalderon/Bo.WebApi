const functions = require("firebase-functions");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const productsRouter = require("../routes/products.js");
const citiesRouter = require("../routes/cities.js");
const loginRouter = require("../routes/login.js");
const pickupsRouter = require("../routes/pickups.js");


app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(productsRouter);
app.use(citiesRouter);
app.use(loginRouter);
app.use(pickupsRouter);

app.get("/", (req, res) => {
  res.json("Acción Solidaria");
});

app.get("/api/getProducts", () => console.log("me cago en la puta"));

exports.app = functions.https.onRequest(app);
