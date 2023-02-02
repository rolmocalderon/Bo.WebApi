const loginService = require('../services/loginService.js');

class LoginController{
    async getAll(req, res){
        let result = await loginService.getAll(req.query);
        res.json(result);
    }
    
    async insertUser(req, res){
        let result = await loginService.insertUser(req.body);
        res.json(result)
    }

    async deleteUser(req, res){
        let result = await loginService.deleteUser(req.params);
        res.json(result);
    }

    async doLogin(req, res){
        let result = await loginService.doLogin(req.body);
        if(result.error){
            res.status(403).json(result.errorMessage);
        }else{
            res.json(result);
        }
    }
}

module.exports = new LoginController();