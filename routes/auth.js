const exppress = require('express');
const router = exppress.Router();

const { signUpMethod, loginMethod } = require('../controllers/auth');

router.post('/signup', signUpMethod);
router.post('/login', loginMethod);

module.exports = router;
