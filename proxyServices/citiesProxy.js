import query from '../helpers/db.js';

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
        
        if(response){
          let result = await query("SELECT nextval('cities_id_seq');");
          response.insertId = result[0].nextval - 1;
        }

        return response;
    }
}

export let citiesProxy = new CitiesProxy();