import React, { useState, useEffect } from 'react'
import applicationService from '../services/applications'
import { Link } from "react-router-dom"
import listingService from "../services/listings"

// add toggle Importance as parameter to Listing

const Listing = ({ listing, user_id }) => {
    const [appToggle, setAppToggle] = useState(false)
    const [SOPtext, setSOPtext] = useState('')
    const [applications, setApplications] = useState([])
    const [numApplications, setNumApplications] = useState([])
    const [status, setStatus] = useState(null)
    const userType = localStorage.getItem('loggedUserType')
    useEffect(() => {
        applicationService
            .getAll()
            .then(initialApplications => {
                setApplications(initialApplications)

                if (userType === '"applicant"') {
                    let applicantCount = 0
                    initialApplications.forEach((app) => { if (app.listing === user_id) { applicantCount = applicantCount + 1; } })
                    if (applicantCount > 10) {
                        setStatus('error')
                    }
                    let listingMaxAppCount = 0
                    initialApplications.forEach((app) => { if (app.listing === listing.id) { listingMaxAppCount = listingMaxAppCount + 1; } })
                    setNumApplications(listingMaxAppCount)
                    if (listingMaxAppCount > listing.maxApplications) {
                        setStatus('full')
                    }
                    if (initialApplications.find((app) => app.listing === listing.id && app.applicant === user_id)) {
                        setStatus('applied')
                    }
                }
            })
    }, [])
    const applyToggleSetter = () => {
        setAppToggle(true)
    }
    const handleSOPchange = (event) => {
        const tempString = event.target.value
        const words = tempString.split(' ').length - 1
        if (tempString.length < SOPtext.length || words <= 250) {
            setSOPtext(event.target.value)
        }
    }
    const createApplication = (applicationObject) => {
        applicationService
            .create(applicationObject)
    }
    const submitSOP = (event) => {
        event.preventDefault()
        createApplication({
            SOP: SOPtext,
            listing: listing.id,
            dateApplied: new Date()
        })
        setSOPtext('')
        setAppToggle(false)
        window.location.reload()
    }
    const deleteListing = (event) => {
        event.preventDefault()
        listingService
            .deleteOne(listing.id)
        window.location.reload()
    }
    const listingApplicationsLink = `/getListingApplications/${listing.id}`
    return (
        <li className='listing'>
            title: {listing.title}
            <br></br>
            company: {listing.postedOn}
            <br></br>
            Duration: {listing.duration}
            <br></br>
            Applicants: {numApplications}
            <br></br>
            Max Positions: {listing.maxPositions}
            <br></br>
            {
                userType === '"recruiter"' ?
                    <div>
                        <Link to={listingApplicationsLink}>
                            <button type="button">
                                See Applications
                        </button>
                        </Link>
                        <button type="button" onClick={deleteListing}>
                            Delete
                        </button>
                        <Link to={() => `editListing/${listing.id}`}>
                            <button type="button">
                                Edit
                            </button>
                        </Link>
                    </div>
                    :
                    <div>
                        Type: {listing.type}
                        <br></br>
                        Salary: {listing.salary}
                        <br></br>
                        Rating: {listing.rating.currentRating}
                        <br></br>
                        posted by: {listing.recruiteremail}
                        <br></br>
                        {
                            status === 'applied' ?
                                <em style={{ color: "yellow" }}>Applied</em> :
                                status === 'full' ?
                                    <em style={{ color: "red" }}>Full</em> :
                                    status === 'error' ?
                                        <em style={{ color: "green" }}>Error</em> :
                                        <button onClick={applyToggleSetter}>Apply</button>
                        }
                    </div>
            }
            {
                appToggle === false ?
                    null :
                    <div>
                        <textarea value={SOPtext} onChange={handleSOPchange} cols={100} rows={15}></textarea>
                        <button onClick={submitSOP}>Submit</button>
                    </div >
            }
            {/* <button onClick={toggleImportance}>{label}</button> */}
        </li >
    )
}

export default Listing