// Inbuilt Node-Module
const crypto = require('crypto');
const path = require('path');
const { networkInterfaces } = require('os');

// Import Packages
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const cors = require('cors');

// Security
const helmet = require('helmet');
const xss = require('xss-clean');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');

// const asyncHandler = require('./middleware/async');

dotenv.config({ path: './config/config.env' });

const app = express();

// Load Models
const User = require('./models/User');
const Product = require('./models/Product');
const Cart = require('./models/Cart');
const CartItem = require('./models/CartItem');

// Body Parser
app.use(express.json());

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 minutes
  max: 150, // limit each IP to 100 requests per windowMs
});

// HTTP Parameter Pollution Attack
app.use(hpp());

//  apply to all requests
app.use(limiter);

// Helmet Middleware
app.use(helmet());

/* make sure this comes before any routes */
app.use(xss());

// Error Handler File
const errorHandler = require('./middleware/error');

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
app.use('/api/v1/shop', shop);
app.use('/api/v1/auth', auth);
app.use('/api/v1/users', users);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

// Association Relation
Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });

// Sequelize Sync
sequelize
  // .sync({ force: true })
  .sync()
  .then((res) => {
    // console.log(res);

    const server = app.listen(PORT, () =>
      console.log(
        `Server Started in Port ${process.env.PORT} on ${process.env.NODE_ENV} mode`
          .yellow.bold
      )
    );
  })
  .catch((err) => console.log(err));

// Handle Unhandled Rejection
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red.bold);
  // Close Server and Exit
  server.close(() => process.exit(1));
});

// Product.belongsTo(User, {constraints: true, onDelete: 'CASCADE})
// User.hasMany(Product)
