const loginService = require('../services/loginService.js');

class LoginController{
    async getAll(req, res){
        let result = await loginService.getAll(req.query);
        res.json(result);
    }
    
    async insertUser(req, res){
        let result = await loginService.insertUser(req.body);

        if(result.error){
            res.status(403).json("Error insertando");
        }else{
            res.json(result);
        }
    }

    async deleteUser(req, res){
        let result = await loginService.deleteUser(req.params);
        if(result.error){
            res.status(403).json("Error eliminando");
        }else{
            res.json(result);
        }
    }

    async doLogin(req, res){
        let result = await loginService.doLogin(req.body);
        if(result.error){
            res.status(403).json('Usuario o contraseña erróneos');
        }else{
            res.json(result);
        }
    }
}

module.exports = new LoginController();