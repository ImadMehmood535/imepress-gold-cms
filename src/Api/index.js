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

//admin
API.loginUser = (data) => {
  return API.post("admin/login", data);
};

API.changePassword = (data) => {
  return API.patch("admin/change-password", data);
};

API.updateProfile = (data) => {
  return API.patch("admin", data);
};

// Image
API.uploadImage = (data) => {
  return API.post("upload", data);
};

//brand

API.getAllBrands = () => {
  return API.get("brand");
};

API.createBrand = (data) => {
  return API.post("brand", data);
};

API.updateBrand = (data, id) => {
  return API.patch(`brand/${id}`, data);
};

//Category

API.getAllCategpries = () => {
  return API.get("category/all");
};

API.createCategory = (data) => {
  return API.post("category", data);
};

API.updateCategory = (data, id) => {
  return API.patch(`category/${id}`, data);
};

//Sub category

API.getAllSubCategory = () => {
  return API.get("sub-category");
};

API.createSubCategory = (data) => {
  return API.post("sub-category", data);
};

API.updateSubCategory = (data, id) => {
  return API.patch(`sub-category/${id}`, data);
};

// blogs

API.getAllBlogs = () => {
  return API.get("blog");
};

API.createBlogs = (data) => {
  return API.post("blog", data);
};

API.updateBlogs = (data, id) => {
  return API.patch(`blog/${id}`, data);
};

API.deleteBlogs = (id) => {
  return API.delete(`blog/${id}`);
};

//users

API.getAllUsers = () => {
  return API.get("user");
};

API.updateUserByAdmin = (data) => {
  return API.patch(`user`, data);
};


//order

API.getOrders = () =>{
  return API.get("order")
}

//

API.getProducts = () =>{
  return API.get("product")
}

export { API };
