const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  port: 5432,
  database: "Jaldi",
});

console.log(pool);

module.exports = pool;
