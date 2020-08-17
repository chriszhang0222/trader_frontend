import {reqRealEndAsync, reqRealEnd} from "./axiosCommon";
import {config} from "./config";
import router from "../router";


export const queryCaptcha = (callback) => {
    return reqRealEndAsync("post", config.domain,
        "/login/captcha", {}, callback)
}

export const login = (params, callback) => {
    return reqRealEndAsync("post", config.domain, "/login/userlogin",
        params, callback)
}

export const logout = () => {
    reqRealEnd("post", config.domain, "/login/logout", {});

    sessionStorage.removeItem("uid");
    sessionStorage.removeItem("token");
    router.push('/login');
}

export const changePassword = (params, callback) => {
    return reqRealEndAsync("post", config.domain, "/login/save-password", params, callback);
}
