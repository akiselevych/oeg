import { styled } from "styled-components"

export const Container = styled.div<{ $type: "cell" | undefined; $bgColor: string | undefined }>`
    display: flex;
    flex-direction: column;
    gap: 4px;
    border-radius: 10px;
    background: ${({ $bgColor }) => $bgColor ? $bgColor : "rgba(0,0,0,0)"};
    width: ${({ $type }) => $type === 'cell' ? "calc(100% + 32px)" : "180px"};
    color: #000;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: 20px;
    position: relative;
    margin: ${({ $type }) => $type === 'cell' ? "0 -16px" : "opc"};
   .header{
        border-radius: 10px;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding:${({ $type }) => $type === 'cell' ? '0px 16px' : "10px"};
        border: ${({ $type }) => $type === 'cell' ? 'none' : "1px solid #DEDEDE;"};
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
        top:${({ $type }) => $type === 'cell' ? '31px' : "42px"};
        z-index: 100;
        width: 100%;
        max-height: 300px;
   }
   .option{
    padding:${({ $type }) => $type === 'cell' ? '2px' : "8px 16px"};
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