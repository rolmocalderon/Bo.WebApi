import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import productsRouter from './routes/products.js';
import citiesRouter from './routes/cities.js';
import loginRouter from './routes/login.js';
import pickupsRouter from './routes/pickups.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(productsRouter);
app.use(citiesRouter);
app.use(loginRouter);
app.use(pickupsRouter);

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
  console.log(`Example app listening at http://localhost:${port}`)
});