import QS from 'qs';
import axios from 'axios';
import router from '../router';
export const reqRealEndAsync =
    (method, baseUrl, url, params, callback) => {
    params.token = sessionStorage.getItem('token');
    return axios({
        timeout: 5000,
        method: method,
        baseUrl: baseUrl,
        url: url,
        headers: {
            'Content-type': 'application/x-www-form-urlencoded'
        },
        data: QS.stringify(params),
        traditional: true
    }).then((res) => {
        let resp = res.data;
        if(resp.success === false){
            router.replace({
                path: 'login',
                query: {
                    msg: resp.message
                }
            })
        }else{
            if(callback !== undefined) {
                callback(resp);
            }
        }
    })
}

export const reqRealEnd = (method, baseUrl, url, params) => {
    params.token = sessionStorage.getItem('token');
    return axios({
        timeout: 5000,
        method: method,
        baseUrl: baseUrl,
        url: url,
        headers: {
            'Content-type': 'application/x-www-form-urlencoded'
        },
        data: QS.stringify(params),
        traditional: true
    })
}
