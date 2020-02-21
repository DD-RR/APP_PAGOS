const express = require('express')
//Cargamos la base de adtos
require('./db/mongoose')
//Cargamos los enrutadores
const User = require('./models/users')
const MovRouter = require('./router/mov')
//Usamos Express
const app = express()
//levanto el server
const port = process.env.PORT || 3001

app.use(express.json())


app.post('/users', (req, res) => {
    const user = new User (req.body)

    user.save().then(() => {
        res.send(user)
    }).catch((e) => {
        res.send(e)
    })
})

app.listen(port, () => {
    console.log('Servidor Levantado en el Puerto: ' + port);
})