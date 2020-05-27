import React from 'react'
import { withRouter, Link } from "react-router-dom";

function Nav(props) {
    const {
        match: {
            isExact = false
        } = {}
    } = props || {};
    return (
        <nav className={`starwars-nav ${isExact ? 'starwars-nav__home' : ''}`}>
            <Link to="/data/planet">Planet</Link>
            <Link to="/data/people">People</Link>
            <Link to="/data/starship">Starship</Link>
            <Link to="/data/vehicles">Vehicles</Link>
            <Link to="/">Home</Link>
        </nav>
    )
}

export default withRouter(Nav)
