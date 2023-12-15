import { createSelector } from "@reduxjs/toolkit";
import { RootStateType } from "types/index";
import moment from "moment";
//utils
import { filterBySearchTerm } from "utils/filterBySearchTerm";
import { filterByFilterTerm } from "utils/filterByFilterTerm";
import { sortBySortTerm } from "utils/sortBySortTerm";
import filterByTimePeriod from "utils/filterByTimePeriod";
import fiterByGeneralSearchTerm from "utils/fiterByGeneralSearchTerm";
import getStatusOnGerman from "utils/getStatusOnGerman";

export const clientsSelector = createSelector(
  (state: RootStateType) => state.Clients.clients,
  (state: RootStateType) => state.TableFilters.clientsSearchTerm,
  (state: RootStateType) => state.TableFilters.clientsFilterValue,
  (state: RootStateType) => state.TableFilters.clientsSortValue,
  (state: RootStateType) => state.TableFilters.clientsTypeFilterValue,
  (clients, search, filter, sort, type) => {
    const clientsData = clients.map(({ id,
      name,
      email,
      phone,
      image,
      address,
      type,
      role,
      projects }) => {
      if (!projects || !projects.length) {
        return {
          id,
          name: {
            name,
            image
          },
          phone,
          image,
          address,
          type,
          role,
          email,
          project: 'N/A',
          status: 'N/A',
        }
      } else {
        return projects.map(project => ({
          id,
          name: {
            name,
            image
          },
          phone,
          image,
          address,
          type,
          role,
          email,
          project: project.name,
          status: getStatusOnGerman(project.status),
        }))
      }

    })
    //@ts-ignore
    const finalData = []
    clientsData.forEach((item) => {
      Array.isArray(item) ? finalData.push(...item) : finalData.push(item)
    })
    //@ts-ignore
    return sortBySortTerm(filterByFilterTerm(filterByFilterTerm(filterBySearchTerm(finalData, search), filter), type), sort)
  }
)
export const projectsSelector = createSelector(
  (state: RootStateType) => state.Projects.projects,
  (state: RootStateType) => state.TableFilters.projectsSearchTerm,
  (state: RootStateType) => state.TableFilters.projectsFilterValue,
  (state: RootStateType) => state.TableFilters.projectsSortValue,
  (projects, search, filter, sort) => sortBySortTerm(filterByFilterTerm(filterBySearchTerm(projects.map(project => ({ ...project, status: getStatusOnGerman(project.status) })), search), filter), sort).map(item => ({
    ...item,
    open: item.id
  }))
)
export const employeesSelector = createSelector(
  (state: RootStateType) => state.Employees.employees,
  (state: RootStateType) => state.TableFilters.employeesSearchTerm,
  (state: RootStateType) => state.TableFilters.employeesTypeFilterValue,
  (projects, search, filter) => filterByFilterTerm(filterBySearchTerm(projects, search), filter)
)
export const suppliersmaterialSelector = createSelector(
  (state: RootStateType) => state.Suppliers.suppliersMaterials,
  (state: RootStateType) => state.TableFilters.suppliersMaterialSearchTerm,
  (state: RootStateType) => state.TableFilters.suppliersMaterialFilterValue,
  (state: RootStateType) => state.TableFilters.suppliersMaterialSortValue,
  (suppliers, search, filter, sort) => {
    return sortBySortTerm(filterByFilterTerm(filterBySearchTerm(suppliers, search), filter), sort).map(supplier => {
      return {
        ...supplier,
        name: {
          name: supplier.name,
          image: supplier.image
        }
      }
    })
  })

