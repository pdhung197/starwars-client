import { dataListApi } from './../utils/api/apiConfig';
import { callApi } from './../utils/api/apiUtils';

/* Get data list of characters, vehicles, people, planet... */
export const getDataListPerPage = (dataName, page = 0) => {
    const config = {
        method: 'GET'
    }

    const url = `${dataListApi}${dataName}/${page ? 'page=' + page : ''}`;

    return callApi(
        url,
        config
    )
}