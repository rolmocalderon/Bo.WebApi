const pickupRepository = require('../repository/pickupRepository.js');

class PickupService {
    async getAll(req){
        let pickups = [];
        let pickupResult = await pickupRepository.getAll(req);
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

module.exports = new PickupService();