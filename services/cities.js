const db = require('./db');
const helper = require('../helper');

async function getMultiple(){
  console.log("requesting cities")
  const rows = await db.query("SELECT * FROM cities ORDER BY id");
  console.log("response multiple", rows)
  const data = helper.emptyOrRows(rows);

  return {
    data,
  }
}

async function insert(req){
  var rows = [];
  console.log(req)
  if(req.id && req.id !== ''){
    rows = await db.query(`UPDATE cities SET name = '${req.name}' WHERE id = ${req.id}`);
  }else{
    rows = await db.query(`INSERT INTO cities (name) VALUES ('${req.name}')`);
  }
  
  let insertId = rows.insertId;
  if(true){
    let result = await db.query("SELECT nextval('cities_id_seq');");
    insertId = result[0].nextval - 1;
  }

  const data = helper.emptyOrRows(rows);
  
  return { data };
}

module.exports = {
  getMultiple,
  insert
}