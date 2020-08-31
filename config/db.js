const mysql = require('mysql2');

const pool = mysql.createConnection(
  {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    port: process.env.MYSQL_PORT,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DBNAME,
  },

  console.log(`DB Connected on ${process.env.MYSQL_HOST}`.cyan.bold.underline)
);

module.exports = pool.promise();

/*
MYSQL_HOST=bxqk3vq6mniv7wceepqd-mysql.services.clever-cloud.com
MYSQL_PORT=3306
MYSQL_USER=u6samlswwfg1ulpk
MYSQL_DBNAME=bxqk3vq6mniv7wceepqd
MYSQL_PASSWORD=Mc8qn0qT7RwUnFovOlwu
*/
