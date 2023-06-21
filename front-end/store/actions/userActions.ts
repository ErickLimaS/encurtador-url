import axios from "axios";
import { Dispatch } from "react";
import { AnyAction } from "redux";
import { USER_LOGIN_ERROR, USER_LOGIN_REQUEST, USER_LOGIN_SUCCESS, USER_LOGOUT_ERROR, USER_LOGOUT_REQUEST, USER_LOGOUT_SUCCESS, USER_SIGNUP_ERROR, USER_SIGNUP_REQUEST, USER_SIGNUP_SUCCESS } from "../constants/userConstants";

export const signUpUser = (userData: UserSignUp) => async (dispatch: Dispatch<AnyAction>) => {

    try {
        dispatch({ type: USER_SIGNUP_REQUEST, payload: userData })

        const { data }: { data: ServerWithStringResponse } = await axios.post(
            `${process.env.SERVER_URL}/user/signup`, userData
        )

        if (!data.success) {

            dispatch({ type: USER_SIGNUP_ERROR, payload: data.message })

            alert(data.message)

            return

        }

        dispatch({ type: USER_SIGNUP_SUCCESS, payload: data.response })

        localStorage.setItem("token", data.response)

        return data
    }
    catch (err: any) {

        dispatch({ type: USER_SIGNUP_ERROR, payload: err.response })

        console.error(err)

        alert(err)

    }

}

export const logInUser = (userData: UserLogIn) => async (dispatch: Dispatch<AnyAction>) => {

    try {
        dispatch({ type: USER_LOGIN_REQUEST, payload: userData })

        const { data }: { data: ServerWithStringResponse } = await axios.post(
            `${process.env.SERVER_URL}/user/signin`, userData
        )

        if (!data.success) {

            dispatch({ type: USER_LOGIN_ERROR, payload: data.message })

            alert(data.message)

            return

        }

        dispatch({ type: USER_LOGIN_SUCCESS, payload: data.response })

        localStorage.setItem("token", data.response)

        return data
    }
    catch (err: any) {

        dispatch({ type: USER_LOGIN_ERROR, payload: err.response })

        console.error(err)

        alert(err)

    }

}

export const logOutUser = () => async (dispatch: Dispatch<AnyAction>) => {

    try {

        dispatch({ type: USER_LOGOUT_REQUEST })

        if (localStorage.getItem("token") == null) {

            dispatch({ type: USER_LOGOUT_ERROR, payload: "Token Não Encontrado." })

            alert("Token Não Encontrado.")

            return

        }

        localStorage.removeItem("token")

        dispatch({ type: USER_LOGOUT_SUCCESS })

        return
    }
    catch (err: any) {

        dispatch({ type: USER_SIGNUP_ERROR, payload: err.response })

        console.error(err)

        alert(err)

    }

}