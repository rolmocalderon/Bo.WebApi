const productRepository = require('../repository/productRepository.js');

class ProductService {
    async getAll(){
        let products = await productRepository.getAll();
        return products;
    }

    async getPickupProducts(req){
        return await productRepository.getPickupProducts(req.pickupId);
    }

    async updatePickupProducts(req){
        return await productRepository.updatePickupProducts(req.productsPicked);
    }

    async getUrgentProducts(req){
        return await productRepository.getUrgentProducts(req.cityId);
    }

    async updateUrgentProduct(req){
        return await productRepository.updateUrgentProduct(req);
    }

    async insertProduct(req){
        return await productRepository.insertProduct(req);
    }

    async deleteProduct(req){
        if(!req) return;
        return await productRepository.deleteProduct(req.id);
    }
}
module.exports = new ProductService();