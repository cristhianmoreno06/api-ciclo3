const { response } = require('express');
const jwt = require('jsonwebtoken');

const validateJWT = (request = Request, response = Response, next) => {

    /**x-token headers */

    const token = request.header('authorization').split(' ')[1];

    if (!token) {
        return response.status(401).json({
            ok: false,
            msg: 'No se ha proporcionado un token valido'
        });
    }

    // console.log(token);

    try {

        const { uid, name } = jwt.verify(
            token,
            process.env.Secret_JWT
        );

        request.uid = uid;
        request.name = name;
        
    } catch (error) {
        return response.status(401).json({
            ok: false,
            msg: 'Token invalido',
            data: error
        });
    }

    next();

}

module.exports = {
    validateJWT
}