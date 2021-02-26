import React, { useState, useEffect } from 'react'
import listingService from '../services/listings'
import applicantService from '../services/applicants'
const Applicant = ({ applicant }) => {

    const [rate, setRate] = useState(0)
    const [listingInfo, setListingInfo] = useState({ postedOn: null, title: null, type: 'part', salary: null, duration: null, skills: null, deadline: new Date(), maxApplications: null, maxPositions: null })
    // const [editData, setEditData] = useState({ postedOn: null, title: null, type: 'part', salary: null, duration: null, skills: null, deadline: new Date(), maxApplications: null, maxPositions: null })
    useEffect(() => {
        listingService
            .getOne(applicant.workingAt)
            .then((listingInfo) => {
                setListingInfo({ ...listingInfo })
            })
    }, [])
    const rateApplicant = (event) => {
        const oldRatings = applicant.rating.currentRating * applicant.rating.numOfRatings
        const newNum = applicant.rating.numOfRatings + 1
        const newRating = (oldRatings + parseInt(rate)) / newNum
        const acceptedApplicant = { ...applicant, rating: { currentRating: newRating, numOfRatings: newNum } }
        applicantService
            .update(applicant.id, acceptedApplicant)
    }
    const handleRateChange = (event) => {

        setRate(event.target.value)
    }
    return (
        <div>
            <li>
                <p>Name of Employee: {applicant.name}</p>
                <p>Type: {listingInfo.type}</p>
                <p>Job title: {listingInfo.title}</p>
                <p>Rating: {applicant.rating.currentRating}</p>
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
                <button onClick={rateApplicant}>Rate this Employee</button>
            </li>
        </div>
    )
}

export default Applicant