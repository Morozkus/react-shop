import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IBasket } from "../../models/User";

interface UserState {
    user: object,
    isAuth: boolean,
    basketId: number | null
}

const initialState: UserState = {
    user: {},
    isAuth: false,
    basketId: null
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setIsAuth(state, payload: PayloadAction<boolean>) {
            state.isAuth = payload.payload
        },
        setUser(state, payload: PayloadAction<any>) {
            state.user = payload.payload
        },
        setBasket(state, payload: PayloadAction<IBasket | null>) {
            if (!payload.payload) return
            state.basketId = payload.payload.id
        }
    },
})

export default userSlice.reducer