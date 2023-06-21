import { AnyAction } from "redux";
import {
    USER_LOGIN_ERROR, USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS, USER_LOGOUT_ERROR, USER_LOGOUT_REQUEST, USER_LOGOUT_SUCCESS, USER_SIGNUP_ERROR,
    USER_SIGNUP_REQUEST, USER_SIGNUP_SUCCESS
} from "../constants/userConstants";

export function userSignUpReducer(state = {}, action: AnyAction) {

    switch (action.type) {

        case USER_SIGNUP_REQUEST:
            return { ...state, loading: true }

        case USER_SIGNUP_SUCCESS:
            return { token: action.payload, loading: false, success: true }

        case USER_SIGNUP_ERROR:
            return { ...state, loading: false, error: action.payload }

        default:
            return state

    }
}

export function userLogInReducer(state = {}, action: AnyAction) {

    switch (action.type) {

        case USER_LOGIN_REQUEST:
            return { ...state, loading: true }

        case USER_LOGIN_SUCCESS:
            return { token: action.payload, loading: false, success: true }

        case USER_LOGIN_ERROR:
            return { ...state, loading: false, error: action.payload }

        default:
            return state

    }
}

export function userLogOutReducer(state = {}, action: AnyAction) {

    switch (action.type) {

        case USER_LOGOUT_REQUEST:
            return { loading: true }

        case USER_LOGOUT_SUCCESS:
            return { loading: false, success: true }

        case USER_LOGOUT_ERROR:
            return { loading: false, error: action.payload }

        default:
            return state

    }
}