//libs
import {FC, MouseEvent, useEffect} from "react"
//types
import { ModalWindowProps } from "types/index"
//styles
import { Overlay, Wrapper, Body, CloseBtn } from "./styles"

const RightModalWindow: FC<ModalWindowProps> = ({ isOpen, children, closeModal, ref }) => {

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            window.scrollTo({
                top: 76,
            });
        }
        return () => {
            document.body.style.overflow = 'auto';
        }
    }, [isOpen]);

    const handleOverlayClick = (event: MouseEvent<HTMLDivElement>) => {
        if (event.target === event.currentTarget) {
            if (closeModal) {
                closeModal();
            }
        }
    };
    return (
        <Overlay onClick={handleOverlayClick}>
            <Wrapper ref={ref}>
                <CloseBtn>
                    <div className="container" onClick={() => closeModal ? closeModal() : null}>
                        <div className="cross-icon"></div>
                    </div>
                </CloseBtn>
                <Body style={{ display: isOpen ? "flex" : "none" }}>
                    {children}
                </Body>
            </Wrapper>
        </Overlay>
    )
}

export default RightModalWindow