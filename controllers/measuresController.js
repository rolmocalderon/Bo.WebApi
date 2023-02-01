const measuresService = require('../services/measuresService.js');

class MeasuresController{
    async getAll(req, res){
        let measures = await measuresService.getAll();
        res.json(measures);
    }

    async insertMeasure(req, res){
        let response = await measuresService.insertMeasure(req.body); 
        if(response.error){
            res.status(403).json("Error al insertar");
        }else{
            res.json(response.data);
        }
    }

    async deleteMeasure(req, res){
        let response = await measuresService.deleteMeasure(req.params);
        res.json(response);
    }
}

module.exports = new MeasuresController();