//libs
import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
//components
import ErrorBoundary from "components/ErrorBoundary/ErrorBoundary"
import InventoryTable from "components/InventoryTable/InventoryTable"
import CreateInventoryForm from "components/CreateInventoryForm/CreateInventoryForm"
//redux
import { setInventoryGeneralSearchTerm } from "reduxFolder/slices/TableFiltersSlice"
import { setEditInventory } from "reduxFolder/slices/PagesStateSlice"
import { setErrorMessageToNull } from "reduxFolder/slices/InventorySlice";

//styles
import { Container } from "./styles"
import { PageTitle, SearchInput, SecondaryButton } from "styles/global"
//types
import { RootStateType, AppDispatch } from "types/index"




const InventoryPage = () => {
  const [isCreateInventoryOpen, setIsCreateInventoryOpen] = useState(false)
  const searchTerm = useSelector((state: RootStateType) => state.TableFilters.inventoryGeneralSearchTerm)
  const editInventory = useSelector((state: RootStateType) => state.PagesStateSlice.editInventory)
  const dispatch = useDispatch<AppDispatch>()



  return (
    <Container>
      <PageTitle>Materialdatenbank</PageTitle>
      <div className="filtersGroup">
        <SearchInput value={searchTerm!.name} onChange={(e: React.ChangeEvent<HTMLInputElement>) => dispatch(setInventoryGeneralSearchTerm({ name: e.target.value }))} type='text' placeholder="Material suchen" />
      </div>
      <ErrorBoundary>
        <InventoryTable />
      </ErrorBoundary>
      <ErrorBoundary>
        <div id='changeInventory'>
          {(isCreateInventoryOpen || !!editInventory) &&
            <CreateInventoryForm isOpen={isCreateInventoryOpen || !!editInventory} close={() => {
              setIsCreateInventoryOpen(false)
              dispatch(setEditInventory(null))
              dispatch(setErrorMessageToNull())
              window.location.hash = ""
            }} />}
        </div>
      </ErrorBoundary>
      <div className="addItemWrapper">
        <SecondaryButton onClick={() => {
          if (!!editInventory || isCreateInventoryOpen) {
            setIsCreateInventoryOpen(false)
            dispatch(setEditInventory(null))
            window.location.hash = ""
            dispatch(setErrorMessageToNull())
          } else {
            setIsCreateInventoryOpen(true)
          }
        }}>{isCreateInventoryOpen || !!editInventory ? "Nein" : "Material hinzufügen"}</SecondaryButton>
      </div>
    </Container>
  )
}

export default InventoryPage