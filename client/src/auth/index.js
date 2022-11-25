import React, { createContext, useEffect, useState } from "react";
import { useHistory } from 'react-router-dom'
import MUIAlerts from "../components/MUIAlerts";
import api from './auth-request-api'

const AuthContext = createContext();
console.log("create AuthContext: " + AuthContext);

// THESE ARE ALL THE TYPES OF UPDATES TO OUR AUTH STATE THAT CAN BE PROCESSED
export const AuthActionType = {
    GET_LOGGED_IN: "GET_LOGGED_IN",
    LOGIN_USER: "LOGIN_USER",
    LOGOUT_USER: "LOGOUT_USER",
    REGISTER_USER: "REGISTER_USER",
    ACCOUNT_USER_FAILED: "ACCOUNT_USER_FAILED",
}

function AuthContextProvider(props) {
    const [auth, setAuth] = useState({
        user: null,
        loggedIn: false,
        error: false,
        errormessage: null,
    });
    const history = useHistory();

    useEffect(() => {
        auth.getLoggedIn();
    }, []);

    const authReducer = (action) => {
        const { type, payload } = action;
        switch (type) {
            case AuthActionType.GET_LOGGED_IN: {
                return setAuth({
                    user: payload.user,
                    loggedIn: payload.loggedIn,
                    error: false,
                    errormessage: null,
                });
            }
            case AuthActionType.LOGIN_USER: {
                return setAuth({
                    user: payload.user,
                    loggedIn: true,
                    error: false,
                    errormessage: null,
                })
            }
            case AuthActionType.LOGOUT_USER: {
                return setAuth({
                    user: null,
                    loggedIn: false,
                    error: false,
                    errormessage: null,
                })
            }
            case AuthActionType.REGISTER_USER: {
                return setAuth({
                    user: payload.user,
                    loggedIn: true,
                    error: false,
                    errormessage: null,
                })
            }
            case AuthActionType.ACCOUNT_USER_FAILED: {
                return setAuth({
                    user: null,
                    loggedIn: false,
                    error: payload.error,
                    errormessage: payload.errormessage
                })
            }
            default:
                return auth;
        }
    }

    auth.isError = function() {
        return auth.error;
    }
    
    auth.removeError = function() {
        authReducer({
            type: AuthActionType.ACCOUNT_USER_FAILED,
            payload: {
                error: false
            }
        });
    }

    auth.getLoggedIn = async function () {
        const response = await api.getLoggedIn();
        if (response.status === 200) {
            authReducer({
                type: AuthActionType.SET_LOGGED_IN,
                payload: {
                    loggedIn: response.data.loggedIn,
                    user: response.data.user,
                }
            });
        }
    }

    auth.registerUser = async function(firstName, lastName, email, password, passwordVerify) {
        try {
            const response = await api.registerUser(firstName, lastName, email, password, passwordVerify);      
            if (response.status === 200) {
                authReducer({
                    type: AuthActionType.REGISTER_USER,
                    payload: {
                        user: response.data.user
                    }
                })
                history.push("/");
            }
        } catch (exception) {
            let errmsg = exception.response.data.errorMessage
            console.log(exception.response)
            if (exception.response.status === 400) {
                authReducer({
                    type: AuthActionType.ACCOUNT_USER_FAILED,
                    payload: {
                        error: true,
                        errormessage: errmsg
                    }
                });
            }
        }
    }

    auth.loginUser = async function(email, password) {
        try {
            const response = await api.loginUser(email, password);
            if (response.status === 200) {
                authReducer({
                    type: AuthActionType.LOGIN_USER,
                    payload: {
                        user: response.data.user
                    }
                })
                history.push("/");
            }
        } catch (exception) {
            let errmsg = exception.response.data.errorMessage
            console.log(exception.response)
            if (exception.response.status === 400 || exception.response.status === 401) {
                authReducer({
                    type: AuthActionType.ACCOUNT_USER_FAILED,
                    payload: {
                        error: true,
                        errormessage: errmsg
                    }
                });
            }
        }
    }

    auth.logoutUser = async function() {
        const response = await api.logoutUser();
        if (response.status === 200) {
            authReducer( {
                type: AuthActionType.LOGOUT_USER,
                payload: null
            })
            history.push("/");
        }
    }

    auth.getUserInitials = function() {
        let initials = "";
        if (auth.user) {
            initials += auth.user.firstName.charAt(0);
            initials += auth.user.lastName.charAt(0);
        }
        console.log("user initials: " + initials);
        return initials;
    }

    return (
        <AuthContext.Provider value={{
            auth
        }}>
            {props.children}
  
        <MUIAlerts />
        </AuthContext.Provider>
    );
}

export default AuthContext;
export { AuthContextProvider };