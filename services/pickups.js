const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getPickupProducts(pickupId){
    let query = `SELECT p.id, 0 as subproductid, p.name as name, pm.measureid, m.type, COALESCE(NULL, pp.amount, 0) amount, 'false' as isSubproduct
      FROM products p 
      LEFT JOIN productmeasures pm 
      ON pm.productid = p.id
      LEFT JOIN measures m 
      ON m.id = pm.measureid 
      LEFT JOIN productpicked pp 
      ON p.id = pp.productid AND m.id = pp.measureid AND pp.pickupid = ${pickupId}
      UNION 
      SELECT sp.productid as id, sp.id as subproductid, sp.name as name, pm.measureid, m.type, COALESCE(NULL, pp.amount, 0) amount, 'true' as isSubproduct
      FROM subproducts sp
      LEFT JOIN productmeasures pm 
      ON pm.subproductid = sp.id 
      LEFT JOIN measures m 
      ON m.id = pm.measureid 
      LEFT JOIN productpicked pp 
      ON sp.id = pp.subproductid AND m.id = pp.measureid AND pp.pickupid = ${pickupId}
      ORDER BY name;`;
    const rows = await db.query(query)
    const data = helper.emptyOrRows(rows);
  
    return {
      data
    }
  }

  async function getPickupDates(pickupName, cityId){
    let query = `SELECT id, date, cityid FROM pickups WHERE name = '${pickupName.trim()}' AND cityid = ${cityId};`;
    const rows = await db.query(query);
    let data = helper.emptyOrRows(rows);
    data = helper.getUniqueValues(data);

    return{
      data
    }
  }

async function getMultiple(req){
  const rows = await db.query(`SELECT id, name FROM pickups WHERE cityId = ${req};`);
  let data = helper.emptyOrRows(rows);
  data = helper.getUniqueValues(rows);

  return {
    data
  }
}

async function insert(req){
  db.query(`INSERT INTO pickups (name, date, cityId) VALUES ('${req.placeName}', '${req.date}', ${req.cityId})`,(error, results) => {
      if (error) return res.json({ error: error });
  });

  const data = {};
  return {
      data
  }
}

async function getPickupProductsByDate(req){
  let query = `SELECT SUM(pp.amount), COALESCE(NULL, p.name, sp.name) AS name, SUM(pp.amount * m.weight) as weight
    FROM productpicked pp
    LEFT JOIN products p 
    ON pp.productid = p.id
    LEFT JOIN subproducts sp 
    ON pp.subproductid = sp.id
    LEFT JOIN measures m
    ON m.id = pp.measureid
    WHERE pp.pickupid IN (SELECT id FROM pickups WHERE TO_TIMESTAMP(date, 'dd/MM/YYYY') >= TO_TIMESTAMP('${req.startDate}', 'dd/MM/YYYY') AND TO_TIMESTAMP(date, 'dd/MM/YYYY') <= TO_TIMESTAMP('${req.endDate}', 'dd/MM/YYYY') AND cityid = ${req.cityId})
    GROUP BY p.name, sp.name;`;

    const rows = await db.query(query)
    const data = helper.emptyOrRows(rows);

    return { data }
}

async function getTopPickups(cityId, limit = 5){
  let query = `SELECT p.name, SUM(pp.amount * m.weight) as amount, p.date FROM pickups p JOIN productpicked pp ON p.id = pp.pickupid LEFT JOIN measures m ON pp.measureid = m.id WHERE p.cityid = ${cityId} GROUP BY p.id ORDER BY amount DESC limit ${limit};`;
  const rows = await db.query(query)
  const data = helper.emptyOrRows(rows);

  return { data };
}

async function getNeededProducts(cityId){
  /*let query = `SELECT p.name, SUM(COALESCE(pp.amount * m.weight, 0)) as amount, p.monthlyaverage
    FROM productpicked pp
    LEFT JOIN products p 
    ON pp.productid = p.id
    LEFT JOIN measures m ON pp.measureid = m.id
    WHERE p.id = pp.productid AND pp.pickupid IN (SELECT id FROM pickups WHERE extract('day' FROM date_trunc('day', now() - to_date(date, 'dd/MM/YYYY')::date)) > 0 AND extract('day' FROM date_trunc('day', now() - to_date(date, 'dd/MM/YYYY')::date)) < 30 AND cityid = ${cityId})
    GROUP BY p.name, p.monthlyaverage
    ORDER BY amount ASC;`;*/
    let query = "SELECT * FROM products WHERE isurgent = 1;";
  
    const rows = await db.query(query)
    const data = helper.emptyOrRows(rows);
  
    return { data };
}

module.exports = {
  getMultiple,
  getPickupProducts,
  getPickupProductsByDate,
  getPickupDates,
  insert,
  getTopPickups,
  getNeededProducts
}