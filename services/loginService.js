const loginRepository = require('../repository/loginRepository.js');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

class LoginService {
    async doLogin(req){
        let result = {
            'data': {},
            'error': false,
            'errorMessage': 'Usuario o contraseña erróneos'
        };
        try{
            const {name, password} = req;
    
            if (!(name && password)) {
                return null;
            }
    
            var user = await loginRepository.doLogin(name.toLowerCase());
            user = Array.isArray(user) ? user[0]: user;
            const encryptedPassword = bcrypt.hashSync(user.password, 10);
            var isPassword = await bcrypt.compare(password, encryptedPassword)
            console.log(isPassword, password, user.password)
            if(user && isPassword){
                result = {
                    name,
                    token: jwt.sign({ user_id: user.id, name }, process.env.TOKEN_KEY),
                    category: user.category,
                    cityid: user.cityid
                };
            }else{
                result.error = true;
            }

            return result;
        }catch(e){
            result.error = true;
        }

        return result;
    }
}

module.exports = new LoginService();