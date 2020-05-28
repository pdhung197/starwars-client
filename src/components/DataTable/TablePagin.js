import React from 'react';
import PropTypes from 'prop-types'

function TablePagin(props) {
    const {
        paginData,
        handleChangeActivedPage,
        handleNextOrPreviousPage
    } = props || {};

    /* Show max 5 page in pagination */
    const {
        page = 1,
        totalPage = 0
    } = paginData || {};

    /* If total page is more than 5, show 5 */
    const numberOfPageButton = totalPage > 5 ? 5 : totalPage;

    /* Find end page */
    const endPage = page + 2 > totalPage
        ? totalPage
        : page + 2 > numberOfPageButton ?
            page + 2
            : numberOfPageButton;

    /* Find start page depending on end page */
    const startPage = endPage - numberOfPageButton < 1 ? 1 : endPage - numberOfPageButton;

    const handlePaginationChange = (e, value) => {
        e.preventDefault();
        return isNaN(value)
            ? handleNextOrPreviousPage(value)
            : handleChangeActivedPage(value)
    }

    return (
        <ul className="pagination">
            <li className={`page-item ${page === 1 ? 'disabled' : ''}`}>
                <a
                    className="page-link"
                    href="/"
                    aria-label="Previous"
                    onClick={(e) => handlePaginationChange(e, 'prv')}
                    disabled={page === 1}
                >
                    <span aria-hidden="true">&laquo;</span>
                </a>
            </li>
            {
                Array.from({ length: endPage - startPage + 1 }, (btn, index) => {
                    const pageNumber = index + startPage;

                    return <li
                        key={index}
                        className={`page-item ${page === pageNumber ? 'active' : ''}`}
                    >
                        <a
                            className="page-link"
                            href="/"
                            onClick={(e) => {
                                return page === pageNumber
                                    ? e.preventDefault()
                                    : handlePaginationChange(e, pageNumber)
                            }}
                            disabled={page === pageNumber}
                        >{pageNumber}</a>
                    </li>
                })
            }

            <li className={`page-item ${page === totalPage ? 'disabled' : ''}`}>
                <a
                    className="page-link"
                    href="/"
                    aria-label="Next"
                    onClick={(e) => handlePaginationChange(e, 'next')}
                    disabled={page === totalPage}
                >
                    <span aria-hidden="true">&raquo;</span>
                </a>
            </li>
        </ul>
    )
}

TablePagin.propTypes = {
    paginData: PropTypes.object.isRequired,
    handleChangeActivedPage: PropTypes.func,
    handleNextOrPreviousPage: PropTypes.func
}

export default TablePagin
