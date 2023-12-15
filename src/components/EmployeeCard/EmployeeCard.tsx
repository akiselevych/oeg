
//libs
import { FC, useState } from "react"
import { useDispatch } from "react-redux"
//redux
import { setEditEmployee } from "reduxFolder/slices/PagesStateSlice"
//types
import { EmployeeCardProps, AppDispatch } from "types/index"
//styles
import { Container } from "./styles"
//components
import ImageViewer from 'components/ImageViewer/ImageViewer'
//icons
import clockIcon from 'assets/icons/clock.svg'
import mailIcon from 'assets/icons/mail.svg'
import euroIcon from 'assets/icons/euro.svg'
import phoneIcon from 'assets/icons/phone.svg'


const EmployeeCard: FC<EmployeeCardProps> = (props) => {
  const dispatch = useDispatch<AppDispatch>()
  const [imageHover, setImageHover] = useState(false)
  const { name, phone, email, jobType, role, wage, image } = props

  return (
    <Container >
      <div className="imageWrapper"
        onMouseLeave={() => setImageHover(false)}
        onMouseEnter={() => setImageHover(true)}>
        <img className="img" src={image} alt={name} />
        {imageHover &&
          <ImageViewer
            hideElement={() => setImageHover(false)}
            image={image} />
        }
      </div>
      <div className="nameWrapper">
        <p className="name">{name}</p>
        <p className="role">{role}</p>
      </div>
      <div className="additionalDataWrapper">
        <div className="additionalDataItem">
          <div className="iconWrapper">
            <img src={clockIcon} alt="clock" />
          </div>
          <p className="jobType">{jobType === "ehrenamtlich" ? "Ehrenamtlich" : "Hauptberuflich"}</p>
        </div>
        <div className="additionalDataItem">
          <div className="iconWrapper">
            <img src={euroIcon} alt="euro" />
          </div>
          <p className="wage">{wage} /h</p>
        </div>
      </div>
      <div className="bottomContainer">
        <div className="phoneWrapper">
          <img src={phoneIcon} alt='phone' />
          <p className="phone">{phone}</p>
        </div>
        <div className="phoneWrapper">
          <img src={mailIcon} alt="mail" />
          <p className="email">{email}</p>
        </div>
      </div>
      <div onClick={() => dispatch(setEditEmployee(props))} className="edit">Bearbeiten</div>
    </Container>
  )
}

export default EmployeeCard