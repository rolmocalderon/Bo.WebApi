const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getPickupProducts(pickupId){
    let query = 'SELECT pp.id as id, amount, observations, weight, p.name as productName FROM productpicked pp INNER JOIN products p ON p.id = pp.productId AND pp.pickupId = ' + pickupId +';';
    const rows = await db.query(query)
    const data = helper.emptyOrRows(rows);
  
    return {
      data
    }
  }

async function getMultiple(req){
  const rows = await db.query(`SELECT id, date, name FROM pickups WHERE cityId = ` + req);
  let data = helper.emptyOrRows(rows);
  data = helper.getUniqueValues(rows);

  return {
    data
  }
}

async function insert(req){
    db.query('INSERT INTO pickups (name, date) VALUES (?, ?)', [req.placeName, req.date],(error, results) => {
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
  insert
}