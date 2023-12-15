//libs
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
//components
import ErrorBoundary from "components/ErrorBoundary/ErrorBoundary"
import SuppliersMaterialsTable from "components/SuppliersMaterialsTable/SuppliersMaterialsTable"
import SuppliersWorkersTable from "components/SuppliersWorkersTable/SuppliersWorkersTable"
import RightModalWindow from "components/RightModalWindow/RightModalWindow"
import CreateSupplierForm from "components/CreateSupplierForm/CreateSupplierForm"
//types
import { RootStateType } from "types/index"
//styles
import { Container } from "./styles"
import { PageTitle, PrimaryButton } from "styles/global"
import { setEditSupplier } from "reduxFolder/slices/PagesStateSlice";


const SuppliersPage = () => {
    const [activeTable, setActiveTable] = useState<"materials" | "workers">("materials")
    const totalSuppliers = useSelector((state: RootStateType) => state.Suppliers.suppliersMaterials).length + useSelector((state: RootStateType) => state.Suppliers.suppliersWorkers).length
    const [isCreateSuppliersOpen, setIsCreateSuppliersOpen] = useState<boolean>(false)
    const editSupplierId = useSelector((state: RootStateType) => state.PagesStateSlice.editSupplier)
    const dispatch = useDispatch();
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    useEffect(() => {
        if (!!(editSupplierId)) {
            setIsModalOpen(true);
        }
        // eslint-disable-next-line
    }, [!!editSupplierId]);

    return (
        <Container>
            <PageTitle>Lieferanten gefunden {totalSuppliers}</PageTitle>
            <div className="btnGroup">
                <PrimaryButton onClick={() => setIsModalOpen(true)}>Neuen Lieferant hinzufügen</PrimaryButton>
            </div>
            <div className="SupplierstTableSwitcher">
                <div onClick={() => setActiveTable('materials')} className={`item ${activeTable === "materials" ? "active" : ''}`}>Lieferant von Materialien</div>
                <div onClick={() => setActiveTable('workers')} className={`item ${activeTable === "workers" ? "active" : ''}`}>Subunternehmer</div>
            </div>
            <ErrorBoundary>
                {activeTable === 'materials' && <SuppliersMaterialsTable />}
                {activeTable === 'workers' && <SuppliersWorkersTable />}
            </ErrorBoundary>
            {isModalOpen &&
                <RightModalWindow isOpen={isModalOpen} closeModal={() => {
                    setIsModalOpen(false)
                    dispatch(setEditSupplier(null));
                }}>
                    <CreateSupplierForm closeModal={() => setIsModalOpen(false)} />
                </RightModalWindow>}
        </Container>
    )
}

export default SuppliersPage