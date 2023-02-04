const measuresService = require('../services/measuresService.js');

class MeasuresController{
    async getAll(req, res){
        let measures = await measuresService.getAll();
        res.json(measures);
    }

    async insertMeasure(req, res){
        let response = await measuresService.insertMeasure(req.body); 
        if(response.error){
            res.status(403).json("Error al insertar measure");
        }else{
            res.json(response);
        }
    }

    async deleteMeasure(req, res){
        let response = await measuresService.deleteMeasure(req.params);

        if(response.error){
            res.status(403).json("Error al eliminar measure");
        }else{
            res.json(response);
        }
    }
}

module.exports = new MeasuresController();