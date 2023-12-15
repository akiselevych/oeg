//libs
import { useEffect, useRef, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
//redux
import { setEmployeesSearchTerm, setEmployeesTypeFilterValue } from "reduxFolder/slices/TableFiltersSlice"
//components
import ErrorBoundary from "components/ErrorBoundary/ErrorBoundary"
import RightModalWindow from "components/RightModalWindow/RightModalWindow"
import EmployeesTable from "components/EmployeesTable/EmployeesTable"
import CreateEmployeeForm from "components/CreateEmployeeForm/CreateEmployeeForm"
//styles
import { Container } from "./styles"
import { PageTitle, PrimaryButton, CheckBox, SearchInput } from "styles/global"
//types
import { RootStateType, AppDispatch } from "types/index"
//images
import dropdown from 'assets/icons/dropdown.svg'
import { setEditEmployee } from "reduxFolder/slices/PagesStateSlice";

const EmployeesPage = () => {
    const totalEmployees = useSelector((state: RootStateType) => state.Employees.employees).length
    const [isCreateEmpolyeesOpen, setIsCreateEmpolyeesOpen] = useState<boolean>(false)
    const [isEmpolyeesTypeOpen, setIsEmpolyeesTypeOpen] = useState<boolean>(false)
    const editEmployee = useSelector((state: RootStateType) => state.PagesStateSlice.editEmployee)
    const employeeType = useSelector((state: RootStateType) => state.TableFilters.employeesTypeFilterValue)
    const searchTerm = useSelector((state: RootStateType) => state.TableFilters.employeesSearchTerm)
    const dispatch = useDispatch<AppDispatch>()

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    useEffect(() => {
        if (!!(editEmployee)) {
            setIsModalOpen(true);
        }
        // eslint-disable-next-line
    }, [!!editEmployee]);


    return (
        <Container>
            <PageTitle>Mitarbeiter gefunden {totalEmployees}</PageTitle>
            <div className="filtersGroup">
                <SearchInput value={searchTerm!.name} onChange={(e: React.ChangeEvent<HTMLInputElement>) => dispatch(setEmployeesSearchTerm({ name: e.target.value }))} type='text' placeholder="Suchen" />
                <CheckBox>
                    <p onClick={() => setIsEmpolyeesTypeOpen(prev => !prev)} className="title">
                        Jobtyp
                        <img className={isEmpolyeesTypeOpen ? "rotate" : ""} src={dropdown} alt="dropdown" />
                    </p>
                    {isEmpolyeesTypeOpen &&
                        <div className="selectWrapper">
                            <label>
                                <input
                                    onChange={() => dispatch(setEmployeesTypeFilterValue(null))}
                                    checked={!employeeType}
                                    type="checkbox"
                                />
                                Alle
                            </label>
                            <label>
                                <input
                                    onChange={() => dispatch(setEmployeesTypeFilterValue({ jobType: 'hauptberuflich' }))}
                                    checked={!!(employeeType?.jobType && employeeType.jobType === 'hauptberuflich')}
                                    type="checkbox"
                                />
                                Hauptberuflich
                            </label>
                            <label>
                                <input
                                    onChange={() => dispatch(setEmployeesTypeFilterValue({ jobType: 'ehrenamtlich' }))}
                                    checked={!!(employeeType?.jobType && employeeType.jobType === 'ehrenamtlich')}
                                    type="checkbox"
                                />
                                Ehrenamtlich
                            </label>
                        </div>}
                </CheckBox>
                <PrimaryButton className="createNewBtn" onClick={() => setIsModalOpen(true)}>Neuen Mitarbeiter hinzufügen</PrimaryButton>
            </div>
            <ErrorBoundary>
                <EmployeesTable />
            </ErrorBoundary>
            {(isModalOpen) &&
                <RightModalWindow isOpen={isModalOpen} closeModal={() => {
                    dispatch(setEditEmployee(null))
                    setIsModalOpen(false)
                }}>
                    <CreateEmployeeForm closeModal={() => setIsModalOpen(false)} />
                </RightModalWindow>}
        </Container>
    )
}

export default EmployeesPage