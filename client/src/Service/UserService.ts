import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { IDataUser, IUser } from "../models/User";

export const userAPI = createApi({
    reducerPath: 'userAPI',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api' }),
    tagTypes: ['User'],
    endpoints: (build) => ({
        registrationUser: build.mutation<IDataUser, IUser>({
            query: (candidate) => ({
                url: '/user/registration',
                method: 'POST',
                body: candidate
            })
        }),
        loginUser: build.mutation<IDataUser, IUser>({
            query: (user) => ({
                url: '/user/login',
                method: 'POST',
                body: user
            })
        }),
        check: build.query<IDataUser, string>({
            query: (token) => ({
                url: '/user/auth',
                method: 'GET',
                headers: {
                    Authorization: token
                }
            })
        }),
    }),
})
