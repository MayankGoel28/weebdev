const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const Recruiter = require('../models/recruiter')

loginRouter.post('/', async (request, response) => {
    const body = request.body

    const recruiter = await Recruiter.findOne({ email: body.email })
    const passwordCorrect = recruiter === null
        ? false
        : await bcrypt.compare(body.password, recruiter.passwordHash)

    if (!(recruiter && passwordCorrect)) {
        return response.status(401).json({
            error: 'invalid email or password'
        })
    }

    const recruiterForToken = {
        email: recruiter.email,
        id: recruiter._id,
    }

    const token = jwt.sign(recruiterForToken, process.env.SECRET)

    response
        .status(200)
        .send({ token, email: recruiter.email, name: recruiter.name, id: recruiter.id })
})

module.exports = loginRouter
