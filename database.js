const oracledb = require('oracledb');
const log = require('./logger');

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

async function init() {
    // initialize connection pool
    await oracledb.createPool({
        user          : process.env.DB_USER,
        password      : process.env.DB_PASSWD,
        connectString : "oracle.cise.ufl.edu/orcl",
        // pool sizing
        poolMin: 1,
        poolMax: 16,
        poolIncrement: 1
    });
    // ensure db is reachable
    let rowCount = await getTotalRowCount();
    log.info('database connection ready, total rows %d', rowCount);
}

// awaited before mount of trend queries
let readyState = init();
module.exports.readyState = readyState;

async function getTotalRowCount() {
    let result = await query('select count(*) as total_count from "J.LUO".COVID_DATA');
    if (!result.rows) {
        log.error('database reports zero rows?');
        return 0;
    }
    return result.rows[0].TOTAL_COUNT;
}

/**
 * Query execution helper function
 * @param {string} sql SQL query string
 * @param {oracledb.BindParameters} bindParameters Parameters to substitute
 */
async function query(sql, bindParameters = []) {
    let connection;
    try {
        connection = await oracledb.getConnection();
        return await connection.execute(sql, bindParameters);
    } finally {
        connection?.close();
    }
}


/*
async function runOnDB(TrendQuery) {
    let connection;
    let result;
    try {
        // obtain connection from pool
        connection = await oracledb.getConnection();
        result = await connection.execute(
            TrendQuery, // PUT TREND QUERY HERE
            []
        );
        console.log(result.rows);
    } catch (err) {
        console.error(err);
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (err) {
                console.error(err);
            }
        }
    }
    return result;
}
*/

/**
 * @param {string} country Country name
 * @param {number} startTime Start time as unix time
 * @param {number} endTime End time as unix time
 */
async function trendQuery1(country, startTime, endTime) {
    return await query(`
        select country, sum(confirmed) as confirmed, sum(recovered) as recovered, sum(deaths) as deaths, timestamp_id
        from "J.LUO".COVID_DATA
        where country = :1 and (timestamp_id >= :2 and timestamp_id <= :3)
        group by country, timestamp_id
        order by timestamp_id
    `, [country, startTime, endTime]);
}

async function trendQuery2() {

}

async function trendQuery3() {

}

async function trendQuery4() {

}

async function trendQuery5() {

}

async function loginUser(username, password) {
    let connection;
    let result;
    try {
        connection = await oracledb.getConnection( {
            user          : process.env.DB_USER,
            password      : process.env.DB_PASSWD,
            connectString : "oracle.cise.ufl.edu/orcl"
        });
        result = await connection.execute(
            `SELECT user FROM Users`, // PUT TREND QUERY HERE
            []
        );
        console.log(result.rows);
    } catch (err) {
        console.error(err);
    } finally {
        if (connection) {
            try {
                await connection.close();
            } catch (err) {
                console.error(err);
            }
        }
    }
    return result;

}

async function registerUser(username, password) {

}

exports.trendQuery1 = trendQuery1;
exports.trendQuery2 = trendQuery2;
exports.trendQuery3 = trendQuery3;
exports.trendQuery4 = trendQuery4;
exports.trendQuery5 = trendQuery5;
exports.loginUser = loginUser;
exports.registerUser = registerUser;
