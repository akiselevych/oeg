//types
import { ModalWindowProps } from "types/index"
//libs
import { FC, MouseEvent } from "react"
//styles
import { Overlay, Wrapper, Header, Body } from "./styles"


const CentralModalWindow: FC<ModalWindowProps> = ({ isOpen, closeModal, title, children, height }) => {
    const handleOverlayClick = (event: MouseEvent<HTMLDivElement>) => {
        if (event.target === event.currentTarget) {
            if (closeModal) {
                closeModal();
            }
        }
    };

    return (
        <Overlay onClick={handleOverlayClick}>
            <Wrapper $height={height}>
                <Header >
                    {title}
                    <div className="container" onClick={() => closeModal ? closeModal() : null}>
                        <div className="cross-icon"></div>
                    </div>
                </Header>
                <Body style={{ display: isOpen ? "block" : "none" }}>
                    {children}
                </Body>
            </Wrapper>
        </Overlay>
    )
}

export default CentralModalWindow