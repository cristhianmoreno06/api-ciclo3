const { response } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User')

/**
 * Metodo para listar los usuarios
 * @param {*Request} request 
 * @param {*Response} response 
 * @returns 
 */
const getUser = async (request = Request, response = Response) => {

    try {
        let getUser = await User.find().populate('rol', 'name typeRol status _id');

        if (getUser == false) {
            return response.status(400).json({
                ok: false,
                msg: 'No hay Registros actualmente'
            });
        }

        response.status(200).json({
            ok: true,
            msg: 'Registros encontrados exitosamente',
            data: getUser
        });

    } catch (error) {
        console.log('Error en listar usuarios' + error);
        response.status(500).json({
            ok: false,
            msg: 'error interno del servidor al buscar los registro',
        });
    }
}

/**
 * Metodo para listar los usuarios por id
 * @param {*Request} request 
 * @param {*Response} response 
 * @returns 
 */
const getUserForId = async (request = Request, response = Response) => {
    const userId = request.params.id;

    try {
        const user = await User.findById(userId).populate('rol', 'name typeRol status _id');

        if (!user) {
            response.status(404).json({
                ok: false,
                msg: 'El id del usuario no coincide con ningun elemento en la base de datos',
            });
        }

        response.json({
            ok: true,
            msg: 'Usuario encontrado de manera exitosa',
            data: user
        });


    } catch (error) {
        console.log(error);
        response.status(500).json({
            ok: false,
            msg: 'error al actualizar el usuario',
        });
    }
}

/**
 * Metodo para la creacion de usuarios
 * @param {*Request} request 
 * @param {*Response} response 
 * @returns 
 */
const createUser = async (request = Request, response = Response) => {

    const { email, password } = request.body;

    try {

        let user = await User.findOne({ email });

        if (user) {
            return response.status(400).json({
                ok: false,
                msg: 'ya existe un usuario registrado con este email'
            });
        }

        user = new User(request.body);

        /**Encriptando contraseña */
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);

        await user.save();

        response.status(201).json({
            ok: true,
            msg: 'Usuario creado de manera exitosa',
            data: User
        });

    } catch (error) {
        console.log('Error al crear usuarios' + error);
        response.status(500).json({
            ok: false,
            msg: 'error interno del servidor al guardar el registro',
        });
    }
}

/**
 * Metodo para la actualizacion de usuarios
 * @param {*Request} request 
 * @param {*Response} response 
 * @returns 
 */
const updateUser = async (request = Request, response = Response) => {

    const userId = request.params.id;

    try {

        const user = await User.findByIdAndUpdate({ _id: userId });

        if (!user) {
            response.status(404).json({
                ok: false,
                msg: 'El id del usuario no coincide con ningun elemento en la base de datos',
            }); 
        }

        const updateUser = await User.findByIdAndUpdate({ _id: userId }, request.body, { new: true });
        
        response.status(201).json({
            ok: true,
            msg: 'Usuario actualizado de manera exitosa',
            data: updateUser
        });

    } catch (error) {
        console.log('Error al actualizar usuarios' + error);
        response.status(500).json({
            ok: false,
            msg: 'error interno del servidor al actualizar el registro',
        });
    }
}

/**
 * Metodo para la eliminacion de usuarios
 * @param {*Request} request 
 * @param {*Response} response 
 * @returns 
 */
const deleteUser = async (request = Request, response = Response) => {

    const userId = request.params.id;

    try {
        const user = await User.findByIdAndDelete({ _id: userId });

        if (!user) {
            response.status(404).json({
                ok: false,
                msg: 'El id del usuario no coincide con ningun elemento en la base de datos',
            });
        }

        response.status(201).json({
            ok: true,
            msg: 'Usuario eliminado de manera exitosa',
            data: user
        });

    } catch (error) {
        console.log('Error al eliminar usuarios' + error);
        response.status(500).json({
            ok: false,
            msg: 'error interno del servidor al inactivar el registro',
        });
    }
}

module.exports = {
    getUser,
    createUser,
    updateUser,
    deleteUser,
    getUserForId
};