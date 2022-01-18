const express = require('express');
const bodyParser = require('body-parser');
const app = express();
var cors = require('cors')
const port = process.env.PORT || 3000;
const login = require('./routes/login');
const products = require('./routes/products');
const pickups = require('./routes/pickups');
const getPickupProducts = require('./routes/getPickupProducts');
const insertPickup = require('./routes/insertPickup');

app.use(cors())
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get('/', (req, res) => {
  res.json({'message': 'ok'});
})

app.use('/login', login);
app.use('/getProducts', products)
app.use('/getPickups', pickups);
app.use('/getPickupProducts', getPickupProducts);
app.use('/insertPickup', insertPickup);

/* Error handler middleware */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({'message': err.message});


  return;
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});