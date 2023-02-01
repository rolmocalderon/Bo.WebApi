const productService = require('../services/productService.js');

class ProductsController{
    async getAll(req, res){
        let products = await productService.getAll();
        res.json(products);
    }

    async getPickupProducts(req, res){
        let products = await productService.getPickupProducts(req.query);
        res.json(products);
    }

    async syncProductPicked(req, res){
        let result = await productService.updatePickupProducts(req.body)

        res.json(result);
    }

    async getUrgentProducts(req, res){
        let urgentProducts = await productService.getUrgentProducts(req.query);

        res.json(urgentProducts);
    }

    async updateUrgentProduct(req, res){
        let result = await productService.updateUrgentProduct(req.body);

        res.json(result);
    }

    async insertProduct(req, res){
        let result = await productService.insertProduct(req.body);

        res.json(result);
    }

    async deleteProduct(req, res){
        let result = await productService.deleteProduct(req.params);

        res.json(result);
    }
}

module.exports = new ProductsController();