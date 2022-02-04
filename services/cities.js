const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getSingle(product){
  let query = 'SELECT name, category FROM users WHERE name="'+ user.name + '" && password="' + user.password + '"';
  const data = await db.query(query);

  return {
    data
  }
}

async function getMultiple(){
  const rows = await db.getAll("cities");
  const data = helper.emptyOrRows(rows);

  return {
    data,
  }
}

async function insert(req){
  const rows = await db.query('INSERT INTO cities (name) VALUES (?)', [req.data.cityName]);
  const data = {'status':'ok', 'id': rows.insertId};
  return {
      data
  }
}

module.exports = {
  getMultiple,
  getSingle,
  insert
}