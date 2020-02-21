const express = require('express')
    //Cargamos la base de adtos
require('./db/mongoose')
    //Cargamos los enrutadores
    /* const User = require('./models/users')
    const MovRouter = require('./router/mov') */
const userRouter = require('./router/users')
const movRouter = require('./router/mov')
    //Usamos Express
const app = express()
    //levanto el server
const port = process.env.PORT || 3001

app.use(express.json())
app.use(userRouter)
app.use(movRouter)



app.listen(port, () => {
    console.log('Servidor Levantado en el Puerto: ' + port);
})