export const suppliersWorkersSelector = createSelector(
  (state: RootStateType) => state.Suppliers.suppliersWorkers,
  (state: RootStateType) => state.TableFilters.suppliersWorkersSearchTerm,
  (state: RootStateType) => state.TableFilters.suppliersWorkersFilterValue,
  (state: RootStateType) => state.TableFilters.suppliersWorkersSortValue,
  (suppliers, search, filter, sort) => sortBySortTerm(filterByFilterTerm(filterBySearchTerm(suppliers, search), filter), sort).map(supplier => {
    return {
      ...supplier,
      name: {
        name: supplier.name,
        image: supplier.image
      }
    }
  })
)
export const inventorySelector = createSelector(
  (state: RootStateType) => state.Inventory.inventory,
  (state: RootStateType) => state.TableFilters.inventorySearchTerm,
  (state: RootStateType) => state.TableFilters.inventoryFilterValue,
  (state: RootStateType) => state.TableFilters.inventorySortValue,
  (state: RootStateType) => state.TableFilters.inventoryGeneralSearchTerm,
  (inventory, search, filter, sort, generalSearch) => sortBySortTerm(filterByFilterTerm(filterBySearchTerm(filterBySearchTerm(inventory.filter(({ is_active }) => is_active), search), generalSearch), filter), sort)
)
export const internalExpensesSelector = createSelector(
  (state: RootStateType) => state.InternalExpenses.internalExpenses,
  (state: RootStateType) => state.TableFilters.internalExpensesSearchTerm,
  (state: RootStateType) => state.TableFilters.internalExpensesFilterValue,
  (state: RootStateType) => state.TableFilters.internalExpensesSortValue,
  (state: RootStateType) => state.TableFilters.internalExpensesGeneralSearchTerm,
  (state: RootStateType) => state.TableFilters.internalExpensesDateFilterValue,
  (expenses, search, filter, sort, generalSearch, period) => filterByTimePeriod(sortBySortTerm(filterByFilterTerm(filterBySearchTerm(filterBySearchTerm(expenses, search), generalSearch), filter), sort), period!.period, new Date())
)

export const createSupplierFormSelector = createSelector(
  (state: RootStateType) => state.PagesStateSlice.editSupplier,
  (state: RootStateType) => state.Suppliers.suppliersMaterials,
  (state: RootStateType) => state.Suppliers.suppliersWorkers,
  (id, worker, material) => [...worker, ...material].find(item => item.id === id)
)
export const createClientFormSelector = createSelector(
  (state: RootStateType) => state.PagesStateSlice.editClient,
  (state: RootStateType) => state.Clients.clients,
  (state: RootStateType) => state.Suppliers.suppliersWorkers,
  (id, clients) => clients.find(item => item.id === id)
)
export const createInventoryFormSelector = createSelector(
  (state: RootStateType) => state.PagesStateSlice.editInventory,
  (state: RootStateType) => state.Inventory.inventory,
  (id, inventory) => inventory.find(item => item.id === id)
)

export const noProjectInvoicesSelector = createSelector(
  (state: RootStateType) => state.Invoices.invoicesNoProject,
  (invoices) => invoices.filter(invoice => !invoice.project)
)
export const filteredAllInvoicesSelector = createSelector(
  (state: RootStateType) => state.Invoices.allInvoices,
  (state: RootStateType) => state.TableFilters.allInvoicesSearchTerm,
  (state: RootStateType) => state.TableFilters.allInvoicesFilterValue,
  (state: RootStateType) => state.TableFilters.allInvoicesSortValue,
  (state: RootStateType) => state.TableFilters.allInvoicesGeneralSearchTerm,
  (invoices, search, filter, sort, generalSearch,) => {
    const mapedData = invoices.map(invoice => {
      return {
        ...invoice,
        amount: invoice.revenue + " €",
        customer: invoice.proposition ? invoice.proposition.client?.name : null,
        date: invoice.proposition ? moment(invoice.proposition.created_at).format("DD/MM/YYYY") : null,
        viewLink: {
          name: invoice.document,
          viewLink: {
            name: invoice.document,
          },
        },
      }
    })
    return sortBySortTerm(filterByFilterTerm(filterBySearchTerm(filterBySearchTerm(mapedData, search), generalSearch), filter), sort)
  }
)

export const filteredProjectInvoicesSelector = createSelector(
  (state: RootStateType) => state.Invoices.invoicesWithProject,
  (state: RootStateType) => state.TableFilters.projectInvoicesSearchTerm,
  (state: RootStateType) => state.TableFilters.projectInvoicesFilterValue,
  (state: RootStateType) => state.TableFilters.projectInvoicesSortValue,
  (state: RootStateType) => state.TableFilters.projectInvoicesProjectIDs,
  (invoices, search, filter, sort, IDs,) => sortBySortTerm(filterByFilterTerm(filterBySearchTerm(invoices.filter(invoice => invoice.project && (!IDs.length || IDs.some(id => id === invoice.project))).map(invoice => ({ ...invoice, amount: invoice.revenue + " €" })), search), filter), sort)
)

