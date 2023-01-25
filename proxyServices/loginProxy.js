import query from '../helpers/db.js';

class LoginProxy{
    async doLogin(user){
        let queryString = "SELECT name, category, cityid FROM users WHERE name='"+ user.name.toLowerCase() + "' AND password='" + user.password + "';";
        const response = await query(queryString);

        return response;
    }
}

export let loginProxy = new LoginProxy();