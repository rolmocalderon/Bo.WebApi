const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getSingle(user){
  let query = 'SELECT name, category FROM users WHERE name="'+ user.name + '" && password="' + user.password + '"';
  const data = await db.query(query);

  return {
    data
  }
}

async function getMultiple(page = 1){
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(`SELECT id, name FROM users;`);

  const data = helper.emptyOrRows(rows);
  const meta = {page};

  return {
    data,
    meta
  }
}

module.exports = {
  getMultiple,
  getSingle
}