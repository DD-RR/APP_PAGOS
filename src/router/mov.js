const express = require('express')
const moment = require('moment')
const Mov = require('../models/mov')
const User = require('../models/users')
const router = new express.Router()


router.post('/movi', async (req, res) => {
    
    const mov = new Mov(req.body)

    try {
        await mov.save()
        res.status(201).send(mov)
    } catch (e) {
        res.status(400).send(e)
    }
})

//Busqueda Todos Movimientos
router.get('/movi', async (req, res) => {
    try {
        const movi = await Mov.find({})
        res.send(movi)
    } catch (e) {
        res.status(500).send()
    }
})

// Busqueda por el id del movimiento
router.get('/movi/:id', async (req, res) => {
    const _id = req.params.id
    try {
        const mov = await Mov.findById(_id)
        if (!mov) {
            return res.status(404).send()
        }
        res.send(mov)
    } catch (e) {
        res.status(500).send()
    }
})


router.get('/movi/owner/:propietario', async (req, res) => {
    // console.log('Algo');
    try {
        const mov = await Mov.find({propietario: req.params.propietario});
        console.log(mov);
        if (!mov) {
            return res.status(404).send();
        }
        res.send(mov);
    } catch (e) {
        res.status(500).send();
    }
})

//Consultar los movimientos por fecha con (query string)
router.get('/movi/date/day', async (req, res) => {
    // console.log('algo');
    try {
        //  busca los parametros dentro del objeto req.query (query string)
        const mov = await Mov.find({ fecha: req.query.fecha })
        // console.log(mov);
        if (!mov) {
            return res.status(404).send()
        }
        res.send(mov)
    } catch (e) {
        res.status(500).send()
    }
})

router.patch('/movi/:id', async (req, res) =>{
    const updates = Object.keys(req.body)
    const allowedUpdates = [ 'tipo', 'motivo', 'cantidad']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(404).send({error: 'Actualizaciones Invalidas'})
    }

    try {
        const mov = await Mov.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true})
        if (!mov) {
            return res.status(404).send()
        }
        res.send(mov)
    } catch (e) {
        res.status(400).send()
    }
})

router.delete('/movi/:id', async (req, res) => {
    try {
        const mov = await Mov.findByIdAndDelete(req.params.id)
        if (!mov) {
            res.status(404).send()
        }
        res.send(mov)
    } catch (e) {
        res.status(500).send()
    }
})

//Último Movimiento
router.get('/movi/search/:propietario', async (req, res) => {
    console.log('Algo');
    try {
        const mov = await Mov.find({propietario: req.params.propietario, fecha: req.query.fecha})
        console.log(mov);
        if (!mov) {
            res.status(404).send()
        }
        res.send(mov)
    } catch (e) {
        res.status(500).send()        
    }
    
})
//Busqueda por motivo 
router.get('/movi/total/:motivo', async (req, res) =>{
    try {
        const mov = await Mov.find({motivo: req.params.motivo})
        //console.log(mov);
        if (!mov) {
            res.status(404).send()
        } 
        res.send(mov)
    } catch (e) {
        res.status(500).send()
    }
})
//suma de totales por motivo
router.get('/movi/movs/:motivo', async (req, res) =>{
    try {
        var cont = 0;
        var sum1 = 0;
        const mov = await Mov.find({ motivo: req.params.motivo})
            mov.forEach(movi => {
                if (movi.motivo == req.params.motivo ) {
                    cont += 1;
                    sum1 += movi.cantidad;
                }
            });
            //console.log(mov);
            console.log('El total es: ', + sum1);
            if (!mov) {
                res.status(404).send()
            }
            res.send(mov)   
    } catch (e) {
        res.status(500).send()
    } 
})

//Buesuqeda por rango de fecha
router.get('/movi/fecha/rFecha', async (req, res) =>{
    
    try {
        var cont = 0;
        var sum = 0;
        const mov = await Mov.find({
            fecha: {
                $gte: new Date (new Date(req.query.fechaInicio).setHours(00,00,00)),
                $lt: new Date (new Date(req.query.fechaFin).setHours(23,59,59))
            }
        })
            mov.forEach(movi => {
                if (movi.motivo == 'Ingreso' ) {
                    cont += 1;
                    sum += movi.cantidad;
                } else {
                    movi.cantidad;
                    cont +=1;
                    sum -= movi.cantidad
                }
            });
            // console.log(mov);
            console.log('El Total es: ', + sum);     
        if (!mov) {
            res.status(404).send()
        }
        res.send(mov)
    } catch (e) {
        console.log(e);
        res.status(500).send()
    } 
})

router.get('/movi/saldo/:propietario', async (req, res) => {
    try {
        cont = 0;
        sum = 0;
        const mov = await Mov.find({propietario: req.params.propietario})
        mov.forEach(movi => {
            if (movi.motivo == 'Ingreso') {
                cont += 1;
                sum += movi.cantidad
            } else {
                sum -= movi.cantidad
            }
        });
        console.log('El total es: ' + sum);
        return res.send({ Suma: 'La suma es ' + sum })
        if (!mov) {
            res.status(404).send()
        }
        //res.send(mov)
    } catch (e) {
        res.status(500).send();
    }
})

module.exports = router