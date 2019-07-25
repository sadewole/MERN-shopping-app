import axios from 'axios'
import {
    returnErrors
} from "./errorAction";
import {
    USER_LOADED,
    USER_LOADING,
    LOGIN_SUCCESS,
    REGISTER_SUCCESS,
    AUTH_ERROR,
    LOGIN_FAIL,
    REGISTER_FAIL,
    LOGOUT_SUCCESS
} from './types';

// check token & load user
export const loadUser = () => (dispatch, getState) => {
    // user loading
    dispatch({
        type: USER_LOADING
    });

    axios.get('/api/v1/auth/user', tokenConfig(getState))
        .then(res => dispatch({
            type: USER_LOADED,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.status, err.response.data));
            dispatch({
                type: AUTH_ERROR
            })
        })
}


// Register User
export const register = ({
    name,
    email,
    password
}) => dispatch => {
    // Headers
    const config = {
        headers: {
            "Content-type": "application/json"
        }
    }
    // Request Body
    const body = JSON.stringify({
        name,
        email,
        password
    })

    axios.post('/api/v1/user', body, config)
        .then(res => dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.status, err.response.data, 'REGISTER_FAIL'));
            dispatch({
                type: REGISTER_FAIL
            })
        })
}


// Login user
export const login = ({
    email,
    password
}) => dispatch => {
    // Headers
    const config = {
        headers: {
            "Content-type": "application/json"
        }
    }
    // Request Body
    const body = JSON.stringify({
        email,
        password
    })

    axios.post('/api/v1/auth', body, config)
        .then(res => dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.status, err.response.data, 'LOGIN_FAIL'));
            dispatch({
                type: LOGIN_FAIL
            })
        })
}


// Logout user
export const logout = () => {
    return {
        type: LOGOUT_SUCCESS
    }
}

// setup config/headers and token
export const tokenConfig = getState => {
    // Get token from localStorage
    const token = getState().auth.token
    // Headers
    const config = {
        headers: {
            "Content-type": "application/json"
        }
    }
    // if token, add to headers
    if (token) {
        config.headers['x-auth-token'] = token
    }

    return config
}