const citiesRepository = require('../repository/citiesRepository.js');

class CitiesService{
    async getAll(){
        return await citiesRepository.getAll();
    }

    async insertCity(req){
        return await citiesRepository.insertCity(req);
    }
}

module.exports = new CitiesService();