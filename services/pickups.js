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

async function getPickupProducts(pickupId){
    console.log("getPickupProducts");
    let query = 'SELECT pp.id as id, amount, observations, weight, p.name as productName FROM productpicked pp INNER JOIN products p ON p.id = pp.productId AND pp.pickupId = ' + pickupId +';';
    const rows = await db.query(query)
    const data = helper.emptyOrRows(rows);
  
    console.log(rows);
    return {
      data
    }
  }

async function getMultiple(){
  const rows = await db.query(`SELECT id, date, name FROM pickups`);
  let data = helper.emptyOrRows(rows);
  data = helper.getUniqueValues(rows);

  return {
    data
  }
}

async function insert(req){
    db.query('INSERT INTO pickups (name, date) VALUES (?, ?)', [req.placeName, req.date],(error, results) => {
        console.log("results", results);
        if (error) return res.json({ error: error });
    });

    const data = {};
    return {
        data
    }
}

module.exports = {
  getMultiple,
  getSingle,
  getPickupProducts,
  insert
}