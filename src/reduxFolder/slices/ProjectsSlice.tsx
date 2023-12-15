//libs
import { createAsyncThunk, createSlice, createAction } from "@reduxjs/toolkit";
//redux
import {
  createProposition, changeProposition, createPosition, changePosition,
  createPositionItem, changePositionItem, deletePositionItem, changeMaterialValues, deletePosition,
  setAllPositionItemsAsPaid
} from "./ProjectPropositionSlice";
import { changeInventory, setAsRecievedInventory, deleteInventory } from "./InventorySlice";
import {
  generateUnconfirmedPropositionDocument, updateUnconfirmedPropositionDocument,
  generateConfirmedPropositionDocument, generateIvoices,
  generateAdditionalInvoice
} from "./DocumentsSlice";
//hooks
import { useHttp } from "hooks/useHttp";
//types
import { ProjectType, LoadingStatusType, BackEndProjectType, CreatingProjectType, ProjectDetails } from "types/index";
//API
import { baseUrl } from "services/API";

const initialState: {
  fetchProjectsLoadingStatus: LoadingStatusType,
  fetchOneProjectLoadingStatus: LoadingStatusType,
  createProjectsLoadingStatus: LoadingStatusType,
  updateProjectsLoadingStatus: LoadingStatusType,
  projects: ProjectType[],
  currentProject: ProjectDetails | null
  errorMessage: string | null;
} = {
  fetchProjectsLoadingStatus: "loading",
  createProjectsLoadingStatus: 'idle',
  updateProjectsLoadingStatus: 'idle',
  fetchOneProjectLoadingStatus: 'idle',
  projects: [],
  currentProject: null,
  errorMessage: null
}

const createProjectError = createAction("Projects/createProjectError");
const updateProjectError = createAction("Projects/updateProjectError");


export const fetchProjects = createAsyncThunk(
  "projects/fetchProjects",
  async () => {
    const { request } = useHttp();
    return request(`${baseUrl}/api/v1/projects/`);
  }
)
export const fetchOneProject = createAsyncThunk(
  "projects/fetchOneProject",
  async (payload: string) => {
    const { request } = useHttp();
    return request(`${baseUrl}/api/v1/projects/${payload}/`);
  }
)
export const fetchProjectStatistic = createAsyncThunk(
  "projects/fetchProjectStatistic",
  async (payload: string | number) => {
    const { request } = useHttp();
    return request(`${baseUrl}/api/v1/projects/calculate-expenses/${payload}`);
  }
)
export const createProject = createAsyncThunk(
  "projects/createProject",
  async (payload: CreatingProjectType, { dispatch }) => {
    const { request } = useHttp();
    try {
      const res = await request(`${baseUrl}/api/v1/projects/`, "POST", JSON.stringify(payload), {
        "Content-Type": "application/json",
      });
      if (res.message) return res
      else {
        const response = await request(`${baseUrl}/api/v1/projects/${res.project_id}/`);
        return response;
      }
    } catch (error) {
      dispatch(createProjectError());
      throw new Error("Failed to create project.");
    }
  }
)
export const updateProject = createAsyncThunk(
  "projects/updateProject",
  async (payload: {
    id: string | number,
    body: Partial<BackEndProjectType>
  }, { dispatch }) => {
    const { request } = useHttp();
    try {
      const res = await request(`${baseUrl}/api/v1/projects/${payload.id}/`, "PATCH", JSON.stringify(payload.body), {
        "Content-Type": "application/json",
      });
      if (res.message) return res
      else {
        const response = await request(`${baseUrl}/api/v1/projects/${payload.id}/`);
        return response;
      }
    } catch (error) {
      dispatch(updateProjectError());
      throw new Error("Failed to update project.");
    }
  }
)

export const uploadDocument = createAsyncThunk(
  "projects/uploadDocument",
  async (payload: {
    docId: string | number | undefined,
    projectId: string | number,
    data: FormData;
    docName?: string
  }, { dispatch }) => {
    try {
      const { request } = useHttp();
      if (payload.docId) {
        await request(`${baseUrl}/api/v1/documents/${payload.docId}/`, "DELETE")
      }
      const postRes = await request(`${baseUrl}/api/v1/documents/create/?project_id=${payload.projectId}`, "POST", payload.data, {
        'X-CSRFToken': 'cFEKGqibbbQZZViPxD4eb93aMSbREdszr9NKqn7jH151NOppJhyKl5alkExrEu3B',
        'Cache-Control': 'no-cache, no-store, must-revalidate'
      }, true)
      return {
        ...postRes,
        prevId: payload.docId,
        docName: payload.docName
      }
    } catch (error) {
      dispatch(updateProjectError());
      throw new Error("Failed to update project.");
    }
  }
)

const projectsSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    setCurrentProject(state, action: { type: string, payload: ProjectDetails | null }) {
      state.currentProject = action.payload
    },
    resetCurrentProject(state) {
      state.currentProject = null;
    },
    setErrorMessageToNull(state) {
      state.errorMessage = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.fetchProjectsLoadingStatus = "loading";
      })
      .addCase(fetchProjects.fulfilled, (state, { payload }) => {
        state.fetchProjectsLoadingStatus = "idle";
        state.projects = payload.map((item: BackEndProjectType) => {
          const {
            id,
            name,
            description,
            project_status,
            step_status,
            paid,
            to_paid,
            created_at,
            finished_at,
            responsible_person,
            customer,
            finish_notes
          } = item
          return {
            name,
            status: project_status,
            respPerson: {
              name: responsible_person?.name,
              image: responsible_person?.image ?? 'https://cdn-icons-png.flaticon.com/512/3607/3607444.png'
            },
            timeline: `linFor${id}`,
            phoneNumber: responsible_person?.phone,
            description,
            stepStatus: step_status,
            paid,
            toPaid: to_paid,
            createdAt: created_at,
            finished_at: finished_at,
            customer,
            id,
            finish_notes
          }
        })
      })
      .addCase(fetchProjects.rejected, (state) => {
        state.fetchProjectsLoadingStatus = "error";
      })
      .addCase(fetchOneProject.pending, (state) => {
        state.fetchOneProjectLoadingStatus = "loading";
      })
      .addCase(fetchOneProject.fulfilled, (state, { payload }) => {
        state.fetchOneProjectLoadingStatus = "idle";
        const {
          created_at,
          customer,
          description,
          finished_at,
          id,
          name,
          paid,
          propositions,
          project_status,
          responsible_person,
          step_status,
          to_paid,
          documents,
          revenue,
          expenditures,
          finish_notes
        } = payload
        state.currentProject = {
          name,
          status: project_status,
          respPerson: responsible_person?.id,
          timeline: `linFor${id}`,
          phoneNumber: responsible_person?.phone,
          description,
          stepStatus: step_status,
          paid,
          toPaid: to_paid,
          createdAt: created_at,
          finished_at: finished_at,
          propositions,
          customer,
          id,
          documents,
          revenue,
          expenditures,
          finish_notes
        }
      })
      .addCase(fetchOneProject.rejected, (state) => {
        state.fetchOneProjectLoadingStatus = "error";
      })
      .addCase(createProject.pending, (state) => {
        state.createProjectsLoadingStatus = "loading";
        state.errorMessage = null;
      })
      .addCase(createProject.fulfilled, (state, { payload }) => {
        if (payload.message) {
          state.errorMessage = payload.message
        } else {
          const {
            created_at,
            customer,
            description,
            finished_at,
            id,
            name,
            paid,
            propositions,
            project_status,
            responsible_person,
            step_status,
            to_paid,
            documents,
            revenue,
            expenditures,
            finish_notes
          } = payload
          state.currentProject = {
            name,
            status: project_status,
            respPerson: responsible_person?.id,
            timeline: `linFor${id}`,
            phoneNumber: responsible_person?.phone,
            description,
            stepStatus: step_status,
            paid,
            toPaid: to_paid,
            createdAt: created_at,
            finished_at: finished_at,
            propositions,
            customer,
            id,
            documents,
            revenue,
            expenditures,
            finish_notes
          }
          state.projects.push({
            name,
            status: project_status,
            respPerson: {
              name: responsible_person?.name,
              image: responsible_person?.image ?? 'https://cdn-icons-png.flaticon.com/512/3607/3607444.png'
            },
            timeline: `linFor${id}`,
            phoneNumber: responsible_person?.phone,
            description,
            stepStatus: step_status,
            paid,
            toPaid: to_paid,
            createdAt: created_at,
            finished_at: finished_at,
            customer,
            id,
            finish_notes
          })
        }
        state.createProjectsLoadingStatus = "idle";

      })
      .addCase(createProject.rejected, (state) => {
        state.createProjectsLoadingStatus = "error";
      })
      .addCase(updateProject.pending, (state) => {
        state.updateProjectsLoadingStatus = "loading";
        state.errorMessage = null;
      })
      .addCase(updateProject.fulfilled, (state, { payload }) => {
        if (payload.message) {
          state.errorMessage = payload.message
        } else {
          const {
            id,
            name,
            description,
            project_status,
            step_status,
            paid,
            to_paid,
            created_at,
            finished_at,
            responsible_person,
            customer,
            propositions,
            documents,
            revenue,
            expenditures,
            finish_notes
          } = payload
          state.currentProject = {
            name,
            status: project_status,
            respPerson: responsible_person?.id,
            timeline: `linFor${id}`,
            phoneNumber: responsible_person?.phone,
            description,
            stepStatus: step_status,
            paid,
            toPaid: to_paid,
            createdAt: created_at,
            finished_at: finished_at,
            propositions,
            customer,
            id,
            documents,
            revenue,
            expenditures,
            finish_notes
          }
          state.projects = state.projects.map(project => project.id !== id ? project : {
            name,
            status: project_status,
            respPerson: responsible_person?.name,
            timeline: `linFor${id}`,
            phoneNumber: responsible_person?.phone,
            description,
            stepStatus: step_status,
            paid,
            toPaid: to_paid,
            createdAt: created_at,
            finished_at: finished_at,
            customer,
            id,
            finish_notes
          })
        }
        state.updateProjectsLoadingStatus = "idle";
      })
      .addCase(updateProject.rejected, (state) => {
        state.updateProjectsLoadingStatus = "error";
      })
      .addCase(fetchProjectStatistic.pending, (state) => {
        state.updateProjectsLoadingStatus = "loading";
      })
      .addCase(fetchProjectStatistic.fulfilled, (state, { payload }) => {
        state.updateProjectsLoadingStatus = "idle";
        if (payload.error) {
          state.updateProjectsLoadingStatus = "error";
        }
        if (state.currentProject && state.currentProject?.id === payload.project_id && payload.total_revenue && payload.total_expenses) {
          state.currentProject.revenue = payload.total_revenue;
          state.currentProject.expenditures = payload.total_expenses;
        }
      })
      .addCase(fetchProjectStatistic.rejected, (state) => {
        state.updateProjectsLoadingStatus = "error";
      })
      .addCase(uploadDocument.pending, (state) => {
        state.updateProjectsLoadingStatus = "loading";
      })
      .addCase(uploadDocument.fulfilled, (state, { payload }) => {
        if (state.currentProject && payload && !payload.error && payload.id) {
          const { id, docName, url, prevId } = payload
          if (payload.prevId) {
            state.currentProject.documents = state.currentProject?.documents.map(doc => {
              return doc.id === prevId ? {
                ...doc,
                document: baseUrl + url,
                type: payload.type,
                id
              } : doc
            })
          } else {
            state.currentProject?.documents.push({
              document: baseUrl + payload.url,
              name: docName,
              type: payload.type,
              id,
            })
          }
        }
      })
      .addCase(uploadDocument.rejected, (state) => {
        state.updateProjectsLoadingStatus = "error";
      })
      ////ACTIONS FROM ANOTHER SLICES
      .addCase(createProposition.fulfilled, (state, { payload }) => {
        if (payload.project != null) {
          if (state.currentProject && state.currentProject?.propositions.length) {
            state.currentProject.propositions = state.currentProject?.propositions.map((item, i) => {
              return i === 0 ? payload : item
            })
          } else {
            //@ts-ignore
            state.currentProject.propositions[0] = payload;
          }
        }
      })
      .addCase(changeProposition.fulfilled, (state, { payload }) => {
        if (state.currentProject && state.currentProject?.propositions.length) {
          state.currentProject.propositions = state.currentProject?.propositions.map((item, i) => {
            return i === 0 ? payload : item
          })
        } else {
          state.currentProject?.propositions.push(payload)
        }
      })
      .addCase(createPosition.fulfilled, (state, { payload }) => {
        state.currentProject?.propositions[0].positions.push(payload)
      })
      .addCase(changePosition.fulfilled, (state, { payload }) => {
        if (state.currentProject?.propositions[0].positions) {
          state.currentProject.propositions[0].positions = state.currentProject.propositions[0].positions.map(position => {
            return position.id === payload.id ? payload : position;
          }) ?? [];
        }
      })
      .addCase(createPositionItem.fulfilled, (state, { payload }) => {
        if (state.currentProject?.propositions[0].positions) {
          state.currentProject.propositions[0].positions = state.currentProject?.propositions[0].positions.map(position => {
            return position.id === payload.position ? {
              ...position,
              position_items: [...position.position_items, payload]
            } : position
          })
        }
      })
      .addCase(changePositionItem.fulfilled, (state, { payload }) => {
        if (state.currentProject?.propositions[0].positions) {
          state.currentProject.propositions[0].positions = state.currentProject?.propositions[0].positions.map(position => {
            return position.id === payload.position ? {
              ...position,
              position_items: position.position_items.map(item => item.id === payload.id ? payload : item)
            } : position
          })
        }
      })
      .addCase(deletePosition.fulfilled, (state, { payload }) => {
        if (state.currentProject?.propositions[0].positions) {
          state.currentProject.propositions[0].positions = state.currentProject.propositions[0].positions.filter(position => position.id !== payload);
        }
      })
      .addCase(setAllPositionItemsAsPaid.fulfilled, (state,) => {
        if (state.currentProject?.propositions[0].positions) {
          state.currentProject.propositions[0].positions = state.currentProject?.propositions[0].positions.map(position => {
            return {
              ...position,
              position_items: position.position_items.map(item => {
                return {
                  ...item,
                  paid: true
                }
              })
            }
          })
        }
      })
      .addCase(deletePositionItem.fulfilled, (state, { payload }) => {
        if (state.currentProject?.propositions[0].positions) {
          state.currentProject.propositions[0].positions = state.currentProject?.propositions[0].positions.map(position => {
            return {
              ...position,
              position_items: position.position_items.filter(item => item.id !== payload)
            }
          })

        }
      })
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
          if (state.currentProject?.propositions[0]) {
            state.currentProject.propositions[0].positions = state.currentProject?.propositions[0]?.positions.map(position => {
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
      .addCase(changeMaterialValues.pending, (state, { payload }) => {
        state.updateProjectsLoadingStatus = "loading";
      })
      .addCase(changeMaterialValues.fulfilled, (state, { payload }) => {
        if (state.currentProject?.propositions[0].positions) {
          payload.forEach(changeObj => {
            state.currentProject!.propositions[0]!.positions = state.currentProject?.propositions[0].positions.map(position => {
              return position.id === changeObj.positionId ? {
                ...position,
                position_items: position.position_items.map(item => {
                  return item.id === changeObj.data.position_item_id ? {
                    ...item,
                    material: {
                      ...item.material,
                      available_count: item.material.available_count + (changeObj.data.available_count ?? 0),
                      reserved_count: item.material.reserved_count + (changeObj.data.reserved_count ?? 0),
                      ordered_count: item.material.ordered_count + (changeObj.data.ordered_count ?? 0),
                    },
                    reserved: changeObj.reserved ?? item.reserved,
                    ordered: changeObj.data.add_ordered_for_item === true ? item.ordered + (changeObj.data.ordered_count ?? 0) : item.ordered
                  } : item
                })
              } : position
            }) ?? []
          })
        }
        state.updateProjectsLoadingStatus = "idle";
      })
      .addCase(generateUnconfirmedPropositionDocument.fulfilled, (state, { payload }) => {
        state.currentProject?.documents.push({ ...payload, document: baseUrl + payload.url })
      })
      .addCase(updateUnconfirmedPropositionDocument.fulfilled, (state, { payload }) => {
        if (state.currentProject?.documents) {
          state.currentProject.documents = state.currentProject?.documents.map(doc => doc.id === payload.prevId ? { ...doc, document: baseUrl + payload.url, id: payload.id } : doc)
        }
      })
      .addCase(generateConfirmedPropositionDocument.fulfilled, (state, { payload }) => {
        if (state.currentProject?.documents) {

          if (payload.unconfirmedPropId) {
            state.currentProject.documents = state.currentProject?.documents.map(doc => doc.id === payload.unconfirmedPropId ? {
              ...doc, document: baseUrl + payload.url,
              id: payload.id,
              name: payload.name,
              type: payload.type
            } : doc)
          } else {
            state.currentProject.documents.push({
              id: payload.id,
              document: baseUrl + payload.url,
              name: payload.name,
              additional_invoice_for_project: false,
              type: payload.type
            })
          }
        }
      })
      .addCase(generateIvoices.fulfilled, (state, { payload }) => {
        state.currentProject?.documents.push({ ...payload, document: baseUrl + payload.url })
      })
      .addCase(generateAdditionalInvoice.fulfilled, (state, { payload }) => {
        state.currentProject?.documents.push({ ...payload, document: baseUrl + payload.url, additional_invoice_for_project: true })
      })
      .addCase(setAsRecievedInventory.fulfilled, (state, { payload }) => {
        if (state.currentProject) {
          state.currentProject.propositions[0].positions = state.currentProject?.propositions[0].positions.map((position) => {
            return {
              ...position,
              position_items: position.position_items.map((item) => ({
                ...item,
                received: true,
                ordered: 0,
                material: payload.some(id => id === item.material?.id) ? {
                  ...item.material,
                  ordered_count: 0,
                  available_count: item.material?.available_count! + item.material?.ordered_count!,
                } : item.material
              }))
            }
          })
          state.updateProjectsLoadingStatus = "idle";
        }
      })
      .addCase(deleteInventory.fulfilled, (state, { payload }) => {
        state.currentProject?.propositions[0].positions.map(pos => ({
          ...pos, position_items: pos.position_items.map(item => ({
            ...item,
            material: item.material?.id === payload ? null : item.material
          }))
        }))
      })
      .addDefaultCase((state, action) => { })
  }
})

const { reducer, actions } = projectsSlice
export const { setCurrentProject, resetCurrentProject, setErrorMessageToNull } = actions
export default reducer
