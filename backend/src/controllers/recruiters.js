const bcrypt = require('bcrypt')
const recruitersRouter = require('express').Router()
const Recruiter = require('../models/recruiter')

recruitersRouter.get('/', async (request, response) => {
    const recruiters = await Recruiter
        .find({}).populate('notes', { content: 1, date: 1 })
    response.json(recruiters.map(u => u.toJSON()))
})

recruitersRouter.get('/:id', async (request, response) => {
    const recruiter = await Recruiter.findById(request.params.id)
    if (recruiter) {
        response.json(recruiter.toJSON())
    } else {
        response.status(404).end()
    }
})

recruitersRouter.post('/', async (request, response) => {
    const body = request.body

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const recruiter = new Recruiter({
        ...body,
        passwordHash,
    })

    const savedRecruiter = await recruiter.save()

    response.json(savedRecruiter)
})

recruitersRouter.put('/:id', async (request, response, next) => {

    try {
        await Recruiter.findByIdAndUpdate(request.params.id, request.body)
        return response.status(201).end()
    }
    catch (e) {
        next(e)
    }

})

module.exports = recruitersRouter