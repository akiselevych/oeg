//libs
import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";
//hooks
import { useHttp } from "hooks/useHttp";
//types
import { LoadingStatusType, LaborType, workersEmployeeStatisticItemType, workersSuppliersStatisticItemType } from "types/index";
import { createEvent } from "reduxFolder/slices/EventsSlice";
//API
import { baseUrl } from "services/API";
import { error } from "console";


const initialState: {
    fetchLaborLoadingStatus: LoadingStatusType,
    createLaborLoadingStatus: LoadingStatusType,
    updateLaborLoadingStatus: LoadingStatusType,
    deleteLaborLoadingStatus: LoadingStatusType,
    labors: LaborType[]
    workersEmployeesStatistic: workersEmployeeStatisticItemType[],
    workersSuppliersStatistic: workersSuppliersStatisticItemType[],
    fetchWorkersEmployeesStatisticLoadingStatus: LoadingStatusType,
    fetchWorkersSuppliersStatisticLoadingStatus: LoadingStatusType,
} = {
    fetchLaborLoadingStatus: 'loading',
    updateLaborLoadingStatus: "idle",
    createLaborLoadingStatus: "idle",
    deleteLaborLoadingStatus: "idle",
    fetchWorkersSuppliersStatisticLoadingStatus: "loading",
    fetchWorkersEmployeesStatisticLoadingStatus: "loading",
    workersEmployeesStatistic: [],
    workersSuppliersStatistic: [],
    labors: []
}

export const fetchWorkersEmployeesStatistic = createAsyncThunk(
    "Labors/fetchWorkersEmployeesStatistic",
    async (payload: {
        end_date: string,
        start_date: string;

    }) => {
        const { request } = useHttp();
        try {
            const res = request(`${baseUrl}/api/v1/statistics-for-workers/?internal=true&start_date=${payload.start_date}&end_date=${payload.end_date}`);
            return res
        } catch (e) {
            console.error(e);
        }
    }
)

export const fetchWorkersSuppliersStatistic = createAsyncThunk(
    "Labors/fetchWorkersSuppliersStatistic",
    async (payload: {
        end_date: string,
        start_date: string;
    }) => {
        const { request } = useHttp();
        try {
            const res = await request(`${baseUrl}/api/v1/statistics-for-workers/?internal=false&start_date=${payload.start_date}&end_date=${payload.end_date}`, "GET", null, {
                "accept": "application/json"
            });
            return res
        } catch (e) {
            console.error(e);
        }

    }
)

export const fetchLabors = createAsyncThunk(
    "Labors/fetchLabors",
    async (payload: string | number) => {
        const { request } = useHttp();
        return request(`${baseUrl}/api/v1/labor-costs/?project_id=${payload}`);
    }
)
export const updateLabor = createAsyncThunk(
    "Labors/updateLabor",
    async (payload: {
        id: string | number,
        data: Partial<LaborType>
    }) => {
        const { request } = useHttp();
        return await request(`${baseUrl}/api/v1/labor-costs/${payload.id}/`, "PATCH", JSON.stringify(payload.data), {
            "Content-Type": "application/json",
        });
    }
)

export const createLabor = createAsyncThunk(
    "Labors/createLabor",
    async (payload: Partial<LaborType>) => {
        const { request } = useHttp();
        const res = await request(`${baseUrl}/api/v1/labor-costs/`, "POST", JSON.stringify(payload), {
            "Content-Type": "application/json",
        });
        return request(`${baseUrl}/api/v1/labor-costs/${res.id}`);
    }
)

export const deleteLabor = createAsyncThunk(
    "clients/deleteLabor",
    async (payload: string | number) => {
        const { request } = useHttp();
        await request(`${baseUrl}/api/v1/labor-costs/${payload}/`, "DELETE")
        return payload
    }
)




const LaborsSlice = createSlice({
    name: 'Labors',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchLabors.pending, (state) => {
                state.fetchLaborLoadingStatus = "loading";
            })
            .addCase(fetchLabors.fulfilled, (state, { payload }) => {
                state.fetchLaborLoadingStatus = "idle";
                state.labors = payload
            })
            .addCase(fetchLabors.rejected, (state) => {
                state.fetchLaborLoadingStatus = "error";
            })
            .addCase(updateLabor.pending, (state) => {
                state.updateLaborLoadingStatus = "loading";
            })
            .addCase(updateLabor.fulfilled, (state, { payload }) => {
                state.updateLaborLoadingStatus = "idle";
                state.labors = state.labors.map((labor) => labor.id === payload.id ? payload : labor)
            })
            .addCase(updateLabor.rejected, (state) => {
                state.updateLaborLoadingStatus = "error";
            })
            .addCase(createLabor.pending, (state) => {
                state.createLaborLoadingStatus = "loading";
            })
            .addCase(createLabor.fulfilled, (state, { payload }) => {
                state.createLaborLoadingStatus = "idle";
                state.labors.push(payload)
            })
            .addCase(createLabor.rejected, (state) => {
                state.createLaborLoadingStatus = "error";
            })
            .addCase(deleteLabor.pending, (state) => {
                state.deleteLaborLoadingStatus = "loading";
            })
            .addCase(deleteLabor.fulfilled, (state, { payload }) => {
                state.deleteLaborLoadingStatus = "idle";
                state.labors = state.labors.filter((labor) => labor.id !== payload)
            })
            .addCase(deleteLabor.rejected, (state) => {
                state.deleteLaborLoadingStatus = "error";
            })
            //statistic
            .addCase(fetchWorkersEmployeesStatistic.pending, (state) => {
                state.fetchWorkersEmployeesStatisticLoadingStatus = "loading";
            })
            .addCase(fetchWorkersEmployeesStatistic.fulfilled, (state, { payload }) => {
                state.fetchWorkersEmployeesStatisticLoadingStatus = "idle";
                state.workersEmployeesStatistic = payload.map((item: workersEmployeeStatisticItemType) => ({
                    ...item,
                    image: item.image ? `${baseUrl}/media/${item.image}` : 'https://cdn-icons-png.flaticon.com/512/3607/3607444.png',
                }))
            })
            .addCase(fetchWorkersEmployeesStatistic.rejected, (state) => {
                state.fetchWorkersEmployeesStatisticLoadingStatus = "error";
            })
            .addCase(fetchWorkersSuppliersStatistic.pending, (state) => {
                state.fetchWorkersSuppliersStatisticLoadingStatus = "loading";
            })
            .addCase(fetchWorkersSuppliersStatistic.fulfilled, (state, { payload }) => {
                state.fetchWorkersSuppliersStatisticLoadingStatus = "idle";
                state.workersSuppliersStatistic = payload.map((item: workersSuppliersStatisticItemType) => ({
                    ...item,
                }))
            })
            .addCase(fetchWorkersSuppliersStatistic.rejected, (state, { payload }) => {
                state.fetchWorkersSuppliersStatisticLoadingStatus = "error";
            })
            .addDefaultCase((state, action) => { })
    }
})

const { reducer } = LaborsSlice
export default reducer
