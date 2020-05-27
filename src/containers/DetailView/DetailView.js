import React from 'react';
import { Modal } from 'react-bootstrap';

import './_DetailView.scss'

function DetailView(props) {
    const {
        data,
        onHide,
        className = ''
    } = props || {};

    const {
        title = '',
        image = '',
        body = {}
    } = data || {};
    console.log({ body });
    return (
        <Modal
            show={!!data}
            onHide={() => onHide()}
            dialogClassName={`detail-view__modal ${className}`}
            aria-labelledby="detail-view-modal"
        >
            <Modal.Header closeButton>
                <Modal.Title
                    id="detail-view-modal-title"
                    className="detail-view__title"
                >
                    {title}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body
                className="detail-view__body"
            >
                <img className="detail-view__main-img" src={image} alt={title} />
                <p>
                    Ipsum molestiae natus adipisci modi eligendi? Debitis amet quae unde
                    commodi aspernatur enim, consectetur. Cumque deleniti temporibus
                    ipsam atque a dolores quisquam quisquam adipisci possimus
                    laboriosam. Quibusdam facilis doloribus debitis! Sit quasi quod
                    accusamus eos quod. Ab quos consequuntur eaque quo rem! Mollitia
                    reiciendis porro quo magni incidunt dolore amet atque facilis ipsum
                    deleniti rem!
          </p>
            </Modal.Body>
        </Modal>
    )
}

export default DetailView
