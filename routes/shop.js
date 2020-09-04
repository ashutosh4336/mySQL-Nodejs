const exppress = require('express');
const router = exppress.Router();

const { protect, authorize } = require('../middleware/auth');

const {
  getAllProductMethod,
  addProductMethod,
  getSingleProductMethod,
  updateSingleProductMethod,
  deleteSingleProductMethod,
} = require('../controllers/shop');

// router.get('/shop', getAllProduct);

router
  .route('/')
  .get(getAllProductMethod)
  .post(protect, authorize('admin'), addProductMethod);
router
  .route('/:id')
  .get(getSingleProductMethod)
  .put(updateSingleProductMethod)
  .delete(deleteSingleProductMethod);

module.exports = router;
