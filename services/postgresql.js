//POOL POSTGRESQL
const Pool = require("pg").Pool;
const connectionString = `postgres://gcktxbujwxrejb:b716a0a366e92546ce3b67feaf1972913610d7144c905f7ce04fa5cb2869a8c8@ec2-52-213-167-210.eu-west-1.compute.amazonaws.com:5432/d6tirr3ic3t3r9`;
const pool = new Pool({
    user: 'gcktxbujwxrejb',
    host: 'ec2-52-213-167-210.eu-west-1.compute.amazonaws.com',
    database: 'd6tirr3ic3t3r9',
    password: 'b716a0a366e92546ce3b67feaf1972913610d7144c905f7ce04fa5cb2869a8c8',
    port: 5432,
    ssl: {
        rejectUnauthorized: false
    }
  })
module.exports = pool;