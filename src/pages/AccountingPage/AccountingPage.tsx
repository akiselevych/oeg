//libs
import { useState } from "react"
//components
import ErrorBoundary from "components/ErrorBoundary/ErrorBoundary"
import TableSwitcher from "components/TableSwitcher/TableSwitcher"
import EventEmployeeTimeOverviewTable from "components/EventEmployeeTimeOverviewTable/EventEmployeeTimeOverviewTable"
import EventSupplierTimeOverviewTable from "components/EventSupplierTimeOverviewTable/EventSupplierTimeOverviewTable"
import InternalExpensesTable from "components/InternalExpensesTable/InternalExpensesTable"
import ProjectInvoicesTable from "components/ProjectInvoicesTable/ProjectInvoicesTable"
//styles
import { Container } from "./styles"
import { PageTitle } from "styles/global"
//types
import { TableSwitcherProps } from "types/index"

const tableValues: TableSwitcherProps['values'] = [
  {
    name: ' Projektübergreifende Buchhaltung',
    value: "acrossProjects"
  }, {
    name: 'Monatlicher Überblick Arbeitsstunden',
    value: "monthlyOverview"
  }, {
    name: 'Interne Reisekosten',
    value: "travelExpenses"
  },
]

const AccountingPage = () => {
  const [activeTable, setActiveTable] = useState<string>('acrossProjects');
  const [activeOverviewTable, setActiveOverviewTable] = useState<"Employees" | "Suppliers">('Employees')
  const acrossTable = activeTable === "acrossProjects" ? <ProjectInvoicesTable /> : null
  const expensesTable = activeTable === "travelExpenses" ? <InternalExpensesTable /> : null
  const monthlyTable = activeTable === "monthlyOverview" ?
    <div className="tableWrapper">
      <div className="SupplierstTableSwitcher">
        <div onClick={() => setActiveOverviewTable('Employees')} className={`item ${activeOverviewTable === "Employees" ? "active" : ''}`}>Mitarbeiter</div>
        <div onClick={() => setActiveOverviewTable('Suppliers')} className={`item ${activeOverviewTable === "Suppliers" ? "active" : ''}`}>Subunternehmer</div>
      </div>
      {activeOverviewTable === 'Employees' && <EventEmployeeTimeOverviewTable />}
      {activeOverviewTable === 'Suppliers' && <EventSupplierTimeOverviewTable />}
    </div>
    : null


  return (
    <Container>
      <PageTitle>Übersicht</PageTitle>
      <TableSwitcher activeBGColor="#000" activeColor="#DCF6D9" values={tableValues} onChange={setActiveTable} currentValue={activeTable} />
      <div className="main">
        <ErrorBoundary>
          {acrossTable}
        </ErrorBoundary>
        <ErrorBoundary>
          {monthlyTable}
        </ErrorBoundary>
        <ErrorBoundary>
          {expensesTable}
        </ErrorBoundary>
      </div>
    </Container>
  )
}

export default AccountingPage