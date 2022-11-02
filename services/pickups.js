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

  async function getPickupDates(pickupName){
    let query = `SELECT id, date FROM pickups WHERE name = '${pickupName.trim()}';`;
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

async function getPickupProductsByDate(dates){
  let query = `SELECT SUM(pp.amount), COALESCE(NULL, p.name, sp.name) AS name, SUM(pp.amount * m.weight) as weight
    FROM productpicked pp 
    LEFT JOIN products p 
    ON pp.productid = p.id
    LEFT JOIN subproducts sp 
    ON pp.subproductid = sp.id
    LEFT JOIN measures m
    ON m.id = pp.measureid
    WHERE pp.pickupid IN (SELECT id FROM pickups WHERE TO_TIMESTAMP(date, 'dd/MM/YYYY') > TO_TIMESTAMP('${dates.startDate}', 'dd/MM/YYYY'))
    GROUP BY p.name, sp.name;`;

    const rows = await db.query(query)
    const data = helper.emptyOrRows(rows);
  
    return { data }
}

module.exports = {
  getMultiple,
  getPickupProducts,
  getPickupProductsByDate,
  getPickupDates,
  insert
}