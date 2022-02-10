const { response } = require('express');
const mysql = require('mysql2/promise');
const config = require('../config');
const postgre = require('./postgresql');

async function query(sql, params) {
  //const connection = await mysql.createConnection(config.db);
  //const [results, ] = await connection.execute(sql, params);
  console.log("doing query", sql)
  const responses = await postgre.query(sql)
  console.log("response", responses)
  return responses.rows;
}

async function getAll(table, params){
  const connection = await mysql.createConnection(config.db);
  const [results] = await connection.execute("SELECT * from " + table, params);

  return results;
}

module.exports = {
  query,
  getAll
}