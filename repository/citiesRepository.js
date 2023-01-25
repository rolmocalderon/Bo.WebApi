import {citiesProxy} from '../proxyServices/citiesProxy.js';

class CitiesRepository{
    getAll(){
        return this.#doPromise(citiesProxy.getAll);
    }

    insertCity(cityObj){
        return this.#doPromise(citiesProxy.insertCity, cityObj);
    }

    #doPromise(callback, req){
        return new Promise((resolve, reject) => {
            callback(req).then((result) => {
                resolve(result);
            });
        });
    }
}

export let citiesRepository = new CitiesRepository();