const exppress = require('express');
const router = exppress.Router();

const {
  getAllProductMethod,
  addProductMethod,
  getSingleProductMethod,
} = require('../controllers/shop');

// router.get('/shop', getAllProduct);

router.route('/shop').get(getAllProductMethod).post(addProductMethod);
router.route('/shop/:id').get(getSingleProductMethod);

module.exports = router;
