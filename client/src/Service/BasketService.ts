import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { IDevice } from "../models/Device";


export const basketAPI = createApi({
    reducerPath: 'basketAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5000/api',
        headers: { Authorization: localStorage.getItem('token') || '' }
    }),
    tagTypes: ['Basket'],
    endpoints: (build) => ({
        getBasket: build.query<IDevice[], number | false>({
            query: (basketId) => ({
                url: '/basket',
                params: {
                    basketId
                }
            }),
            providesTags: ['Basket']
        }),
        pushInBasket: build.mutation<any, { basketId: number | false, deviceId: number }>({
            query: (product) => ({
                url: '/basket',
                method: 'POST',
                body: product
            }),
            invalidatesTags: ['Basket']
        })
    }),
})
