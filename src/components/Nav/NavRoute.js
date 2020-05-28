import React from 'react'
import { Link } from "react-router-dom";

function NavRoute(props) {
    const {
        route,
        img,
        label
    } = props || {};

    return <Link to={route}>
        <div className="starwars-nav__item--img">
            <img src={require(`./../../assets/images/collections/${img}`)} alt="" />
        </div>
        <span>{label}</span>
    </Link>
}

export default NavRoute
