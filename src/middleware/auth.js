const jwt = require('jsonwebtoken');
const User = require('../models/users');
const Mov = require('../models/mov');

const auth = async (req, res, next) => {
    try {
        console.log('Autenticación');
        const token = req.header('Authorization')
        console.log(token);
        const decoded = jwt.verify( token, 'jsonwebtoken' )
        console.log(decoded);
        const user = await User.findOne({_id: decoded._id, 'token.token':  token})
        if (!user) {
            throw new Error()
        }
        req.token = token
        req.user = user 
        next()
       } catch (e) {
        res.status(401).send({ error: 'Porfavor Autentificarse', e })
   }
}

module.exports = auth


/*  try {
         const token = req.header('Authorization').replace('Bearer ' ,'')
         const decoded = jwt.verify(token, 'jsonwebtoken')
         const user = await User.findOne({_id: decoded._id, 'tokens.token':  token})
         if (!user) {
             throw new Error()
         }
         req.token = token
         req.user = user 
         next()
        } catch (e) {
         res.status(401).send({error: 'Porfavor Autentificarse'}, e)
    } 
*/