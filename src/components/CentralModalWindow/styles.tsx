import { styled } from "styled-components";

export const Overlay = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  z-index: 999;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.40);
  pointer-events: auto;
  display: flex;
  justify-content: center;
    padding-top: 80px;
`
export const Wrapper = styled.div<{ $height: string | number | undefined }>`
  pointer-events: all;
  position: relative;
  z-index: 1000;
  padding: 12px;
  margin: 20px;
  max-width: 1200px;
  height: ${({ $height }) => $height ? $height : '625px'};
  background-color: #fff;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  overflow: auto;
  
  @media(max-width: 1020px){
    max-width: 750px;
  }
  
`
export const Header = styled.div`
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .container {
    width: 27px;
    height: 27px;
    background-color: #6A994E;
    border-radius: 5px;
    position: relative;
    cursor: pointer;
  }
  .cross-icon:before,
  .cross-icon:after {
    content: "";
    display: block;
    width: 1.5px;
    height: 12px;
    background-color: #FFFFFF;
    position: absolute;
    top: 50%;
    left: 50%;
  }
  .cross-icon:before {
    transform: translate(-50%, -50%) rotate(45deg);
  }
  .cross-icon:after {
    transform: translate(-50%, -50%) rotate(-45deg);
  }
`
export const Body = styled.div`
  flex: 1;
`
