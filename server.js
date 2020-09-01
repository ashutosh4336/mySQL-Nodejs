const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const cors = require('cors');

dotenv.config({ path: './config/config.env' });

const app = express();

// Body Parser
app.use(express.json());

// CORS
app.use(cors());

// Import DB File & Connect
const sequelize = require('./config/db');

// load routes
const shop = require('./routes/shop');
const auth = require('./routes/auth');
const users = require('./routes/user');

// Dev Logging Middleware
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'));

// Mount Routes
app.use('/api/v1', shop);
app.use('/api/v1/auth', auth);
app.use('/api/v1/users', users);

const PORT = process.env.PORT || 5000;

// Sequelize Sync
sequelize.sync(async (res) => {});

const server = app.listen(PORT, () =>
  console.log(
    `Server Started in Port ${process.env.PORT} on ${process.env.NODE_ENV} mode`
      .yellow.bold
  )
);
// Handle Unhandled Rejection
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red.bold);
  // Close Server and Exit
  server.close(() => process.exit(1));
});

/*
// Test
app.get('/api/v1/get', async (req, res, next) => {
  try {
    const sqlQuery = `SELECT * from products`;
    const data = await db.execute(sqlQuery);
    return res.status(200).json({ count: data[0].length, data: data[0] });
  } catch (err) {
    console.log(err);
  }
});
*/
