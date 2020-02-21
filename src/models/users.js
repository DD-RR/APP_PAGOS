const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')

const User = mongoose.model('User', {
    nom: {
        type: String,
        required: true,
        trim: true
    },
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Correo Electronico Invalido')
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('La contraseña no se ah ingresado');
            }
        } 
    }
})


module.exports = User