import React, { useState, useEffect } from 'react'
import applicationService from '../services/applications'
import Application from '../components/Application'
import { Link } from "react-router-dom"

const GetAppApplications = () => {

    const loggedUserJSON = JSON.parse(window.localStorage.getItem('loggedUser'))
    const loggedEmail = loggedUserJSON.email
    const [applications, setApplications] = useState([])
    useEffect(() => {
        applicationService
            .getAll()
            .then(initialApplications => {
                setApplications(initialApplications)
            })
    }, [])

    const newApplications = applications.filter((application) => application.applicantemail === loggedEmail)
    return (
        <div>
            <h3><Link to="/">Home</Link><br></br></h3>
            <h1>My Applications</h1>
            <ul>
                {newApplications.map((application) =>
                    <Application
                        application={application}
                    // toggleImportance={() => toggleImportanceOf(application.id)}
                    />
                )}
            </ul>
        </div>
    )
}

export default GetAppApplications