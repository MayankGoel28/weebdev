const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const recruiterSchema = mongoose.Schema({
    email: {
        type: String,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        required: true
    },
    passwordHash: String,
    listings: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Listing'
        }
    ],
})

recruiterSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        delete returnedObject.passwordHash
    }
})

recruiterSchema.plugin(uniqueValidator)

const Recruiter = mongoose.model('Recruiter', recruiterSchema)

module.exports = Recruiter