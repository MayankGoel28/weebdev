const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const Applicant = require('../models/applicant')

loginRouter.post('/', async (request, response) => {
    const body = request.body

    const applicant = await Applicant.findOne({ email: body.email })
    const passwordCorrect = applicant === null
        ? false
        : await bcrypt.compare(body.password, applicant.passwordHash)

    if (!(applicant && passwordCorrect)) {
        return response.status(401).json({
            error: 'invalid email or password'
        })
    }

    const applicantForToken = {
        email: applicant.email,
        id: applicant._id,
    }

    const token = jwt.sign(applicantForToken, process.env.SECRET)

    response
        .status(200)
        .send({ token, email: applicant.email, name: applicant.name, id: applicant.id })
})

module.exports = loginRouter
