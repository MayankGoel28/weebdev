const listingsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const Listing = require('../models/listing')
const Recruiter = require('../models/recruiter')

const getTokenFrom = request => {
    const authorization = request.get('authorization')
    if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
        return authorization.substring(7)
    }
    return null
}

listingsRouter.get('/', async (request, response) => {
    const listings = await Listing
        .find({}).populate()

    response.json(listings.map(listing => listing.toJSON()))
})

listingsRouter.post('/', async (request, response) => {
    const body = request.body
    const token = getTokenFrom(request)

    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }

    const recruiter = await Recruiter.findById(decodedToken.id)
    const listing = new Listing({
        ...body,
        rating: {
            currentRating: 0,
            numOfRatings: 0,
        },
        recruiter: recruiter._id,
        recruiteremail: recruiter.email
    })
    const savedListing = await listing.save()
    recruiter.listings = recruiter.listings.concat(savedListing._id)
    await recruiter.save()

    response.json(savedListing.toJSON())
})

listingsRouter.get('/:id', async (request, response) => {
    const listing = await Listing.findById(request.params.id)
    if (listing) {
        response.json(listing.toJSON())
    } else {
        response.status(404).end()
    }
})

listingsRouter.put('/:id', async (request, response, next) => {

    try {
        await Listing.findByIdAndUpdate(request.params.id, request.body)
        return response.status(201).end()
    }
    catch (e) {
        next(e)
    }

})

listingsRouter.delete('/:id', async (request, response, next) => {
    const listing = await Listing.findById(request.params.id)
    if (!listing) {
        response.status(404).end()
    }
    try {
        await listing.remove()
        return response.status(204).end()
    }
    catch (e) {
        next(e)
    }

    await Listing.findByIdAndRemove(request.params.id)
    response.status(204).end()
})

module.exports = listingsRouter