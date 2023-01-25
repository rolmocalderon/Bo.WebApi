import { pickupRepository } from '../repository/pickupRepository.js';

class PickupService {
    async getAll(req){
        return await pickupRepository.getAll(req);
    }

    async getPickupProducts(req){
        return await pickupRepository.getPickupProducts(req.pickupId);
    }

    async getPickupProductsByDate(req){
        return await pickupRepository.getPickupProductsByDate(req);
    }

    async getPickupDates(req){
        console.log(req)
        let obj = {
            pickupName: req.pickupName.trim(), 
            cityId: req.cityId
        };
        return await pickupRepository.getPickupDates(obj);
    }

    async getTopPickups(req){
        let obj = {
            cityId: req.cityId,
            limit: req.limit || 5
        }

        return await pickupRepository.getTopPickups(obj);
    }

    async insert(req){
        if(!req.name || !req.date){
            return;
        }
        return await pickupRepository.insert(req);
    }
}

export let pickupService = new PickupService();