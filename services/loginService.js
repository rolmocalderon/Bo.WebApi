const loginRepository = require('../repository/loginRepository.js');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

class LoginService {
    async getAll(req){
        return await loginRepository.getAll(req.cityId);
    }

    async insertUser(user){
        if(!user.name || user.name === '') return;
        let response = await loginRepository.insertUser(user);
        return response;
    }

    async deleteUser(user){
        return await loginRepository.deleteUser(user.id);
    }

    async doLogin(req){
        try{
            const {name, password} = req;
    
            if (!(name && password)) {
                return null;
            }
    
            var result = await loginRepository.doLogin(name.toLowerCase());

            if(result.error){
                return result;
            }
            result = Array.isArray(result) ? result[0]: result;
            const encryptedPassword = bcrypt.hashSync(result.password, 10);
            var isPassword = await bcrypt.compare(password, encryptedPassword)
            
            if(result && isPassword){
                result = {
                    name,
                    token: jwt.sign({ user_id: result.id, name }, process.env.TOKEN_KEY),
                    category: result.category,
                    cityid: result.cityid
                };
            }else{
                result.error = true;
            }
        }catch(e){
            result.error = true;
        }

        return result;
    }
}

module.exports = new LoginService();