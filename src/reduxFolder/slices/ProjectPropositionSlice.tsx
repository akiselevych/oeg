//libs
import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
//hooks
import { useHttp } from "hooks/useHttp";
import { fetchOneProject } from "./ProjectsSlice";
//redux
import { changeInventory } from "./InventorySlice";
//types
import {
  CreatePropositionType,
  LoadingStatusType,
  PosItemChangeMaterialType,
  PositionItemType,
  PropositionType
} from "types/index";
//API
import { baseUrl } from "services/API";


const initialState: {
  fetchPropositionLoadingStatus: LoadingStatusType,
  changePropositionLoadingStatus: LoadingStatusType,
  changePropositionDeletingStatus: LoadingStatusType,
  proposition: PropositionType | null,
  additionalProposition: PropositionType | null,
} = {
  fetchPropositionLoadingStatus: 'idle',
  changePropositionLoadingStatus: 'idle',
  changePropositionDeletingStatus: 'idle',
  proposition: null,
  additionalProposition: null
}

const createInventoryError = createAction("Proposition/createPropositionError");


export const createProposition = createAsyncThunk(
  "proposition/createProposition",
  async (payload: CreatePropositionType | CreatePropositionType[], { dispatch }) => {
    const { request } = useHttp();
    try {
      const res = await request(`${baseUrl}/api/v1/propositions/`, "POST", JSON.stringify(payload), {
        "Content-Type": "application/json",
      });
      const response = await request(`${baseUrl}/api/v1/propositions/${res.id}/`);
      return response;
    } catch (error) {
      dispatch(createInventoryError());
      throw new Error("Failed to create proposition.");
    }
  }
)
export const createAdditionalProposition = createAsyncThunk(
  "proposition/createAdditionalProposition",
  async (payload: CreatePropositionType, { dispatch }) => {
    const { request } = useHttp();
    try {
      const res = await request(`${baseUrl}/api/v1/propositions/`, "POST", JSON.stringify(payload), {
        "Content-Type": "application/json",
      });
      const response = await request(`${baseUrl}/api/v1/propositions/${res.id}/`);
      return response;
    } catch (error) {
      dispatch(createInventoryError());
      throw new Error("Failed to create proposition.");
    }
  }
)

export const changeProposition = createAsyncThunk(
  "proposition/changeProposition",
  async (payload: Partial<PropositionType>, { dispatch }) => {
    const { request } = useHttp();
    try {
      const res = await request(`${baseUrl}/api/v1/propositions/${payload.id}/`, "PATCH", JSON.stringify(payload), {
        "Content-Type": "application/json",
      });
      const response = await request(`${baseUrl}/api/v1/propositions/${res.id}/`);
      return response;
    } catch (error) {
      dispatch(createInventoryError());
      throw new Error("Failed to change proposition.");
    }
  }
)

export const changeAdditionalProposition = createAsyncThunk(
  "proposition/changeAdditionalProposition",
  async (payload: Partial<PropositionType>, { dispatch }) => {
    const { request } = useHttp();
    try {
      const res = await request(`${baseUrl}/api/v1/propositions/${payload.id}/`, "PATCH", JSON.stringify(payload), {
        "Content-Type": "application/json",
      });
      const response = await request(`${baseUrl}/api/v1/propositions/${res.id}/`);
      return response;
    } catch (error) {
      dispatch(createInventoryError());
      throw new Error("Failed to change proposition.");
    }
  }
)
export const deleteProposition = createAsyncThunk(
  "proposition/deleteProposition",
  async ({ proposition_id, isAdditional }: {
    proposition_id: number,
    isAdditional?: boolean
  }, { dispatch }) => {
    const { request } = useHttp();
    const token = localStorage.getItem("access");
    try {
      await request(`${baseUrl}/api/v1/propositions/${proposition_id}/`, "DELETE", null, {
        "Content-Type": "application/json",
        "accept": "application/json",
        "Authorization": `Bearer ${token}`
      });

      return isAdditional
    } catch (error) {
      dispatch(createInventoryError());
      throw new Error("Failed to delete proposition.");
    }
  }
)

