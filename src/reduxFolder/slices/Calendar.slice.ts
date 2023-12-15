import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit"
import moment from "moment"
import {API} from "services/API"
import {ClientType} from "types"

type InitialStateType = {
    currentDate: string
    customers: ClientType[]
    customersFilter: string[]
		search: string
}

const initialState: InitialStateType = {
    currentDate: moment().format("YYYY-MM-DD"),
    customers: [],
    customersFilter: [],
		search: ""
}

export const getCustomers = createAsyncThunk("calendar/getCustomers", async () => {
    const response = await API.getCustomers()
    return response.results
})

export const calendarSlice = createSlice({
    name: "calendar",
    initialState,
    reducers: {
        setCurrentDate: (state, action: PayloadAction<string>) => {
            state.currentDate = action.payload
        },
        setCustomersFilter: (state, action: PayloadAction<string[]>) => {
            state.customersFilter = action.payload
        },
				setCalendarSearch: (state, action: PayloadAction<string>) => {
					state.search = action.payload
				}
    },
    extraReducers: (builder) => {
        builder.addCase(getCustomers.fulfilled, (state, action) => {
            state.customers = action.payload
        })
    },
})

export default calendarSlice.reducer
