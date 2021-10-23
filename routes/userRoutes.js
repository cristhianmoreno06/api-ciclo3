const { Router } = require('express');
const { check } = require('express-validator');
const { Validate } = require('../middlewares/Validate');
const { getUser, createUser, updateUser, deleteUser, getUserForId } = require('../controllers/UsersController');
const { validateJWT } = require('../middlewares/ValidateJwt');
const router = Router();


router.use(validateJWT);

/**
 * Rutas para la gestion de usuarios
 */
router.get(
    '/list',
    getUser);

router.get(
    '/list/:id',
    getUserForId);

router.post(
    '/create', [
        check('user', 'El nombre de usuario es obligatorio').not().isEmpty(),
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('phone', 'El numero de telefono es obligatorio').isNumeric({ min: 10 }),
        check('rol', 'El rol del usuario es obligatorio'),
        check('password', 'El password debe ser de 6 caracteres').isLength({ min: 6 }),
        Validate
    ],
    createUser);

router.put(
    '/edit/:id', [
        check('user', 'El nombre de usuario es obligatorio').not().isEmpty(),
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('phone', 'El numero de telefono es obligatorio').isNumeric({ min: 10 }),
        //check('rol', 'El rol del usuario es obligatorio').isNumeric(),
        Validate
    ],
    updateUser);

router.delete(
    '/delete/:id',
    deleteUser);

// exportar las rutas configuradas
module.exports = router;