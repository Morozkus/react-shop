import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { Brands, IDevice, IPostDevice, Types } from "../models/Device";

export const deviceAPI = createApi({
    reducerPath: 'deviceAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:5000/api',
        headers: { Authorization: localStorage.getItem('token') || '' }
    }),
    tagTypes: ['Device', 'Types', 'Brands'],
    endpoints: (build) => ({
        getDevices: build.query<{ count: number, rows: IDevice[] }, { brandId?: number, typeId?: number }>({
            query: ({ brandId, typeId }) => ({
                url: '/device',
                params: {
                    brandId,
                    typeId
                }
            }),
            providesTags: ["Device"]
        }),
        getDeviceById: build.query<IDevice, number>({
            query: (id) => ({
                url: '/device/' + id,
                params: {
                    id
                }
            })
        }),
        createDevice: build.mutation<IDevice, FormData>({
            query: (device) => ({
                url: '/device',
                method: 'POST',
                body: device
            }),
            invalidatesTags: ["Device"]
        }),
        getTypes: build.query<Types[], null>({
            query: () => ({
                url: '/type'
            }),
            providesTags: ["Types"]
        }),
        createType: build.mutation<Types, { name: string, token: string }>({
            query: ({ name, token }) => ({
                url: '/type',
                method: 'POST',
                body: {
                    name
                },
            }),
            invalidatesTags: ['Types']
        }),
        getBrands: build.query<Brands[], null>({
            query: () => ({
                url: '/brand'
            }),
            providesTags: ['Brands']
        }),
        createBrand: build.mutation<Brands, { name: string, token: string }>({
            query: ({ name, token }) => ({
                url: '/brand',
                method: 'POST',
                body: {
                    name
                },
            }),
            invalidatesTags: ['Brands']
        }),
    }),
})
