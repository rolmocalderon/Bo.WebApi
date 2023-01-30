const query = require('../helpers/db.js');

class CitiesProxy{
    async getAll(){
        let result = await query('SELECT * FROM cities ORDER BY id');
    
        return result;
    }

    async insertCity(cityObj){
        let response = [];

        if(cityObj.id && cityObj.id !== ''){
          response = await query(`UPDATE cities SET name = '${cityObj.name}' WHERE id = ${cityObj.id}`);
        }else{
          response = await query(`INSERT INTO cities (name) VALUES ('${cityObj.name}')`);
        }

        return response;
    }

    async deleteCity(cityId){
      let response = await query(`DELETE FROM cities WHERE id = ${cityId};`);

      return response;
    }
}

module.exports = new CitiesProxy();