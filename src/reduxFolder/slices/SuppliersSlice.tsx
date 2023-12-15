//libs
import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";
//hooks
import { useHttp } from "hooks/useHttp";
//types
import { SupplierType, LoadingStatusType, BackEndSupplierType } from "types/index";
//API
import { baseUrl } from "services/API";


const initialState: {
  fetchSuppliersMaterialsLoadingStatus: LoadingStatusType,
  fetchSuppliersWorkersLoadingStatus: LoadingStatusType,
  createAndChangeSupplierLoadingStatus: LoadingStatusType,
  fetchSuppliersWorkersByProjectLoadingStatus: LoadingStatusType,
  suppliersWorkers: SupplierType[],
  suppliersMaterials: SupplierType[],
  suppliersWorkersByProject: {
    id: string | number | null,
    data: { company: string, id: string | number }[]
  }
  errorMessage: string | null


} = {
  fetchSuppliersMaterialsLoadingStatus: "loading",
  fetchSuppliersWorkersLoadingStatus: "loading",
  createAndChangeSupplierLoadingStatus: "idle",
  fetchSuppliersWorkersByProjectLoadingStatus: "idle",
  suppliersWorkers: [],
  suppliersMaterials: [],
  suppliersWorkersByProject: {
    id: null,
    data: []
  },
  errorMessage: null
}

export const fetchSuppliersMaterials = createAsyncThunk(
  "suppliers/fetchSuppliersMaterials",
  async () => {
    const { request } = useHttp();
    return request(`${baseUrl}/api/v1/suppliers/?type=Materials`);
  }
)

export const fetchSuppliersWorkers = createAsyncThunk(
  "suppliers/fetchSuppliersWorkers",
  async () => {
    const { request } = useHttp();
    return request(`${baseUrl}/api/v1/suppliers/?type=Workers`);
  }
)

const createInventoryError = createAction("Inventory/createInventoryError");

export const createSupplier = createAsyncThunk(
  "suppliers/createSupplier",
  async (payload: {
    data: Partial<BackEndSupplierType>,
    image: FormData | null
  }, { dispatch }) => {
    const { request } = useHttp();
    try {
      const res = await request(`${baseUrl}/api/v1/suppliers/`, "POST", JSON.stringify(payload.data), {
        "Content-Type": "application/json",
      });
      if (res.message) return res
      if (payload.image && res.id && !res.message) {
        await request(`${baseUrl}/api/v1/load-image-for-supplier/?supplier_id=${res.id}`, "POST", payload.image, {
          'X-CSRFToken': 'ptaV9bqn8MPLELLWIWUmgtANqtvKPFERJph6HXMX83qN'
        }, true);
      }
      const response = await request(`${baseUrl}/api/v1/suppliers/${res.id}/`);
      return response;
    } catch (error) {
      dispatch(createInventoryError());
      throw new Error("Failed to create employee.");
    }
  }
)

