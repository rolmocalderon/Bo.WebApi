const citiesRepository = require('../repository/citiesRepository.js');

class CitiesService{
    async getAll(){
        return await citiesRepository.getAll();
    }

    async insertCity(req){
        return await citiesRepository.insertCity(req);
    }

    async deleteCity(req){
        return await citiesRepository.deleteCity(req.id);
    }
}

module.exports = new CitiesService();