import {pickupService} from '../services/pickupService.js';

class PickupsController{
    async getAll(req, res){
        let pickups = await pickupService.getAll(req.query);
        res.json(pickups);
    }

    async getPickupProducts(req, res){
        let pickupProducts = await pickupService.getPickupProducts(req.query);

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
}

export const pickupsController = new PickupsController();