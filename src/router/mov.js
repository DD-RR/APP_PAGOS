const express = require('express')
const Mov = require('../models/mov')
const User = require('../models/users')
const router = new express.Router()

router.post('/movi', async (req, res) => {
    /* const mov = new Mov({
        ...req.body,
        owner: req.user._id
    }) */
    const mov = new Mov(req.body)

    try {
        await mov.save()
        res.status(201).send(mov)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.post('/movi', async (req, res) => {
    const user = await User.findById(req.body.propietario);
    if (!user) {
        return res.status(400).send()
    };
    
    const mov = new Mov({
        ...req.body
    })

    try {
        await mov.save()
        res.status(201).send(mov)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.get('/movi', async (req, res) => {
    try {
        const movi = await Mov.find({})
        res.send(movi)
    } catch (e) {
        res.status(500).send()
    }
})

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

router.get('/mov/fecha', async (req, res) => {
    const fecha = req.params.fecha

    try {
        const mov = await Mov.find(fecha)
        if (!fecha) {
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

module.exports = router