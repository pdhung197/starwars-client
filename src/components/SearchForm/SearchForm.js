import React from 'react';
import PropTypes from 'prop-types'

import './_SearchForm.scss';

function SearchForm(props) {
    const {
        inputValue,
        onSearch = () => { },
        onInputChange = () => { }
    } = props || {};

    const inputProps = {};

    if (inputValue !== undefined) {
        inputProps.value = inputValue;
        inputProps.onChange = onInputChange;
    }

    return (
        <div className={`input-group search-group`}>
            <input
                type="text"
                className="form-control search-group__input"
                placeholder="Enter text to search"
                aria-label="Enter text to search"
                aria-describedby="button-search"
                {...inputProps}
            />
            <div className="input-group-append">
                <button
                    className="btn search-group__btn"
                    type="button"
                    id="button-search"
                    onClick={onSearch}
                >
                    Search
                </button>
            </div>
        </div>
    )
}

SearchForm.propTypes = {
    inputValue: PropTypes.string,
    onSearch: PropTypes.func,
    onInputChange: PropTypes.func
}

export default SearchForm
