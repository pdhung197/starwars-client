import React, { Component } from 'react'

class NavHambuger extends Component {
    constructor(props) {
        super(props);

        this.setButtonWrapperRef = this.setButtonWrapperRef.bind(this);
    }

    handleClickOutsideHambuger = (event) => {
        if (this.buttonWrapperRef && !this.buttonWrapperRef.contains(event.target)) {
            const {
                open = false,
                onClick = () => { }
            } = this.props || {};

            if (open) onClick();
        }
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutsideHambuger);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutsideHambuger);
    }

    setButtonWrapperRef(node) {
        this.buttonWrapperRef = node;
    }

    render() {
        const {
            className = '',
            onClick = () => { }
        } = this.props || {};
        return (
            <button
                ref={this.setButtonWrapperRef}
                className={`starwars-nav__ham starwars-nav-home__ham ${className}`}
                onClick={onClick}
            >
                <div></div>
            </button>
        )
    }
}

export default NavHambuger
