const query = require('../helpers/db.js');

class MeasuresProxy{
    async getAll(){
        let queryString = 'SELECT * FROM measures ORDER BY type';
        const response = await query(queryString);
      
        return response;
    }

    async insertMeasure(obj){
        var response = [];
        if(obj.id && obj.id !== ''){
          response = await query(`UPDATE measures SET type = '${obj.type}', weight = '${obj.weight}' WHERE id = ${obj.id};`);
        }else{
          response = await query(`INSERT INTO measures (type, weight) VALUES ('${obj.type}', '${obj.weight}');`);
        }

        return response
    }

    async deleteMeasure(measureId){
        let response = await query(`DELETE FROM measures WHERE id = ${measureId};`);

        return response;
    }
}

module.exports = new MeasuresProxy();