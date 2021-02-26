import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom"

const ApplicantRegistrationForm = ({ createApplicant }) => {
    const [fields, setFields] = useState({ email: null, name: null, password: null })
    const [applicantObject, setApplicantObject] = useState({ email: null, name: null, skills: [], education: [] })
    const [skills, setSkills] = useState([{ skill: null }])
    const [education, setEducation] = useState([{ instituteName: null, startYear: null, endYear: null }])
    useEffect(() => {
        setApplicantObject(
            { name: fields.name, email: fields.email, password: fields.password, skills: skills, education: education }
        )
    }, [fields, skills, education])
    const addApplicantDetails = (event) => {
        createApplicant({
            ...applicantObject
        })
    }
    const handleChange = (event) => {
        setFields({ ...fields, [event.target.name]: event.target.value });
    }
    const handleSkillsChange = (event, index) => {
        const { name, value } = event.target
        const list = [...skills]
        list[index][name] = value
        setSkills(list)
    }
    const handleSkillRemoveClick = index => {
        const list = [...skills];
        list.splice(index, 1);
        setSkills(list);
    }
    const handleSkillAddClick = () => {
        setSkills([...skills, { skill: "" }]);
    }
    const handleEducationsChange = (event, index) => {
        const { name, value } = event.target
        const list = [...education]
        list[index][name] = value
        setEducation(list)
    }
    const handleEducationRemoveClick = index => {
        const list = [...education]
        list.splice(index, 1);
        setEducation(list);
    }
    const handleEducationAddClick = () => {
        setEducation([...education, { instituteName: null, startYear: null, endYear: null }]);
    }
    return (
        <div>
            Email
            <input
                name="email"
                value={fields.email}
                onChange={handleChange}
            />
            <br></br>
            Name
            <input
                name="name"
                value={fields.name}
                onChange={handleChange}
            />
            <br></br>
            Password
            <input
                name="password"
                value={fields.password}
                onChange={handleChange}
            />
            <br></br>
            Skills
            {
                skills.map((x, i) => {
                    return (
                        < div >

                            <div>
                                <input
                                    name="skill"
                                    value={x.skill}
                                    onChange={e => handleSkillsChange(e, i)}
                                />
                            </div>
                            <div>
                                {skills.length !== 1 && <button
                                    onClick={() => handleSkillRemoveClick(i)}>Remove</button>}
                                {skills.length - 1 === i && <button onClick={handleSkillAddClick}>Add</button>}
                            </div>
                        </div>
                    )
                })
            }
            <br></br>
            Education
            {
                education.map((x, i) => {
                    return (
                        < div >

                            <div>
                                institute Name
                                <input
                                    name="instituteName"
                                    value={x.instituteName}
                                    onChange={e => handleEducationsChange(e, i)}
                                />
                                Start Year
                                <input
                                    name="startYear"
                                    value={x.startYear}
                                    onChange={e => handleEducationsChange(e, i)}
                                />
                                End Year
                                <input
                                    name="endYear"
                                    value={x.endYear}
                                    onChange={e => handleEducationsChange(e, i)}
                                />
                            </div>
                            <div>
                                {education.length !== 1 && <button
                                    onClick={() => handleEducationRemoveClick(i)}>Remove</button>}
                                {education.length - 1 === i && <button onClick={handleEducationAddClick}>Add</button>}
                            </div>
                        </div>
                    )
                })
            }
            <br></br>
            <button onClick={addApplicantDetails}>Submit</button>
        </div >
    )
}

export default ApplicantRegistrationForm