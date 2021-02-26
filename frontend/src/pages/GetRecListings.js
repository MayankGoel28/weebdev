import React, { useState, useEffect } from 'react'
import listingService from '../services/listings'
import Listing from '../components/Listing'
import applicationService from '../services/applications'
import { Link } from "react-router-dom"

const GetRecListings = (props) => {
    const user_id = props.match.params.id
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    const loggedUserJSONEmail = JSON.parse(loggedUserJSON).email
    const [listings, setListings] = useState([])
    useEffect(() => {
        listingService
            .getAll()
            .then(initialListings => {
                setListings(initialListings)
            })
    }, [])
    console.log('user stuff is', loggedUserJSONEmail, 'and')
    const newListings = listings.filter((listing) => listing.recruiteremail === loggedUserJSONEmail)
    return (
        <div>
            <h3><Link to="/">Home</Link><br></br></h3>
            <h1>My Listings</h1>
            <ul>
                {newListings.map((listing) =>
                    <Listing
                        listing={listing}
                    // toggleImportance={() => toggleImportanceOf(listing.id)}
                    />
                )}
            </ul>
        </div>
    )
}

export default GetRecListings