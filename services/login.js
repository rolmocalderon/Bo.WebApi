const db = require('./db');

async function getSingle(user){
  let query = "SELECT name, category, cityid FROM users WHERE name='"+ user.name.toLowerCase() + "' AND password='" + user.password + "';";
  const data = await db.query(query);
  return {
    data
  }
}

module.exports = {
  getSingle
}