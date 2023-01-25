import { citiesRepository } from '../repository/citiesRepository.js';

export class CitiesService{
    static getAll(){
        return citiesRepository.getAll();
    }

    static insertCity(req){
        return citiesRepository.insertCity(req);
    }
}