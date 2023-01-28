const loginProxy = require('../proxyServices/loginProxy.js');

class LoginRepository{
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