//libs
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
//hooks
import { useHttp } from "hooks/useHttp";
//types
import { LoadingStatusType, EventType, EventOverviewType, EventFormInputs } from "types/index";
//API
import { baseUrl } from "services/API";


const initialState: {
    fetchEventsLoadingStatus: LoadingStatusType,
    createEventsLoadingStatus: LoadingStatusType,
    changeEventsLoadingStatus: LoadingStatusType,
    fetchSpecialProjectEventssLoadingStatus: LoadingStatusType,
    specialProjectEvents: {
        project_id: number | string | null,
        events: EventType[]
    },
    events: EventType[],
    lastMonthEvets: EventOverviewType[];
    fetchlastMonthEvetsLoadingStatus: LoadingStatusType,
    lastMonthSuppliersEvets: EventOverviewType[]
    fetchlastMonthSuppliersEvetsLoadingStatus: LoadingStatusType,
    upcomingEvents: EventType[]
    fetchUpcomingEventsLoadingStatus: LoadingStatusType,
    eventByID: EventType[],
    isEdit: boolean,
} = {
    fetchEventsLoadingStatus: "loading",
    createEventsLoadingStatus: "idle",
    changeEventsLoadingStatus: "idle",
    fetchSpecialProjectEventssLoadingStatus: "idle",
    events: [],
    specialProjectEvents: {
        events: [],
        project_id: null
    },
    lastMonthEvets: [],
    fetchlastMonthEvetsLoadingStatus: 'loading',
    lastMonthSuppliersEvets: [],
    fetchlastMonthSuppliersEvetsLoadingStatus: 'loading',
    upcomingEvents: [],
    fetchUpcomingEventsLoadingStatus: 'loading',
    eventByID: [],
    isEdit: false,
}

export const fetchEvents = createAsyncThunk(
    "Events/fetchEvents",
    async () => {
        const { request } = useHttp();
        return request(`${baseUrl}/api/v1/events/`);
    }
)

export const fetchProjectEvent = createAsyncThunk(
    "Events/fetchProjectEvent",
    async (id: number | string) => {
        const { request } = useHttp();
        return request(`${baseUrl}/api/v1/events/?project_id=${id}`);
    }
)

export const fetchEventByID = createAsyncThunk(
    "Events/fetchEventByID",
    async (id: number | string) => {
        const { request } = useHttp();
        return request(`${baseUrl}/api/v1/events/${id}/`);
    }
)
export const fetchLastMonthEvents = createAsyncThunk(
    "Events/fetchLastMonthEvents",
    async () => {
        const { request } = useHttp();
        return request(`${baseUrl}/api/v1/events/overview/?current_month=true`);
    }
)
export const fetchLastMonthSuppliersEvents = createAsyncThunk(
    "Events/fetchLastMonthSuppliersEvents",
    async () => {
        const { request } = useHttp();
        return request(`${baseUrl}/api/v1/events/overview/?with_suppliers=true&current_month=true`);
    }
)
export const fetchUpcomingEvents = createAsyncThunk(
    "Events/fetchUpcomingEvents",
    async () => {
        const { request } = useHttp();
        return request(`${baseUrl}/api/v1/events/?two_days=true`);
    }
)

export const createEvent = createAsyncThunk(
    "Events/createEvent",
    async (payload: { event: Partial<EventFormInputs>, informEmployee: boolean, informSuppliers: boolean }) => {
        const { request } = useHttp();
        const res = await request(`${baseUrl}/api/v1/events/`, "POST", JSON.stringify(payload.event), {
            "Content-Type": "application/json",
        })
        if (payload.informEmployee || payload.informSuppliers) {
            await request(`${baseUrl}/api/v1/events/inform-employee/${res.id}/?inform_suppliers=${payload.informSuppliers}&inform_employees=${payload.informEmployee}`, "GET");
        }
        return request(`${baseUrl}/api/v1/events/${res.id}`)
    }
)

export const changeEvent = createAsyncThunk<Partial<EventType>, Partial<EventType>>(
    "Events/changeEvent",
    async (event: Partial<EventType>) => {

        const { request } = useHttp();
        const res = await request(`${baseUrl}/api/v1/events/${event.id}/`, "PATCH", JSON.stringify(event), {
            "Content-Type": "application/json",
        });

        if (event.informEmployee || event.informSuppliers) {
            await request(`${baseUrl}/api/v1/events/inform-employee/${res.id}/?inform_suppliers=${event.informSuppliers}&inform_employees=${event.informEmployee}`, "GET");
        }

        return await request(`${baseUrl}/api/v1/events/${res.id}`)

    }
);

