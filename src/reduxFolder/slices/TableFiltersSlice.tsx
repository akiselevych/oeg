//libs
import { createSlice } from "@reduxjs/toolkit";
//types
import { SearchTermType, FilterTermType, SortTermType } from "types/index";



const initialState: {
  //clients
  clientsSearchTerm: SearchTermType
  clientsFilterValue: FilterTermType
  clientsSortValue: SortTermType
  clientsTypeFilterValue: FilterTermType
  //projects
  projectsSearchTerm: SearchTermType
  projectsFilterValue: FilterTermType
  projectsSortValue: SortTermType
  //employees
  employeesSearchTerm: SearchTermType
  employeesTypeFilterValue: FilterTermType
  //suppliersMaterial
  suppliersMaterialSearchTerm: SearchTermType
  suppliersMaterialFilterValue: FilterTermType
  suppliersMaterialSortValue: SortTermType
  //suppliersWorkers
  suppliersWorkersSearchTerm: SearchTermType
  suppliersWorkersFilterValue: FilterTermType
  suppliersWorkersSortValue: SortTermType
  //inventory
  inventorySearchTerm: SearchTermType
  inventoryFilterValue: FilterTermType
  inventorySortValue: SortTermType
  inventoryGeneralSearchTerm: SearchTermType
  inventoryTypeFilterValue: FilterTermType
  //internalExpenses
  internalExpensesSearchTerm: SearchTermType,
  internalExpensesFilterValue: FilterTermType,
  internalExpensesSortValue: SortTermType
  internalExpensesGeneralSearchTerm: SearchTermType
  internalExpensesDateFilterValue: FilterTermType,
  //noProjectInvoices
  allInvoicesSearchTerm: SearchTermType
  allInvoicesFilterValue: FilterTermType
  allInvoicesSortValue: SortTermType
  allInvoicesGeneralSearchTerm: SearchTermType,
  //projectInvoices
  projectInvoicesSearchTerm: SearchTermType
  projectInvoicesFilterValue: FilterTermType
  projectInvoicesSortValue: SortTermType
  projectInvoicesProjectIDs: (string | number)[],
  //ProjectEventsTable
  ProjectEventsTableSearchTerm: SearchTermType
  ProjectEventsTableFilterValue: FilterTermType
  ProjectEventsTableSortValue: SortTermType
  //LastMonthEventsTable
  LastMonthTableSearchTerm: SearchTermType
  LastMonthTableFilterValue: FilterTermType
  LastMonthTableSortValue: SortTermType
  //LastMonthSuppliersEventsTable
  LastMonthSuppliersTableSearchTerm: SearchTermType
  LastMonthSuppliersTableFilterValue: FilterTermType
  LastMonthSuppliersTableSortValue: SortTermType
  //ProjectСonstructionTable
  ProjectConstructionTableSearchTerm: SearchTermType,
  ProjectConstructionTableFilterValue: FilterTermType,
  ProjectConstructionTableSortValue: SortTermType
  //UpcomingEventsTable
  UpcomingEventsTableFilterValue: FilterTermType
  //PickArticleTable
  pickArticleTableSearchTerm: SearchTermType
  pickArticleTableFilterValue: FilterTermType
  pickArticleTableSortValue: SortTermType
  pickArticleTableGeneralSearchTerm: string
  //projectInternalExpaenses
  projectInternalExpensesSearchTerm: SearchTermType,
  projectInternalExpensesFilterValue: FilterTermType,
  projectInternalExpensesSortValue: SortTermType,
  //projectInternalExpaensesOn5Step
  projectInternalExpensesOn5StepSearchTerm: SearchTermType,
  projectInternalExpensesOn5StepFilterValue: FilterTermType,
  projectInternalExpensesOn5StepSortValue: SortTermType,
  //labors
  step4laborsTableSearchTerm: SearchTermType,
  step4laborsTableFilterValue: FilterTermType,
  step4laborsTableSortValue: SortTermType,
} = {
  clientsSearchTerm: null,
  clientsFilterValue: null,
  clientsSortValue: {
    clientName: 'inc'
  },
  clientsTypeFilterValue: null,
  //projects
  projectsSearchTerm: null,
  projectsFilterValue: null,
  projectsSortValue: {
    name: 'inc'
  },
  //employees
  employeesSearchTerm: { name: '' },
  employeesTypeFilterValue: null,
  //suppliersmaterials
  suppliersMaterialSearchTerm: null,
  suppliersMaterialFilterValue: null,
  suppliersMaterialSortValue: {
    name: 'inc'
  },
  //suppliers
  suppliersWorkersSearchTerm: null,
  suppliersWorkersFilterValue: null,
  suppliersWorkersSortValue: {
    name: 'inc'
  },
  //inventory
  inventorySearchTerm: null,
  inventoryFilterValue: null,
  inventorySortValue: {
    name: 'inc'
  },
  inventoryGeneralSearchTerm: { name: '' },
  inventoryTypeFilterValue: null,
  //internalExpenses
  internalExpensesSearchTerm: null,
  internalExpensesFilterValue: null,
  internalExpensesSortValue: {
    project: 'inc'
  },
  internalExpensesGeneralSearchTerm: { project: '' },
  internalExpensesDateFilterValue: { period: 'all' },
  //noProjectInvoices
  allInvoicesSearchTerm: null,
  allInvoicesFilterValue: null,
  allInvoicesSortValue: {
    name: 'inc'
  },
  allInvoicesGeneralSearchTerm: {
    name: ''
  },
  //projectInvoices
  projectInvoicesSearchTerm: null,
  projectInvoicesFilterValue: null,
  projectInvoicesSortValue: {
    name: 'inc'
  },
  projectInvoicesProjectIDs: [],
  //ProjectEventsTable
  ProjectEventsTableSearchTerm: null,
  ProjectEventsTableFilterValue: null,
  ProjectEventsTableSortValue: {
    name: 'inc'
  },
  //LastMonthEventsTable
  LastMonthTableSearchTerm: null,
  LastMonthTableFilterValue: null,
  LastMonthTableSortValue: {
    name: 'inc'
  },
  //LastMonthSuppliersEventsTable
  LastMonthSuppliersTableSearchTerm: null,
  LastMonthSuppliersTableFilterValue: null,
  LastMonthSuppliersTableSortValue: {
    name: 'inc'
  },
  //ProjectСonstructionTable
  ProjectConstructionTableSearchTerm: null,
  ProjectConstructionTableFilterValue: null,
  ProjectConstructionTableSortValue: {
    name: 'inc'
  },
  //UpcomingEventsTable
  UpcomingEventsTableFilterValue: null,
  //PickArticleTable
  pickArticleTableSearchTerm: null,
  pickArticleTableFilterValue: null,
  pickArticleTableSortValue: {
    name: 'inc'
  },
  pickArticleTableGeneralSearchTerm: '',
  //projectInternalExpaenses
  projectInternalExpensesSearchTerm: null,
  projectInternalExpensesFilterValue: null,
  projectInternalExpensesSortValue: {
    name: 'inc'
  },
  //projectInternalExpaensesOn5Step
  projectInternalExpensesOn5StepFilterValue: null,
  projectInternalExpensesOn5StepSearchTerm: null,
  projectInternalExpensesOn5StepSortValue: {
    name: 'inc'
  },
  //labors
  step4laborsTableSearchTerm: null,
  step4laborsTableFilterValue: null,
  step4laborsTableSortValue: {
    name: 'inc'
  },
}
const PagesStateSlice = createSlice({
  name: 'dashboardPage',
  initialState,
  reducers: {
    //clients
    setClientsTableSearchTerm(state, action: { payload: SearchTermType }) {
      state.clientsSearchTerm = action.payload
    },
    setClientsTableFilterTerm(state, action: { payload: FilterTermType }) {
      state.clientsFilterValue = action.payload
    },
    setClientsTableSortTerm(state, action: { payload: SortTermType }) {
      state.clientsSortValue = action.payload
    },
    setClientsTypeFilterValue(state, action: { payload: FilterTermType }) {
      state.clientsTypeFilterValue = action.payload
    },
    //projects
    setProjectsTableSearchTerm(state, action: { payload: SearchTermType }) {
      state.projectsSearchTerm = action.payload
    },
    setProjectsTableFilterTerm(state, action: { payload: FilterTermType }) {
      state.projectsFilterValue = action.payload
    },
    setProjectsTableSortTerm(state, action: { payload: SortTermType }) {
      state.projectsSortValue = action.payload
    },
    //employees
    setEmployeesSearchTerm(state, action: { payload: SearchTermType }) {
      state.employeesSearchTerm = action.payload
    },
    setEmployeesTypeFilterValue(state, action: { payload: FilterTermType }) {
      state.employeesTypeFilterValue = action.payload
    },
    //suppliersMaterial
    setSuppliersMaterialTableSearchTerm(state, action: { payload: SearchTermType }) {
      state.suppliersMaterialSearchTerm = action.payload
    },
    setSuppliersMaterialTableFilterTerm(state, action: { payload: FilterTermType }) {
      state.suppliersMaterialFilterValue = action.payload
    },
    setSuppliersMaterialTableSortTerm(state, action: { payload: SortTermType }) {
      state.suppliersMaterialSortValue = action.payload
    },
    //suppliersWorkers
    setSuppliersWorkesTableSearchTerm(state, action: { payload: SearchTermType }) {
      state.suppliersWorkersSearchTerm = action.payload
    },
    setSuppliersWorkesTableFilterTerm(state, action: { payload: FilterTermType }) {
      state.suppliersWorkersFilterValue = action.payload
    },
    setSuppliersWorkesTableSortTerm(state, action: { payload: SortTermType }) {
      state.suppliersWorkersSortValue = action.payload
    },
    //inventory
    setInventoryTableSearchTerm(state, action: { payload: SearchTermType }) {
      state.inventorySearchTerm = action.payload
    },
    setInventoryTableFilterTerm(state, action: { payload: FilterTermType }) {
      state.inventoryFilterValue = action.payload
    },
    setInventoryTableSortTerm(state, action: { payload: SortTermType }) {
      state.inventorySortValue = action.payload
    },
    setInventoryGeneralSearchTerm(state, action: { payload: SearchTermType }) {
      state.inventoryGeneralSearchTerm = action.payload
    },
    setInventoryTypeFilterValue(state, action: { payload: SearchTermType }) {
      state.inventoryTypeFilterValue = action.payload
    },
    //internalExpenses
    setInternalExpensesTableSearchTerm(state, action: { payload: SearchTermType }) {
      state.internalExpensesSearchTerm = action.payload
    },
    setInternalExpensesTableFilterTerm(state, action: { payload: FilterTermType }) {
      state.internalExpensesFilterValue = action.payload
    },
    setInternalExpensesTableSortTerm(state, action: { payload: SortTermType }) {
      state.internalExpensesSortValue = action.payload
    },
    setInternalExpensesGeneralSearchTerm(state, action: { payload: SearchTermType }) {
      state.internalExpensesGeneralSearchTerm = action.payload
    },
    setInternalExpensesDateFilterValue(state, action: { payload: FilterTermType }) {
      state.internalExpensesDateFilterValue = action.payload
    },
    //noProjectInvoices
    setNoProjectsInvoicesTableSearchTerm(state, action: { payload: SearchTermType }) {
      state.allInvoicesSearchTerm = action.payload
    },
    setNoProjectsInvoicesTableFilterTerm(state, action: { payload: FilterTermType }) {
      state.allInvoicesFilterValue = action.payload
    },
    setNoProjectsInvoicesTableSortTerm(state, action: { payload: SortTermType }) {
      state.allInvoicesSortValue = action.payload
    },
    setNoProjectsInvoicesGeneralSearchTerm(state, action: { payload: SearchTermType }) {
      state.allInvoicesGeneralSearchTerm = action.payload
    },
    //projectInvoices
    setProjectsInvoicesTableSearchTerm(state, action: { payload: SearchTermType }) {
      state.projectInvoicesSearchTerm = action.payload
    },
    setProjectsInvoicesTableFilterTerm(state, action: { payload: FilterTermType }) {
      state.projectInvoicesFilterValue = action.payload
    },
    setProjectsInvoicesTableSortTerm(state, action: { payload: SortTermType }) {
      state.projectInvoicesSortValue = action.payload
    },
    toggleProjectInvoicesProjectIDs(state, action: { payload: string | number }) {
      if (state.projectInvoicesProjectIDs.includes(action.payload)) {
        state.projectInvoicesProjectIDs = state.projectInvoicesProjectIDs.filter(item => item !== action.payload)
      } else {
        state.projectInvoicesProjectIDs.push(action.payload)
      }
    },
    ///ProjectEventsTable
    setProjectEventsTableSearchTerm(state, action: { payload: SearchTermType }) {
      state.ProjectEventsTableSearchTerm = action.payload
    },
    setProjecttEventsTableFilterTerm(state, action: { payload: FilterTermType }) {
      state.ProjectEventsTableFilterValue = action.payload
    },
    setProjecttEventsTableSortTerm(state, action: { payload: SortTermType }) {
      state.ProjectEventsTableSortValue = action.payload
    },
    //LastMonthEventsTable
    setLastMonthEventsSearchTerm(state, action: { payload: SearchTermType }) {
      state.LastMonthTableSearchTerm = action.payload
    },
    setLastMonthEventsFilterTerm(state, action: { payload: FilterTermType }) {
      state.LastMonthTableFilterValue = action.payload
    },
    setLastMonthEventsSortTerm(state, action: { payload: SortTermType }) {
      state.LastMonthTableSortValue = action.payload
    },
    //LastMonthSuppliersEventsTable
    setLastMonthSuppliersEventsSearchTerm(state, action: { payload: SearchTermType }) {
      state.LastMonthSuppliersTableSearchTerm = action.payload
    },
    setLastMonthSuppliersEventsFilterTerm(state, action: { payload: FilterTermType }) {
      state.LastMonthSuppliersTableFilterValue = action.payload
    },
    setLastMonthSuppliersEventsSortTerm(state, action: { payload: SortTermType }) {
      state.LastMonthSuppliersTableSortValue = action.payload
    },
    //ProjectConstructionTable
    setProjectConstructionTableSearchTerm(state, action: { payload: SearchTermType }) {
      state.ProjectConstructionTableSearchTerm = action.payload
    },
    setProjectConstructionTableFilterTerm(state, action: { payload: FilterTermType }) {
      state.ProjectConstructionTableFilterValue = action.payload
    },
    setProjectConstructionTableSortTerm(state, action: { payload: SortTermType }) {
      state.ProjectConstructionTableSortValue = action.payload
    },
    //UpcomingEventsTable
    setUpcomingEventsTableFilterTerm(state, action: { payload: FilterTermType }) {
      state.UpcomingEventsTableFilterValue = action.payload
    },
    //PickArticleTable
    setPickArticleTableTableSearchTerm(state, action: { payload: SearchTermType }) {
      state.pickArticleTableSearchTerm = action.payload
    },
    setPickArticleTableTableFilterTerm(state, action: { payload: FilterTermType }) {
      state.pickArticleTableFilterValue = action.payload
    },
    setPickArticleTableTableSortTerm(state, action: { payload: SortTermType }) {
      state.pickArticleTableSortValue = action.payload
    },
    setPickArticleTableGeneralSearchTerm(state, action: { payload: string }) {
      state.pickArticleTableGeneralSearchTerm = action.payload
    },
    //projectInternalExpenses
    setProjectInternalExpensesSearchTerm(state, action: { payload: SearchTermType }) {
      state.projectInternalExpensesSearchTerm = action.payload
    },
    setProjectInternalExpensesFilterTerm(state, action: { payload: FilterTermType }) {
      state.projectInternalExpensesFilterValue = action.payload
    },
    setProjectInternalExpensesSortTerm(state, action: { payload: SortTermType }) {
      state.projectInternalExpensesSortValue = action.payload
    },
    //projectInternalExpensesOn5step
    setProjectInternalExpensesOn5StepSearchTerm(state, action: { payload: SearchTermType }) {
      state.projectInternalExpensesOn5StepSearchTerm = action.payload
    },
    setProjectInternalExpensesOn5StepFilterTerm(state, action: { payload: FilterTermType }) {
      state.projectInternalExpensesOn5StepFilterValue = action.payload
    },
    setProjectInternalExpensesOn5StepSortTerm(state, action: { payload: SortTermType }) {
      state.projectInternalExpensesOn5StepSortValue = action.payload
    },
    //labors
    setStep4LaborsTableSearchTerm(state, action: { payload: SearchTermType }) {
      state.step4laborsTableSearchTerm = action.payload
    },
    setStep4LaborsTableFilterTerm(state, action: { payload: FilterTermType }) {
      state.step4laborsTableFilterValue = action.payload
    },
    setStep4LaborsTableSortTerm(state, action: { payload: SortTermType }) {
      state.step4laborsTableSortValue = action.payload
    }
  }
})
const { reducer, actions } = PagesStateSlice
export default reducer;
export const { setClientsTableSearchTerm,
  setClientsTableFilterTerm,
  setClientsTableSortTerm,
  setClientsTypeFilterValue,
  setProjectsTableSearchTerm,
  setProjectsTableFilterTerm,
  setProjectsTableSortTerm,
  setEmployeesSearchTerm,
  setEmployeesTypeFilterValue,
  setSuppliersMaterialTableSearchTerm,
  setSuppliersMaterialTableFilterTerm,
  setSuppliersMaterialTableSortTerm,
  setSuppliersWorkesTableSearchTerm,
  setSuppliersWorkesTableFilterTerm,
  setSuppliersWorkesTableSortTerm,
  setInventoryTableSearchTerm,
  setInventoryTableFilterTerm,
  setInventoryTableSortTerm,
  setInventoryGeneralSearchTerm,
  setInventoryTypeFilterValue,
  setInternalExpensesTableSearchTerm,
  setInternalExpensesTableFilterTerm,
  setInternalExpensesGeneralSearchTerm,
  setInternalExpensesDateFilterValue,
  setInternalExpensesTableSortTerm,
  setNoProjectsInvoicesTableSearchTerm,
  setNoProjectsInvoicesTableFilterTerm,
  setNoProjectsInvoicesTableSortTerm,
  setNoProjectsInvoicesGeneralSearchTerm,
  setProjectsInvoicesTableSearchTerm,
  setProjectsInvoicesTableFilterTerm,
  setProjectsInvoicesTableSortTerm,
  toggleProjectInvoicesProjectIDs,
  setProjectEventsTableSearchTerm,
  setProjecttEventsTableFilterTerm,
  setProjecttEventsTableSortTerm,
  setProjectConstructionTableSearchTerm,
  setProjectConstructionTableFilterTerm,
  setProjectConstructionTableSortTerm,
  setUpcomingEventsTableFilterTerm,
  setPickArticleTableGeneralSearchTerm,
  setPickArticleTableTableFilterTerm,
  setPickArticleTableTableSearchTerm,
  setPickArticleTableTableSortTerm,
  setProjectInternalExpensesSearchTerm,
  setProjectInternalExpensesFilterTerm,
  setProjectInternalExpensesSortTerm,
  setProjectInternalExpensesOn5StepFilterTerm,
  setProjectInternalExpensesOn5StepSortTerm,
  setProjectInternalExpensesOn5StepSearchTerm,
  setLastMonthEventsFilterTerm,
  setLastMonthEventsSearchTerm,
  setLastMonthEventsSortTerm,
  setLastMonthSuppliersEventsFilterTerm,
  setLastMonthSuppliersEventsSearchTerm,
  setLastMonthSuppliersEventsSortTerm,
  setStep4LaborsTableSearchTerm,
  setStep4LaborsTableFilterTerm,
  setStep4LaborsTableSortTerm
} = actions