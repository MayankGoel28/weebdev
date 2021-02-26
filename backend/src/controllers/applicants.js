const bcrypt = require('bcrypt')
const applicantsRouter = require('express').Router()
const Applicant = require('../models/applicant')

applicantsRouter.get('/', async (request, response) => {
    const applicants = await Applicant
        .find({}).populate()
    response.json(applicants.map(u => u.toJSON()))
})

applicantsRouter.get('/:id', async (request, response) => {
    const applicant = await Applicant.findById(request.params.id)
    if (applicant) {
        response.json(applicant.toJSON())
    } else {
        response.status(404).end()
    }
})

applicantsRouter.post('/', async (request, response) => {
    const body = request.body

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const applicant = new Applicant({
        ...body,
        rating: {
            currentRating: 0,
            numOfRatings: 0,
        },
        passwordHash,
        workingAt: null,
        workingFor: null,
    })

    const savedApplicant = await applicant.save()

    response.json(savedApplicant)
})

applicantsRouter.put('/:id', async (request, response, next) => {
    try {
        await Applicant.findByIdAndUpdate(request.params.id, request.body)
        return response.status(201).end()
    }
    catch (e) {
        next(e)
    }

})
module.exports = applicantsRouter