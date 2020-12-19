const User = require('../model/User')
const Jwt = require('jsonwebtoken')
const { SECRET_JWT, MAX_AGE } = require('../utils/Consts')



const createToken = (id) => {
    const token = Jwt.sign({id}, SECRET_JWT, { expiresIn: MAX_AGE})
    return token
}


module.exports.signup_post = async (req, res) => {
    // Register a new user to the database
    const { email, password } = req.body
    try {
        const user = await User.create({email, password})
        const token = createToken(user.id)
        res.send({token})

    } catch(error) {
        if (error.code === 11000) {
            error = "this email already exists "
        }
        res.status(400).send({error})
    }
}

module.exports.login_post = async (req, res) => {
    // Verify a user if exists
    const { email, password } = req.body
    try {
        const user = await User.login(email, password)
        const token = createToken(user.id)
        res.send({token})
    } catch(err) {
        const error = err.message
        res.status(400).send({error})
    }
}

