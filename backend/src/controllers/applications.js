const applicationsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Application = require('../models/application')
const Applicant = require('../models/applicant')
const nodemailer = require('nodemailer')

const getTokenFrom = request => {
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        return authorization.substring(7)
    }
    return null
}

applicationsRouter.get('/', async (request, response) => {
    const applications = await Application
        .find({}).populate()

    response.json(applications.map(application => application.toJSON()))
})

applicationsRouter.post('/', async (request, response) => {
    const body = request.body
    const token = getTokenFrom(request)

    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }

    const applicant = await Applicant.findById(decodedToken.id)

    const application = new Application({
        ...body,
        applicant: applicant._id,
        status: "wait",
        applicantemail: applicant.email,
    })

    const savedApplication = await application.save()
    applicant.applications = applicant.applications.concat(savedApplication._id)
    await applicant.save()

    response.json(savedApplication.toJSON())
})

applicationsRouter.get('/:id', async (request, response) => {
    const application = await Application.findById(request.params.id)
    if (application) {
        response.json(application.toJSON())
    } else {
        response.status(404).end()
    }
})

applicationsRouter.put('/:id', async (request, response, next) => {
    try {
        await Application.findByIdAndUpdate(request.params.id, request.body)
        // try {
        //     if (request.body.status === 'accepted') {
        //         let mailTransporter = nodemailer.createTransport({
        //             service: 'gmail',
        //             auth: {
        //                 user: 'xyz@gmail.com',
        //                 pass: '*************'
        //             }
        //         })

        //         let mailDetails = {
        //             from: 'xyz@gmail.com',
        //             to: request.body.applicantemail,
        //             subject: 'Test mail',
        //             text: 'Node.js testing mail for GeeksforGeeks'
        //         }

        //         mailTransporter.sendMail(mailDetails, function (err, data) {
        //             if (err) {
        //                 console.log('Error Occurs');
        //             } else {
        //                 console.log('Email sent successfully');
        //             }
        //         })

        //     }
        // } catch { console.log("error") }

        return response.status(201).end()
    }
    catch (e) {
        next(e)
    }

})

applicationsRouter.delete('/:id', async (request, response, next) => {
    const application = await Application.findById(request.params.id)
    if (!application) {
        response.status(404).end()
    }
    try {
        await application.remove()
        return response.status(204).end()
    }
    catch (e) {
        next(e)
    }

    await Application.findByIdAndRemove(request.params.id)
    response.status(204).end()
})

module.exports = applicationsRouter