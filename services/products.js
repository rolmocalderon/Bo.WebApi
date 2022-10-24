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

async function syncData(req){
  let syncProductsResponse = await this.syncProducts(req.productsData);
  let syncProductMeasuresResponse = await this.syncProductsMeasure(req.productMeasuresData);
  let syncProductPickedResponse = await this.syncProductPicked(req.productsPicked);

  return {syncProductsResponse, syncProductMeasuresResponse, syncProductPickedResponse};
}

async function syncProducts(reqProducts){
  var query = "INSERT INTO products (id, name) VALUES ";
  for(let product of reqProducts){
    query += `(${product.id}, '${product.name}'), `;
  }

  query = query.substring(0, query.lastIndexOf(',')) + " ";
  query += "ON CONFLICT (id) DO NOTHING RETURNING id;"
  let response = await db.query(query);
  return response;
}

async function syncProductsMeasure(reqProductsMeasure){
  var query = "INSERT INTO productmeasures (productid, measureid) VALUES ";
  for(let product of reqProductsMeasure){
    if(product.measureid){
      query += `(${product.productid}, '${product.measureid}'), `;
    }
  }

  query = query.substring(0, query.lastIndexOf(',')) + " ";
  query += "ON CONFLICT (productid, measureid) DO NOTHING RETURNING id;"
  let response = await db.query(query);
  
  return response;
}

async function syncProductPicked(reqProductsMeasure){
  var query = "INSERT INTO productpicked (productid, measureid, pickupid, amount) VALUES ";
  for(let product of reqProductsMeasure){
    if(product.amount > 0){
      query += `(${product.productid}, '${product.measureid}','${product.pickupid}', '${product.amount}'), `;
    }
  }

  query = query.substring(0, query.lastIndexOf(',')) + " ";
  query += "ON CONFLICT (productid, measureid, pickupid) DO UPDATE SET amount = EXCLUDED.amount RETURNING id;"
  let response = await db.query(query);
  
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
  insertProduct,
  syncData,
  syncProducts,
  syncProductsMeasure,
  syncProductPicked
}