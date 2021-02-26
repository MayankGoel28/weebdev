const mongoose = require('mongoose')

const applicationSchema = new mongoose.Schema({
    SOP: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
    applicantemail: {
        type: String
    },
    dateApplied: {
        type: Date,
    },
    applicant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Applicant'
    },
    listing: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Listing'
    },
})

applicationSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Application', applicationSchema)