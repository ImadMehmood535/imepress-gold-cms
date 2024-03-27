/** @format */

import axios from "axios";
import Cookies from "js-cookie";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL_SERVER;

const API = axios.create({
  baseURL: BASE_URL,
});

API.interceptors.request.use(
  function (config) {
    let token;
    if (Cookies.get("token")) {
      token = Cookies.get("token");
    }
    config.headers.authorization = `${token}`;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
//auth
API.loginUser = (data) => {
  return API.post("admin/login", data);
};


API.changePassword = (data) => {
  return API.patch("admin/change-password" , data);
};
API.updateProfile = (data) => {
  return API.patch("admin" , data);
};

export { API };
