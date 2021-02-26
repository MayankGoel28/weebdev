import React, { useState } from 'react'

const RecruiterRegistrationForm = ({ createRecruiter }) => {
    const [fields, setFields] = useState({ email: null, name: null, password: null, contact: null, bio: null })
    const addRecruiterDetails = (event) => {
        createRecruiter({
            ...fields
        })
    }
    const handleChange = (event) => {
        setFields({ ...fields, [event.target.name]: event.target.value });
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
            Contact Number
            <input
                name="contact"
                value={fields.contact}
                onChange={handleChange}
            />
            <br></br>
            Bio
            <input
                name="bio"
                value={fields.bio}
                onChange={handleChange}
            />
            <br></br>
            <button onClick={addRecruiterDetails}>Submit</button>
        </div >
    )
}

export default RecruiterRegistrationForm