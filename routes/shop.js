const exppress = require('express');
const router = exppress.Router();

const {
  getAllProductMethod,
  addProductMethod,
  getSingleProductMethod,
  updateSingleProductMethod,
  deleteSingleProductMethod,
} = require('../controllers/shop');

// router.get('/shop', getAllProduct);

router.route('/shop').get(getAllProductMethod).post(addProductMethod);
router
  .route('/shop/:id')
  .get(getSingleProductMethod)
  .put(updateSingleProductMethod)
  .delete(deleteSingleProductMethod);

module.exports = router;
