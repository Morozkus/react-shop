import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Brands, IDevice, Types } from "../../models/Device";

interface DeviceState {
    selectedType: Types | null,
    selectedBrand: Brands | null,
    devices: IDevice[]
}

const initialState: DeviceState = {
    selectedType: null,
    selectedBrand: null,
    devices: []
}

export const DeviceSlice = createSlice({
    name: 'device',
    initialState,
    reducers: {
        setType(state, payload: PayloadAction<Types>) {
            state.selectedType = payload.payload
        },
        setBrand(state, payload: PayloadAction<Brands>) {
            state.selectedBrand = payload.payload
        }
    },
})

export default DeviceSlice.reducer