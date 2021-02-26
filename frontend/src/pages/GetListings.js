import React, { useState, useEffect } from 'react'
import listingService from '../services/listings'
import Listing from '../components/Listing'
import { Link } from "react-router-dom"
import applicantService from '../services/applicants'
import Fuse from 'fuse.js'

const GetListings = (props) => {
    const user_id = props.match.params.id
    const [listings, setListings] = useState([])
    // const [applicant, setApplicant] = useState(null)
    // useEffect(() => {
    //     applicantService
    //         .getOne(user_id)
    //         .then(applicant => {
    //             setApplicant(applicant)
    //         })
    // }, [])
    useEffect(() => {
        listingService
            .getAll()
            .then(initialListings => {
                setListings(initialListings)
            })
    }, [])
    const [filteredListings, setFilteredListings] = useState(listings)
    useEffect(() => {
        setFilteredListings(listings)
    }, [listings])
    const [fields, setFields] = useState({ startSalary: null, endSalary: null, type: 'none', searchText: null, duration: null, sortOption: 'none', sortDirection: 'ascending' })
    const handleChange = (event) => {

        setFields({ ...fields, [event.target.name]: event.target.value });
    }
    const applyFilters = (event) => {
        event.preventDefault()

        let filteredListings = listings
        if (fields.duration) {
            filteredListings = filteredListings.filter((listing) => listing.duration < fields.duration)
        }
        const fuse = new Fuse(filteredListings, {
            keys: [
                'title'
            ]
        })
        if (fields.searchText) {
            filteredListings = fuse.search(fields.searchText)
            filteredListings = filteredListings.map((listing) => listing.item)
        }
        if (fields.type !== 'none') {
            filteredListings = filteredListings.filter((listing) => listing.type === fields.type)
        }
        if (fields.startSalary || fields.endSalary) {
            if (fields.endSalary) {
                filteredListings = filteredListings.filter((listing) => listing.salary < fields.endSalary)
            }
            if (fields.startSalary) {
                filteredListings = filteredListings.filter((listing) => listing.salary > fields.startSalary)
            }

        }
        let sortedListings = [...filteredListings]
        if (fields.sortOption !== 'none') {
            sortedListings = sortedListings.sort((a, b) => a[fields.sortOption] > b[fields.sortOption] ? 1 : -1)
            if (fields.sortDirection === 'descending') {
                sortedListings = sortedListings.reverse()
            }
        }
        setFilteredListings(sortedListings)
    }
    return (
        <div>
            <h3><Link to="/">Home</Link><br></br></h3>
            <h1>All Listings</h1>
            <div>
                <h2>Filters</h2>
                <form onSubmit={applyFilters}>
                    Search Text
                    <input
                        name="searchText"
                        value={fields.searchText}
                        onChange={handleChange}
                    />
                    <br></br>
                    Duration
                    <input
                        name="duration"
                        value={fields.duration}
                        onChange={handleChange}
                    />
                    <br></br>
                    Start Salary
                    <input
                        name="startSalary"
                        value={fields.startSalary}
                        onChange={handleChange}
                    />
                    End Salary
                    <input
                        name="endSalary"
                        value={fields.endSalary}
                        onChange={handleChange}
                    />
                    <br></br>
                    Type
                    <select
                        name="type"
                        value={fields.type}
                        onChange={handleChange}
                    >
                        <option value='none'>None</option>
                        <option value='part'>Part-Time</option>
                        <option value='full'>Full Time</option>
                        <option value='wfh'>Work From Home</option>
                    </select>
                    <br></br>
                    <select
                        name="sortOption"
                        value={fields.sortOption}
                        onChange={handleChange}
                    >
                        <option value='duration'>Duration</option>
                        <option value='salary'>Salary</option>
                        <option value='rating.currentRating'>Ratings</option>
                        <option value='none'>None</option>
                    </select>
                    <select
                        name="sortDirection"
                        value={fields.sortDirection}
                        onChange={handleChange}
                    >
                        <option value='ascending'>Ascending</option>
                        <option value='descending'>Descending</option>
                    </select>
                    <button type="submit">save</button>
                </form>
            </div>
            <ul>
                {filteredListings.map((listing) =>
                    <Listing
                        listing={listing} user_id={user_id}
                    />
                )}
            </ul>
        </div >
    )
}

export default GetListings