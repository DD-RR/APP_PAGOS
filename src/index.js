const express = require('express')
    //Cargamos la base de adtos
require('./db/mongoose')
    //Cargamos los enrutadores
const userRouter = require('./router/users')
const movRouter = require('./router/mov')
    //Usamos Express
const app = express()
    //levanto el server
const port = process.env.PORT || 3000

app.use(express.json())
app.use(userRouter)
app.use(movRouter)

app.listen(port, () => {
    console.log('Servidor Levantado en el Puerto: ' + port);
})


const Mov = require('./models/mov')
const User = require('./models/users')

const main = async () => {
    const user = await User.findById('')
    await user.pupulate('mov').execPopulate()
    console.log(user.mov);
}