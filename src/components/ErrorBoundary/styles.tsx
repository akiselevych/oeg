import { styled } from "styled-components"
export const Container = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 22px;
    .textBlock{
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 12px;
        .errorTitle{
            color:  #000;
            text-align: center;
            font-size: 20px;
            font-style: normal;
            font-weight: 700;
            line-height: normal;
        }
        .errorText{
            color: rgba(0, 0, 0, 0.64);
            text-align: center;
            font-size: 14px;
            font-style: normal;
            font-weight: 500;
            line-height: normal;
        }
    }
`