export const changeSupplier = createAsyncThunk(
  "suppliers/changeSupplier",
  async (payload: {
    data: Partial<BackEndSupplierType>,
    image: FormData | string;
  }, { dispatch }) => {
    const { request } = useHttp();
    try {
      const res = await request(`${baseUrl}/api/v1/suppliers/${payload.data.id}/`, "PATCH", JSON.stringify(payload.data), {
        "Content-Type": "application/json",
      });
      if (res.message) return res
      let imageResponse: any = payload.image
      if (typeof payload.image !== 'string' && !res.message) {
        imageResponse = await request(`${baseUrl}/api/v1/load-image-for-supplier/?supplier_id=${payload.data.id}`, "POST", payload.image, {
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
      dispatch(createInventoryError());
      throw new Error("Failed to change supplier.");
    }
  }
);

export const fetchSuppliersForWorkersByProject = createAsyncThunk(
  "suppliers/fetchSuppliersForWorkersByProject",
  async (payload: string | number) => {
    const { request } = useHttp();
    const res = await request(`${baseUrl}/api/v1/suppliers/by-project/${payload}/`);
    return {
      data: res,
      id: payload
    }
  }
)

const suppliersSlice = createSlice({
  name: 'suppliers',
  initialState,
  reducers: {
    setErrorMessageToNull(state) {
      state.errorMessage = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSuppliersMaterials.pending, (state) => {
        state.fetchSuppliersMaterialsLoadingStatus = "loading";
      })
      .addCase(fetchSuppliersMaterials.fulfilled, (state, { payload }) => {
        state.fetchSuppliersMaterialsLoadingStatus = "idle";
        state.suppliersMaterials = payload.results.map((item: BackEndSupplierType) => {
          const {
            Ust_id,
            address,
            bank_details,
            company,
            email,
            hourly_wage,
            id,
            image,
            name,
            phone,
            role,
            type
          } = item
          return {
            name: company,
            contactPerson: name,
            phone,
            email,
            wage: hourly_wage,
            role,
            UstId: Ust_id,
            bankDetails: bank_details,
            address,
            id,
            type,
            image: image ?? 'https://cdn-icons-png.flaticon.com/512/3607/3607444.png'
          }
        })
      })
      .addCase(fetchSuppliersMaterials.rejected, (state) => {
        state.fetchSuppliersMaterialsLoadingStatus = "error";
      })
      .addCase(fetchSuppliersWorkers.pending, (state) => {
        state.fetchSuppliersWorkersLoadingStatus = "loading";
      })
      .addCase(fetchSuppliersWorkers.fulfilled, (state, { payload }) => {
        state.fetchSuppliersWorkersLoadingStatus = "idle";
        state.suppliersWorkers = payload.results.map((item: BackEndSupplierType) => {
          const {
            Ust_id,
            address,
            bank_details,
            company,
            email,
            hourly_wage,
            id,
            image,
            name,
            phone,
            role,
            type,
          } = item
          return {
            name: company,
            contactPerson: name,
            phone,
            email,
            wage: hourly_wage,
            role,
            UstId: Ust_id,
            bankDetails: bank_details,
            address,
            id,
            type,
            image: image ?? 'https://cdn-icons-png.flaticon.com/512/3607/3607444.png'
          }
        })
      })
      .addCase(fetchSuppliersWorkers.rejected, (state) => {
        state.fetchSuppliersWorkersLoadingStatus = "error";
      })
      .addCase(createSupplier.pending, (state) => {
        state.createAndChangeSupplierLoadingStatus = "loading";
        state.errorMessage = null;
      })
      .addCase(createSupplier.fulfilled, (state, { payload }) => {
        const {
          Ust_id,
          address,
          bank_details,
          company,
          email,
          hourly_wage,
          id,
          image,
          name,
          phone,
          role,
          type,
          message
        } = payload
        if (message) {
          state.errorMessage = message
        } else {
          const newSupplier = {
            image: image ?? 'https://cdn-icons-png.flaticon.com/512/3607/3607444.png',
            name: company,
            contactPerson: name,
            phone,
            email,
            wage: hourly_wage,
            role,
            UstId: Ust_id,
            bankDetails: bank_details,
            address,
            id,
            type
          }
          type === "Materials" ? state.suppliersMaterials.push(newSupplier) : state.suppliersWorkers.push(newSupplier)
        }
        state.createAndChangeSupplierLoadingStatus = "idle";
      })
      .addCase(createSupplier.rejected, (state) => {
        state.createAndChangeSupplierLoadingStatus = "error";
      })
      .addCase(changeSupplier.pending, (state) => {
        state.createAndChangeSupplierLoadingStatus = "loading";
        state.errorMessage = null;
      })
      .addCase(changeSupplier.fulfilled, (state, { payload }) => {
        const {
          Ust_id,
          address,
          bank_details,
          company,
          email,
          hourly_wage,
          id,
          image,
          name,
          phone,
          role,
          type,
          message
        } = payload
        if (message) {
          state.errorMessage = message
        } else {
          const newSupplier = {
            image: image ?? 'https://cdn-icons-png.flaticon.com/512/3607/3607444.png',
            name: company,
            contactPerson: name,
            phone,
            email,
            type,
            wage: hourly_wage,
            role,
            UstId: Ust_id,
            bankDetails: bank_details,
            address,
            id: id ?? '',
          }
          type === 'Materials' ?
            state.suppliersMaterials = state.suppliersMaterials.map((supplier) => {
              return supplier.id === payload.id ? newSupplier : supplier;
            })
            : state.suppliersWorkers = state.suppliersWorkers.map((supplier) => {
              return supplier.id === payload.id ? newSupplier : supplier;
            })
        }
        state.createAndChangeSupplierLoadingStatus = "idle";
      })
      .addCase(changeSupplier.rejected, (state) => {
        state.createAndChangeSupplierLoadingStatus = "error";
      })
      .addCase(fetchSuppliersForWorkersByProject.pending, (state) => {
        state.fetchSuppliersWorkersByProjectLoadingStatus = "loading";
      })
      .addCase(fetchSuppliersForWorkersByProject.fulfilled, (state, { payload }) => {
        //@ts-ignore
        state.suppliersWorkersByProject = payload
        state.fetchSuppliersWorkersByProjectLoadingStatus = "idle";
      })
      .addCase(fetchSuppliersForWorkersByProject.rejected, (state) => {
        state.fetchSuppliersWorkersByProjectLoadingStatus = "error";
      })

      .addDefaultCase((state, action) => { })
  }
})

const { reducer, actions } = suppliersSlice
export const { setErrorMessageToNull } = actions
export default reducer
