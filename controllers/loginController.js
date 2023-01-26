const loginService = require('../services/loginService.js');

class LoginController{
    async doLogin(req, res){
        let result = await loginService.doLogin(req.body);
        console.log(result)
        res.json(result);
    }
}

module.exports = new LoginController();