const query = require('../helpers/db.js');

class PickupProxy{
    async getAll(req){
        let queryString = `SELECT * FROM pickups WHERE cityid = ${req.cityId}`;

        if(req.date){
            queryString += ` AND date = '${req.date}'`;
        }

        queryString += ';';
        const result = await query(queryString);

        return result;
    }

    async getPickupProducts(pickupId){
        let queryString = `SELECT p.id, 0 as subproductid, p.name as name, pm.measureid, m.type, COALESCE(NULL, pp.amount, 0) amount, 'false' as isSubproduct
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

        let result = await db.query(queryString)

        return result;

    }

    async getPickupProductsByDate(obj){
        let queryString = `SELECT SUM(pp.amount), COALESCE(NULL, p.name, sp.name) AS name, SUM(pp.amount * m.weight) as weight
          FROM productpicked pp
          LEFT JOIN products p 
          ON pp.productid = p.id
          LEFT JOIN subproducts sp 
          ON pp.subproductid = sp.id
          LEFT JOIN measures m
          ON m.id = pp.measureid
          WHERE pp.pickupid IN (SELECT id FROM pickups WHERE TO_TIMESTAMP(date, 'dd/MM/YYYY') >= TO_TIMESTAMP('${obj.startDate}', 'dd/MM/YYYY') AND TO_TIMESTAMP(date, 'dd/MM/YYYY') <= TO_TIMESTAMP('${obj.endDate}', 'dd/MM/YYYY') AND cityid = ${obj.cityId})
          GROUP BY p.name, sp.name;`;
      
        let result = await query(queryString)
      
        return result;
    }

    async getPickupDates(pickupObj){
        let queryString = `SELECT id, date, cityid FROM pickups WHERE name = '${pickupObj.pickupName}' AND cityid = ${pickupObj.cityId};`;
        const result = await query(queryString);
      
        return result;
    }

    async getTopPickups(pickupObj){
        let queryString = `SELECT p.name, SUM(pp.amount * m.weight) as amount, p.date FROM pickups p JOIN productpicked pp ON p.id = pp.pickupid LEFT JOIN measures m ON pp.measureid = m.id WHERE p.cityid = ${pickupObj.cityId} GROUP BY p.id ORDER BY amount DESC limit ${pickupObj.limit};`;
        const result = await query(queryString)
      
        return result;
    }

    async insert(pickupObj){
        let result = '';
        if(pickupObj.id && pickupObj.id !== ''){
            result = await query(`UPDATE pickups SET name = '${pickupObj.placeName}', date = '${pickupObj.date}' WHERE id = ${pickupObj.id};`);
          }else{
            result = await query(`INSERT INTO pickups (name, date, cityId) VALUES ('${pickupObj.placeName}', '${pickupObj.date}', ${pickupObj.cityId})`);
          }
      
        return result;
    }
}

module.exports = new PickupProxy();