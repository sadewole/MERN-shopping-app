import {
    GET_ERRORS,
    CLEAR_ERRORS
} from "./types";

//Return Errors
export const returnErrors = (status, msg, id = null) => {
    return {
        type: GET_ERRORS,
        payload: {
            status,
            msg,
            id
        }
    }
}

export const clearErrors = () => {
    return {
        type: CLEAR_ERRORS
    }
}