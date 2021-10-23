const { response } = require('express');
const Rol = require('../models/Rol')

/**
 * Metodo para listar los roles
 * @param {*Request} request 
 * @param {*Response} response
 * @returns 
 */
const getRol = async(request = Request, response = Response) => {

    try {
        let getRol = await Rol.find();

        if (getRol == false) {
            return response.status(400).json({
                ok: false,
                msg: 'No hay Registros actualmente'
            });
        }

        response.status(200).json({
            ok: true,
            msg: 'Registros encontrados exitosamente',
            data: getRol
        });

    } catch (error) {
        console.log('Error en listar roles' + error);
        response.status(500).json({
            ok: false,
            msg: 'error interno del servidor al buscar los registro',
        });
    }
}

/**
 * Metodo para listar los roles por id
 * @param {*Request} request 
 * @param {*Response} response 
 * @returns 
 */
 const getRolForId = async (request = Request, response = Response) => {
    const rolId = request.params.id;

    try {
        const rol = await Rol.findById(rolId);

        if (!rol) {
            response.status(404).json({
                ok: false,
                msg: 'El id del rol no coincide con ningun elemento en la base de datos',
            });
        }

        response.json({
            ok: true,
            msg: 'Rol encontrado de manera exitosa',
            data: rol
        });


    } catch (error) {
        console.log(error);
        response.status(500).json({
            ok: false,
            msg: 'error al listar el rol',
        });
    }
}

/**
 * Metodo para la creacion de roles
 * @param {*Request} request 
 * @param {*Response} response 
 * @returns 
 */
const createRol = async(request = Request, response = Response) => {

    const { name } = request.body;

    try {

        let rol = await Rol.findOne({ name });

        if (rol) {
            return response.status(400).json({
                ok: false,
                msg: 'ya existe un rol registrado con este nombre'
            });
        }

        rol = new Rol(request.body);

        await rol.save();

        response.status(201).json({
            ok: true,
            msg: 'Rol creado de manera exitosa',
            data: Rol
        });

    } catch (error) {
        console.log('Error al crear rol ' + error);
        response.status(500).json({
            ok: false,
            msg: 'error interno del servidor al guardar el registro',
        });
    }
}

/**
 * Metodo para la actualizacion de roles
 * @param {*Request} request 
 * @param {*Response} response 
 * @returns 
 */
const updateRol = async(request = Request, response = Response) => {

    const rolId = request.params.id;

    try {

        const rol = await Rol.findByIdAndUpdate({ _id: rolId });

        if (!rol) {
            response.status(404).json({
                ok: false,
                msg: 'El id del rol no coincide con ningun elemento en la base de datos',
            }); 
        }

        const updateRol = await Rol.findByIdAndUpdate({ _id: rolId }, request.body, { new: true });
        
        response.status(201).json({
            ok: true,
            msg: 'Rol actualizado de manera exitosa',
            data: updateRol
        });

    } catch (error) {
        console.log('Error al actualizar roles' + error);
        response.status(500).json({
            ok: false,
            msg: 'error interno del servidor al actualizar el registro',
        });
    }
}

/**
 * Metodo para la eliminacion de roles
 * @param {*Request} request 
 * @param {*Response} response 
 * @returns 
 */
const deleteRol = async(request = Request, response = Response) => {

    const rolId = request.params.id;

    try {

        const rol = await Rol.findByIdAndDelete({ _id: rolId });

        if (!rol) {
            response.status(404).json({
                ok: false,
                msg: 'El id del rol no coincide con ningun elemento en la base de datos',
            }); 
        }
        
        response.status(201).json({
            ok: true,
            msg: 'Rol eliminado de manera exitosa',
            data: rol
        });

    } catch (error) {
        console.log('Error al eliminar rol ' + error);
        response.status(500).json({
            ok: false,
            msg: 'error interno del servidor al actualizar el registro',
        });
    }
}

module.exports = {
    getRol,
    getRolForId,
    createRol,
    updateRol,
    deleteRol
};