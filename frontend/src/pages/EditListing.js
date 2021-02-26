import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom"
import ListingForm from '../components/ListingForm'
import listingService from '../services/listings'
const EditListing = (props) => {
    const id = props.match.params.id
    const [listingInfo, setListingInfo] = useState({ postedOn: null, title: null, type: 'part', salary: null, duration: null, skills: null, deadline: new Date(), maxApplications: null, maxPositions: null })
    // const [editData, setEditData] = useState({ postedOn: null, title: null, type: 'part', salary: null, duration: null, skills: null, deadline: new Date(), maxApplications: null, maxPositions: null })
    useEffect(() => {
        listingService
            .getOne(id)
            .then((listingInfo) => {

                setListingInfo({ ...listingInfo })

                //setEditData({ ...initialListingInfo })
            })
    }, [])
    const putListing = (id, listingObject) => {

        listingService
            .update(id, listingObject)
    }
    return (
        <div>
            <h3><Link to="/">Home</Link></h3>
            {
                listingInfo.title === null ?
                    null :
                    <ListingForm createListing={putListing} editId={id} editData={listingInfo} />
            }

        </div>
    )
}

export default EditListing