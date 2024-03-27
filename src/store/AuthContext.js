"use client";

import { createContext, useContext, useEffect, useReducer } from "react";

import Cookies from "js-cookie";

import { deleteCookie } from "@/hooks/useCookies";

const AuthContext = createContext();

const initialState = {
  loading: true,
  isLoggedIn: false,
  role: null,
  email: null,
  name: null,
};
const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        isLoggedIn: true,
        email: action.payload.email,
        name: action.payload.name,
        role: "admin",
        loading: false,
      };
    case "LOGOUT":
      deleteCookie("token");
      deleteCookie("email");
      deleteCookie("name");
      return {
        ...state,
        isLoggedIn: false,
        loading: false,
      };
    default:
      return state;
  }
};

const AuthProvider = ({ children }) => {
  const [authState, authDispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const access_token = Cookies.get("token");
    const email = Cookies.get("email");
    const role = Cookies.get("role");
    const name = Cookies.get("name");

    if (access_token) {
      authDispatch({
        type: "LOGIN",
        payload: { email: email, role: role, name: name },
      });
    } else {
      authDispatch({ type: "LOGOUT" });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ authState, authDispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { AuthContext, AuthProvider, useAuth };
