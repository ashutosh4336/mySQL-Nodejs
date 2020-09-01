const exppress = require('express');
const router = exppress.Router();

const { getAllUserMethod } = require('../controllers/user');

router.get('/', getAllUserMethod);

module.exports = router;
