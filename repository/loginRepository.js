const loginProxy = require('../proxyServices/loginProxy.js');

class LoginRepository{
    doLogin(user){
        return this.#doPromise(loginProxy.doLogin, user);
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