const Sequelize = require('sequelize');

const sequelize = new Sequelize(
  process.env.MYSQL_DBNAME,
  process.env.MYSQL_USER,
  process.env.MYSQL_PASSWORD,
  {
    dialect: 'mysql',
    host: process.env.MYSQL_HOST,
    charset: 'utf8',
    query: {
      raw: true,
    },
    logging: false,
    dialectOptions: {
      dateStrings: true,
      typeCast: true,
    },
    timezone: '+05:30', //for writing to database
  },
  console.log(`DB Connected on ${process.env.MYSQL_HOST}`.cyan.bold.underline)
);

module.exports = sequelize;

/*
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
*/
