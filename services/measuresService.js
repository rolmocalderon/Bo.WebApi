const measuresRespository = require('../repository/measuresRepository.js');

class MeasuresService{
    result = {
        'data': {},
        'error': false,
        'errorMessage': ''
    };

    async getAll(){
        return await measuresRespository.getAll();
    }

    async insertMeasure(req){
        console.log("proxy", req)
        if(!req.type || req.type === '' || !req.weight || req.weight === '' || isNaN(req.weight)){
            this.result.error = true;
            return this.result;
        }

        if(req.weight.includes(',')){
            req.weight.replace(',','.');
        }
        var response = await measuresRespository.insertMeasure(req);

        if(response.error){
            this.result.error = true;
        }else{
            this.result.data = response;
        }

        return response;
    }

    async deleteMeasure(req){
        return await measuresRespository.deleteMeasure(req.id);
    }
}

module.exports = new MeasuresService();