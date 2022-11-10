const express = require('express');
const bodyParser = require('body-parser');
const app = express();
var cors = require('cors')
const port = process.env.PORT || 3000;
const login = require('./routes/login');
const pickups = require('./routes/pickups');
const getProducts = require('./routes/getProducts');
const getPickupProducts = require('./routes/getPickupProducts');
const getPickupProductsByDate = require('./routes/getPickupProductsByDate');
const getPickupDates = require('./routes/getPickupDates');
const insertPickup = require('./routes/insertPickup');
const insertCity = require('./routes/insertCity');
const cities = require('./routes/cities');
const getMeasures = require('./routes/getMeasures');
const syncProducts = require('./routes/syncProducts');
const insertProduct = require('./routes/insertProduct');
const getTopPickups = require('./routes/getTopPickups');
const getNeededProducts = require('./routes/getNeededProducts');
const updateUrgentProduct = require('./routes/updateUrgentProduct');
const getUrgentProducts = require('./routes/getUrgentProducts');

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
app.use('/getPickups', pickups);
app.use('/getProducts', getProducts);
app.use('/getPickupProducts', getPickupProducts);
app.use('/getPickupProductsByDate', getPickupProductsByDate);
app.use('/getPickupDates', getPickupDates);
app.use('/insertPickup', insertPickup);
app.use('/insertCity', insertCity);
app.use('/insertProduct', insertProduct);
app.use('/getCities', cities);
app.use('/getMeasures', getMeasures);
app.use('/syncProducts', syncProducts);
app.use('/getTopPickups', getTopPickups);
app.use('/getNeededProducts', getNeededProducts);
app.use('/updateUrgentProduct', updateUrgentProduct);
app.use('/getUrgentProducts', getUrgentProducts);

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