//libs
import { useDispatch, useSelector } from "react-redux"
import { useState } from "react"
//comonents
import ImageViewer from "components/ImageViewer/ImageViewer"
//redux
import { setDashboardIsCreateInvoiceOpen } from "reduxFolder/slices/PagesStateSlice"
//types
import { AppDispatch, RootStateType } from "types/index"
//styles
import { Container, TextBlock, H2, P, TextContainer, Button } from "./styles"

const WelcomeUserBanner = () => {
  const dispatch = useDispatch<AppDispatch>()
  const user = useSelector((state: RootStateType) => state.Login.user)
  const [imageHover, setImageHover] = useState(false)
  return (
    <Container>
      <TextContainer>
        <div onMouseLeave={() => setImageHover(false)} onMouseEnter={() => setImageHover(true)} className="imageBlock">
          {imageHover && <ImageViewer hideElement={() => setImageHover(false)} image={user && user.image ? user.image : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"} />}
          <img alt="user" className="userImg" src={user && user.image ? user.image : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"} />
        </div>
        <TextBlock>
          {user ? <H2>Hallo, {user.name}!</H2> : <H2> Fehler</H2>}
          <P>Hier können Sie die Fortschritte des Teams verfolgen.</P>
        </TextBlock>
      </TextContainer>
      <Button onClick={() => dispatch(setDashboardIsCreateInvoiceOpen(true))}>Rechnung erstellen</Button>
    </Container>
  )
}

export default WelcomeUserBanner