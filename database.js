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
    if (!result.rows?.length) {
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
        // @ts-ignore
        await connection?.close();
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

/**
 * @param {string} country Country name
 * @param {number} startTime Start time as unix time
 * @param {number} endTime End time as unix time
 */
async function trendQuery2(country, startTime, endTime) {
    return await query(`
        with state_data as (
            select timestamp_id, state, sum(active) as active
            from "J.LUO".COVID_DATA
            where active is not null and active > 0 and country = :1 and (timestamp_id >= :2 and timestamp_id <= :3)
            group by timestamp_id, state
        ),
        top_states as (
            -- find top state by highest active cases averaged over time
            select avg(active) as average_active, state
            from state_data
            group by state
            order by average_active desc
            fetch first 10 rows only
        ),
        state_totals as (
            select timestamp_id, sum(active) as total_active
            from state_data
            group by timestamp_id
        )
        select state_data.timestamp_id, state_data.state, active, (active / total_active * 100) as active_percent
        from state_data
        inner join top_states on state_data.state = top_states.state
        inner join state_totals on state_data.timestamp_id = state_totals.timestamp_id
        order by timestamp_id, active desc
    `, [country, startTime, endTime])
}

/**
 * @param {string} country Country name
 * @param {number} startTime Start time as unix time
 * @param {number} endTime End time as unix time
 */
async function trendQuery3(country, startTime, endTime) {
    return await query(`
        select 
            country, timestamp_id,
            Total_Incidence,
            Total_Incidence - Lag(Total_Incidence, 1) OVER(partition by country ORDER BY country ASC) AS Incidence_Difference, 
            Total_Deaths,
            Total_Deaths - Lag(Total_Deaths, 1) OVER(partition by country ORDER BY country ASC) AS Death_Differences 
        FROM (
            select country, AVG(incidence) AS Total_Incidence, SUM(deaths) AS Total_Deaths, timestamp_id 
            FROM "J.LUO".Covid_Data
            WHERE incidence is not null
            Group By country, timestamp_id
            order by country,timestamp_id
        )
        where country = :1 and (timestamp_id >= :2 and timestamp_id <= :3)
    `, [country, startTime, endTime])
}

/**
 * @param {string} country Country name
 * @param {number} startTime Start time as unix time
 * @param {number} endTime End time as unix time
 */
async function trendQuery4(country, startTime, endTime) {
    return await query(`
        select country, avg(Avg_Incidence), unemployment_time_stamp, value/100 * population AS Unemployment_Number, value from (
            select covid_data.timestamp_id, Covid_Data.country, AVG(Covid_Data.incidence) as Avg_Incidence, Unemployment.value, Unemployment.unemployment_time_stamp, Country.population
            FROM "J.LUO".Covid_Data, "J.LUO".Unemployment, "J.LUO".Country
            WHERE Covid_Data.country = Unemployment.country_name AND Covid_Data.Country = Country.name AND incidence is not null 
            AND covid_data.timestamp_id <= ((Unemployment.unemployment_time_stamp - TO_DATE('01-JAN-70', 'DD-MON-RR')) * 86400) + 2592000 
            and covid_data.timestamp_id >= ((Unemployment.unemployment_time_stamp - TO_DATE('01-JAN-70', 'DD-MON-RR')) * 86400)
            and covid_data.country = :1 and (timestamp_id >= :2 and timestamp_id <= :3)
            GROUP BY Covid_Data.Country, Covid_Data.timestamp_id, Unemployment.value, Unemployment.unemployment_time_stamp, Country.population
            order by timestamp_id) 
        group by country, unemployment_time_stamp, population, value
        order by unemployment_time_stamp
    `, [country, startTime, endTime]);
}

/**
* @param {string} country Country name
 * @param {number} startTime Start time as unix time
 * @param {number} endTime End time as unix time
 */
async function trendQuery5(country, startTime, endTime) {
    return await query(`
        select (Deaths_Country / Deaths_Worldwide) * 100 as Deaths_Contributed, Deaths_Country, Deaths_Worldwide, worldTime
        from
            (select SUM(Deaths) as Deaths_Worldwide, TIMESTAMP_ID as worldTime from "J.LUO".COVID_DATA where deaths is not null group by timestamp_id) worldData,
            (select SUM(Deaths) as Deaths_Country, TIMESTAMP_ID as countryTime, Country from "J.LUO".COVID_DATA where country = :1 and deaths is not null group by TIMESTAMP_ID, Country) countryData
        where worldTime = countryTime and (worldTime >= :2 and worldTime <= :3)
        order by worldTime
    `, [country, startTime, endTime]);
}

/**
 * @param {string} country Country name
 * @param {number} startTime Start time as unix time
 * @param {number} endTime End time as unix time
 */
async function trendQuery6(country, startTime, endTime) {
    return await query(`select timestamp_id, confirmed, (confirmed - lag(confirmed, 1) over (order by timestamp_id)) as delta_confirmed
    from (
        select timestamp_id, sum(confirmed) as confirmed
        from "J.LUO".COVID_DATA
        where country = :1 and (timestamp_id >= :2 and timestamp_id <= :3)
        group by timestamp_id
    )
    order by timestamp_id`, [country, startTime, endTime]);
};

async function loginUser(username, password) {
    let result = await query(`SELECT * FROM "J.LUO".Users`);
    if(!result.rows) return false;

    for (let elem of result.rows) {
        if (elem.USERNAME === username && elem.PASSWORD === password) return true;
    }
    return false;
}

async function registerUser(username, password) {

}

exports.query = query;
exports.getTotalRowCount = getTotalRowCount;
exports.trendQuery1 = trendQuery1;
exports.trendQuery2 = trendQuery2;
exports.trendQuery3 = trendQuery3;
exports.trendQuery4 = trendQuery4;
exports.trendQuery5 = trendQuery5;
exports.trendQuery6 = trendQuery6;
exports.loginUser = loginUser;
exports.registerUser = registerUser;