export const deleteAdditionalProposition = createAsyncThunk(
  "proposition/deleteAdditionalProposition",
  async (proposition_id: number, { dispatch }) => {
    const { request } = useHttp();
    const token = localStorage.getItem("access");
    try {
      await request(`${baseUrl}/api/v1/propositions/${proposition_id}/`, "DELETE", null, {
        "Content-Type": "application/json",
        "accept": "application/json",
        "Authorization": `Bearer ${token}`
      });

    } catch (error) {
      dispatch(createInventoryError());
      throw new Error("Failed to delete proposition.");
    }
  }
)

export const createPosition = createAsyncThunk(
  "proposition/createPosition",
  async (payload: {
    proposition_id: string | number;
    title: string
  }, { dispatch }) => {
    const { request } = useHttp();
    try {
      const res = await request(`${baseUrl}/api/v1/positions/`, "POST", JSON.stringify(payload), {
        "Content-Type": "application/json",
      });
      const response = await request(`${baseUrl}/api/v1/positions/${res.id}/`);
      return response;
    } catch (error) {
      dispatch(createInventoryError());
      throw new Error("Failed to create position.");
    }
  }
)

export const createAdditionalPosition = createAsyncThunk(
  "proposition/createAdditionalPosition",
  async (payload: {
    proposition_id: string | number;
    title: string
  }, { dispatch }) => {
    const { request } = useHttp();
    try {
      const res = await request(`${baseUrl}/api/v1/positions/`, "POST", JSON.stringify(payload), {
        "Content-Type": "application/json",
      });
      const response = await request(`${baseUrl}/api/v1/positions/${res.id}/`);
      return response;
    } catch (error) {
      dispatch(createInventoryError());
      throw new Error("Failed to create position.");
    }
  }
)

export const changePosition = createAsyncThunk(
  "proposition/changePosition",
  async (payload: {
    data: {
      proposition_id?: string | number;
      title?: string,
      name?: string
    },
    id: string | number
  }, { dispatch }) => {
    const { request } = useHttp();
    try {
      const res = await request(`${baseUrl}/api/v1/positions/${payload.id}/`, "PATCH", JSON.stringify(payload.data), {
        "Content-Type": "application/json",
      });
      const response = await request(`${baseUrl}/api/v1/positions/${res.id}/`);
      return response;
    } catch (error) {
      dispatch(createInventoryError());
      throw new Error("Failed to change position.");
    }
  }
)

export const changeAdditionalPosition = createAsyncThunk(
  "proposition/changeAdditionalPosition",
  async (payload: {
    data: {
      proposition_id?: string | number;
      title?: string,
      name?: string
    },
    id: string | number
  }, { dispatch }) => {
    const { request } = useHttp();
    try {
      const res = await request(`${baseUrl}/api/v1/positions/${payload.id}/`, "PATCH", JSON.stringify(payload.data), {
        "Content-Type": "application/json",
      });
      const response = await request(`${baseUrl}/api/v1/positions/${res.id}/`);
      return response;
    } catch (error) {
      dispatch(createInventoryError());
      throw new Error("Failed to change position.");
    }
  }
)

export const deletePosition = createAsyncThunk(
  'proposition/deletePosition',
  async (payload: string | number) => {
    const { request } = useHttp();
    await request(`${baseUrl}/api/v1/positions/${payload}/`, 'DELETE');
    return payload;
  }
);

export const deleteAdditionalPosition = createAsyncThunk(
  'proposition/deleteAdditionalPosition',
  async (payload: string | number) => {
    const { request } = useHttp();
    await request(`${baseUrl}/api/v1/positions/${payload}/`, 'DELETE');
    return payload;
  }
);

export const createPositionItem = createAsyncThunk(
  "proposition/createPositionItem",
  async (payload: {
    position_id: string | number;
    name: string,
    [key: string]: any
  }, { dispatch }) => {
    const { request } = useHttp();
    try {
      const res = await request(`${baseUrl}/api/v1/position-items/`, "POST", JSON.stringify(payload), {
        "Content-Type": "application/json",
      });
      const response = await request(`${baseUrl}/api/v1/position-items/${res.id}/`);
      return response;
    } catch (error) {
      dispatch(createInventoryError());
      throw new Error("Failed to create position-item.");
    }
  }
)

