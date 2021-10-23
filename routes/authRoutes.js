const { Router } = require('express');
const { check } = require('express-validator');
const { Validate } = require('../middlewares/Validate');
const { validateJWT } = require('../middlewares/ValidateJwt');
const { googleValidate } = require('../middlewares/GoogleValidate');
const { userLogin } = require('../controllers/AuthController');
const { authGoogle } = require('../controllers/AuthController');
const { revalidateToken } = require('../controllers/AuthController');
const router = Router();


router.post(
    '/login', [
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe ser de 6 caracteres').isLength({ min: 6 }),
        Validate
    ],
    userLogin);

router.post('/google/login', googleValidate, authGoogle);

router.get('/renew', validateJWT, revalidateToken);

// exportar las rutas configuradas
module.exports = router;