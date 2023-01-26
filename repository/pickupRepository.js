const pickupProxy = require('../proxyServices/pickupProxy.js');

class PickupRepository{
    getAll(obj){
        return this.#doPromise(pickupProxy.getAll, obj);
    }

    getPickupProducts(pickupId){
        return this.#doPromise(pickupProxy.getPickupProducts, pickupId);
    }

    getPickupProductsByDate(obj){
        return this.#doPromise(pickupProxy.getPickupProductsByDate, obj);
    }

    getPickupDates(obj){
        return this.#doPromise(pickupProxy.getPickupDates, obj);
    }

    getTopPickups(obj){
        return this.#doPromise(pickupProxy.getTopPickups, obj);
    }

    insert(obj){
        return this.#doPromise(pickupProxy.insert, obj);
    }

    #doPromise(callback, req){
        return new Promise((resolve, reject) => {
            callback(req).then((result) => {
                resolve(result);
            });
        });
    }
}

module.exports = new PickupRepository();