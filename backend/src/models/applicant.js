const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const applicantSchema = mongoose.Schema({
    email: {
        type: String,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    passwordHash: String,
    education: [{
        instituteName: {
            type: String,
            required: true
        },
        startYear: {
            type: Number,
            required: true,
        },
        endYear: Number
    }],
    skills: [{
        skill: {
            type: String,
        }
    }],
    rating: {
        currentRating: Number,
        numOfRatings: Number,
    },
    applications: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Application',
        }
    ],
    workingAt: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Listing'
    },
    workingFor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Recruiter'
    },
})

applicantSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        delete returnedObject.passwordHash
    }
})

applicantSchema.plugin(uniqueValidator)

const Applicant = mongoose.model('Applicant', applicantSchema)

module.exports = Applicant