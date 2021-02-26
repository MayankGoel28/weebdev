import React, { useState, useEffect } from 'react'
import listingService from '../services/listings'
import applicationService from '../services/applications'
import Application from '../components/Application'
import { Link } from "react-router-dom"

const GetListingApplications = (props) => {
    const id = props.match.params.id
    const [initialListingInfo, setListingInfo] = useState(null)
    const [applications, setApplications] = useState([])
    useEffect(() => {
        applicationService
            .getAll()
            .then(initialApplications => {
                setApplications(initialApplications)
            })
    }, [])
    useEffect(() => {
        listingService
            .getOne(id)
            .then(initialListingInfo => {
                setListingInfo(initialListingInfo)
            })
    }, [])
    const onlyApplicationOfListing = applications.filter((application) => application.listing === id)
    return (
        <div>
            <h3><Link to="/">Home</Link><br></br></h3>
            <p>Title is {initialListingInfo && initialListingInfo.title}</p>
            <ul>
                {onlyApplicationOfListing.map((application) =>
                    <Application
                        application={application}
                    // toggleImportance={() => toggleImportanceOf(listing.id)}
                    />
                )}
            </ul>
        </div>
    )
}

export default GetListingApplications