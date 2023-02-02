const query =  require('../helpers/db.js');

class LoginProxy{
    async getAll(cityId){
        let queryString = `SELECT id, name, cityid, category FROM users `;
        if(cityId){
            queryString += `WHERE cityid = ${cityId}`;
        }
        
        const response = await query(queryString);

        return response;
    }

    async insertUser(user){
        let queryString = `INSERT INTO users (name, password, cityid, category) VALUES ('${user.name}', '${user.password}', ${user.cityId}, 'User')`;
        const response = await query(queryString);

        return response;
    }

    async deleteUser(userId){
        let queryString = `DELETE FROM users WHERE id = ${userId}`;
        const response = await query(queryString);

        return response;
    }

    async doLogin(username){
        let queryString = `SELECT * FROM users WHERE name='${username}' limit 1;`;
        const response = await query(queryString);

        return response;
    }
}

module.exports = new LoginProxy();