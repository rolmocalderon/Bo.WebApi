const pickupRepository = require('../repository/pickupRepository.js');
const moment = require('moment');
const lib = require('../helpers/lib')

class PickupService {
    async getAll(req){
        let pickups = [];
        if(!req) return pickups;
        let pickupResult = await pickupRepository.getAll(req);
        let today = moment(new Date());
        
        pickupResult.forEach((pickup) => {
            if(pickup.date){
                let pickupDate = lib.convertToDate(pickup.date);
                let currentDate = req.date ? lib.convertToDate(req.date) : undefined;
                if(moment(pickupDate).diff(today) >= 0 || currentDate && moment(pickupDate).diff(currentDate) >= 0){
                    pickups.push(pickup);
                }
            }
        });
        
        return this.#orderPickups(pickups);
    }

    async getPickupProducts(req){
        if(!req.pickupId) return [];
        return await pickupRepository.getPickupProducts(req.pickupId);
    }

    async getPickupProductsByDate(req){
        return await pickupRepository.getPickupProductsByDate(req);
    }

    async getPickupDates(req){
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
        if(!req.placeName || !req.date){
            return;
        }
        return await pickupRepository.insert(req);
    }

    async delete(req){
        return await pickupRepository.delete(req.id);
    }

    #orderPickups(pickups){
        pickups = pickups.sort(function(a,b){
            return lib.convertToDate(a.date) - lib.convertToDate(b.date);
        });
        
        return pickups;
    }
}

module.exports = new PickupService();