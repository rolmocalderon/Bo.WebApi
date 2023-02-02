const loginProxy = require('../proxyServices/loginProxy.js');

class LoginRepository{
    async getAll(cityId){
        return await this.#doPromise(loginProxy.getAll, cityId);
    }

    async insertUser(user){
        return await this.#doPromise(loginProxy.insertUser, user);
    }

    async deleteUser(userId){
        return await this.#doPromise(loginProxy.deleteUser, userId);
    }

    async doLogin(user){
        return await this.#doPromise(loginProxy.doLogin, user);
    }

    #doPromise(callback, req){
        return new Promise((resolve, reject) => {
            callback(req).then((result) => {
                resolve(result);
            });
        });
    }
}

module.exports = new LoginRepository();