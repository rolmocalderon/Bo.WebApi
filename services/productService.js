import { productRepository } from '../repository/productRepository.js';

class ProductService {
    async getAll(){
        let products = await productRepository.getAll();
        //products = [...new Map(products.map(product => [product["id"], product])).values()];
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

    async getMeasures(){
        return await productRepository.getMeasures();
    }

    async insertProduct(req){
        return await productRepository.insertProduct(req);
    }
}

export let productService = new ProductService();