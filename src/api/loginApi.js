import {reqRealEndAsync, reqRealEnd} from "./axiosCommon";
import {config} from "./config";

export const queryCaptcha = (callback) => {
    return reqRealEndAsync("post", config.domain,
        "/login/captcha", {}, callback)
}

export const login = (params, callback) => {
    return reqRealEndAsync("post", config.domain, "/login/userlogin",
        params, callback)
}
