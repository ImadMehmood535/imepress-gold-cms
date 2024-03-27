import Cookies from 'js-cookie';

const setCookie = (key, value) => {
  Cookies.set(key, value);
};

const deleteCookie = (cookie) => {
  Cookies.remove(cookie);
};

export { setCookie, deleteCookie };
