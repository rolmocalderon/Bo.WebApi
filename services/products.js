const db = require('./db');
const helper = require('../helper');

async function getMultiple(page = 1){
  const rows = await db.query(`SELECT * FROM products;`);
  const data = helper.emptyOrRows(rows);
  const meta = {page};

  return {
    data,
    meta
  }
}

async function insertProduct(req){
  let obj = req.data ? req.data : req.body;
  let amount = obj.data.productAmount;
  let pickupId = obj.data.pickupId;
  let measureId = obj.data.measure;
  let productId = obj.data.productId;
  let query = `INSERT INTO productpicked (amount, pickupId, measureId, productid) VALUES (${amount}, '${pickupId}, ${measureId}, ${productId});`;
  const rows = await db.query(query);

  let response = {
    isOk: rows.affectedRows > 0,
    status: rows.serverStatus
  }
  return response;
}

async function getMeasures(){
  let query = 'SELECT id, type FROM measures ORDER BY type';
  const rows = await db.query(query);
  const data = helper.emptyOrRows(rows);

  return{
    data
  }
}

module.exports = {
  getMultiple,
  getMeasures,
  insertProduct
}