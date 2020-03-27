const dotenv = require("dotenv");
const sql = require("mssql");
dotenv.config();

const dbconfig = {
    server: process.env.SERVER,
    user: process.env.ADMIN,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    port: 1433,
    options: {
        "enableArithAbort": true,
    },
    multipleStatements: true

};

// connect to database
sql.connect(dbconfig, err => {
    if (err) {
        try {
            throw err;
        } catch (err) {
            console.log("database connection error : \n", err.stack);
        }
    }
    else {
        console.log("Connected to database");
    }
});
db = new sql.Request();

global.db = db;
