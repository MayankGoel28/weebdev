const mongoose = require('mongoose')

const listingSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    maxApplications: {
        type: Number,
        required: true,
    },
    maxPositions: {
        type: Number,
        required: true,
    },
    postedOn: {
        type: Date,
    },
    deadline: {
        type: Date,
        required: true,
    },
    joiningDate: {
        type: Date,
        required: true,
    },
    skills: [{
        skill: {
            type: String,
        }
    }],
    type: {
        type: String,
        required: true,
    },
    salary: {
        type: Number,
        required: true,
    },
    rating: {
        currentRating: Number,
        numOfRatings: Number,
    },
    duration: {
        type: Number,
        required: true,
    },
    recruiteremail: {
        type: String,
    },
    recruiter: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Recruiter'
    }
})

listingSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Listing', listingSchema)