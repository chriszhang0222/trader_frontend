import {reqRealEndAsync, reqRealEnd} from "./axiosCommon";
import {config} from "./config";
import router from "../router";
import store from '../store/index';

export const queryBanalce = () => {
    reqRealEndAsync("post", config.domain,
        '/api/balance', {uid: sessionStorage.getItem('uid')}
        , (res) => {
            store.commit('updateBalance', res.data);
        })
}

export const queryPosiData = () => {
    reqRealEndAsync("post", config.domain,
        '/api/posiInfo', {uid: sessionStorage.getItem('uid')}
        , (res) => {
            store.commit('updatePosi', res.data);
        })
}

export const queryTradeData = () => {
    reqRealEndAsync("post", config.domain,
        '/api/tradeInfo', {uid: sessionStorage.getItem('uid')}
        , (res) => {
            store.commit('updateTrade', res.data);
        })
}

export const queryOrderData = () => {
    reqRealEndAsync("post", config.domain,
        '/api/orderInfo', {uid: sessionStorage.getItem('uid')}
        , (res) => {
            store.commit('updateTrade', res.data);
        })
}

export const queryCode = (params) => {
    return reqRealEnd("post", config.domain, "/api/code", params);
}

export const sendOrder = (params, callBack) => {
    return reqRealEndAsync("post", config.domain,
        '/api/sendorder', params, callBack);
}

export const cancelOrder = (params, callback) => {
    return reqRealEndAsync("post", config.domain, "/api/cancelorder", params, callback);
}
