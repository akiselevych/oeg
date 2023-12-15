//libs
import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";
//hooks
import { useHttp } from "hooks/useHttp";
//types
import { InventoryType, LoadingStatusType, BackEndInventoryType } from "types/index";
import { changeMaterialValues } from "./ProjectPropositionSlice";
//API
import { baseUrl } from "services/API";


const initialState: {
  fetchInventoryLoadingStatus: LoadingStatusType,
  createInventoryLoadingStatus: LoadingStatusType,
  changeInventoryLoadingStatus: LoadingStatusType,
  deleteInventoryLoadingStatus: LoadingStatusType,
  inventory: InventoryType[],
  errorMessage: string | null
} = {
  fetchInventoryLoadingStatus: "loading",
  createInventoryLoadingStatus: "idle",
  deleteInventoryLoadingStatus: 'idle',
  changeInventoryLoadingStatus: 'idle',
  inventory: [],
  errorMessage: null
}

export const fetchInventory = createAsyncThunk(
  "Inventory/fetchInventory",
  async () => {
    const { request } = useHttp();
    return request(`${baseUrl}/api/v1/materials/`);
  }
)

const createInventoryError = createAction("Inventory/createInventoryError");

export const createInventory = createAsyncThunk(
  "Inventory/createInventory",
  async (payload: {
    image: FormData | null;
    data: BackEndInventoryType
  }, { dispatch }) => {
    const { request } = useHttp();
    try {
      const res = await request(`${baseUrl}/api/v1/materials/`, "POST", JSON.stringify(payload.data), {
        "Content-Type": "application/json",
      });
      if (res.message) return res
      if (payload.image && res.id && !res.message) {
        await request(`${baseUrl}/api/v1/materials/load-image/?material_id=${res.id}`, "POST", payload.image, {
          'X-CSRFToken': 'ptaV9bqn8MPLELLWIWUmgtANqtvKPFERJph6HXMX83qN'
        }, true);
      }
      const response = await request(`${baseUrl}/api/v1/materials/${res.id}/`);
      return response;
    } catch (error) {
      dispatch(createInventoryError());
      throw new Error("Failed to create inventory.");
    }
  }
);
export const changeInventory = createAsyncThunk(
  "employee/changeInventory",
  async (payload: {
    data: Partial<BackEndInventoryType>,
    id: string | number;
    image?: FormData | string
  }, { dispatch }) => {
    const { request } = useHttp();
    try {
      const res = await request(`${baseUrl}/api/v1/materials/${payload.id}/`, "PATCH", JSON.stringify(payload.data), {
        "Content-Type": "application/json",
      });

      if (typeof payload.image !== 'string' && !res.message) {
        await request(`${baseUrl}/api/v1/materials/load-image/?material_id=${payload.id}`, "POST", payload.image, {
          'X-CSRFToken': 'ptaV9bqn8MPLELLWIWUmgtANqtvKPFERJph6HXMX83qN'
        }, true);
      }

      if (res.message) return res
      const response = await request(`${baseUrl}/api/v1/materials/${res.id}/`);
      return response;
    } catch (error) {
      dispatch(createInventoryError());
      throw new Error("Failed to change inventory.");
    }
  }
);

export const setAsRecievedInventory = createAsyncThunk(
  "Inventory/setAsRecievedInventory",
  async (payload: { id: (string | number)[] }) => {
    const { request } = useHttp();
    await request(`${baseUrl}/api/v1/materials/change_ordered/`, "PATCH", JSON.stringify(payload), {
      "Content-Type": "application/json",
    });
    return payload.id
  }
)

export const deleteInventory = createAsyncThunk(
  "clients/deleteInventory",
  async (payload: string | number) => {
    const { request } = useHttp();
    await request(`${baseUrl}/api/v1/materials/${payload}/`, "DELETE")
    return payload
  }
)

