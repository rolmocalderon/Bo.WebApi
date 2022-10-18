const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getMultiple(page = 1){
  const rows = await db.query(`SELECT * FROM products;`);
  const data = helper.emptyOrRows(rows);
  const meta = {page};

  return {
    data,
    meta
  }
}

async function editProduct(req){
  let obj = req.data ? req.data : req.body;
  let amount = obj.data.productAmount;
  let productName = obj.data.productName;
  let productWeight = obj.data.productWeight; 
  let measureId = obj.data.measure;
  let productTypeId = obj.data.productType;
  let query = `UPDATE productpicked SET amount = ${amount}, weight = ${productWeight}, productName = '${productName}', measureId = ${measureId}, productTypeId = ${productTypeId} WHERE id = ${obj.data.id};`;
  const rows = await db.query(query);

  let response = {
    isOk: rows.affectedRows > 0,
    status: rows.serverStatus
  }
  return response;
}

async function insertProduct(req){
  let obj = req.data ? req.data : req.body;
  let amount = obj.data.productAmount;
  let productName = obj.data.productName;
  let productWeight = obj.data.productWeight;
  let pickupId = obj.data.pickupId;
  let measureId = obj.data.measure;
  let productTypeId = obj.data.productType;
  let query = `INSERT INTO productpicked (amount, weight, productName, pickupId, measureId, productTypeId) VALUES (${amount}, ${productWeight}, '${productName}', ${pickupId}, ${measureId}, ${productTypeId});`;
  const rows = await db.query(query);

  let response = {
    isOk: rows.affectedRows > 0,
    status: rows.serverStatus
  }
  return response;
}

async function getMeasures(){
  let query = 'SELECT * FROM measures';
  const rows = await db.query(query);
  const data = helper.emptyOrRows(rows);

  return{
    data
  }
}

module.exports = {
  getMultiple,
  editProduct,
  getMeasures,
  insertProduct
}