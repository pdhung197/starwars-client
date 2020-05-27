import React, { Component } from 'react';
import { withRouter } from "react-router-dom";

class DataView extends Component {
    render() {
        console.log({ p: this.props });
        return (
            <div>
                Data View
            </div>
        )
    }
}

export default withRouter(DataView);