const pickupService = require('../services/pickupService.js');

class PickupsController{
    async getAll(req, res){
        let pickups = await pickupService.getAll(req.query);
        res.json(pickups);
    }

    async getPickupProducts(req, res){
        let pickupProducts = await pickupService.getPickupProducts(req.params);

        res.json(pickupProducts);
    }

    async getPickupProductsByDate(req, res){
        let pickupProducts = await pickupService.getPickupProductsByDate(req.query);

        res.json(pickupProducts);
    }

    async getPickupDates(req, res){
        let pickupDates = await pickupService.getPickupDates(req.query);

        res.json(pickupDates);
    }

    async getTopPickups(req, res){
        let topPickups =  await pickupService.getTopPickups(req.query);

        res.json(topPickups)
    }

    async insertPickup(req, res){ 
        let response = await pickupService.insert(req.body);
        res.json(response);
    }

    async deletePickup(req, res){
        let response = await pickupService.delete(req.params);
        res.json(response);
    }
}

module.exports = new PickupsController();