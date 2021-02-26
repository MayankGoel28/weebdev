import React, { useState } from 'react'
import recruiterService from '../services/recruiters'
import applicantService from '../services/applicants'
import { Link } from "react-router-dom"
import RecruiterRegistrationForm from '../components/RecruiterRegistrationForm'
import ApplicantRegistrationForm from '../components/ApplicantRegistrationForm'

const Register = () => {
    const addRecruiter = (recruiterObject) => {
        recruiterService
            .create(recruiterObject)
        window.location.reload()
    }
    const addApplicant = (applicantObject) => {
        applicantService
            .create(applicantObject)
        window.location.reload()
    }
    const handleRegChange = (event) => {
        setRegType(event.target.value);
    }
    const [regType, setRegType] = useState('app')
    return (
        <div>
            <h3><Link to="/">Home</Link></h3>
            <select
                name="regoption"
                value={regType}
                onChange={handleRegChange}
            >
                <option value='app'>Applicant</option>
                <option value='rec'>Recruiter</option>
            </select>
            {
                regType === 'app' ?
                    <ApplicantRegistrationForm createApplicant={addApplicant} /> :
                    <RecruiterRegistrationForm createRecruiter={addRecruiter} />
            }
        </div>
    )
}

export default Register