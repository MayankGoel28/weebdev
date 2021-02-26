
const config = require('./utils/config')
const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const mongoose = require('mongoose')
const applicationsRouter = require('./controllers/applications')
const applicantsRouter = require('./controllers/applicants')
const loginApplicantRouter = require('./controllers/loginApplicant')
const listingsRouter = require('./controllers/listings')
const recruitersRouter = require('./controllers/recruiters')
const loginRecruiterRouter = require('./controllers/loginRecruiter')

logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        logger.info('connected to MongoDB')
    })
    .catch((error) => {
        logger.error('error connection to MongoDB:', error.message)
    })

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/recruiters', recruitersRouter)
app.use('/api/listings', listingsRouter)
app.use('/api/loginRecruiter', loginRecruiterRouter)
app.use('/api/applicants', applicantsRouter)
app.use('/api/applications', applicationsRouter)
app.use('/api/loginApplicant', loginApplicantRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app