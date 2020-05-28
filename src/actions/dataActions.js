import { dataListApi } from './../utils/api/apiConfig';
import { callApi, UrlBuilder } from './../utils/api/apiUtils';

/* Get data list of characters, vehicles, people, planet... */
export const getDataList = (dataName, options = {}) => {
    options = Object.assign({}, options);
    const config = {
        method: 'get'
    };

    const baseUrl = `${dataListApi}${dataName}/`;
    const url = UrlBuilder(baseUrl, options);

    return callApi(
        url,
        config
    )
}