export const upcomingEventsSelector = createSelector(
  (state: RootStateType) => state.Events.upcomingEvents,
  (state: RootStateType) => state.TableFilters.UpcomingEventsTableFilterValue,
  (events, filter) => filterByFilterTerm(events, filter)
)
export const filtredProjectEventsSelector = createSelector(
  (state: RootStateType) => state.Events.events,
  (state: RootStateType) => state.Projects.projects,
  (state: RootStateType) => state.Employees.employees,
  (state: RootStateType) => state.Projects.currentProject,
  (state: RootStateType) => state.TableFilters.ProjectEventsTableSearchTerm,
  (state: RootStateType) => state.TableFilters.ProjectEventsTableFilterValue,
  (state: RootStateType) => state.TableFilters.ProjectEventsTableSortValue,
  (events, projects, employees, currentProject, search, filter, sort) => {
    return sortBySortTerm(filterByFilterTerm(filterBySearchTerm(events, search), filter), sort).filter(event => event.project === currentProject?.id).map(event => ({
      ...event,
      project: projects.find(project => project.id === event.project)?.name,
      employee: employees.find(employee => employee.id === event.employee)?.name
    }))
  }
)
export const projectEventsSelector = createSelector(
  (state: RootStateType) => state.Events.events,
  (state: RootStateType) => state.Projects.currentProject,
  (events, currentProject) => events.filter(event => event.project.id === currentProject?.id)
)

export const filteredProjectСonstructionSelector = createSelector(
  (state: RootStateType) => state.Events.specialProjectEvents,
  (state: RootStateType) => state.TableFilters.ProjectConstructionTableSearchTerm,
  (state: RootStateType) => state.TableFilters.ProjectConstructionTableFilterValue,
  (state: RootStateType) => state.TableFilters.ProjectConstructionTableSortValue,
  (events, search, filter, sort) => sortBySortTerm(filterByFilterTerm(filterBySearchTerm(events.events, search), filter), sort)
)

export const step4LaborsTableFilteredSelector = createSelector(
  (state: RootStateType) => state.Labors.labors,
  (state: RootStateType) => state.TableFilters.step4laborsTableSearchTerm,
  (state: RootStateType) => state.TableFilters.step4laborsTableFilterValue,
  (state: RootStateType) => state.TableFilters.step4laborsTableSortValue,
  (labors, search, filter, sort) => sortBySortTerm(filterByFilterTerm(filterBySearchTerm(labors.map(item => ({
    ...item,
    company: item.employee ? "Keine" : item.supplier?.name,
    date: item.date ? moment.utc(item.date).format('DD-MM-YYYY') : null,
  })), search), filter), sort)
)

export const pickArticelInventorySelector = createSelector(
  (state: RootStateType) => state.Inventory.inventory,
  (state: RootStateType) => state.TableFilters.pickArticleTableSearchTerm,
  (state: RootStateType) => state.TableFilters.pickArticleTableFilterValue,
  (state: RootStateType) => state.TableFilters.pickArticleTableSortValue,
  (state: RootStateType) => state.TableFilters.pickArticleTableGeneralSearchTerm,
  (inventory, search, filter, sort, generalSearch) => sortBySortTerm(filterByFilterTerm(fiterByGeneralSearchTerm(generalSearch, ['name', "article", "supplier"], filterBySearchTerm(inventory.filter(({ is_active }) => is_active), search)), filter), sort)
)

export const currentProjectEvents = createSelector(
  (state: RootStateType) => state.Projects.currentProject?.id,
  (state: RootStateType) => state.Events.events,
  (id, events) => events.filter(event => event.project.id === id)
)

