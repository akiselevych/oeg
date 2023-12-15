import { Container, ModalWindow } from "./styles"
import scale from "../../assets/icons/scale.svg"
import { useState, useEffect } from "react"
import ReactDOM from "react-dom"
import { FC } from "react"

const ImageViewer: FC<{ image: string, hideElement: () => void }> = ({ image, hideElement }) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflowY = 'hidden'
    } else {
      document.body.style.overflowY = 'unset'

    }
  }, [isModalOpen])

  useEffect(() => {
    return () => {
      document.body.style.overflowY = 'unset'
    }
  }, [])
  return (
    <>
      <Container onClick={() => {
        setIsModalOpen(prev => !prev)
      }}>
        <img src={scale} alt="view" />
      </Container>
      {isModalOpen &&
        <Portal>
          <ModalWindow onClick={() => {
            setIsModalOpen(false)
            hideElement()
          }}>
            <img className="modalImage" src={image} alt="" />
          </ModalWindow>
        </Portal>}
    </>
  )
}

interface PortalProps {
  children: React.ReactNode;
}

const Portal: React.FC<PortalProps> = ({ children }) => {
  const node = document.createElement("div");
  document.body.appendChild(node);

  return ReactDOM.createPortal(children, node);
};
export default ImageViewer