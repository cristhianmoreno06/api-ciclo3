const { Schema, model } = require('mongoose');

const UserSchema = Schema({
    name: { type: String, require: true, lowercase: true },
    typeRol: { type: Number, require: true },
    status: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now() }
}, {
    collection: 'Roles',
    versionKey: false
});

module.exports = model('Rol', UserSchema);