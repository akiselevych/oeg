import { styled } from "styled-components";

export const Overlay = styled.div`
    position: absolute;
    top: 0px;
    left: 0px;
    z-index: 9999999;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.40);
    pointer-events: auto;
    display: flex;
    justify-content: flex-end;
    
  
`

export const CloseBtn = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-right: 5px;
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
`;
export const Wrapper = styled.div`
  pointer-events: all;
  position: relative;
  z-index: 1000;
  padding: 18px 0 48px;
  width: 360px;
  height: 100vh;
  background-color: #fff;

`
export const Body = styled.div`
    width: 100%;
    height:100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: auto;
`