const EventsSlice = createSlice({
    name: 'events',
    initialState,
    reducers: {
        resetCurrentEvent: (state) => {
            state.eventByID = [];
        },
        setIsEdit: (state, { payload }) => {
            state.isEdit = payload;
        },
    },
    extraReducers: (builder) => {
        builder
            //fetch
            .addCase(fetchEvents.pending, (state) => {
                state.fetchEventsLoadingStatus = "loading";
            })
            .addCase(fetchEvents.fulfilled, (state, { payload }) => {
                state.fetchEventsLoadingStatus = "idle";
                state.events = payload

            })
            .addCase(fetchEvents.rejected, (state) => {
                state.fetchEventsLoadingStatus = "error";
            })
            .addCase(fetchProjectEvent.pending, (state) => {
                state.fetchSpecialProjectEventssLoadingStatus = "loading";
            })
            .addCase(fetchProjectEvent.fulfilled, (state, { payload }) => {
                state.specialProjectEvents = {
                    project_id: payload[0]?.project.id ?? null,
                    events: payload
                }
                state.fetchSpecialProjectEventssLoadingStatus = "idle";
            })
            .addCase(fetchProjectEvent.rejected, (state) => {
                state.fetchSpecialProjectEventssLoadingStatus = "error";
            })
            .addCase(fetchEventByID.pending, (state) => {

            })
            .addCase(fetchEventByID.fulfilled, (state, { payload }) => {
                state.eventByID.push(payload);
            })
            .addCase(fetchEventByID.rejected, (state) => {

            })
            //create
            .addCase(createEvent.pending, (state) => {
                state.createEventsLoadingStatus = "loading";
            })
            .addCase(createEvent.fulfilled, (state, { payload }) => {
                //@ts-ignore
                state.events.push(payload);
                state.upcomingEvents.push(payload)
                if (state.specialProjectEvents.project_id === null) {
                    state.specialProjectEvents.project_id = payload.project_id;
                }
                state.specialProjectEvents.events.push(payload);
                state.createEventsLoadingStatus = "idle";
            })
            .addCase(createEvent.rejected, (state) => {
                state.createEventsLoadingStatus = "error";
            })
            //update
            .addCase(changeEvent.pending, (state) => {
                state.changeEventsLoadingStatus = "loading";
            })
            .addCase(changeEvent.fulfilled, (state, { payload }) => {
                //@ts-ignore
                state.events = state.events.map(event => event.id === payload.id ? payload : event)
                //@ts-ignore
                state.upcomingEvents = state.upcomingEvents.map(event => event.id === payload.id ? payload : event)
                if (state.specialProjectEvents && state.specialProjectEvents.project_id === payload.project?.id) {
                    //@ts-ignore
                    state.specialProjectEvents.events = state.specialProjectEvents.events.map((event) => event.id === payload.id ? payload : event)
                    state.changeEventsLoadingStatus = "idle";
                }
            })
            .addCase(changeEvent.rejected, (state) => {
                state.changeEventsLoadingStatus = "error";
            })
            .addCase(fetchLastMonthEvents.pending, (state) => {
                state.fetchlastMonthEvetsLoadingStatus = "loading";
            })
            .addCase(fetchLastMonthEvents.fulfilled, (state, { payload }) => {
                state.fetchlastMonthEvetsLoadingStatus = "idle";
                state.lastMonthEvets = payload.results
            })
            .addCase(fetchLastMonthEvents.rejected, (state) => {
                state.fetchlastMonthEvetsLoadingStatus = "error";
            })
            .addCase(fetchLastMonthSuppliersEvents.pending, (state) => {
                state.fetchlastMonthSuppliersEvetsLoadingStatus = "loading";
            })
            .addCase(fetchLastMonthSuppliersEvents.fulfilled, (state, { payload }) => {
                state.fetchlastMonthSuppliersEvetsLoadingStatus = "idle"
                state.lastMonthSuppliersEvets = payload.results
            })
            .addCase(fetchLastMonthSuppliersEvents.rejected, (state) => {
                state.fetchlastMonthSuppliersEvetsLoadingStatus = "error";
            })
            .addCase(fetchUpcomingEvents.pending, (state) => {
                state.fetchUpcomingEventsLoadingStatus = "loading";
            })
            .addCase(fetchUpcomingEvents.fulfilled, (state, { payload }) => {
                state.fetchUpcomingEventsLoadingStatus = "idle";
                state.upcomingEvents = payload
            })
            .addCase(fetchUpcomingEvents.rejected, (state) => {
                state.fetchUpcomingEventsLoadingStatus = "error";
            })

            .addDefaultCase((state, action) => { })
    }
})

const { reducer, actions } = EventsSlice
export const { resetCurrentEvent, setIsEdit } = actions;
export default reducer
