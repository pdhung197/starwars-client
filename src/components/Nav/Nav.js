import React, { useState } from 'react'
import { withRouter } from "react-router-dom";

import { collections } from './../../constants/collections';

import NavRoute from './NavRoute';
import NavLogo from './NavLogo';
import NavHambuger from './NavHambuger';

import './_nav.scss';

function Nav(props) {
    const {
        match: {
            isExact = false
        } = {},
        location: {
            pathname = '/'
        } = {}
    } = props || {};

    const [open, toggleOpen] = useState(false);

    return (
        <nav className={`starwars-nav ${isExact ? 'starwars-nav-home' : ''} ${open ? 'nav-open' : ''}`}>
            <div className="starwars-nav__head">
                <NavHambuger
                    open={open}
                    onClick={() => toggleOpen(!open)}
                />
                <div className="starwars-nav__logo">
                    <NavLogo />
                </div>
            </div>
            <ul className="starwars-nav__list">
                {
                    (collections || []).map(collect => {
                        const {
                            key,
                            ...collectData
                        } = collect || {};

                        return <li className={`starwars-nav__item ${pathname.startsWith(collectData.route) ? 'starwars-nav__item--active' : ''}`} key={key}>
                            <NavRoute
                                {...collectData}
                            />
                        </li>
                    })
                }
            </ul>
        </nav>
    )
}

export default withRouter(Nav)
