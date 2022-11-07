const db = require('./db');
const helper = require('../helper');

async function getMultiple(page = 1){
  const rows = await db.query(`SELECT * FROM products ORDER BY id;`);
  const data = helper.emptyOrRows(rows);
  const meta = {page};

  return {
    data,
    meta
  }
}

async function insert(req){
  var rows = [];
  if(req.id && req.id !== ''){
    rows = await db.query(`UPDATE products SET name = '${req.name}', monthlyaverage = ${Number(req.avg)}, isurgent = ${req.isUrgent} WHERE id = ${req.id};`);
  }else{
    rows = await db.query(`INSERT INTO products (name, monthlyaverage) VALUES ('${req.name}', ${req.avg}, isurgent = ${req.isUrgent});`);
  }
  
  let insertId = rows.insertId;
  if(true){
    let result = await db.query("SELECT nextval('products_id_seq');");
    insertId = result[0].nextval - 1;
  }

  const data = helper.emptyOrRows(rows);
  
  return { data };
}

async function syncData(req){
  let syncProductsResponse = await this.syncProducts(req.productsData);
  let syncProductMeasuresResponse = await this.syncProductsMeasure(req.productMeasuresData);
  let syncProductPickedResponse = await this.syncProductPicked(req.productsPicked);

  return {syncProductsResponse, syncProductMeasuresResponse, syncProductPickedResponse};
}

async function syncProducts(reqProducts){
  let products = reqProducts.filter(p => !p.isSubproduct);
  let response = null;
  if(products.length > 0){
    var query = "INSERT INTO products (id, name) VALUES ";
    for(let product of products){
      query += `(${product.id}, '${product.name}'), `;
    }
  
    query = query.substring(0, query.lastIndexOf(',')) + " ";
    query += "ON CONFLICT (id) DO NOTHING RETURNING id;"
    response = await db.query(query);
  }
  return response;
}

async function syncProductsMeasure(reqProductsMeasure){
  let response = null;
  
  if(reqProductsMeasure.length > 0 && reqProductsMeasure.find(p => p.measureid)){
    let products = reqProductsMeasure.filter(p => p.measureid && !p.isSubproduct);
    let subProducts = reqProductsMeasure.filter(p => p.measureid && p.isSubproduct);
    var query = '';
    if(products.length > 0){
      query = "INSERT INTO productmeasures (productid, measureid) VALUES ";
      for(let product of products){
        if(product.measureid){
          query += `(${product.productid}, '${product.measureid}'), `;
        }
      }

      query = query.substring(0, query.lastIndexOf(',')) + " ";
      query += "ON CONFLICT (productid, measureid) DO NOTHING RETURNING id;"
    }

    if(subProducts.length > 0){
      query += "INSERT INTO productmeasures (subproductid, measureid) VALUES ";
      for(let product of subProducts){
        if(product.measureid){
          query += `(${product.subproductid}, '${product.measureid}'), `;
        }
      }
      query = query.substring(0, query.lastIndexOf(',')) + " ";
      query += "ON CONFLICT (subproductid, measureid) DO NOTHING RETURNING id;"
    }

    if(query !== ''){
      response = await db.query(query);
    }
  }
  
  return response;
}

async function syncProductPicked(reqProductsPicked){
  let response = null;
  let query = '';
  
  if(reqProductsPicked && reqProductsPicked.filter(p => p.amount).length > 0){
    let products = reqProductsPicked.filter(p => !p.subproductid);
    let subproducts = reqProductsPicked.filter(p => p.subproductid !== 0);
    if(products.length > 0 && products.find(p => p.amount > 0)){
      query = "INSERT INTO productpicked (productid, measureid, pickupid, amount, subproductid) VALUES ";
      for(let product of products){
        if(product.amount > 0){
          query += `(${product.productid}, '${product.measureid}','${product.pickupid}', '${product.amount}', NULL), `;
        }
      }
      query = query.substring(0, query.lastIndexOf(',')) + " ";
      query += "ON CONFLICT (productid, measureid, pickupid) DO UPDATE SET amount = EXCLUDED.amount RETURNING id;"
    }
    
    if(subproducts.length > 0 && subproducts.find(p => p.amount > 0)){
      query += "INSERT INTO productpicked (measureid, pickupid, amount, subproductid) VALUES ";
      for(let product of subproducts){
        if(product.amount > 0){
          query += `('${product.measureid}','${product.pickupid}', '${product.amount}', ${product.subproductid}), `;
        }
      }
      query = query.substring(0, query.lastIndexOf(',')) + " ";
      query += "ON CONFLICT (measureid, pickupid, subproductid) DO UPDATE SET amount = EXCLUDED.amount RETURNING id;"
    }
  }

  if(query !== ''){
    response = await db.query(query);
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
  insert,
  syncData,
  syncProducts,
  syncProductsMeasure,
  syncProductPicked
}