import { styled } from "styled-components"

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
    border-radius: 10px;
    background: rgba(0,0,0,0);
    width: calc(100% + 32px);
    color: #000;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
    position: relative;
    margin: 0 -16px;
   .header{
        border-radius: 10px;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding:0 -16px;
        border: none
   }
   .options{
        display: flex;
        flex-direction: column;
        gap: 4px;
        align-items: center;
        overflow: hidden;
        &:hover{
            overflow: auto;
        }
        border-radius: 10px;
        background: #FFF;
        box-shadow: 0px 2px 4px 0px rgba(74, 74, 74, 0.15);
        position: absolute;
        top:31px;
        z-index: 1000;
        width: 100%;
        max-height: 300px;
   }
   .option{
    padding:2px;
    width: 100%;
    display: flex;
    gap: 4px;
    align-items: center;
   }
   .optionName{
    white-space: nowrap;
    overflow: hidden;
    &:hover {
            overflow: auto;
        }
   }
   .optionName::-webkit-scrollbar {
        width: 5px;
        height: 5px;
        border-radius: 5px;
    }

    .optionName::-webkit-scrollbar-track {
        background: #f1f1f1;
        border-radius: 2px;
    }
    .header::-webkit-scrollbar {
        width: 5px;
        height: 5px;
        border-radius: 5px;
    }

    .header::-webkit-scrollbar-track {
        background: #f1f1f1;
        border-radius: 2px;
    }
`