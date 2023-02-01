const measuresProxy = require('../proxyServices/measuresProxy.js');

class MeasuresRepository{
    async getAll(){
        return this.#doPromise(measuresProxy.getAll);
    }

    async insertMeasure(req){
        return this.#doPromise(measuresProxy.insertMeasure, req);
    }

    async deleteMeasure(id){
        return this.#doPromise(measuresProxy.deleteMeasure, id);
    }

    #doPromise(callback, req){
        return new Promise((resolve, reject) => {
            callback(req).then((result) => {
                resolve(result);
            });
        });
    }
}

module.exports = new MeasuresRepository();