const express = require('express');
const bodyParser = require('body-parser');
const app = express();
var cors = require('cors')
const port = process.env.PORT || 3000;
const login = require('./routes/login');
const products = require('./routes/products');
const pickups = require('./routes/pickups');
const getPickupProducts = require('./routes/getPickupProducts');
const getPickupDates = require('./routes/getPickupDates');
const insertPickup = require('./routes/insertPickup');
const insertCity = require('./routes/insertCity');
const cities = require('./routes/cities');
const getMeasures = require('./routes/getMeasures');
const insertProduct = require('./routes/insertProduct');
const getDeliveries = require('./routes/getDeliveries');
const getDeliveryDates = require('./routes/getDeliveryDates');

app.use(cors())
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.get('/', (req, res) => {
  res.json({'message': 'ok'});
});

app.use('/login', login);
app.use('/getProducts', products)
app.use('/getPickups', pickups);
app.use('/getPickupProducts', getPickupProducts);
app.use('/getPickupDates', getPickupDates);
app.use('/insertPickup', insertPickup);
app.use('/insertCity', insertCity);
app.use('/getCities', cities);
app.use('/getMeasures', getMeasures);
app.use('/insertProduct', insertProduct);
app.use('/getDeliveries', getDeliveries);
app.use('/getDeliveryDates', getDeliveryDates);

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