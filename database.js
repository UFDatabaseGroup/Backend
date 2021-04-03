const oracledb = require('oracledb');

oracledb.outFormat = oracledb.OUT_FORMAT_OBJECT;

async function RunOnDB(TrendQuery) {
    let connection;
    try {
        connection = await oracledb.getConnection( {
            user          : process.env.DB_USER,
            password      : process.env.DB_PASSWD,
            connectString : "oracle.cise.ufl.edu/orcl"
        });
        const result = await connection.execute(
            `${TrendQuery};` // PUT TREND QUERY HERE
        );
        console.log(result);

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
}

async function TrendQuery1() {
    const query = `SELECT COUNT(*) FROM J.LUO.COVID_DATA;`;
    console.log(query);
    let result = await RunOnDB(query);
    console.log(result);
}

async function TrendQuery2() {

}

async function TrendQuery3() {

}

async function TrendQuery4() {

}

async function TrendQuery5() {

}

exports.TrendQuery1 = TrendQuery1;
exports.TrendQuery2 = TrendQuery2;
exports.TrendQuery3 = TrendQuery3;
exports.TrendQuery4 = TrendQuery4;
exports.TrendQuery5 = TrendQuery5;
