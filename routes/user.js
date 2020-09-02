const exppress = require('express');
const router = exppress.Router();

const { protect, authorize } = require('../middleware/auth');

const {
  isAdmin,
  getAllUserMethod,
  getSingleUserMethod,
  updateSingleUserMethod,
  deleteSingleUserMethod,
} = require('../controllers/user');

router.get('/isadmin', protect, isAdmin);

router.get('/', getAllUserMethod);

router
  .route('/:id')
  .get(getSingleUserMethod)
  .put(updateSingleUserMethod)
  .delete(protect, authorize('admin'), deleteSingleUserMethod);

module.exports = router;
