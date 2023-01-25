import { productService } from '../services/productService.js';

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

    async getMeasures(req, res){
        let measures = await productService.getMeasures();

        res.json(measures);
    }

    async insertProduct(req, res){
        let result = await productService.insertProduct(req.body);

        res.json(result);
    }
}

export const productsController = new ProductsController();

/*
    async sync(req, res){
        let syncProductsResponse = await this.#syncProducts(req.productsData);
        let syncProductMeasuresResponse = await this.#syncProductsMeasure(req.productMeasuresData);
        //let syncProductPickedResponse = await this.#syncProductPicked(req.productsPicked);

        res.json({
            syncProductsResponse,
            syncProductMeasuresResponse,
            //syncProductPickedResponse
        });
    }

    async #syncProducts(){
        
    }

    async #syncProductsMeasure(){

    }
*/