export const projectInternalExpensesSelector = createSelector(
  (state: RootStateType) => state.Projects.currentProject?.id,
  (state: RootStateType) => state.InternalExpenses.internalExpenses,
  (id, expenses) => {
    return expenses.filter(expenses => expenses.project.id === id)
  }
)
export const projectFilteredInternalExpensesSelector = createSelector(
  (state: RootStateType) => state.Projects.currentProject?.id,
  (state: RootStateType) => state.InternalExpenses.internalExpenses,
  (state: RootStateType) => state.TableFilters.projectInternalExpensesFilterValue,
  (state: RootStateType) => state.TableFilters.projectInternalExpensesSortValue,
  (state: RootStateType) => state.TableFilters.projectInternalExpensesSearchTerm,
  (id, expenses, filter, sort, search) => sortBySortTerm(filterByFilterTerm(filterBySearchTerm(expenses.filter(expenses => expenses.project.id === id), search), filter), sort)
)
export const projectFilteredInternalExpensesOn5StepSelector = createSelector(
  (state: RootStateType) => state.Projects.currentProject?.id,
  (state: RootStateType) => state.InternalExpenses.internalExpenses,
  (state: RootStateType) => state.TableFilters.projectInternalExpensesOn5StepFilterValue,
  (state: RootStateType) => state.TableFilters.projectInternalExpensesOn5StepSortValue,
  (state: RootStateType) => state.TableFilters.projectInternalExpensesOn5StepSearchTerm,
  (id, expenses, filter, sort, search) => sortBySortTerm(filterByFilterTerm(filterBySearchTerm(expenses.filter(expenses => expenses.project.id === id), search), filter), sort)
)


export const filteredlastMonthSuppliersEventsSelector = createSelector(
  (state: RootStateType) => state.Events.lastMonthSuppliersEvets,
  (state: RootStateType) => state.TableFilters.LastMonthSuppliersTableFilterValue,
  (state: RootStateType) => state.TableFilters.LastMonthSuppliersTableSortValue,
  (state: RootStateType) => state.TableFilters.LastMonthSuppliersTableSearchTerm,
  (events, filter, sort, search) => sortBySortTerm(filterByFilterTerm(filterBySearchTerm(events, search), filter), sort)
)

export const currentProjectCustomerEmail = createSelector(
  (state: RootStateType) => state.Projects.currentProject?.customer,
  (state: RootStateType) => state.Clients.clients,
  //@ts-ignore
  (id, clients) => clients.find(client => client.id === id)?.email
)

export const dashboardCustomerEmail = createSelector(
  (state: RootStateType) => state.ProjectProposition.proposition?.client,
  (state: RootStateType) => state.Clients.clients,
  //@ts-ignore
  (id, clients) => clients.find(client => client.id === id)?.email
)

export const WorkersProjectTimeOverviewSelector = createSelector(
  (state: RootStateType) => state.Events.specialProjectEvents,
  //@ts-ignore
  (events) => {
    //@ts-ignore
    const employeesWithTime = []
    events?.events.map(event => ({ ...event.employees.map(empl => ({ ...empl, totalTime: event.total_time, company: "Keine" })) })).forEach(event => Object.values(event).forEach(empl => employeesWithTime.push(empl)))
    //@ts-ignore


    return employeesWithTime.reduce((acc: {
      [key: string]: any
    }[], empl: { [key: string]: any }) => {
      const emplInArr = acc.find((item) => item.id === empl.id);

      if (!emplInArr) {
        acc.push(empl);
      } else {
        acc[acc.findIndex((item) => item.id === empl.id)] = { ...emplInArr, totalTime: emplInArr.totalTime + empl.totalTime }
      }
      return acc;
    }, [])
  }
)

export const workersEmployeesStatisticSelector = createSelector(
  (state: RootStateType) => state.Labors.workersEmployeesStatistic,
  (state: RootStateType) => state.TableFilters.LastMonthTableSearchTerm,
  (state: RootStateType) => state.TableFilters.LastMonthTableFilterValue,
  (state: RootStateType) => state.TableFilters.LastMonthTableSortValue,
  (labors, search, filter, sort) => sortBySortTerm(filterByFilterTerm(filterBySearchTerm(labors.map(item => ({
    ...item,
    name: item.employee_name,
  })), search), filter), sort)
)

export const workersSuppliersStatisticSelector = createSelector(
  (state: RootStateType) => state.Labors.workersSuppliersStatistic,
  (state: RootStateType) => state.TableFilters.LastMonthSuppliersTableSearchTerm,
  (state: RootStateType) => state.TableFilters.LastMonthSuppliersTableFilterValue,
  (state: RootStateType) => state.TableFilters.LastMonthSuppliersTableSortValue,
  (labors, search, filter, sort) => sortBySortTerm(filterByFilterTerm(filterBySearchTerm(labors.map(item => ({
    ...item,
    name: item.supplier_name,
  })), search), filter), sort)
)