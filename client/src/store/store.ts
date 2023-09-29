import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userSlice from "./reducers/UserSlice";
import DeviceSlice from "./reducers/DeviceSlice";
import { userAPI } from "../Service/UserService";
import { deviceAPI } from "../Service/DeviceService";
import { basketAPI } from "../Service/BasketService";

const rootReducer = combineReducers({
    user: userSlice,
    device: DeviceSlice,
    [userAPI.reducerPath]: userAPI.reducer,
    [deviceAPI.reducerPath]: deviceAPI.reducer,
    [basketAPI.reducerPath]: basketAPI.reducer
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware()
                .concat(userAPI.middleware)
                .concat(deviceAPI.middleware)
                .concat(basketAPI.middleware)
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof setupStore>
export type AppDispatch = AppStore['dispatch']