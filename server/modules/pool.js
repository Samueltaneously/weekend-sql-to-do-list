const pg = require('pg');

const pool = new pg.Pool({
    host: 'localhost',
    port: 5432,
    database: 'wknd_chal_TODO', 
});

module.exports = pool;