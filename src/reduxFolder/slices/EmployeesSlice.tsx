//libs
import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";
//hooks
import { useHttp } from "hooks/useHttp";
//types
import { EmployeeType, LoadingStatusType, BackEndEmployeeType } from "types/index";
//API
import { baseUrl } from "services/API";

const initialState: {
  fetchEmployeesLoadingStatus: LoadingStatusType,
  createAndCgangeEmployeeLoadingStatus: LoadingStatusType,
  employees: EmployeeType[];
  errorMessage: string | null;
  changePasswordMessage: string | null
  changePasswordLoadingStatus: LoadingStatusType
} = {
  fetchEmployeesLoadingStatus: "loading",
  createAndCgangeEmployeeLoadingStatus: "idle",
  employees: [],
  errorMessage: null,
  changePasswordMessage: null,
  changePasswordLoadingStatus: "idle"
}

export const fetchEmployees = createAsyncThunk(
  "suppliers/fetchSuppliers",
  async () => {
    const { request } = useHttp();
    return request(`${baseUrl}/api/v1/employees/`);
  }
)

const createEmployeeError = createAction("Employee/createEmployeeError");

export const createEmployee = createAsyncThunk(
  "employee/createEmployee",
  async (payload: {
    data: BackEndEmployeeType,
    image: FormData | string;
  }, { dispatch }) => {
    const { request } = useHttp();
    try {
      const res = await request(`${baseUrl}/api/v1/employees/`, "POST", JSON.stringify(payload.data), {
        "Content-Type": "application/json",
      })
      await request(`${baseUrl}/api/v1/employees/set-password/`, "POST", JSON.stringify({
        new_password: payload.data.password,
        old_password: "this field id erequired",
        id: res.id
      }), {
        "Content-Type": "application/json",
      })
      if (res.message) return res

      if (payload.image && res.id && !res.message) {
        await request(`${baseUrl}/api/v1/load-image-for-employee/?employee_id=${res.id}`, "POST", payload.image, {
          'X-CSRFToken': 'ptaV9bqn8MPLELLWIWUmgtANqtvKPFERJph6HXMX83qN'
        }, true);
      }
      const response = await request(`${baseUrl}/api/v1/employees/${res.id}/`);
      return response;
    } catch (error) {
      dispatch(createEmployeeError());
      throw new Error("Failed to create employee.");
    }
  }
)

export const changeEmployee = createAsyncThunk(
  "employee/changeEmployee",
  async (payload: {
    data: Partial<BackEndEmployeeType>,
    image: FormData | string;
  }, { dispatch }) => {
    const { request } = useHttp();
    try {
      const res = await request(`${baseUrl}/api/v1/employees/${payload.data.id}/`, "PATCH", JSON.stringify(payload.data), {
        "Content-Type": "application/json",
      });
      let imageResponse: any = payload.image
      if (res.message) return res
      if (typeof payload.image !== 'string' && payload.image && !res.message) {
        imageResponse = await request(`${baseUrl}/api/v1/load-image-for-employee/?employee_id=${payload.data.id}`, "POST", payload.image, {
          'X-CSRFToken': 'ptaV9bqn8MPLELLWIWUmgtANqtvKPFERJph6HXMX83qN'
        }, true);
      }

      const responseWithImage = {
        ...res,
        image: typeof payload.image === "string" ? payload.image : baseUrl + imageResponse.url,
        id: payload.data.id
      };

      return responseWithImage;
    } catch (error) {
      dispatch(createEmployeeError());
      throw new Error("Failed to change employee.");
    }
  }
);

export const changePassword = createAsyncThunk(
  "suppliers/changePassword",
  async (
    payload: {
      data: {
        old_password: string,
        new_password: string,
        id: string | number
      }
    }
  ) => {
    const { request } = useHttp();
    return request(`${baseUrl}/api/v1/employees/change-password/`, "POST", JSON.stringify(payload.data));
  }
)

const employeesSlice = createSlice({
  name: 'employee',
  initialState,
  reducers: {
    setErrorMessageToNull(state) {
      state.errorMessage = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployees.pending, (state) => {
        state.fetchEmployeesLoadingStatus = "loading";
      })
      .addCase(fetchEmployees.fulfilled, (state, { payload }) => {
        state.fetchEmployeesLoadingStatus = "idle";
        state.employees = payload.results.map((item: BackEndEmployeeType) => {
          const {
            id,
            name,
            email,
            phone,
            role,
            image,
            hourly_wage,
            job_type
          } = item
          return {
            name: name,
            email,
            wage: hourly_wage,
            phone,
            role,
            jobType: job_type,
            id,
            image: image ?? 'https://cdn-icons-png.flaticon.com/512/3607/3607444.png'
          }
        })
      })
      .addCase(fetchEmployees.rejected, (state) => {
        state.fetchEmployeesLoadingStatus = "error";
      })
      .addCase(createEmployee.pending, (state) => {
        state.createAndCgangeEmployeeLoadingStatus = "loading";
        state.errorMessage = null;
      })
      .addCase(createEmployee.fulfilled, (state, { payload }) => {
        const {
          id,
          name,
          email,
          phone,
          role,
          image,
          hourly_wage,
          job_type,
          message
        } = payload
        if (message) {
          state.errorMessage = message
        } else {
          state.employees.push({
            name,
            email,
            wage: hourly_wage,
            phone,
            role,
            jobType: job_type,
            id,
            image: image ?? 'https://cdn-icons-png.flaticon.com/512/3607/3607444.png'
          });
        }
        state.createAndCgangeEmployeeLoadingStatus = "idle";
      })
      .addCase(createEmployee.rejected, (state, { payload }) => {
        state.createAndCgangeEmployeeLoadingStatus = "error";
      })
      .addCase(changeEmployee.rejected, (state) => {
        state.createAndCgangeEmployeeLoadingStatus = "error";
      })
      .addCase(changeEmployee.pending, (state) => {
        state.createAndCgangeEmployeeLoadingStatus = "loading";
        state.errorMessage = null;
      })
      .addCase(changeEmployee.fulfilled, (state, { payload }) => {
        state.createAndCgangeEmployeeLoadingStatus = "idle";
        const {
          id,
          name,
          email,
          phone,
          role,
          image,
          hourly_wage,
          job_type,
          message
        } = payload

        if (message) {
          state.errorMessage = message
        } else {
          state.employees = state.employees.map((employee) => {
            return employee.id === payload.id ? {
              name,
              email,
              wage: hourly_wage,
              phone,
              role,
              jobType: job_type,
              id: id ?? '',
              image: image ? image : 'https://cdn-icons-png.flaticon.com/512/3607/3607444.png'
            } : employee;
          })
        }
      })
      .addCase(changePassword.pending, (state) => {
        state.changePasswordLoadingStatus = "loading";
      })
      .addCase(changePassword.fulfilled, (state, { payload }) => {
        state.changePasswordMessage = payload
        state.changePasswordLoadingStatus = "idle";
        state.changePasswordMessage = null
      })
      .addCase(changePassword.rejected, (state, action) => {
        if (action.error.message?.includes("4")) {
          state.changePasswordMessage = "Falsches altes Passwort"
        }
        state.changePasswordLoadingStatus = "error";
      })
      .addDefaultCase((state, action) => { })
  }
})

const { reducer, actions } = employeesSlice
export const { setErrorMessageToNull } = actions
export default reducer