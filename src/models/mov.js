const mongoose = require('mongoose')

const Mov = mongoose.model('Mov', {
    tipo: {
        type: String,
        required: true,
        trim: true
    },
    motivo: {
        type: String,
        required: true,
        trim: true
    },
    cantidad: {
        type: Number,
        required: true,
        trim: true,
        validate(value) {
            if (value < 0) {
                throw new Error('Verifique la cantidad.!')
            }
        }
    },
    fecha: {
        type: Date,
        trim: true
        //required: true
    }, 
    propietario: {
        type: String,
        required: true,
        trim: true
    }
})


module.exports = Mov