import React, { useState, useEffect } from 'react'
import applicantService from '../services/applicants'
import Applicant from '../components/Applicant'
import { Link } from "react-router-dom"

const GetAcceptedApplicants = (props) => {
    const id = props.match.params.id
    const [applicants, setApplicants] = useState([])
    useEffect(() => {
        applicantService
            .getAll()
            .then(applicants => {
                const onlyApplicantOfRecruiter = applicants.filter((applicant) => applicant.workingFor === id)
                setApplicants(onlyApplicantOfRecruiter)
            })
    }, [])
    const [fields, setFields] = useState({ sortOption: 'none', sortDirection: 'ascending' })

    const [filteredApplicants, setFilteredApplicants] = useState(null)
    useEffect(() => {
        setFilteredApplicants(applicants)
    }, [applicants])
    const handleChange = (event) => {

        setFields({ ...fields, [event.target.name]: event.target.value });
    }
    const applyFilters = (event) => {
        let sortedApplicants = [...filteredApplicants]
        if (fields.sortOption !== 'none') {
            sortedApplicants = sortedApplicants.sort((a, b) => a[fields.sortOption] > b[fields.sortOption] ? 1 : -1)
            if (fields.sortDirection === 'descending') {
                sortedApplicants = sortedApplicants.reverse()
            }
        }

        setFilteredApplicants(sortedApplicants)

    }
    return (
        <div>
            <h3><Link to="/">Home</Link><br></br></h3>
            Filters
            <select
                name="sortOption"
                value={fields.sortOption}
                onChange={handleChange}
            >
                <option value='none'>None</option>
                <option value='name'>Name</option>
                <option value='joiningDate'>Date of Joining</option>
                <option value='title'>Title</option>
                <option value='rating'>Rating</option>
            </select>
            <select
                name="sortDirection"
                value={fields.sortDirection}
                onChange={handleChange}
            >
                <option value='ascending'>Ascending</option>
                <option value='descending'>Descending</option>
            </select>
            <button onClick={applyFilters}>Apply</button>
            <h2>Your Employees</h2>
            <ul>
                {filteredApplicants && filteredApplicants.map((applicant) =>
                    <Applicant
                        applicant={applicant}
                    // toggleImportance={() => toggleImportanceOf(listing.id)}
                    />
                )}
            </ul>
        </div>
    )
}

export default GetAcceptedApplicants