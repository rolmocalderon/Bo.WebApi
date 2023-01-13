//POOL POSTGRESQL
const Pool = require("pg").Pool;

const pool = new Pool({
    host: process.env.HOST,
    user: process.env.USER,
    database: process.env.DATABASE,
    password: process.env.PASSWORD,
    port: process.env.PORT,
    ssl: {
        rejectUnauthorized: false
    }
  })
module.exports = pool;

//ELEPHANT
//postgres://ppdrywgj:DNiNrZu9Urz6amyqZgp7FRthhMb__lrs@mel.db.elephantsql.com/ppdrywgj
