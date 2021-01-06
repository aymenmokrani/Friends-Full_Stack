import cookie from "js-cookie";

// set cookie
export const setCookie = (key, value) => {
  if (window !== "undefined") {
    cookie.set(key, value, { expires: 1 });
  }
};

// get cookie
export const getCookie = (key) => {
  if (window !== "undefined") {
    return cookie.get(key);
  }
};

// remove cookie
export const removeCookie = (key) => {
  if (window !== "undefined") {
    cookie.remove(key, { expires: 1 });
  }
};

// set local storage
export const setLocalStorage = (key, value) => {
  if (window !== "undefined") {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

// get local storage
export const getLocalStorage = (key) => {
  if (window !== "undefined") {
    return localStorage.getItem(key);
  }
};

// remove local storage
export const removeLocalStorage = (key) => {
  if (window !== "undefined") {
    localStorage.removeItem(key);
  }
};

export const authenticate = (response, next) => {
  setCookie("token", response.data.token);
  setLocalStorage("user", response.data.user);
  next();
};

export const isAuth = () => {
  if (window !== "undefined") {
    if (getCookie("token")) {
      if (getLocalStorage("user")) {
        return JSON.parse(getLocalStorage("user"));
      }
    }
    return false;
  }
};

export const signout = () => {
  removeCookie("token");
  removeLocalStorage("user");
};
