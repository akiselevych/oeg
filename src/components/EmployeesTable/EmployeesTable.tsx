//libs
import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
//components
import ErrorMessage from "components/ErrorMessage/ErrorMessage"
import EmployeeCard from "components/EmployeeCard/EmployeeCard"
//redux
import { fetchEmployees } from "reduxFolder/slices/EmployeesSlice"
import { employeesSelector } from "reduxFolder/selectors"
//styles
import { Container } from "./styles"
//types
import { RootStateType, AppDispatch } from "types/index"
//impages
import spiner from "assets/icons/spinner.svg"

const EmployeesTable = () => {
    const employees = useSelector(employeesSelector)
    const employeesLoadingStatus = useSelector((state: RootStateType) => state.Employees.fetchEmployeesLoadingStatus)
    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        if (!employees.length) dispatch(fetchEmployees())
        // eslint-disable-next-line
    }, [])
    const error = employeesLoadingStatus === 'error' ? <ErrorMessage /> : null
    const loading = employeesLoadingStatus === 'loading' ? <img className="spiner" src={spiner} alt="" /> : null
    const content = employeesLoadingStatus === 'idle' ? employees.map(({ id, name, phone, email, jobType, role, wage, image }) =>
        <EmployeeCard image={image} id={id} name={name} key={id} phone={phone} jobType={jobType} role={role} wage={wage} email={email} />) : null

    return (
        <Container>
            {error}
            {loading}
            {content}
        </Container>
    )
}

export default EmployeesTable