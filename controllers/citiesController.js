const citiesService = require('../services/citiesService.js');

class CitiesController{
    async getAll(req, res){
        let products = await citiesService.getAll();
        res.json(products);
    }

    async insertCity(req, res){
        let cities = await citiesService.insertCity(req.body);

        res.json(cities);
    }
}

module.exports = new CitiesController();