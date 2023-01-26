const loginRepository = require('../repository/loginRepository.js');

class LoginService {
    async doLogin(req){
        return await loginRepository.doLogin(req);
    }
}

module.exports = new LoginService();