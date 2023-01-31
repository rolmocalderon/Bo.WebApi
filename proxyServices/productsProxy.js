const query = require('../helpers/db.js');
const QueryHelper = require('../helpers/queryHelper.js');

class ProductsProxy{
    async getAll(){
        let result = await query('SELECT p.id, p.name, pm.measureid FROM products p LEFT JOIN productmeasures pm ON pm.productid = p.id ORDER BY name;');
    
        return result;
    }

    async getPickupProducts(pickupId){
        let result = await query(`SELECT p.id, 0 as subproductid, p.name as name, pm.measureid, m.type, COALESCE(NULL, pp.amount, 0) amount, 'false' as isSubproduct
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
        ORDER BY name;`);
    
        return result;
    }

    async updatePickupProducts(productsPicked){
        let response = null;
        let queryString = '';
      
        if(productsPicked && productsPicked.filter(p => p.amount).length > 0){     
            queryString += QueryHelper.getUpdatePickupProductQuery(productsPicked);
            queryString += QueryHelper.getUpdatePickupSubproductQuery(productsPicked);
        }
    
        if(queryString !== ''){
            response = await query(queryString);
        }
    
        return response;
    }

    async getUrgentProducts(cityId){
        const response = await query(`SELECT p.id, p.name, CASE WHEN up.id IS NULL THEN 0 WHEN productid IS NOT NULL THEN 1 END as isurgent 
        FROM products p 
        LEFT JOIN urgentproducts up 
        ON p.id = up.productid AND up.cityid = ${cityId} 
        ORDER BY p.name;`);
        
        return response;
    }

    async updateUrgentProduct(productObj){
        var response = [];
      
        if(productObj.isAdd){
            response = await query(`INSERT INTO urgentproducts (cityid, productid) VALUES(${productObj.cityId},${productObj.productId});`);
        }else{
            response = await query(`DELETE FROM urgentproducts WHERE cityid = ${productObj.cityId} AND productid = ${productObj.productId};`);
        }
      
        return response;
    }

    async getMeasures(){
        let queryString = 'SELECT id, type FROM measures ORDER BY type';
        const response = await query(queryString);
      
        return response;
    }

    async insertProduct(obj){
        var response = [];
        if(obj.id && obj.id !== ''){
          response = await query(`UPDATE products SET name = '${obj.name}' WHERE id = ${obj.id};`);
        }else{
          response = await query(`INSERT INTO products (name) VALUES ('${obj.name}');`);
        }

        let productId = obj.id;
        
        if(response && !productId){
            let result = await query("SELECT nextval('products_id_seq');");
            productId = result[0].nextval - 1;
        }

        response = await query(`INSERT INTO productmeasures (productid, measureid) VALUES ('${productId}', '${obj.measureid}');`);

        return response
    }

    async deleteProduct(productId){
        let response = await query(`DELETE FROM products WHERE id = ${productId};`);

        return response;
    }
}

module.exports = new ProductsProxy();