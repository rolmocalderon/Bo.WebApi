import { CitiesService } from '../services/citiesService.js';

class CitiesController{
    async getAll(req, res){
        let products = await CitiesService.getAll();
        res.json(products);
    }

    async insertCity(req, res){
        let cities = await CitiesService.insertCity(req.body);

        res.json(cities);
    }
}

export const citiesController = new CitiesController();