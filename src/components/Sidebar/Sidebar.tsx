//libs
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
//types
import { RootStateType } from "types/index";
//styles
import { Container, MenuItem } from "./styles"





const Sidebar = () => {
    const { pathname } = useLocation()
    const currentProject = useSelector((state: RootStateType) => state.Projects.currentProject)?.id

    return (
        <Container>
            {menuItems(pathname, currentProject).map((item, i) => {
                const isActive = item.to === '/' ? pathname === item.to : item.to.includes('project') ? pathname.includes('project') : pathname === item.to
                return (
                    <Link
                        key={i}
                        to={item.to} className='menu-item'
                    >
                        <MenuItem $isActive={isActive}>
                            {item.icon}
                            <p className='menu-item-name'>{item.name}</p></MenuItem>
                    </Link>
                )
            })}
        </Container>
    )
}

function menuItems(pathname: string, currentProject: undefined | string) {
    return [
        {
            name: 'Dashboard', to: '/',
            icon: <svg width="20" height="20" viewBox="0 0 20 20" fill={pathname !== "/" ? "#fff" : "#6a994e"} xmlns="http://www.w3.org/2000/svg">
                <path d="M8.33333 2.5H2.5V10H8.33333V2.5Z" stroke={pathname === "/" ? "#fff" : "#6a994e"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M17.4998 2.5H11.6665V6.66667H17.4998V2.5Z" stroke={pathname === "/" ? "#fff" : "#6a994e"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M17.4998 10H11.6665V17.5H17.4998V10Z" stroke={pathname === "/" ? "#fff" : "#6a994e"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M8.33333 13.3333H2.5V17.4999H8.33333V13.3333Z" stroke={pathname === "/" ? "#fff" : "#6a994e"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
        },
        {
            name: 'Kunden', to: '/clients',
            icon: <svg width="20" height="20" viewBox="0 0 20 20" fill={pathname !== "/clients" ? "#fff" : "#6a994e"} xmlns="http://www.w3.org/2000/svg">
                <g id="Icon/Feather Icon">
                    <path id="Vector" d="M14.1668 17.5V15.8333C14.1668 14.9493 13.8156 14.1014 13.1905 13.4763C12.5654 12.8512 11.7176 12.5 10.8335 12.5H4.16683C3.28277 12.5 2.43493 12.8512 1.80981 13.4763C1.18469 14.1014 0.833496 14.9493 0.833496 15.8333V17.5" stroke={pathname === "/clients" ? "#fff" : "#6a994e"} strokeLinecap="round" strokeLinejoin="round" />
                    <path id="Vector_2" d="M7.49984 9.16667C9.34079 9.16667 10.8332 7.67428 10.8332 5.83333C10.8332 3.99238 9.34079 2.5 7.49984 2.5C5.65889 2.5 4.1665 3.99238 4.1665 5.83333C4.1665 7.67428 5.65889 9.16667 7.49984 9.16667Z" stroke={pathname === "/clients" ? "#fff" : "#6a994e"} strokeLinecap="round" strokeLinejoin="round" />
                    <path id="Vector_3" d="M19.1665 17.5001V15.8334C19.166 15.0948 18.9201 14.3774 18.4676 13.7937C18.0152 13.2099 17.3816 12.793 16.6665 12.6084" stroke={pathname === "/clients" ? "#fff" : "#6a994e"} strokeLinecap="round" strokeLinejoin="round" />
                    <path id="Vector_4" d="M13.3335 2.6084C14.0505 2.79198 14.686 3.20898 15.1399 3.79366C15.5937 4.37833 15.84 5.09742 15.84 5.83757C15.84 6.57771 15.5937 7.2968 15.1399 7.88147C14.686 8.46615 14.0505 8.88315 13.3335 9.06673" stroke={pathname === "/clients" ? "#fff" : "#6a994e"} strokeLinecap="round" strokeLinejoin="round" />
                </g>
            </svg>
        },
        {
            name: 'Projekte', to: pathname.includes('/project/') ? '/projects' : currentProject && pathname !== '/projects' ? `/project/${currentProject}` : '/projects',
            icon: <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <g id="Icon/Feather Icon">
                    <path id="Vector" d="M16.6665 5.83325H3.33317C2.4127 5.83325 1.6665 6.57944 1.6665 7.49992V15.8333C1.6665 16.7537 2.4127 17.4999 3.33317 17.4999H16.6665C17.587 17.4999 18.3332 16.7537 18.3332 15.8333V7.49992C18.3332 6.57944 17.587 5.83325 16.6665 5.83325Z" stroke={pathname.includes("project") ? "#fff" : "#6a994e"} strokeLinecap="round" strokeLinejoin="round" fill="none" />
                    <path id="Vector_2" d="M13.3332 17.5V4.16667C13.3332 3.72464 13.1576 3.30072 12.845 2.98816C12.5325 2.67559 12.1085 2.5 11.6665 2.5H8.33317C7.89114 2.5 7.46722 2.67559 7.15466 2.98816C6.8421 3.30072 6.6665 3.72464 6.6665 4.16667V17.5" stroke={pathname.includes("project") ? "#fff" : "#6a994e"} strokeLinecap="round" strokeLinejoin="round" fill="none" />
                </g>
            </svg>,
        },
        {
            name: 'Kalender', to: '/calendar',
            icon: <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path stroke={pathname === "/calendar" ? "#fff" : "#6a994e"} d="M15.8333 3.33331H4.16667C3.24619 3.33331 2.5 4.07951 2.5 4.99998V16.6666C2.5 17.5871 3.24619 18.3333 4.16667 18.3333H15.8333C16.7538 18.3333 17.5 17.5871 17.5 16.6666V4.99998C17.5 4.07951 16.7538 3.33331 15.8333 3.33331Z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path stroke={pathname === "/calendar" ? "#fff" : "#6a994e"} d="M13.3333 1.66669V5.00002" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path stroke={pathname === "/calendar" ? "#fff" : "#6a994e"} d="M6.66675 1.66669V5.00002" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <path stroke={pathname === "/calendar" ? "#fff" : "#6a994e"} d="M2.5 8.33334H10H17.5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </svg>
        },
        {
            name: 'Mitarbeiter', to: '/employees',
            icon: <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <g id="Icon/Lucide Icon">
                    <path id="Vector" d="M17 18C17 17.4696 16.7893 16.9609 16.4142 16.5858C16.0391 16.2107 15.5304 16 15 16H9C8.46957 16 7.96086 16.2107 7.58579 16.5858C7.21071 16.9609 7 17.4696 7 18" stroke={pathname === "/employees" ? "#fff" : "#6a994e"} strokeLinecap="round" strokeLinejoin="round" fill="none" />
                    <path id="Vector_2" d="M19 4H5C3.89543 4 3 4.89543 3 6V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V6C21 4.89543 20.1046 4 19 4Z" stroke={pathname === "/employees" ? "#fff" : "#6a994e"} strokeLinecap="round" strokeLinejoin="round" fill="none" />
                    <path id="Vector_3" d="M12 12C13.1046 12 14 11.1046 14 10C14 8.89543 13.1046 8 12 8C10.8954 8 10 8.89543 10 10C10 11.1046 10.8954 12 12 12Z" stroke={pathname === "/employees" ? "#fff" : "#6a994e"} strokeLinecap="round" strokeLinejoin="round" fill="none" />
                    <path id="Vector_4" d="M8 2V4" stroke={pathname === "/employees" ? "#fff" : "#6a994e"} strokeLinecap="round" strokeLinejoin="round" fill="none" />
                    <path id="Vector_5" d="M16 2V4" stroke={pathname === "/employees" ? "#fff" : "#6a994e"} strokeLinecap="round" strokeLinejoin="round" fill="none" />
                </g>
            </svg>

        },
        {
            name: 'Lieferant', to: '/suppliers',
            icon: <svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <g id="Icon/Feather Icon">
                    <path id="Vector" d="M16.5 9.39996L7.5 4.20996" stroke={pathname === "/suppliers" ? "#fff" : "#6a994e"} strokeLinecap="round" strokeLinejoin="round" fill="none" />
                    <path id="Vector_2" d="M21 15.9999V7.9999C20.9996 7.64918 20.9071 7.30471 20.7315 7.00106C20.556 6.69742 20.3037 6.44526 20 6.2699L13 2.2699C12.696 2.09437 12.3511 2.00195 12 2.00195C11.6489 2.00195 11.304 2.09437 11 2.2699L4 6.2699C3.69626 6.44526 3.44398 6.69742 3.26846 7.00106C3.09294 7.30471 3.00036 7.64918 3 7.9999V15.9999C3.00036 16.3506 3.09294 16.6951 3.26846 16.9987C3.44398 17.3024 3.69626 17.5545 4 17.7299L11 21.7299C11.304 21.9054 11.6489 21.9979 12 21.9979C12.3511 21.9979 12.696 21.9054 13 21.7299L20 17.7299C20.3037 17.5545 20.556 17.3024 20.7315 16.9987C20.9071 16.6951 20.9996 16.3506 21 15.9999Z" stroke={pathname === "/suppliers" ? "#fff" : "#6a994e"} strokeLinecap="round" strokeLinejoin="round" fill="none" />
                    <path id="Vector_3" d="M3.27002 6.95996L12 12.01L20.73 6.95996" stroke={pathname === "/suppliers" ? "#fff" : "#6a994e"} strokeLinecap="round" strokeLinejoin="round" fill="none" />
                    <path id="Vector_4" d="M12 22.08V12" stroke={pathname === "/suppliers" ? "#fff" : "#6a994e"} strokeLinecap="round" strokeLinejoin="round" fill="none" />
                </g>
            </svg>


        },
        {
            name: 'Inventar', to: '/inventory',
            icon: <svg width="24" height="24" viewBox="0 0 24 24" fill={pathname !== "/inventory" ? "#fff" : "#6a994e"} xmlns="http://www.w3.org/2000/svg">
                <g id="Icon/Lucide Icon">
                    <path id="Vector" d="M14.9998 12L6.4998 20.5C5.6698 21.33 4.3298 21.33 3.4998 20.5C3.30266 20.3031 3.14626 20.0693 3.03956 19.8119C2.93285 19.5545 2.87793 19.2786 2.87793 19C2.87793 18.7214 2.93285 18.4455 3.03956 18.1881C3.14626 17.9307 3.30266 17.6969 3.4998 17.5L11.9998 9" stroke={pathname === "/inventory" ? "#fff" : "#6a994e"} strokeLinecap="round" strokeLinejoin="round" />
                    <path id="Vector_2" d="M17.6401 14.9999L22.0001 10.6399" stroke={pathname === "/inventory" ? "#fff" : "#6a994e"} strokeLinecap="round" strokeLinejoin="round" />
                    <path id="Vector_3" d="M20.91 11.7L19.66 10.45C19.06 9.84996 18.73 9.04996 18.73 8.19996V7.33996L16.01 4.59996C15.4936 4.08058 14.8798 3.66832 14.2036 3.38688C13.5275 3.10544 12.8024 2.96036 12.07 2.95996H9L9.92 3.77996C10.5735 4.35935 11.0967 5.07066 11.4552 5.867C11.8137 6.66335 11.9994 7.52663 12 8.39996V9.95996L14 11.96H16.47L18.73 13.87" stroke={pathname === "/inventory" ? "#fff" : "#6a994e"} strokeLinecap="round" strokeLinejoin="round" />
                </g>
            </svg>
        },
        {
            name: 'Buchhaltung', to: '/accounting',
            icon: <svg width="24" height="24" viewBox="0 0 24 24" fill={pathname !== "/accounting" ? "#fff" : "#6a994e"} xmlns="http://www.w3.org/2000/svg">
                <g id="Icon/Lucide Icon">
                    <path id="Vector" d="M18 2H6C4.89543 2 4 2.89543 4 4V20C4 21.1046 4.89543 22 6 22H18C19.1046 22 20 21.1046 20 20V4C20 2.89543 19.1046 2 18 2Z" stroke={pathname === "/accounting" ? "#fff" : "#6a994e"} strokeLinecap="round" strokeLinejoin="round" />
                    <path id="Vector_2" d="M8 6H16" stroke={pathname === "/accounting" ? "#fff" : "#6a994e"} strokeLinecap="round" strokeLinejoin="round" />
                    <path id="Vector_3" d="M16 14V18" stroke={pathname === "/accounting" ? "#fff" : "#6a994e"} strokeLinecap="round" strokeLinejoin="round" />
                    <path id="Vector_4" d="M16 10H16.01" stroke={pathname === "/accounting" ? "#fff" : "#6a994e"} strokeLinecap="round" strokeLinejoin="round" />
                    <path id="Vector_5" d="M12 10H12.01" stroke={pathname === "/accounting" ? "#fff" : "#6a994e"} strokeLinecap="round" strokeLinejoin="round" />
                    <path id="Vector_6" d="M8 10H8.01" stroke={pathname === "/accounting" ? "#fff" : "#6a994e"} strokeLinecap="round" strokeLinejoin="round" />
                    <path id="Vector_7" d="M12 14H12.01" stroke={pathname === "/accounting" ? "#fff" : "#6a994e"} strokeLinecap="round" strokeLinejoin="round" />
                    <path id="Vector_8" d="M8 14H8.01" stroke={pathname === "/accounting" ? "#fff" : "#6a994e"} strokeLinecap="round" strokeLinejoin="round" />
                    <path id="Vector_9" d="M12 18H12.01" stroke={pathname === "/accounting" ? "#fff" : "#6a994e"} strokeLinecap="round" strokeLinejoin="round" />
                    <path id="Vector_10" d="M8 18H8.01" stroke={pathname === "/accounting" ? "#fff" : "#6a994e"} strokeLinecap="round" strokeLinejoin="round" />
                </g>
            </svg>

        },
        {
            name: 'Statistik',
            to: '/statistics',
            icon: (
                <svg width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" fill={pathname !== "/statistics" ? "#fff" : "#6a994e"}>
                    <path
                        d="M19.1668 5L11.2502 12.9167L7.0835 8.75L0.833496 15"
                        stroke={pathname === "/statistics" ? "#fff" : "#6a994e"}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <path
                        d="M14.1665 5H19.1665V10"
                        stroke={pathname === "/statistics" ? "#fff" : "#6a994e"}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            )
        },
        {
            name: 'Rechnungen',
            to: '/invoices',
            icon: (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.0833 1.66663H5C4.55798 1.66663 4.13405 1.84222 3.82149 2.15478C3.50893 2.46734 3.33334 2.89127 3.33334 3.33329V16.6666C3.33334 17.1087 3.50893 17.5326 3.82149 17.8451C4.13405 18.1577 4.55798 18.3333 5 18.3333H15C15.442 18.3333 15.866 18.1577 16.1785 17.8451C16.4911 17.5326 16.6667 17.1087 16.6667 16.6666V6.24996L12.0833 1.66663Z" stroke={pathname === "/invoices" ? "#fff" : "#6a994e"} strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M11.6667 1.66663V6.66663H16.6667" stroke={pathname === "/invoices" ? "#fff" : "#6a994e"} strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M13.3333 10.8334H6.66666" stroke={pathname === "/invoices" ? "#fff" : "#6a994e"} strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M13.3333 14.1666H6.66666" stroke={pathname === "/invoices" ? "#fff" : "#6a994e"} strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M8.33333 7.5H6.66666" stroke={pathname === "/invoices" ? "#fff" : "#6a994e"} strokeLinecap="round" strokeLinejoin="round" />
                </svg>

            )
        }

    ]
}

export default Sidebar