export const createAdditionalPositionItem = createAsyncThunk(
  "proposition/createAdditionalPositionItem",
  async (payload: {
    position_id: string | number;
    name: string,
    [key: string]: any
  }, { dispatch }) => {
    const { request } = useHttp();
    try {
      const res = await request(`${baseUrl}/api/v1/position-items/`, "POST", JSON.stringify(payload), {
        "Content-Type": "application/json",
      });
      const response = await request(`${baseUrl}/api/v1/position-items/${res.id}/`);
      return response;
    } catch (error) {
      dispatch(createInventoryError());
      throw new Error("Failed to create position-item.");
    }
  }
)
export const deletePositionItem = createAsyncThunk(
  'proposition/deletePositionItem',
  async (payload: string | number) => {
    const { request } = useHttp();
    await request(`${baseUrl}/api/v1/position-items/${payload}/`, 'DELETE');
    return payload;
  }
);

export const deleteAdditionalPositionItem = createAsyncThunk(
  'proposition/deleteAdditionalPositionItem',
  async (payload: string | number) => {
    const { request } = useHttp();
    await request(`${baseUrl}/api/v1/position-items/${payload}/`, 'DELETE');
    return payload;
  }
);

export const changePositionItem = createAsyncThunk(
  "proposition/changePositionItem",
  async (payload: {
    data: Partial<PositionItemType>,
    id: string | number
  }, { dispatch }) => {
    const { request } = useHttp();
    try {
      const res = await request(`${baseUrl}/api/v1/position-items/${payload.id}/`, "PATCH", JSON.stringify(payload.data), {
        "Content-Type": "application/json",
      });
      const response = await request(`${baseUrl}/api/v1/position-items/${res.id}/`);
      return response;
    } catch (error) {
      dispatch(createInventoryError());
      throw new Error("Failed to change position-item.");
    }
  }
)

export const setAllPositionItemsAsPaid = createAsyncThunk(
  "proposition/setAllPositionItemsAsPaid",
  async (payload: { projectId: string | number }) => {
    const { request } = useHttp();
    return request(`${baseUrl}/api/v1/projects/change-paid-status/${payload.projectId}/`);
  }
)

export const changeAdditionalPositionItem = createAsyncThunk(
  "proposition/changeAdditionalPositionItem",
  async (payload: {
    data: Partial<PositionItemType>,
    id: string | number
  }, { dispatch }) => {
    const { request } = useHttp();
    try {
      const res = await request(`${baseUrl}/api/v1/position-items/${payload.id}/`, "PATCH", JSON.stringify(payload.data), {
        "Content-Type": "application/json",
      });
      const response = await request(`${baseUrl}/api/v1/position-items/${res.id}/`);
      return response;
    } catch (error) {
      dispatch(createInventoryError());
      throw new Error("Failed to change position-item.");
    }
  }
)

export const changeMaterialValues = createAsyncThunk(
  "proposition/changeMaterialValues",
  async (payload: {
    data: PosItemChangeMaterialType,
    materialId: string | number,
    positionId: string | number,
    reserved?: boolean
  }[]) => {
    const { request } = useHttp();
    const mapedPayload = payload.map(item => item.data)
    await request(`${baseUrl}/api/v1/position-items/change-ordered-count/?reserved=${!!payload[0].reserved}`, 'PATCH', JSON.stringify(mapedPayload));
    return payload
  }
)

export const changeAdditionalMaterialValues = createAsyncThunk(
  "proposition/changeAdditionalMaterialValues",
  async (payload: {
    data: PosItemChangeMaterialType,
    materialId: string | number,
    positionId: string | number
  }[]) => {
    const { request } = useHttp();
    const mapedPayload = payload.map(item => item.data)
    await request(`${baseUrl}/api/v1/position-items/change-ordered-count/`, 'PATCH', JSON.stringify(mapedPayload));
    return payload
  }
)

