//libs
import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";
//redux
import { updateProject, createProject } from "./ProjectsSlice";
//hooks
import { useHttp } from "hooks/useHttp";
//types
import { ClientType, LoadingStatusType, BackEndClientType } from "types/index";
//API
import { baseUrl } from "services/API";

const initialState: {
  fetchClientsLoadingStatus: LoadingStatusType,
  createClientLoadingStatus: LoadingStatusType,
  changeClientLoadingStatus: LoadingStatusType,
  deleteClientLoadingStatus: LoadingStatusType,
  clients: ClientType[];
  errorMessage: string | null;
} = {
  fetchClientsLoadingStatus: "loading",
  createClientLoadingStatus: "idle",
  changeClientLoadingStatus: "idle",
  deleteClientLoadingStatus: "idle",
  clients: [],
  errorMessage: null
}

export const fetchClients = createAsyncThunk(
  "clients/fetchClients",
  async () => {
    const { request } = useHttp();
    return request(`${baseUrl}/api/v1/customers/`, "GET", null, {
      "Content-Type": "application/json",
    });
  }
)

const createInventoryError = createAction("Clients/createInventoryError");

export const createClient = createAsyncThunk(
  "clients/createClient",
  async (payload: {
    data: BackEndClientType,
    image: FormData | null
  }, { dispatch }) => {
    const { request } = useHttp();
    try {
      const res = await request(`${baseUrl}/api/v1/customers/`, "POST", JSON.stringify(payload.data), {
        "Content-Type": "application/json",
      });
      if (res.message) return res
      if (payload.image && res.id && !res.message) {
        await request(`${baseUrl}/api/v1/load-image-for-customer/?customer_id=${res.id}`, "POST", payload.image, {
          'X-CSRFToken': 'ptaV9bqn8MPLELLWIWUmgtANqtvKPFERJph6HXMX83qN'
        }, true);
      }
      const response = await request(`${baseUrl}/api/v1/customers/${res.id}/`);
      return response;
    } catch (error) {
      dispatch(createInventoryError());
      throw new Error("Failed to create client.");
    }
  }
)
export const changeClient = createAsyncThunk(
  "suppliers/changeClient",
  async (payload: {
    data: Partial<BackEndClientType>,
    image: FormData | string;
  }, { dispatch }) => {
    const { request } = useHttp();
    try {
      const res = await request(`${baseUrl}/api/v1/customers/${payload.data.id}/`, "PATCH", JSON.stringify(payload.data), {
        "Content-Type": "application/json",
      });
      let imageResponse: any = payload.image
      if (res.message) return res
      if (typeof payload.image !== 'string' && !res.message) {
        imageResponse = await request(`${baseUrl}/api/v1/load-image-for-customer/?customer_id=${payload.data.id}`, "POST", payload.image, {
          'X-CSRFToken': 'ptaV9bqn8MPLELLWIWUmgtANqtvKPFERJph6HXMX83qN'
        }, true);
      }
      const responseWithImage = {
        ...res,
        image: typeof payload.image === "string" ? payload.image : baseUrl + imageResponse.url,
        id: payload.data.id,
        projects: payload.data.projects
      };

      return responseWithImage;
    } catch (error) {
      dispatch(createInventoryError());
      throw new Error("Failed to change client.");
    }
  }
);
export const deleteClient = createAsyncThunk(
  "clients/deleteClient",
  async (payload: string | number) => {
    const { request } = useHttp();
    await request(`${baseUrl}/api/v1/customers/${payload}/`, "DELETE")
    return payload
  }
)


const clientsSlice = createSlice({
  name: 'clients',
  initialState,
  reducers: {
    setErrorMessageToNull(state) {
      state.errorMessage = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchClients.pending, (state) => {
        state.fetchClientsLoadingStatus = "loading";
      })
      .addCase(fetchClients.fulfilled, (state, { payload }) => {
        state.fetchClientsLoadingStatus = "idle";
        state.clients = payload.results.map((item: BackEndClientType) => {
          const {
            id,
            projects,
            name,
            email,
            phone,
            image,
            address,
            type,
            role,
          } = item
          return {
            id,
            name,
            email,
            phone,
            image: image ?? 'https://cdn-icons-png.flaticon.com/512/3607/3607444.png',
            address,
            type,
            role,
            projects: projects ? projects.map(({ name, project_status, step_status, id }) => ({
              name,
              status: project_status,
              step: step_status,
              id
            })) : projects
          }
        })
      })
      .addCase(fetchClients.rejected, (state) => {
        state.fetchClientsLoadingStatus = "error";
      })
      .addCase(createClient.pending, (state) => {
        state.createClientLoadingStatus = "loading";
        state.errorMessage = null;
      })
      .addCase(createClient.fulfilled, (state, { payload }) => {
        if (payload.message) {
          state.errorMessage = payload.message
        } else {
          state.clients.push({
            ...payload,
            image: payload.image ?? 'https://cdn-icons-png.flaticon.com/512/3607/3607444.png',
          });
        }
        state.createClientLoadingStatus = "idle";
      })
      .addCase(createClient.rejected, (state) => {
        state.createClientLoadingStatus = "error";
      })
      .addCase(changeClient.pending, (state) => {
        state.changeClientLoadingStatus = "loading";
        state.errorMessage = null;
      })
      .addCase(changeClient.fulfilled, (state, { payload }) => {
        const {
          id,
          projects,
          name,
          email,
          phone,
          image,
          address,
          type,
          role,
          //@ts-ignore
          message
        } = payload as BackEndClientType
        if (message) {
          state.errorMessage = message
        } else {
          const newClient = {
            id,
            name,
            email,
            phone,
            image: image ?? 'https://cdn-icons-png.flaticon.com/512/3607/3607444.png',
            address,
            type,
            role,
            projects: projects ? projects.map(({ name, project_status, step_status, id }) => ({
              name,
              status: project_status,
              step: step_status,
              id
            })) : projects
          }
          //@ts-ignore
          state.clients = state.clients.map((client) => {
            return client.id === payload.id ? newClient : client;
          })
        }
        state.changeClientLoadingStatus = "idle";
      })
      .addCase(changeClient.rejected, (state) => {
        state.changeClientLoadingStatus = "error";
      })
      .addCase(deleteClient.pending, (state) => {
        state.deleteClientLoadingStatus = "loading";
      })
      .addCase(deleteClient.fulfilled, (state, { payload }) => {
        state.clients = state.clients.filter((item) => item.id !== payload)
        state.deleteClientLoadingStatus = "idle";
      })
      .addCase(deleteClient.rejected, (state) => {
        state.deleteClientLoadingStatus = "error";
      })
      .addCase(createProject.fulfilled, (state, { payload }) => {
        const { name, id, project_status, step } = payload
        if (!payload.message) {
          state.clients = state.clients.map((item) => payload.customer === item.id ? {
            ...item,
            projects: [...item.projects, { name, id, status: project_status, step }]
          } : item)
        }
      })
      .addCase(updateProject.fulfilled, (state, { payload }) => {
        const { name, id, project_status, step } = payload
        if (!payload.message) {
          state.clients = state.clients.map((item) => {
            const client = item
            item.projects = item.projects.filter((project) => project.id !== id)
            if (payload.customer === item.id) {
              item.projects = [...item.projects, { name, id, status: project_status, step }]
            }
            return client
          })
        }
      })


      .addDefaultCase((state, action) => { })
  }
})

const { reducer, actions } = clientsSlice
export const { setErrorMessageToNull } = actions

export default reducer
