const env = process.env;

const config = {
  db: { /* don't expose password or any sensitive info, done only for demo */
    host: 'localhost',
    port: '3307',
    user: 'root',
    password: 'c0rruptivO',
    //password: 'Qwerty123!',
    database: 'boapp'
  },
  listPerPage: 10,
};


module.exports = config;