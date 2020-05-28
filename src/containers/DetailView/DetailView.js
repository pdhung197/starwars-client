import React from 'react';
import { Modal } from 'react-bootstrap';

import { dataViewHeaders } from './../DataView/dataHeader';

import './_DetailView.scss'

function DetailView(props) {
    const {
        data,
        onHide,
        className = '',
        dataName
    } = props || {};

    const {
        title = '',
        image = '',
        body = {}
    } = data || {};

    return (
        <Modal
            show={!!data}
            onHide={() => onHide()}
            dialogClassName={`detail-view__modal ${className} modal-lg`}
            aria-labelledby="detail-view-modal"
        >
            <Modal.Header closeButton>

            </Modal.Header>
            <Modal.Body
                className="detail-view__body"
            >
                <div className="detail-view__main-img">
                    <img className="" src={image} alt={title} />
                </div>
                <h1 className="detail-view__title">{title}</h1>
                <ul className="detail-view__detail">
                    {
                        (dataViewHeaders[`${dataName}Columns`] || []).map((column, index) => {
                            return column.showDetail === false ? null : <li key={index}>
                                <p>
                                    <span className="detail-view__detail--label">{column.label} :</span>
                                    <span className="detail-view__detail--content">{body[column.key] || ''}</span>
                                </p>
                            </li>
                        })
                    }
                </ul>
            </Modal.Body>
        </Modal>
    )
}

export default DetailView
