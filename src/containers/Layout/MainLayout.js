import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import HomeView from './../Home/HomeView';
import DataView from './../DataView/DataView';

import Nav from './../../components/Nav/Nav';

function MainLayout() {
    return (
        <Router>
            <Nav />
            <section role="main">
                <Switch>
                    <Route exact path="/" component={HomeView} />
                    <Route exact path="/starwars-client">
                        <Redirect to="/" />
                    </Route>
                    <Route path="/data/:dataName" component={DataView} />
                </Switch>
            </section>
        </Router>

    )
}

export default MainLayout
