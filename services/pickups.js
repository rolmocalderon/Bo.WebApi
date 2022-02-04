const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getPickupProducts(pickupId){
    let query = `SELECT pp.*, pt.alias, m.type measureType, m.alias as measureAlias FROM productpicked pp INNER JOIN producttypes pt ON pp.productTypeId = pt.id INNER JOIN measures m ON m.id = pp.measureId AND pp.pickupId = ${pickupId};`;
    const rows = await db.query(query)
    const data = helper.emptyOrRows(rows);
  
    return {
      data
    }
  }

  async function getPickupDates(pickupName){
    let query = 'SELECT id, date FROM pickups WHERE name = "' + pickupName.trim() + '";';
    const rows = await db.query(query);
    let data = helper.emptyOrRows(rows);
    data = helper.getUniqueValues(data);

    return{
      data
    }
  }

async function getMultiple(req){
  const rows = await db.query(`SELECT id, name FROM pickups WHERE cityId = ` + req);
  let data = helper.emptyOrRows(rows);
  data = helper.getUniqueValues(rows);

  return {
    data
  }
}

async function insert(req){
  db.query('INSERT INTO pickups (name, date, cityId) VALUES (?, ?, ?)', [req.placeName, req.date, req.cityId],(error, results) => {
      if (error) return res.json({ error: error });
  });

  const data = {};
  return {
      data
  }
}

module.exports = {
  getMultiple,
  getPickupProducts,
  getPickupDates,
  insert
}