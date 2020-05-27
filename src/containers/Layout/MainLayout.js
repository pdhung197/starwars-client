import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import HomeView from './../Home/HomeView';
import DataView from './../DataView/DataView';

import Nav from './../../components/Nav/Nav';
import Footer from './../../components/Footer/Footer';

function MainLayout() {
    return (
        <Router>
            <Nav />
            <section role="main">
                <Switch>
                    <Route exact path="/" component={HomeView} />
                    <Route path="/data/:dataName" component={DataView} />
                </Switch>
            </section>
            <Footer />
        </Router>

    )
}

export default MainLayout
