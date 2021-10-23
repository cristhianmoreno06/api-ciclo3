const { response } = require('express');
const { OAuth2Client } = require('google-auth-library');
const { subscribe } = require('../routes/authRoutes');
const client = new OAuth2Client(process.env.Google_Client_Id);


/**
 * 
 * @param {*Request} request 
 * @param {*Response} response 
 * @param {*} next 
 * @returns 
 */
const googleValidate = (request = Request, response = Response, next) => {

    let token = '';
    token = request.headers['x-acces-token'] || request.headers['authorization']

    if (!token) {
        return response.status(401).json({
            ok: false,
            msg: 'No se ha proporcionado un token valido'
        });
    }

    if (token.startsWith('Bearer ')) {
        token = token.slice(7, token.length);
    }

    try {

        client.verifyIdToken({
                idToken: token,
                audience: process.env.Google_Client_Id
            })
            .then((resp) => {
                const { sub, name, email } = resp.payload;
                request.uid = sub;
                request.name = name;
                request.email = email;
                next();
            })
            .catch((error) => {
                return response.status(401).json({
                    ok: false,
                    msg: 'Token invalido'
                });
            });
    } catch (error) {
        return response.status(500).json({
            ok: false,
            msg: 'Error interno de servidor'
        });
    }
}

module.exports = {
    googleValidate
}