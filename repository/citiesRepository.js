const { deleteCity } = require('../proxyServices/citiesProxy.js');
const citiesProxy = require('../proxyServices/citiesProxy.js');

class CitiesRepository{
    getAll(){
        return this.#doPromise(citiesProxy.getAll);
    }

    insertCity(cityObj){
        return this.#doPromise(citiesProxy.insertCity, cityObj);
    }

    deleteCity(cityId){
        return this.#doPromise(citiesProxy.deleteCity, cityId);
    }

    #doPromise(callback, req){
        return new Promise((resolve, reject) => {
            callback(req).then((result) => {
                resolve(result);
            });
        });
    }
}

module.exports = new CitiesRepository();