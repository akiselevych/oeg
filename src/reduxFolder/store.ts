//Libs
import { combineReducers, configureStore } from "@reduxjs/toolkit";
// Slices
import Labors from "reduxFolder/slices/Labors.slice";
import Events from "reduxFolder/slices/EventsSlice";
import PagesStateSlice from "reduxFolder/slices/PagesStateSlice";
import Clients from "reduxFolder/slices/ClientsSlice";
import Projects from "reduxFolder/slices/ProjectsSlice";
import Suppliers from "reduxFolder/slices/SuppliersSlice";
import Employees from "reduxFolder/slices/EmployeesSlice";
import Inventory from "reduxFolder/slices/InventorySlice";
import InternalExpenses from "reduxFolder/slices/InternalExpensesSlice";
import TableFilters from "reduxFolder/slices/TableFiltersSlice";
import Statistics from "reduxFolder/slices/StatisticsSlice";
import Invoices from "reduxFolder/slices/InvoicesSlice";
import ProjectProposition from "reduxFolder/slices/ProjectPropositionSlice";
import Login from "reduxFolder/slices/Login.slice";
import Calendar from "reduxFolder/slices/Calendar.slice";
import Documents from "reduxFolder/slices/DocumentsSlice";
import ProjectsChats from "reduxFolder/slices/ProjectsChats.slice";
import InboxChats from "reduxFolder/slices/Inbox.slice";

const rootReducer = combineReducers({
    Labors,
    Documents,
    ProjectProposition,
    Projects,
    Events,
    Clients,
    Suppliers,
    Employees,
    Inventory,
    Invoices,
    InternalExpenses,
    PagesStateSlice,
    TableFilters,
    Statistics,
    Calendar,
    Login,
    ProjectsChats,
    InboxChats,
});

export const store = configureStore({
    reducer: rootReducer,
});
