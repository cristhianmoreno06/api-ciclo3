const { response } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { generateJWT } = require('../helpers/jwt');
const Rol = require('../models/Rol');

/**
 * Metodo para verificar la autenticacion del usuario
 * @param {*Request} request 
 * @param {*Response} response 
 * @returns 
 */
const userLogin = async (request = Request, response = Response) => {
    console.log(request.body);
    const { email, password } = request.body;

    try {
        let user = await User.findOne({ email });

        if (!user) {
            response.status(400).json({
                ok: true,
                msg: 'Usuario o contraseña errada'
            });
        }

        const validPassword = bcrypt.compareSync(password, user.password);

        if (!validPassword) {
            console.log(123);
            response.status(400).json({
                ok: true,
                msg: 'Usuario o contraseña errada'
            });
        }

        const token = await generateJWT(user.id, user.name);

        response.status(200).json({
            ok: true,
            msg: 'Ok',
            token: token,
            data: User
        });

    } catch (error) {
        console.log('Error en la autenticacion' + error);
        response.status(500).json({
            ok: false,
            msg: 'error interno del servidor al autenticar',
        });
    }
}

/**
 * Metodo para la verificacion del usuario con google OAuth2
 * @param {*Request} request 
 * @param {*Response} response 
 * @returns 
 */
const authGoogle = async (request = Request, response = Response) => {

    const { uid, name, email } = request;

    try {
        let user = await User.findOne({ email, idGoogleSession: uid }).populate('rol', 'name typeRol status -_id');
        let rol = await Rol.findOne({ typeRol: 0 });

        if (user) {
            if (user.rol.typeRol == 0) {
                return response.status(401).json({
                    ok: true,
                    msg: 'Su usario tine que ser validado por un Administrador'
                });
            } else {
                const token = await generateJWT(user.id, user.name);

                return response.status(200).json({
                    ok: true,
                    msg: 'Usuario logeado correctamente',
                    token: token,
                    data: User
                });
            }

        } else {
            let userName = name.split(' ');

            user = new User({
                user: userName[0] + '.' + userName[1],
                email: email,
                name: name,
                phone: null,
                rol: rol.id,
                password: email + Date.now(),
                status: false,
                idGoogleSession: uid
            });

            await user.save();

            return response.status(201).json({
                ok: true,
                msg: 'Por favor comuniquese con su Administrador',
                data: User
            });
        }

    } catch (error) {
        console.log('Error en crear usuario por google' + error);
        response.status(500).json({
            ok: false,
            msg: 'error interno del servidor al crear usuario logeado por google',
        });
    }
}

/**
 * Metodo para la revalidacion del token de autenticacion
 * @param {*Request} request 
 * @param {*Response} response 
 */
const revalidateToken = async (request = Request, response = Response) => {

    const { uid, name } = request;

    /**Generar Nuevo Token */
    const token = await generateJWT(uid, name);

    resp.json({
        ok: true,
        token: token
    });
}


module.exports = {
    userLogin,
    authGoogle,
    revalidateToken
};