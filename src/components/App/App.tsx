//libs
import { Route, Routes, useLocation, useNavigate } from "react-router-dom"
//components
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootStateType } from "types"
import { useEffect, useState } from "react"
import { getAuthUser } from "reduxFolder/slices/Login.slice"
import { fetchChats } from "reduxFolder/slices/ProjectsChats.slice"

import Layout from "pages/Layout/Layout"
import DashboardPage from "pages/DashboardPage/DashboardPage"
import ClientsPage from "pages/ClientsPage/ClientsPage"
import ProjectsPage from "pages/ProjectsPage/ProjectsPage"
import SuppliersPage from "pages/SuppliersPage/SuppliersPage"
import EmployeesPage from "pages/EmployeesPage/EmployeesPage"
import InventoryPage from "pages/InventoryPage/InventoryPage"
import StatisticsPage from "pages/StatisticsPage/StatisticsPage"
import AccountingPage from "pages/AccountingPage/AccountingPage"
import CalendarPage from "pages/CalendarPage/CalendarPage"
import OneProjectPage from "pages/OneProjectPage/OneProjectPage"
import InvoicesPage from "pages/InvoicesPage/InvoicesPage"
import ErrorPage from "pages/ErrorPage/ErrorPage"
import LoginPage from "pages/LoginPage/LoginPage"


function App() {
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()
    const location = useLocation()
    const user = useSelector((state: RootStateType) => state.Login.user)

    const [isInitialized, setIsInitialized] = useState(false)


    useEffect(() => {
        if (user) {
            setIsInitialized(true)
            dispatch(fetchChats(user.id))
        } else {
            dispatch(getAuthUser())
            if (!localStorage.getItem("access")) navigate("/login")
        }
        // eslint-disable-next-line
    }, [user])

    if (!isInitialized && location.pathname !== "/login")
        return <div>Something went wrong...</div>

    return (
        <>
            <Routes>
                <Route path="login" element={<LoginPage />} />
                <Route path="/" element={<Layout />}>
                    <Route index element={<DashboardPage />} />
                    <Route path="/clients" element={<ClientsPage />} />
                    <Route path="/projects" element={<ProjectsPage />} />
                    <Route path="/suppliers" element={<SuppliersPage />} />
                    <Route path="/employees" element={<EmployeesPage />} />
                    <Route path="/inventory" element={<InventoryPage />} />
                    <Route path="/statistics" element={<StatisticsPage />} />
                    <Route path="/accounting" element={<AccountingPage />} />
                    <Route path="/calendar" element={<CalendarPage />} />
                    <Route path="/invoices" element={<InvoicesPage />} />
                    <Route path="/project/:id" element={<OneProjectPage />} />
                    <Route path="/project" element={<OneProjectPage />} />
                </Route>
                <Route path="*" element={<ErrorPage />} />
            </Routes>
        </>
    )
}

export default App
