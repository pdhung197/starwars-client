import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

export const callApi = (
    url, /* Api URL */
    config,
    onRequestSuccess, /* Callback when call api function is success */
    onRequestFailure /* Callback when call api function got error */
) => {
    const options = {
        ...config,
        url
    };

    let headers = new Headers();
    /* Create Correlation Id to tracking request on server */
    headers.append('x-request-id', uuidv4({ msecs: new Date().getTime() }))
    /* Only accept json response */
    headers.append("Accept", "application/json");
    headers.append("Content-Type", "application/json");

    const clientRequest = axios(options);

    return clientRequest
        .then(res => {
            console.log({ res });
            if (onRequestSuccess) onRequestSuccess(res);
            return res;
        })
        .catch(error => {
            console.log({ error });
            if (onRequestFailure) onRequestFailure(error);
        });
}