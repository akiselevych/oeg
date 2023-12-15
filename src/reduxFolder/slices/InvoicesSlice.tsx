//libs
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
//rdux
import { generateInvoicesWithoutProject, generateIvoices, generateAdditionalInvoice } from "./DocumentsSlice";
//hooks
import { useHttp } from "hooks/useHttp";
//types
import { LoadingStatusType, InvoiceType } from "types/index";
//API
import { baseUrl } from "services/API";

const initialState: {
  fetchInvoicesNoProjectLoadingStatus: LoadingStatusType,
  fetchInvoicesWithProjectLoadingStatus: LoadingStatusType,
  fetchAllImvoicesLoadingStatus: LoadingStatusType,
  invoicesNoProject: InvoiceType[],
  invoicesWithProject: InvoiceType[],
  allInvoices: InvoiceType[]
} = {
  fetchInvoicesNoProjectLoadingStatus: "loading",
  fetchInvoicesWithProjectLoadingStatus: "loading",
  fetchAllImvoicesLoadingStatus: "loading",
  invoicesNoProject: [],
  invoicesWithProject: [],
  allInvoices: []
}

export const fetchInvoicesNoProject = createAsyncThunk(
  "invoices/fetchInvoicesNoProject",
  async () => {
    const { request } = useHttp();
    return request(`${baseUrl}/api/v1/documents/?project_is_null=true&only_invoice=true`);
  }
)

export const fetchInvoicesWithProject = createAsyncThunk(
  "invoices/fetchInvoicesWithProject",
  async () => {
    const { request } = useHttp();
    return request(`${baseUrl}/api/v1/documents/?project_is_null=false&only_invoice=true`);
  }
)

export const fetchAllInvoices = createAsyncThunk(
  "invoices/fetchAllInvoices",
  async () => {
    const { request } = useHttp();
    return request(`${baseUrl}/api/v1/documents/?only_invoice=true`);
  }
)

const invocesSlice = createSlice({
  name: 'invoices',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchInvoicesNoProject.pending, (state) => {
        state.fetchInvoicesNoProjectLoadingStatus = "loading";
      })
      .addCase(fetchInvoicesNoProject.fulfilled, (state, { payload }) => {
        state.invoicesNoProject = payload
        state.fetchInvoicesNoProjectLoadingStatus = "idle";
      })
      .addCase(fetchInvoicesNoProject.rejected, (state) => {
        state.fetchInvoicesNoProjectLoadingStatus = "error";
      })
      .addCase(fetchInvoicesWithProject.pending, (state) => {
        state.fetchInvoicesWithProjectLoadingStatus = "loading";
      })
      .addCase(fetchInvoicesWithProject.fulfilled, (state, { payload }: { payload: InvoiceType[] }) => {
        state.invoicesWithProject = payload
        state.fetchInvoicesWithProjectLoadingStatus = "idle";
      })
      .addCase(fetchInvoicesWithProject.rejected, (state) => {
        state.fetchInvoicesWithProjectLoadingStatus = "error";
      })
      .addCase(fetchAllInvoices.pending, (state) => {
        state.fetchAllImvoicesLoadingStatus = "loading";
      })
      .addCase(fetchAllInvoices.fulfilled, (state, { payload }) => {
        state.allInvoices = payload
        state.fetchAllImvoicesLoadingStatus = "idle";
      })
      .addCase(fetchAllInvoices.rejected, (state) => {
        state.fetchAllImvoicesLoadingStatus = "error";
      })

      //other slices
      .addCase(generateIvoices.fulfilled, (state, { payload }) => {
        state.allInvoices.push({ ...payload, document: baseUrl + payload.url })
      })
      .addCase(generateInvoicesWithoutProject.fulfilled, (state, { payload }) => {
        state.allInvoices.push({ ...payload, document: baseUrl + payload.url })
      })
      .addCase(generateAdditionalInvoice.fulfilled, (state, { payload }) => {
        state.allInvoices.push({ ...payload, document: baseUrl + payload.url })
      })
      .addDefaultCase((state, action) => { })
  }
})

const { reducer } = invocesSlice
export default reducer
