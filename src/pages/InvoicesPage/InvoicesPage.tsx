
//libs
import { useDispatch, useSelector } from "react-redux"
//redux
import { setNoProjectsInvoicesGeneralSearchTerm } from "reduxFolder/slices/TableFiltersSlice"
import { noProjectInvoicesSelector } from "reduxFolder/selectors"
//styles
import { Container } from "./styles"
import { PageTitle, SearchInput } from "styles/global"
//types
import { RootStateType, AppDispatch } from "types/index"
//components
import InvoicesTable from "components/InvoicesTable/InvoicesTable"
import ErrorBoundary from "components/ErrorBoundary/ErrorBoundary"


const InvoicesPage = () => {
  const total = useSelector((state: RootStateType) => state.Invoices.allInvoices).length
  const searchTerm = useSelector((state: RootStateType) => state.TableFilters.allInvoicesGeneralSearchTerm)
  const dispatch = useDispatch<AppDispatch>()
  return (
    <Container>
      <PageTitle>Gefundene Rechnungen {total}</PageTitle>
      <SearchInput value={searchTerm!.name} onChange={(e: React.ChangeEvent<HTMLInputElement>) => dispatch(setNoProjectsInvoicesGeneralSearchTerm({ name: e.target.value }))} type='text' placeholder="Suche" />
      <ErrorBoundary>
        <InvoicesTable />
      </ErrorBoundary>
    </Container>
  )
}

export default InvoicesPage