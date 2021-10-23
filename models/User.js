const { Schema, model } = require('mongoose');
const Rol = require('./Rol');

const UserSchema = Schema({
    user: { type: String, require: true, unique: true, dropDups: true },
    email: { type: String, require: true, unique: true, dropDups: true, lowercase: true },
    name: { type: String, require: true },
    phone: { type: Number, unique: true },
    rol: { type: Schema.Types.ObjectId, ref: "Rol", require: true },
    password: { type: String, require: true },
    status: { type: Boolean, default: true },
    idGoogleSession: { type: String},
    createdAt: { type: Date, default: Date.now() }
}, {
    collection: 'Usuarios',
    versionKey: false
});

module.exports = model('Usuario', UserSchema);