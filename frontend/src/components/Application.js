import React, { useState, useEffect } from 'react'
import listingService from '../services/listings'
import applicantService from '../services/applicants'
import applicationService from '../services/applications'

const Application = ({ application }) => {
    const [initialListingInfo, setListingInfo] = useState(null)
    const [initialApplicant, setApplicant] = useState(null)
    const [applications, setApplications] = useState([])
    const [rate, setRate] = useState(0)
    const userType = localStorage.getItem('loggedUserType')
    useEffect(() => {
        listingService
            .getOne(application.listing)
            .then(initialListingInfo => {
                setListingInfo(initialListingInfo)
            })
    }, [])
    useEffect(() => {
        applicantService
            .getOne(application.applicant)
            .then(initialApplicant => {
                setApplicant(initialApplicant)
            })
    }, [])
    useEffect(() => {
        applicationService
            .getAll()
            .then(applications => {
                setApplications(applications)
            })
    }, [])
    const rateListing = (event) => {
        console.log(initialListingInfo.rating.currentRating, "LMAO");
        console.log(initialListingInfo.rating, "LMAOOOOOO");
        console.log(event.target + "LMAOO");
        console.log(rate + "lmao");

        const oldRatings = initialListingInfo.rating.currentRating * initialListingInfo.rating.numOfRatings
        const newNum = initialListingInfo.rating.numOfRatings + 1

        const newRating = (oldRatings + parseInt(rate)) / newNum


        // const newRating = (oldRatings + rate) / newNum
        // const newRating = 
        const acceptedListing = { ...initialListingInfo, rating: { currentRating: newRating, numOfRatings: newNum } }
        console.log(acceptedListing);
        listingService
            .update(initialListingInfo.id, acceptedListing)
    }
    const handleRateChange = (event) => {

        setRate(event.target.value)
        // window.location.reload()
    }
    const AcceptApplication = () => {

        applications.map((app) => {

            if (app.applicant === initialApplicant.id) {
                const removedApp = { ...app, status: 'rejected' }

                applicationService
                    .update(app.id, removedApp)
            }
        })

        const acceptedApplication = { ...application, status: 'accepted' }
        const acceptedApplicant = { ...initialApplicant, workingFor: initialListingInfo.recruiter, workingAt: initialListingInfo.id }
        applicationService
            .update(application.id, acceptedApplication)
        applicantService
            .update(acceptedApplicant.id, acceptedApplicant)
        window.location.reload()
    }
    const ShortlistApplication = () => {
        const shortlistedApplication = { ...application, status: 'shortlist' }
        applicationService
            .update(application.id, shortlistedApplication)
        window.location.reload()
    }
    const RejectApplication = () => {
        const rejectedApplication = { ...application, status: 'rejected' }
        applicationService
            .update(application.id, rejectedApplication)
        window.location.reload()
    }
    const ForAppDetails = () => {

        return (
            <div>
                <p>Title: {initialListingInfo && initialListingInfo.title}</p>
                <p>Salary: {initialListingInfo && initialListingInfo.salary}</p>
                <p>Recruiter: {initialListingInfo && initialListingInfo.recruiteremail}</p>
                <p>Status is {application.status}</p>
                <p>Rating is: {initialListingInfo && initialListingInfo.rating.currentRating}</p>
                <select
                    name="type"
                    value={rate}
                    onChange={handleRateChange}
                >
                    <option value={0}>0</option>
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
                </select>
                <button onClick={rateListing}>Rate this Employee</button>
            </div>
        )
    }
    const ForRecDetails = () => {
        return (
            <div>
                <p>Applicant is {initialApplicant && initialApplicant.email}</p>
                <p>SOP: {application.SOP}</p>
                <p>Skills:</p>
                <ul>
                    {
                        initialApplicant === null ?
                            null :
                            initialApplicant.skills.map((entry) =>
                                <li>{entry.skill}</li>)
                    }
                </ul>
                <p>Date Posted: {application.dateApplied}</p>
                <p>Education details</p>
                <ul>
                    {
                        initialApplicant === null ?
                            null :
                            initialApplicant.education.map((entry) =>
                                <div>
                                    <p>Entry</p>
                                    <li>Institute: {entry.instituteName}</li>
                                    <li>Start: {entry.startYear}</li>
                                    <li>End: {entry.endYear}</li>
                                </div>)
                    }
                </ul>
                <p>Rating: {initialApplicant && initialApplicant.rating.currentRating}</p>
                {
                    application.status === 'wait' ?
                        <div>
                            <button onClick={ShortlistApplication}>
                                Shortlist
                            </button>
                            <button onClick={RejectApplication}>
                                Reject
                            </button>
                        </div>
                        :
                        application.status === 'shortlist' ?
                            <div>
                                <button onClick={AcceptApplication}>
                                    Accept
                            </button>
                                <button onClick={RejectApplication}>
                                    Reject
                            </button>
                            </div>
                            :
                            null
                }

            </div>
        )
    }

    return (
        <div>
            {
                application.status === 'rejected' && userType === '"recruiter"' ?
                    null :
                    <li className='application'>
                        {
                            userType === '"recruiter"' ?
                                <ForRecDetails />
                                :
                                <ForAppDetails />
                        }
                    </li >
            }
        </div>
    )
}

export default Application