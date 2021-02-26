import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Home from './pages/Home'
import GetListings from './pages/GetListings'
import GetRecListings from './pages/GetRecListings'
import PostListing from './pages/PostListing'
import GetAppApplications from './pages/GetAppApplications'
import GetListingApplications from './pages/GetListingApplications'
import GetAcceptedApplicants from './pages/GetAcceptedApplicants'
import Register from './pages/Register'
import EditListing from './pages/EditListing'

const Main = () => {
    return (
        <Switch> {/* The Switch decides which component to show based on the current URL.*/}
            <Route exact path='/' component={Home}></Route>
            <Route exact path='/getListings/:id' component={GetListings}></Route>
            <Route exact path='/getRecListings' component={GetRecListings}></Route>
            <Route exact path='/postListing' component={PostListing}></Route>
            <Route exact path='/getAppApplications' component={GetAppApplications}></Route>
            <Route exact path='/getListingApplications/:id' component={GetListingApplications}></Route>
            <Route exact path='/getAcceptedApplicants/:id' component={GetAcceptedApplicants}></Route>
            <Route exact path='/register' component={Register}></Route>
            <Route exact path='/editListing/:id' component={EditListing}></Route>
        </Switch>
    );
}

export default Main;