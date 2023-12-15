//libs
import { createSlice } from "@reduxjs/toolkit";
//types
import { EmployeeType } from "types/index";


const initialState: {
    dashboardIsCreateInvoiceOpen: boolean
    projectIsCreatePropositionOpen: boolean
    editEmployee: EmployeeType | null
    editSupplier: string | number | null,
    editClient: string | number | null
    editInventory: string | number | null,
    zoomForMainScreen: number;
} = {
    dashboardIsCreateInvoiceOpen: false,
    projectIsCreatePropositionOpen: false,
    editEmployee: null,
    editSupplier: null,
    editClient: null,
    editInventory: null,
    zoomForMainScreen: 100
}
const PagesStateSlice = createSlice({
    name: 'dashboardPage',
    initialState,
    reducers: {
        setDashboardIsCreateInvoiceOpen(state, action: { type: string, payload: boolean }) {
            state.dashboardIsCreateInvoiceOpen = action.payload
        },
        setProjectIsCreatePropositionOpen(state, action: { type: string, payload: boolean }) {
            state.projectIsCreatePropositionOpen = action.payload
        },
        setEditEmployee(state, action: { type: string, payload: EmployeeType | null }) {
            state.editEmployee = action.payload
        },
        setEditSupplier(state, action: { type: string, payload: string | number | null }) {
            state.editSupplier = action.payload
        },
        setEditClient(state, action: { type: string, payload: string | number | null }) {
            state.editClient = action.payload
        },
        setEditInventory(state, action: { type: string, payload: string | number | null }) {
            state.editInventory = action.payload
        },
        setZoomForMainScreen(state, action: { type: string, payload: number }) {
            state.zoomForMainScreen = action.payload
        }
    }
})

const { reducer, actions } = PagesStateSlice
export default reducer;
export const { setDashboardIsCreateInvoiceOpen,
    setProjectIsCreatePropositionOpen,
    setEditEmployee,
    setEditSupplier,
    setEditClient,
    setEditInventory,
    setZoomForMainScreen } = actions