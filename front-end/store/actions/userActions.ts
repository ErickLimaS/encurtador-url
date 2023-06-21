import axios from "axios";
import { Dispatch } from "react";
import { AnyAction } from "redux";
import { USER_SIGNUP_ERROR, USER_SIGNUP_REQUEST, USER_SIGNUP_SUCCESS } from "../constants/userConstants";

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