const loginService = require('../services/loginService.js');

class LoginController{
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