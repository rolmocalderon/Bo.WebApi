const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getSingle(pickup){
  let query = 'SELECT name, category FROM users WHERE name="'+ user.name + '" && password="' + user.password + '"';
  const data = await db.query(query);

  return {
    data
  }
}

async function getPickupProducts(placeId, date){
    console.log("getPickupProducts");
    let query = 'SELECT p.id, date, productId, amount, observations, products.name as name FROM pickups p INNER JOIN products ON products.id = p.productId AND placeId = '+ placeId + ' AND date = "'+ date +'";';
    const rows = await db.query(query)
    const data = helper.emptyOrRows(rows);
  
    console.log(rows);
    return {
      data
    }
  }

async function getMultiple(page = 1){
  const rows = await db.query(`SELECT date, productId, amount, observations, places.name, placeId FROM pickups p INNER JOIN places ON places.id = p.placeId;`);
  let data = helper.emptyOrRows(rows);
  data = helper.getUniqueValues(rows);
  const meta = {page};

  return {
    data,
    meta
  }
}

module.exports = {
  getMultiple,
  getSingle,
  getPickupProducts
}