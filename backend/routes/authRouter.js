const { signupValidation, loginValidation } = require('../middlewares/authValidation');
const { signup, login } = require('../controllers/authController');

const router = require('express').Router();

router.post('/signup', signupValidation, signup);
router.post('/login', loginValidation, login);

module.exports = router;