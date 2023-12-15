//libs
import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from "react" //utils
import { Link, useLocation, useNavigate } from "react-router-dom"
//components
import ImageViewer from "components/ImageViewer/ImageViewer"
//utils
import { filterBySearchTerm } from "utils/filterBySearchTerm"
//redux
import { fetchProjects } from "reduxFolder/slices/ProjectsSlice"
import { setZoomForMainScreen } from "reduxFolder/slices/PagesStateSlice"
//types
import { RootStateType, AppDispatch } from "types/index"
//styles
import { Container } from "./styles"
import logo from "assets/icons/logo.svg"
import dropdown from "assets/icons/dropdown.svg"
//images
import { ReactComponent as OpenChatSvg } from 'assets/icons/openChat.svg'
import { setIsIboxChatOpen } from "reduxFolder/slices/Inbox.slice";

const Header = () => {
  const navigate = useNavigate()
  const [isSearch, setIsSearch] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [imageHover, setImageHover] = useState(false)
  const projects = useSelector((state: RootStateType) => state.Projects.projects)
  const user = useSelector((state: RootStateType) => state.Login.user)
  const isChatOpen = useSelector((state: RootStateType) => state.InboxChats.isChatOpen);
  const dispatch = useDispatch<AppDispatch>()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const zoom = useSelector((state: RootStateType) => state.PagesStateSlice.zoomForMainScreen)
  const location = useLocation();
  useEffect(() => {
    if (!projects.length) {
      dispatch(fetchProjects())
    }
    // eslint-disable-next-line
  }, [])

  const onBlur = () => {
    setTimeout(() => setIsSearch(false), 100)
  }

  const highlightMatches = (text: string, term: string) => {
    const regex = new RegExp(`(${term})`, "gi")
    return text.split(regex).map((part, index) => {
      if (part.toLowerCase() === term.toLowerCase()) {
        return (
          <span className="highlight" key={index}>
            {part}
          </span>
        )
      }
      return part
    })
  }

  const onLogout = () => {
    localStorage.clear()
    navigate("/login")
    window.location.reload()
  }



  return (
    <Container>
      <div className="logo-block">
        <img src={logo} alt="logo" />
        <div className="logo-text">
          <p>Ökumenische</p>
          <p>Energiegenossenschaft</p>
        </div>
      </div>
      <div className="searchContainer">
        <input
          onBlur={onBlur}
          onFocus={() => setIsSearch(true)}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search"
          type="text"
          placeholder="Suchen Sie ein Projekt"
        />
        {isSearch && (
          <div className="searchResults">
            {filterBySearchTerm(projects, { name: searchTerm }).map((project) => {
              return (
                <Link
                  onClick={() => setIsSearch(false)}
                  to={`project/${project.id}`}
                  key={project.id}
                  className="resultItem"
                >
                  {highlightMatches(project.name, searchTerm)}
                </Link>
              )
            })}
          </div>
        )}
      </div>
      <div
        className="openChat"
        style={/\/project\/\d+/.test(location.pathname) ? { cursor: "not-allowed" } : {}}
        onClick={() => {
          if (!/\/project\/\d+/.test(location.pathname)) {
            dispatch(setIsIboxChatOpen(true))
          }
        }}>
        {!isChatOpen && <OpenChatSvg />}
      </div>
      <div className="scalePicker">
        <svg onClick={() => { if (zoom > 70) dispatch(setZoomForMainScreen(zoom - 10)) }} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="0.5" y="0.5" width="15" height="15" rx="2.5" fill="white" />
          <path d="M3.33325 8H12.6666" stroke="#6A994E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="0.5" y="0.5" width="15" height="15" rx="2.5" stroke="#E9E9E9" />
        </svg>
        {zoom + "%"}
        <svg onClick={() => { if (zoom < 120) dispatch(setZoomForMainScreen(zoom + 10)) }} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="0.5" y="0.5" width="15" height="15" rx="2.5" fill="white" />
          <path d="M8 3.33337V12.6667" stroke="#6A994E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M3.33325 8H12.6666" stroke="#6A994E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="0.5" y="0.5" width="15" height="15" rx="2.5" stroke="#E9E9E9" />
        </svg>
      </div>
      <div className="userContainer">
        <div className="user">
          <div
            className="imageWrapper"
            onMouseLeave={() => setImageHover(false)}
            onMouseEnter={() => setImageHover(true)}>
            <img

              className="urerImg"
              src={
                user && user.image
                  ? user.image
                  : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
              }
              alt="user"
            />
            {imageHover &&
              <ImageViewer
                hideElement={() => setImageHover(false)}
                image={user && user.image
                  ? user.image
                  : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"} />}
          </div>
          <div className="user-info">
            <p className="user-name">{user ? user.name : "Error"}</p>
            <p className="user-position">{user ? user.role : "Error"}</p>
          </div>
          <img
            onClick={() => setIsDropdownOpen((prev) => !prev)}
            className="userDropdownbtn"
            style={isDropdownOpen ? { transform: "rotate(180deg)" } : {}}
            src={dropdown}
            alt=""
          />
        </div>
        {isDropdownOpen && (
          <div className="dropdown">
            <div className="dropdownOption" onClick={onLogout}>
              Abmelden
            </div>
          </div>
        )}
      </div>
    </Container>
  )
}

export default Header
