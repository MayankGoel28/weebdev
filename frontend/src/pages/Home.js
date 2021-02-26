import React, { useState, useEffect } from 'react'
import Notification from '../components/Notification'
import LoginRecruiterForm from '../components/LoginRecruiterForm'
import Togglable from '../components/Togglable'
import UserNavbar from '../components/UserNavbar'
import listingService from '../services/listings'
import loginApplicantService from '../services/loginApplicant'
import applicationService from '../services/applications'
import loginRecruiterService from '../services/loginRecruiter'
import recruiterService from '../services/recruiters'
import { Link } from "react-router-dom"

const Home = () => {
    const [listings, setListings] = useState([])
    const [recruiters, setRecruiters] = useState([])
    const [errorMessage, setErrorMessage] = useState(null)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)

    const listingFormRef = React.createRef()

    useEffect(() => {
        recruiterService
            .getAll()
            .then(initialRecruiters => {
                setRecruiters(initialRecruiters)
            })
    }, [])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)

            listingService.setToken(user.token)
            applicationService.setToken(user.token)
        }
    }, [])

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const userTypeTemp = recruiters.find(n => n.email === email)
            if (userTypeTemp) {
                window.localStorage.setItem(
                    'loggedUserType', JSON.stringify('recruiter')
                )
                const user = await loginRecruiterService.loginRecruiter({
                    email, password,
                })

                window.localStorage.setItem(
                    'loggedUser', JSON.stringify(user)
                )
                listingService.setToken(user.token)
                setUser(user)
                setEmail('')
                setPassword('')
            }
            else {
                window.localStorage.setItem(
                    'loggedUserType', JSON.stringify('applicant')
                )

                const user = await loginApplicantService.loginApplicant({
                    email, password,
                })
                window.localStorage.setItem(
                    'loggedUser', JSON.stringify(user)
                )
                applicationService.setToken(user.token)
                setUser(user)
                setEmail('')
                setPassword('')
            }


        } catch (exception) {
            setErrorMessage('wrong credentials')
            setTimeout(() => {
                setErrorMessage(null)
            }, 5000)
        }
    }

    const loginForm = () => (
        <Togglable buttonLabel='Sign Up/Sign In'>
            <LoginRecruiterForm
                email={email}
                password={password}
                handleEmailChange={({ target }) => setEmail(target.value)}
                handlePasswordChange={({ target }) => setPassword(target.value)}
                handleSubmit={handleLogin}
            />
            <Link to="/register">
                <button type="button">
                    Register
                </button>
            </Link>
        </Togglable>
    )

    const logOut = () => {
        setUser('')
        localStorage.removeItem('loggedUserType')
        localStorage.removeItem("loggedUser")
        window.location.reload()
    }

    return (
        <div>
            <UserNavbar user_id={user && user.id} />
            <h1>weebdev.com</h1>
            {/* <em style={{ color: "grey" }}>substandard coding at exorbitant prices</em> */}
            <Notification message={errorMessage} />

            {
                user === null ?
                    loginForm()
                    :
                    <div>
                        <p>{user.name} logged in</p>
                    </div>
            }

            {
                user === null ?
                    null :
                    <button onClick={logOut}>
                        Log Out
                        </button>
            }

        </div>
    )
}

export default Home
