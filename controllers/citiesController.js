const citiesService = require('../services/citiesService.js');

class CitiesController{
    async getAll(req, res){
        let products = await citiesService.getAll();
        res.json(products);
    }

    async insertCity(req, res){
        let response = await citiesService.insertCity(req.body);

        res.json(response);
    }

    async deleteCity(req, res){
        let response = await citiesService.deleteCity(req.body);

        res.json(response);
    }
}

module.exports = new CitiesController();