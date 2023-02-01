const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const productsRouter = require("./routes/products.js");
const pickupsRouter = require("./routes/pickups.js");
const loginRouter = require("./routes/login.js");
const citiesRouter = require("./routes/cities.js");
const measuresRouter = require("./routes/measures.js");

const port = process.env.PORT || 3000;

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(productsRouter);
app.use(citiesRouter);
app.use(loginRouter);
app.use(pickupsRouter);
app.use(measuresRouter);

app.get('/', (req, res) => {
  res.json('Acción Solidaria');
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({'message': err.message});
  
  return;
});

app.listen(port, () => {
  console.log(`Llistening at http://localhost:${port}`)
});