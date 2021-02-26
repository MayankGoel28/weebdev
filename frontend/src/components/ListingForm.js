import React, { useState, useEffect } from 'react'
import listingService from '../services/listings'
const ListingForm = ({ createListing, editId, editData }) => {
    const [fields, setFields] = useState({ postedOn: null, title: null, type: 'part', salary: null, duration: null, skills: null, deadline: new Date(), joiningDate: new Date(), maxApplications: null, maxPositions: null })
    const [errorMessage, setErrorMessage] = useState(null)
    useEffect(() => {
        if (editData) {

            setFields({ ...editData, skills: editData.skills.map((word) => word.skill).join(',') })
        }

    }, [editData])
    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)

            listingService.setToken(user.token)
        }
    }, [])
    const [skillsString, setSkillsString] = useState('')
    const handleChange = (event) => {
        setFields({ ...fields, [event.target.name]: event.target.value });
    }
    const handleSkillsStringChange = (event) => {
        setSkillsString(event.target.value)
    }
    const addListingDetails = (event) => {
        event.preventDefault()
        let words = skillsString.split(',')
        words = words.map((word) => ({ skill: word.trim() }))
        const obj = {
            ...fields,
            postedOn: new Date(),
            skills: words,
        }
        if (editData) {
            createListing(editId, obj)
        }
        else {
            let words = skillsString.split(',')
            words = words.map((word) => ({ skill: word.trim() }))
            if (fields.salary < 0) {
                setErrorMessage('ERROR')
                setFields({ ...fields, salary: null });
            }
            createListing({
                ...fields,
                postedOn: new Date(),
                skills: words,
            })
            setFields({ postedOn: null, title: null, type: 'part', salary: null, duration: null, skills: null, deadline: new Date(), joiningDate: new Date(), maxApplications: null, maxPositions: null })
            window.location.reload()
        }
    }
    return (
        <div>
            <form onSubmit={addListingDetails}>
                {
                    editData === null ?
                        <div>
                            <h2>Create a new listing</h2>
                            Title
                    <input
                                name="title"
                                value={fields.title}
                                onChange={handleChange}
                            />
                            <br></br>
                Type
                <select
                                name="type"
                                value={fields.type}
                                onChange={handleChange}
                            >
                                <option value='part'>Part-time</option>
                                <option value='full'>Full-time</option>
                                <option value='wfh'>Work From Home</option>
                            </select>
                            <br></br>
                Salary
                    <input
                                name="salary"
                                value={fields.salary}
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
                Comma seperated skills
                    <input
                                name="skillsString"
                                value={skillsString}
                                onChange={handleSkillsStringChange}
                            />
                            <br></br>
                        </div>
                        :
                        <h2>Edit listing</h2>
                }

                Deadline
                <input
                    name="deadline"
                    value={fields.deadline}
                    onChange={handleChange}
                />
                <br></br>
                Joining Date
                <input
                    name="deadline"
                    value={fields.joiningDate}
                    onChange={handleChange}
                />
                <br></br>
                Max Applications
                    <input
                    name="maxApplications"
                    value={fields.maxApplications}
                    onChange={handleChange}
                />
                <br></br>
                Max Positions
                    <input
                    name="maxPositions"
                    value={fields.maxPositions}
                    onChange={handleChange}
                />
                <br></br>
                <button type="submit">save</button>
                {
                    errorMessage ? <p>ERROR</p> : null

                }
            </form>
        </div>
    )
}


export default ListingForm