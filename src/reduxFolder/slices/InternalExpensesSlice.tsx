//libs
import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";
//hooks
import { useHttp } from "hooks/useHttp";
//types
import { LoadingStatusType, InternalExpenseType } from "types/index";
//API
import { baseUrl } from "services/API";


const initialState: {
    fetchInternalExpensesLoadingStatus: LoadingStatusType,
    createInternalExpensesLoadingStatus: LoadingStatusType,
    changeInternalExpensesLoadingStatus: LoadingStatusType
    internalExpenses: InternalExpenseType[]
} = {
    fetchInternalExpensesLoadingStatus: 'loading',
    createInternalExpensesLoadingStatus: "idle",
    changeInternalExpensesLoadingStatus: "idle",
    internalExpenses: []
}

export const fetchInternalExpenses = createAsyncThunk(
    "InternalExpenses/fetchInternalExpenses",
    async () => {
        const { request } = useHttp();
        return request(`${baseUrl}/api/v1/project-expenses/`);
    }
)

const createInternalExpensesError = createAction("InternalExpenses/createInternalExpensesError");

export const createInternalExpense = createAsyncThunk(
    "InternalExpenses/createInternalExpense",
    async (payload: Partial<InternalExpenseType>, { dispatch }) => {
        const { request } = useHttp();
        try {
            const res = await request(`${baseUrl}/api/v1/project-expenses/`, "POST", JSON.stringify(payload), {
                "Content-Type": "application/json",
            });
            const response = await request(`${baseUrl}/api/v1/project-expenses/${res.id}/`);
            return response;
        } catch (error) {
            dispatch(createInternalExpensesError());
            throw new Error("Failed to create InternalExpense.");
        }
    }
);

export const addDocumentForInternalExpense = createAsyncThunk(
    "InternalExpenses/addDocumentForInternalExpense",
    async (payload: { id: string | number, formData: FormData }, { dispatch }) => {
        const { request } = useHttp();
        try {
            const imageResponse = await request(`${baseUrl}/api/v1/project-expenses/load-pdf/?project_expense_id=${payload.id}`, "POST", payload.formData, {
                'X-CSRFToken': 'ptaV9bqn8MPLELLWIWUmgtANqtvKPFERJph6HXMX83qN'
            }, true);
            imageResponse.id = payload.id;
            return imageResponse;
        } catch (error) {
            dispatch(createInternalExpensesError());
            throw new Error("Failed to create InternalExpense.");
        }
    }
);

const InventorySlice = createSlice({
    name: 'Inventory',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchInternalExpenses.pending, (state) => {
                state.fetchInternalExpensesLoadingStatus = "loading";
            })
            .addCase(fetchInternalExpenses.fulfilled, (state, { payload }) => {
                state.fetchInternalExpensesLoadingStatus = "idle";
                state.internalExpenses = payload.map((item: InternalExpenseType) => {
                    const {
                        id,
                        category,
                        description,
                        amount,
                        date,
                        project,
                        pdf
                    } = item
                    return {
                        id,
                        category,
                        description,
                        amount,
                        date,
                        project,
                        pdf
                    }
                })
            })
            .addCase(fetchInternalExpenses.rejected, (state) => {
                state.fetchInternalExpensesLoadingStatus = "error";
            })
            .addCase(createInternalExpense.pending, (state) => {
                state.createInternalExpensesLoadingStatus = "loading";
            })
            .addCase(createInternalExpense.fulfilled, (state, { payload }) => {
                state.createInternalExpensesLoadingStatus = "idle";
                state.internalExpenses.push(payload)
            })
            .addCase(createInternalExpense.rejected, (state) => {
                state.createInternalExpensesLoadingStatus = "error";
                throw new Error("Failed to create inventory.");
            })
            .addCase(addDocumentForInternalExpense.pending, (state) => {
                state.changeInternalExpensesLoadingStatus = "loading";
            })
            .addCase(addDocumentForInternalExpense.fulfilled, (state, { payload }) => {
                state.internalExpenses = state.internalExpenses.map((item) => item.id === payload.id ? { ...item, pdf: baseUrl + payload.url } : item)
                state.changeInternalExpensesLoadingStatus = "idle";

            })
            .addCase(addDocumentForInternalExpense.rejected, (state) => {
                state.changeInternalExpensesLoadingStatus = "error";
                throw new Error("Failed to create inventory.");
            })

            .addDefaultCase((state, action) => { })
    }
})

const { reducer } = InventorySlice
export default reducer
