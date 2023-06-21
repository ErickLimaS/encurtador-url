import { configureStore } from "@reduxjs/toolkit";
import { userLogInReducer, userSignUpReducer } from "./store/reducers/userReducers";


const initialState = {

    user: {
        token: localStorage.getItem("token") || null
    } as User

}

const store = configureStore({
    reducer: {

        user: userSignUpReducer || userLogInReducer

    },
    preloadedState: initialState
})

export default store

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch