import React, { useState, useEffect } from 'react'
import { Nav, Navbar } from 'react-bootstrap'
import { Link } from "react-router-dom"

const UserNavbar = ({ user_id }) => {
    const userType = localStorage.getItem('loggedUserType')

    if (userType === null) {
        return null
    }
    else if (userType === '"recruiter"') {
        return (
            <Navbar bg="dark" expand="lg">
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Link to="/postListing">Add Listing</Link>
                        <br></br>
                        <Link to="/getRecListings">My Listings</Link>
                        <br></br>
                        <Link to={`/getAcceptedApplicants/${user_id}`}>My Employees</Link><br></br>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
    else {
        return (
            <Navbar bg="dark" expand="lg">
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Link to={`/getListings/${user_id}`}>See all Listings</Link>
                        <br></br>
                        <Link to="/getAppApplications">My Applications</Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}

export default UserNavbar