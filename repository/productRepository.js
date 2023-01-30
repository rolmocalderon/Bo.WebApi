const { deleteProduct } = require('../proxyServices/productsProxy.js');
const productsProxy = require('../proxyServices/productsProxy.js');

class ProductRepository{
    getAll(){
        console.log("repository");
        return this.#doPromise(productsProxy.getAll);
    }

    getPickupProducts(pickupId){
        return this.#doPromise(productsProxy.getPickupProducts, pickupId);
    }

    updatePickupProducts(productsPicked){
        return this.#doPromise(productsProxy.updatePickupProducts, productsPicked);
    }

    getUrgentProducts(cityId){
        return this.#doPromise(productsProxy.getUrgentProducts, cityId);
    }

    updateUrgentProduct(productObj){
        return this.#doPromise(productsProxy.updateUrgentProduct, productObj);
    }

    getMeasures(){
        return this.#doPromise(productsProxy.getMeasures);
    }

    insertProduct(obj){
        return this.#doPromise(productsProxy.insertProduct, obj);
    }

    deleteProduct(productId){
        return this.#doPromise(productsProxy.deleteProduct, productId);
    }

    #doPromise(callback, req){
        return new Promise((resolve, reject) => {
            callback(req).then((result) => {
                resolve(result);
            });
        });
    }
}

module.exports = new ProductRepository();