import { LoginService } from '../services/loginService.js';

class LoginController{
    async doLogin(req, res){
        let result = await LoginService.doLogin(req.body);
        console.log(result)
        res.json(result);
    }
}

export const loginController = new LoginController();