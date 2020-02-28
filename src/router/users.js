const express = require('express')
const User = require('../models/users')
const auth = require('../middleware/auth')
const router = new express.Router()


router.post('/users', auth, async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
        res.status(201).send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        console.log(user);
        const token = await user.generateAuthToken();
        console.log(token);
        res.send({ user, token })
        console.log(res.send);
    } catch (e) {
        res.status(400).send()
    }
})

router.post('/users/logout', async (req, res) => {
    try {
        const user = await User.find({token: req.params.token})
        res.send({user})
    } catch (e) {
        res.status(500).send()
    }
}) 

router.get('/users', auth, async(req, res) => {
    try {
        const users = await User.find({})
        res.send(users)
    } catch (e) {
        res.status(500).send()
    }
})
router.get('/users/:id', auth, async(req, res) => {
    const _id = req.params.id
    try {
        const user = await User.findById(_id)
        if (!user) {
            return res.status(404).send()
        }
        res.send(user)
    } catch (e) {
        res.status(500).send()
    }
})

router.patch('/users/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['usuario', 'nombre', 'email', 'password']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    if (!isValidOperation) {
        return res.status(400).send({error: 'Operaciones invalidas!'})
    }
    
    try {
        const user = await User.findById(req.params.id);
        if (!user) {
            return res.status(404).send()
        }
        updates.forEach((update) => user[update] = req.body[update])
        await user.save()
        res.status(200).send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})

router.delete('/users/:id', auth, async(req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id)

        if (!user) {
            return res.status(404).send()

        }
        res.send(user)
    } catch (e) {
        res.status(500).send()
    }
}) 


module.exports = router