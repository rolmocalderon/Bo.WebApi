import {loginProxy} from '../proxyServices/loginProxy.js';

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

export let loginRepository = new LoginRepository();