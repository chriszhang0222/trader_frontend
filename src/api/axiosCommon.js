import QS from 'qs';
import axios from 'axios';
import router from '../router';
import Vue from 'vue';
import Tool from '../utils/Tool';
import Toast from '../utils/Toast';
// axios.defaults.withCredentials = true;
// axios.interceptors.request.use(function(config){
//     let token = sessionStorage.getItem("token");
//     if(Tool.isNotEmpty(token)){
//         config.headers.token = token;
//     }
//     return config;
// });
export const reqRealEndAsync =
    (method, baseUrl, url, params, callback) => {
    params.token = sessionStorage.getItem('token');
    return axios({
        timeout: 5000,
        method: method,
        baseURL: baseUrl,
        url: url,
        headers: {
            'Content-type': 'application/x-www-form-urlencoded'
        },
        data: QS.stringify(params),
        traditional: true
    }).then((res) => {
        let resp = res.data;
        callback(resp);
    })
}

export const reqRealEnd = (method, baseUrl, url, params) => {
    params.token = sessionStorage.getItem('token');
    return axios({
        timeout: 5000,
        method: method,
        baseURL: baseUrl,
        url: url,
        headers: {
            'Content-type': 'application/x-www-form-urlencoded'
        },
        data: QS.stringify(params),
        traditional: true
    })
}

