import React from 'react'
import { Link } from "react-router-dom";

function NavLogo(props) {
    const {
        onClick = () => { }
    } = props || {};

    return <Link
        to="/"
        onClick={onClick}
    >
        <img src={require('./../../assets/images/star-wars-logo-png-3-transparent.png')} alt="" />
    </Link>
}

export default NavLogo
