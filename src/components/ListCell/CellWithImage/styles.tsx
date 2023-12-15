import { styled } from "styled-components"



export const Container = styled.div`
position: relative;
     width: auto;
        display: flex;
        align-items: center;
        gap: 4px;
        padding: 0px;
        background-color: #fff;
        border-radius: 0px;
        overflow: hidden;
        &:hover {
            overflow: auto;
        }
     scrollbar-width: thin;
        scrollbar-color: #6a994e rgba(1, 1, 1, 0);
    &::-webkit-scrollbar {
        width: 5px;
        height: 5px;
        border-radius: 5px;
    }

    &::-webkit-scrollbar-track {
        background: #f1f1f1;
        border-radius: 2px;
    }   
    .imgWrapper{
      width: 21px;
      height: 21px;
      position: relative;
    } 
`