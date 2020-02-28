const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


const userSchema = new mongoose.Schema({
    usuario: {
        type: String,
        unique: true,
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
    },
    tokens: [{
        token: {
            type: String
        }
    }]
})

userSchema.virtual('mov', {
    ref: 'Mov',
    localField: '_id',
    foreignField: 'propietario'
}) 

userSchema.pre('save', async function (next) {
    const user = this
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })
    if (!user) {
        throw new Error('No se puede Iniciar Sesión')
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
        throw new Error('No se Puede Iniciar Sesión')
    }
    return user
}

userSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()
    delete userObject.password
    // delete userObject.email
    return userObject
}

userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, 'jsonwebtoken')

    user.tokens = user.tokens.concat({ token })
    await user.save()

    return token
}

const User = mongoose.model('User', userSchema)


module.exports = User