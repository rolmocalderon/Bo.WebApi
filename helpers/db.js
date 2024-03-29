const postgre = require('./postgresql');

async function query(sql) {
    let response = {
        data: [],
        error: null
    }
    try{
        console.log("doing query", sql);
        const response = await postgre.query(sql);
        console.log("query response", response.rows);
        return response.rows;
    }catch(exception){
        response.error = exception;
        console.log(exception);
    }

    return response;
}

module.exports = query;