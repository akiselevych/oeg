//libs
import { Outlet } from "react-router-dom";
import { Main } from "./styles";
import { useSelector } from "react-redux";
import { RootStateType } from "types/index";
//components
import Header from "components/Header/Header";
import Sidebar from "components/Sidebar/Sidebar";
import Inbox from "components/Inbox/Inbox";



const Layout: React.FC = () => {
    const zoom = useSelector((state: RootStateType) => state.PagesStateSlice.zoomForMainScreen)
    return (
        <>
            <Header />
            <Main $zoomForMainScreen={zoom} >
                <Sidebar />
                <div className="OutletWrapper" id="main">
                    <Outlet />
                </div>
                <Inbox />
            </Main >
        </>
    );
};

export default Layout;