const InventorySlice = createSlice({
  name: 'Inventory',
  initialState,
  reducers: {
    setErrorMessageToNull: (state) => { state.errorMessage = null }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchInventory.pending, (state) => {
        state.fetchInventoryLoadingStatus = "loading";
      })
      .addCase(fetchInventory.fulfilled, (state, { payload }) => {
        state.inventory = payload.results.map((item: BackEndInventoryType) => {
          const {
            article_number,
            available_count,
            description,
            id,
            name,
            ordered_count,
            reserved_count,
            supplier,
            units,
            is_active,
            photo
          } = item
          return {
            id,
            name,
            description,
            units,
            supplier: typeof supplier === "object" ? supplier?.name : supplier,
            reserved: reserved_count,
            ordered: ordered_count,
            available: available_count,
            article: article_number,
            address: typeof supplier === "object" ? supplier?.address : supplier,
            supplierId: typeof supplier === "object" ? supplier?.id : supplier,
            is_active,
            photo
          }
        })
        state.fetchInventoryLoadingStatus = "idle";

      })
      .addCase(fetchInventory.rejected, (state) => {
        state.fetchInventoryLoadingStatus = "error";
      })
      .addCase(createInventory.pending, (state) => {
        state.createInventoryLoadingStatus = "loading";
        state.errorMessage = null;
      })
      .addCase(createInventory.fulfilled, (state, { payload }) => {
        if (payload.message) {
          state.errorMessage = payload.message
        } else {
          const {
            article_number,
            available_count,
            description,
            id,
            name,
            ordered_count,
            reserved_count,
            supplier,
            units,
            is_active,
            photo
          } = payload
          state.inventory.push({
            id,
            name,
            description,
            units,
            is_active,
            photo,
            supplier: typeof supplier === "object" ? supplier?.name : supplier,
            reserved: reserved_count,
            ordered: ordered_count,
            available: available_count,
            article: article_number,
            address: typeof supplier === "object" ? supplier?.address : supplier,
            supplierId: typeof supplier === "object" ? supplier?.id : supplier,
          })
        }
        state.createInventoryLoadingStatus = "idle";
      })
      .addCase(createInventory.rejected, (state) => {
        state.createInventoryLoadingStatus = "error";
        throw new Error("Failed to create inventory.");
      })
      .addCase(changeInventory.rejected, (state) => {
        state.changeInventoryLoadingStatus = "error";
      })
      .addCase(changeInventory.pending, (state) => {
        state.changeInventoryLoadingStatus = "loading";
        state.errorMessage = null;
      })
      .addCase(changeInventory.fulfilled, (state, { payload }) => {
        if (payload.message) {
          state.errorMessage = payload.message
        } else {
          const {
            article_number,
            available_count,
            description,
            id,
            name,
            ordered_count,
            reserved_count,
            supplier,
            units,
            is_active,
            photo
          } = payload

          state.inventory = state.inventory.map((inventory) => {
            return inventory.id === payload.id ? {
              id,
              name,
              description,
              photo,
              units,
              is_active,
              supplier: typeof supplier === "object" ? supplier?.name : supplier,
              reserved: reserved_count,
              ordered: ordered_count,
              available: available_count,
              article: article_number,
              address: typeof supplier === "object" ? supplier?.address : supplier,
              supplierId: typeof supplier === "object" ? supplier?.id : supplier,
            } : inventory;
          })
        }
        state.changeInventoryLoadingStatus = "idle";
      })
      //otherSlices
      .addCase(changeMaterialValues.fulfilled, (state, { payload }) => {
        payload.forEach(changeObj => {
          state.inventory = state.inventory.map(material => material.id === changeObj.materialId ?
            {
              ...material,
              ordered: material.ordered + (changeObj.data.ordered_count ?? 0),
              available: material.available + (changeObj.data.available_count ?? 0),
              reserved: material.reserved + (changeObj.data.reserved_count ?? 0),
            }
            : material)
        })
      })
      .addCase(deleteInventory.pending, (state) => {
        state.deleteInventoryLoadingStatus = "loading";
      })
      .addCase(deleteInventory.fulfilled, (state, { payload }) => {
        state.inventory = state.inventory.map((item) => item.id === payload ? { ...item, is_active: false } : item)
        state.deleteInventoryLoadingStatus = "idle";
      })
      .addCase(deleteInventory.rejected, (state) => {
        state.deleteInventoryLoadingStatus = "error";
      })
      .addCase(setAsRecievedInventory.pending, (state) => {
        state.changeInventoryLoadingStatus = "loading";
      })
      .addCase(setAsRecievedInventory.fulfilled, (state, { payload }) => {
        state.inventory = state.inventory.map((item) => {
          if (payload.some((id => id === item.id))) {
            return {
              ...item,
              ordered: 0,
              available: item.available + item.ordered,
            }
          } else {
            return item
          }
        })
        state.changeInventoryLoadingStatus = "idle";
      })
      .addCase(setAsRecievedInventory.rejected, (state) => {
        state.changeInventoryLoadingStatus = "error";
      })
      .addDefaultCase((state, action) => { })
  }
})

const { reducer, actions } = InventorySlice
export const { setErrorMessageToNull } = actions
export default reducer
