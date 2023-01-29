import { getAll as _getAll, getPickupProducts as _getPickupProducts, getPickupProductsByDate as _getPickupProductsByDate, getPickupDates as _getPickupDates, getTopPickups as _getTopPickups, insert as _insert } from '../repository/pickupRepository.js';

class PickupService {
    async getAll(req){
        let pickups = [];
        let pickupResult = await _getAll(req);
        let today = new Date();
        pickupResult.forEach((pickup) => {
            if(pickup.date){
                let pickupDate = new Date(pickup.date);
                if(pickupDate.getTime() > today.getTime()){
                    pickups.push(pickup);
                }
            }
        });
        
        return pickups;
    }

    async getPickupProducts(req){
        return await _getPickupProducts(req.pickupId);
    }

    async getPickupProductsByDate(req){
        return await _getPickupProductsByDate(req);
    }

    async getPickupDates(req){
        console.log(req)
        let obj = {
            pickupName: req.pickupName.trim(), 
            cityId: req.cityId
        };
        return await _getPickupDates(obj);
    }

    async getTopPickups(req){
        let obj = {
            cityId: req.cityId,
            limit: req.limit || 5
        }

        return await _getTopPickups(obj);
    }

    async insert(req){
        if(!req.name || !req.date){
            return;
        }
        return await _insert(req);
    }
}

export default new PickupService();