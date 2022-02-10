const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getMultiple(){
  console.log("requesting cities")
  const rows = await db.getAll("cities");
  const data = helper.emptyOrRows(rows);

  console.log("result cities", data)
  return {
    data,
  }
}

async function insert(req){
  const rows = await db.query(`INSERT INTO cities (name) VALUES ('${req.data.cityName}')`);
  let insertId = rows.insertId;
  if(true){
    let result = await db.query("SELECT nextval('cities_id_seq');");
    insertId = result[0].nextval - 1;
  }

  const data = {'status':'ok', 'id': insertId};
  return {
      data
  }
}

module.exports = {
  getMultiple,
  insert
}