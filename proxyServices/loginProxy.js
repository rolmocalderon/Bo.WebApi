const query =  require('../helpers/db.js');

class LoginProxy{
    async doLogin(username){
        let queryString = `SELECT * FROM users WHERE name='${username}' limit 1;`;
        const response = await query(queryString);

        return response;
    }
}

module.exports = new LoginProxy();