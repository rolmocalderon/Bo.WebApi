class QueryHelper{
    static getUpdatePickupProductQuery(productsPicked){
        let queryString = '';
        let products = productsPicked.filter(p => !p.subproductid);
    
        if(products.length > 0 && products.find(p => p.amount > 0)){
            queryString = "INSERT INTO productpicked (productid, measureid, pickupid, amount, subproductid) VALUES ";
            for(let product of products){
              if(product.amount > 0){
                queryString += `(${product.productid}, '${product.measureid}','${product.pickupid}', '${product.amount}', NULL), `;
              }
            }
            queryString = queryString.substring(0, queryString.lastIndexOf(',')) + " ";
            queryString += "ON CONFLICT (productid, measureid, pickupid) DO UPDATE SET amount = EXCLUDED.amount RETURNING id;"
        }
    
        return queryString;
    }
    
    static getUpdatePickupSubproductQuery(productsPicked){
        let query = '';
        let subproducts = productsPicked.filter(p => p.subproductid !== 0);
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
    
        return query;
    }
}

export default QueryHelper;