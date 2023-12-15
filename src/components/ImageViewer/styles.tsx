import { styled } from "styled-components"
export const Container = styled.div`
   width: 100%;
   height: 100%;
   top: 0;
   left: 0;
   position: absolute;
   border-radius: 50%;
   background: linear-gradient(0deg, rgba(0, 0, 0, 0.60) 0%, rgba(0, 0, 0, 0.60) 100%);
    z-index: 10;
    display: flex;
    justify-content: center;
    align-items: center;
    img{
      max-width: 80%;
      max-height: 80%;
    }
`
export const ModalWindow = styled.div`
   width: 100vw;
   height: 100vh;
   position: fixed;
   top:0;
   left:0;
   bottom: 0;
   right: 0;
   background: linear-gradient(0deg, rgba(0, 0, 0, 0.60) 0%, rgba(0, 0, 0, 0.60) 100%);
    z-index: 100000;
    display: flex;
    justify-content: center;
    align-items: center;
    .modalImage{
      height: 500px;
      width: auto;
      max-width: 80%;
      object-fit: contain;
    }
`


