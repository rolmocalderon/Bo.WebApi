const pg = require('pg');
const dotenv = require('dotenv');
dotenv.config();

const { Pool } = pg;

const postgre = new Pool({
    host: process.env.PGHOST,
    user: process.env.PGUSER,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT,
    ssl: {
        rejectUnauthorized: false
    }
});

module.exports = postgre;

//ELEPHANT
//postgres://ppdrywgj:DNiNrZu9Urz6amyqZgp7FRthhMb__lrs@mel.db.elephantsql.com/ppdrywgj
