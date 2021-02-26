import React, { useEffect } from 'react'
import listingService from '../services/listings'
import ListingForm from '../components/ListingForm'
import { Link } from "react-router-dom"

const PostListing = () => {
    const addListing = (listingObject) => {

        listingService
            .create(listingObject)
    }
    return (
        <div>
            <h3><Link to="/">Home</Link></h3>
            <ListingForm createListing={addListing} editData={null} />
        </div>
    )
}

export default PostListing