const propositionSlice = createSlice({
  name: 'proposition',
  initialState,
  reducers: {
    resetPropositions(state) {
      state.proposition = null;
      state.additionalProposition = null;
    },
    setFetchPropositionLoadingStatus(state, { payload }) {
      state.fetchPropositionLoadingStatus = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      //project
      .addCase(fetchOneProject.pending, (state) => {
        state.fetchPropositionLoadingStatus = "loading";
      })
      .addCase(fetchOneProject.fulfilled, (state, { payload }) => {
        state.fetchPropositionLoadingStatus = "idle";
        state.proposition = payload.propositions[0]
      })
      .addCase(fetchOneProject.rejected, (state) => {
        state.fetchPropositionLoadingStatus = "error";
      })
      //proposition
      .addCase(createProposition.pending, (state) => {
        state.fetchPropositionLoadingStatus = "loading";
      })
      .addCase(createProposition.fulfilled, (state, { payload }) => {
        state.fetchPropositionLoadingStatus = "idle";
        state.proposition = payload
      })
      .addCase(createProposition.rejected, (state) => {
        state.fetchPropositionLoadingStatus = "error";
      })
      .addCase(changeProposition.pending, (state) => {

      })
      .addCase(changeProposition.fulfilled, (state, { payload }) => {
        state.fetchPropositionLoadingStatus = "idle";
        state.proposition = payload
      })
      .addCase(changeProposition.rejected, (state) => {

      })
      .addCase(deleteProposition.pending, (state) => {
        state.changePropositionDeletingStatus = "loading";
      })
      .addCase(deleteProposition.fulfilled, (state, { payload }) => {
        state.changePropositionDeletingStatus = "idle";
        if (!payload) {
          state.proposition = null
        } else {
          state.additionalProposition = null
        }
      })
      .addCase(deleteProposition.rejected, (state) => {
        state.changePropositionDeletingStatus = "error";
      })
      .addCase(createAdditionalProposition.pending, (state) => {

      })
      .addCase(createAdditionalProposition.fulfilled, (state, { payload }) => {
        state.additionalProposition = payload
      })
      .addCase(createAdditionalProposition.rejected, (state) => {
      })
      .addCase(changeAdditionalProposition.pending, (state) => {
      })
      .addCase(changeAdditionalProposition.fulfilled, (state, { payload }) => {
        state.additionalProposition = payload
      })
      .addCase(changeAdditionalProposition.rejected, (state) => {
      })
      .addCase(deleteAdditionalProposition.pending, (state) => {
      })
      .addCase(deleteAdditionalProposition.fulfilled, (state, { payload }) => {
        state.additionalProposition = null
      })
      .addCase(deleteAdditionalProposition.rejected, (state) => {
      })
      //positions
      .addCase(createPosition.pending, (state) => {
        state.changePropositionLoadingStatus = "loading";
      })
      .addCase(createPosition.fulfilled, (state, { payload }) => {
        state.changePropositionLoadingStatus = "idle";
        state.proposition?.positions.push(payload);
      })
      .addCase(createPosition.rejected, (state) => {
        state.changePropositionLoadingStatus = "error";
      })
      .addCase(changePosition.pending, (state) => {
        state.changePropositionLoadingStatus = "loading";
      })
      .addCase(changePosition.fulfilled, (state, { payload }) => {
        state.changePropositionLoadingStatus = "idle";
        if (state.proposition) {
          state.proposition.positions = state.proposition.positions?.map(position => {
            return position.id === payload.id ? payload : position;
          }) ?? [];
        }
      })
      .addCase(changePosition.rejected, (state) => {
        state.changePropositionLoadingStatus = "error";
      })
      .addCase(deletePosition.pending, (state) => {
        state.changePropositionLoadingStatus = "loading";
      })
      .addCase(deletePosition.fulfilled, (state, { payload }) => {
        state.changePropositionLoadingStatus = "idle";
        if (state.proposition) {
          state.proposition.positions = state.proposition.positions.filter(position => position.id !== payload);
        }
      })
      .addCase(createAdditionalPosition.pending, (state) => {
      })
      .addCase(createAdditionalPosition.fulfilled, (state, { payload }) => {
        state.additionalProposition?.positions.push(payload);
      })
      .addCase(createAdditionalPosition.rejected, (state) => {

      })
      .addCase(changeAdditionalPosition.pending, (state) => {
      })
      .addCase(changeAdditionalPosition.fulfilled, (state, { payload }) => {
        if (state.additionalProposition) {
          state.additionalProposition.positions = state.additionalProposition.positions?.map(position => {
            return position.id === payload.id ? payload : position;
          }) ?? [];
        }
      })
      .addCase(changeAdditionalPosition.rejected, (state) => {
      })
      .addCase(deleteAdditionalPosition.pending, (state) => {
      })
      .addCase(deleteAdditionalPosition.fulfilled, (state, { payload }) => {
        if (state.additionalProposition) {
          state.additionalProposition.positions = state.additionalProposition.positions.filter(position => position.id !== payload);
        }
      })
      .addCase(deleteAdditionalPosition.rejected, (state) => {
      })
      //position-item
      .addCase(createPositionItem.pending, (state) => {
        state.changePropositionLoadingStatus = "loading";
      })
      .addCase(createPositionItem.fulfilled, (state, { payload }) => {
        state.changePropositionLoadingStatus = "idle";
        if (state.proposition && state.proposition?.positions) {
          state.proposition.positions = state.proposition?.positions.map(position => {
            return position.id === payload.position ? {
              ...position,
              position_items: [...position.position_items, payload]
            } : position
          })
        }
      })
      .addCase(createPositionItem.rejected, (state) => {
        state.changePropositionLoadingStatus = "error";
      })
      .addCase(changePositionItem.pending, (state) => {
        state.changePropositionLoadingStatus = "loading";
      })
      .addCase(changePositionItem.fulfilled, (state, { payload }) => {
        if (state.proposition && state.proposition?.positions) {
          state.proposition.positions = state.proposition?.positions.map(position => {
            return position.id === payload.position ? {
              ...position,
              position_items: position.position_items.map(item => item.id === payload.id ? payload : item)
            } : position
          })
        }
        state.changePropositionLoadingStatus = "idle";
      })
      .addCase(changePositionItem.rejected, (state) => {
        state.changePropositionLoadingStatus = "error";
      })
      .addCase(deletePositionItem.pending, (state) => {
        state.changePropositionLoadingStatus = "loading";
      })
      .addCase(deletePositionItem.fulfilled, (state, { payload }) => {
        state.changePropositionLoadingStatus = "idle";
        if (state.proposition && state.proposition?.positions) {
          state.proposition.positions = state.proposition?.positions.map(position => {
            return {
              ...position,
              position_items: position.position_items.filter(item => item.id !== payload)
            }
          })
        }
      })
      .addCase(deletePositionItem.rejected, (state) => {
        state.changePropositionLoadingStatus = "error";
      })
      .addCase(changeMaterialValues.pending, (state) => {
        state.changePropositionLoadingStatus = "loading";
      })
      .addCase(changeMaterialValues.fulfilled, (state, { payload }) => {
        if (state.proposition && state.proposition?.positions) {
          payload.forEach((changeObj, i) => {
            state.proposition!.positions = state.proposition?.positions.map(position => {
              return position.id === changeObj.positionId ? {
                ...position,
                position_items: position.position_items.map(item => item.id === changeObj.data.position_item_id ? {
                  ...item,
                  material: {
                    ...item.material,
                    available_count: item.material.available_count + (changeObj.data.available_count ?? 0),
                    reserved_count: item.material.reserved_count + (changeObj.data.reserved_count ?? 0),
                    ordered_count: item.material.ordered_count + (changeObj.data.ordered_count ?? 0),
                  },
                  reserved: changeObj.reserved ?? item.reserved,
                  ordered: changeObj.data.add_ordered_for_item ? item.ordered + (changeObj.data.ordered_count ?? 0) : item.ordered
                } : item)
              } : position
            }) ?? []
          })
        }
        state.changePropositionLoadingStatus = "idle";
      })
      .addCase(changeMaterialValues.rejected, (state) => {
        state.changePropositionLoadingStatus = "error";
      })
      .addCase(createAdditionalPositionItem.pending, (state) => {
      })
      .addCase(createAdditionalPositionItem.fulfilled, (state, { payload }) => {
        if (state.additionalProposition && state.additionalProposition?.positions) {
          state.additionalProposition.positions = state.additionalProposition?.positions.map(position => {
            return position.id === payload.position ? {
              ...position,
              position_items: [...position.position_items, payload]
            } : position
          })
        }
      })
      .addCase(createAdditionalPositionItem.rejected, (state) => {
      })
      .addCase(changeAdditionalPositionItem.pending, (state) => {
      })
      .addCase(changeAdditionalPositionItem.fulfilled, (state, { payload }) => {
        if (state.additionalProposition && state.additionalProposition?.positions) {
          state.additionalProposition.positions = state.additionalProposition?.positions.map(position => {
            return position.id === payload.position ? {
              ...position,
              position_items: position.position_items.map(item => item.id === payload.id ? payload : item)
            } : position
          })
        }
      })
      .addCase(changeAdditionalPositionItem.rejected, (state) => {
      })
      .addCase(deleteAdditionalPositionItem.pending, (state) => {
      })
      .addCase(deleteAdditionalPositionItem.fulfilled, (state, { payload }) => {
        if (state.additionalProposition && state.additionalProposition?.positions) {
          state.additionalProposition.positions = state.additionalProposition?.positions.map(position => {
            return {
              ...position,
              position_items: position.position_items.filter(item => item.id !== payload)
            }
          })
        }
      })
      .addCase(deleteAdditionalPositionItem.rejected, (state) => {
      })
      .addCase(changeAdditionalMaterialValues.pending, (state) => {
      })
      .addCase(changeAdditionalMaterialValues.fulfilled, (state, { payload }) => {
        if (state.additionalProposition && state.additionalProposition?.positions) {
          payload.forEach((changeObj, i) => {
            state.additionalProposition!.positions = state.additionalProposition?.positions.map(position => {
              return position.id === changeObj.positionId ? {
                ...position,
                position_items: position.position_items.map(item => item.id === changeObj.data.position_item_id ? {
                  ...item,
                  material: {
                    ...item.material,
                    available_count: item.material.available_count + (changeObj.data.available_count ?? 0),
                    reserved_count: item.material.reserved_count + (changeObj.data.reserved_count ?? 0),
                    ordered_count: item.material.ordered_count + (changeObj.data.ordered_count ?? 0),
                  },
                  ordered: changeObj.data.add_ordered_for_item ? item.ordered + (changeObj.data.ordered_count ?? 0) : item.ordered
                } : item)
              } : position
            }) ?? []
          })
        }
      })
      .addCase(changeAdditionalMaterialValues.rejected, (state) => {
        state.changePropositionLoadingStatus = "error";
      })
      //otherSlices
      .addCase(changeInventory.fulfilled, (state, { payload }) => {
        if (!payload.message) {
          const { article_number, id, available_count, reserved_count, ordered_count, units, name, when } = payload
          const updatedMaterial = {
            article_number,
            available_count,
            reserved_count,
            ordered_count,
            units,
            name,
            when,
            id
          }
          if (state.proposition?.positions) {
            state.proposition.positions = state.proposition.positions.map(position => {
              return {
                ...position,
                position_items: position.position_items.map(item => {
                  return {
                    ...item,
                    material: (item.material && item.material?.id === payload?.id) ? {
                      supplier: item.material.supplier,
                      ...updatedMaterial
                    } : item.material
                  }
                })
              }
            })
          }
        }
      })
      .addCase(setAllPositionItemsAsPaid.pending, (state) => {
        state.changePropositionLoadingStatus = "loading";
      })
      .addCase(setAllPositionItemsAsPaid.fulfilled, (state) => {
        state.changePropositionLoadingStatus = "idle";
        if (state.proposition && state.proposition?.positions) {
          state.proposition.positions = state.proposition?.positions.map(position => ({
            ...position,
            position_items: position.position_items.map(item => ({
              ...item,
              paid: true
            }))
          }))
        }
      })
      .addCase(setAllPositionItemsAsPaid.rejected, (state) => {
        state.changePropositionLoadingStatus = "error";
      })
      .addDefaultCase((state, action) => {
      })
  }
})

const { reducer, actions } = propositionSlice
export const { resetPropositions, setFetchPropositionLoadingStatus } = actions
export default reducer