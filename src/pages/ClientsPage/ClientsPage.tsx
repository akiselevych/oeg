//libs
import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
//redux
import { setClientsTypeFilterValue } from "reduxFolder/slices/TableFiltersSlice"
import { setEditClient } from "reduxFolder/slices/PagesStateSlice"
//components
import ErrorBoundary from "components/ErrorBoundary/ErrorBoundary"
import ClientsTable from "components/ClientsTable/ClientsTable"
import RightModalWindow from "components/RightModalWindow/RightModalWindow"
import CreateClientForm from "components/CreateClientForm/CreateClientForm"
//types
import { AppDispatch, RootStateType } from "types/index"
//styles
import { Container } from "./styles"
import { PrimaryButton, PageTitle, CheckBox } from "styles/global"
//iconst
import dropdown from 'assets/icons/dropdown.svg'

const ClientsPage = () => {
    const totalClients = useSelector((state: RootStateType) => state.Clients.clients).length
    const isEditClient = useSelector((state: RootStateType) => state.PagesStateSlice.editClient)
    const [isClientTypeOpen, setIsClientTypeOpen] = useState<boolean>(false)
    const [isCreateClientOpen, setIsCreateClientOpen] = useState<boolean>(false)
    const clientsType = useSelector((state: RootStateType) => state.TableFilters.clientsTypeFilterValue)
    const dispatch = useDispatch<AppDispatch>()

    return (
        <Container>
            <PageTitle>Kunden gefunden {totalClients} </PageTitle>
            <div className="btnGroup">
                <CheckBox>
                    <p onClick={() => setIsClientTypeOpen(prev => !prev)} className="title">
                        Typ des Kunden
                        <img className={isClientTypeOpen ? "rotate" : ""} src={dropdown} alt="dropdown" />
                    </p>
                    {isClientTypeOpen &&
                        <div className="selectWrapper">
                            <label>
                                <input
                                    onChange={() => dispatch(setClientsTypeFilterValue(null))}
                                    checked={!!!clientsType}
                                    type="checkbox"
                                />
                                All
                            </label>
                            <label >
                                <input
                                    onChange={() => dispatch(setClientsTypeFilterValue({ type: 'Individuals' }))}
                                    checked={(clientsType?.type && clientsType.type === 'Individuals') ? true : false}
                                    type="checkbox"
                                />
                                Einzelpersonen
                            </label>
                            <label >
                                <input
                                    onChange={() => dispatch(setClientsTypeFilterValue({ type: 'Institutions' }))}
                                    checked={(clientsType?.type && clientsType.type === 'Institutions') ? true : false}
                                    type="checkbox"
                                />
                                Institutionen
                            </label>
                        </div>}
                </CheckBox>
                <PrimaryButton onClick={() => setIsCreateClientOpen(true)}>
                    Kunden erstellen
                </PrimaryButton>
            </div>
            <ErrorBoundary>
                <ClientsTable />
            </ErrorBoundary>
            {(isCreateClientOpen || !!isEditClient) &&
                <RightModalWindow isOpen={isCreateClientOpen || !!isEditClient} closeModal={() => {
                    setIsCreateClientOpen(false)
                    dispatch(setEditClient(null))
                }}>
                    <CreateClientForm closeModal={() => {
                        setIsCreateClientOpen(false)
                        dispatch(setEditClient(null))
                    }} />
                </RightModalWindow>}
        </Container>
    )
}

export default ClientsPage