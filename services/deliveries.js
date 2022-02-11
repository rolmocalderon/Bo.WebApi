const db = require('./db');
const helper = require('../helper');

  async function getDeliveryDates(deliveryName){
    let query = `SELECT id, date FROM deliveries WHERE name = '${deliveryName.trim()}';`;
    const rows = await db.query(query);
    let data = rows;
    return{
      data
    }
  }

async function getMultiple(req){
  const rows = await db.query(`SELECT id, name FROM deliveries WHERE cityId = ${req};`);
  let data = helper.emptyOrRows(rows);
  data = helper.getUniqueValues(rows);

  return {
    data
  }
}

async function insert(req){
  db.query(`INSERT INTO deliveries (name, date, cityId) VALUES ('${req.placeName}', '${req.date}', ${req.cityId})`,(error, results) => {
      if (error) return res.json({ error: error });
});

  const data = {};
  return {
      data
  }
}

module.exports = {
  getMultiple,
  getDeliveryDates,
  insert
}