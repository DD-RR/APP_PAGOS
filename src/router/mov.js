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


router.get('/movi/owner/owner/:propietario', async (req, res) => {
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
router.get('/movi/date/month/day', async (req, res) => {
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
router.get('/movi/search/user/owner/bd/:propietario', async (req, res) => {
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

module.exports = router