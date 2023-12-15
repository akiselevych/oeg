import { styled } from "styled-components"
export const Container = styled.div`
    padding: 32px 0;
    display: flex;
    flex-direction: column;
    gap: 16px;
    width: max-content;
    .stepTitle{
        font-size: 20px;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
    }
    .tablesContainer {
        width: 855px;
        display: flex;
        flex-direction: column;
        gap: 12px;

    }
    .menu {
        width: max-content;
        max-width: 100%;
        overflow: auto;
        background-color: #fff;
        display: flex;
        border-radius: 12px;
        border: 1px solid #E3E3E3;
        border-bottom: none;
        .menuItem{
            cursor: pointer;
            padding: 10px 16px;
            border: 1px solid #E3E3E3;
            display: flex;
            justify-content: center;
            align-items: center;
            white-space: nowrap;
        }
        .active{
            background-color: #E0FBCA;
        }
    }
    .paidContainer{
        display: flex;
        gap: 16px;
        input{
            width: 342px;
        }
    }
    .position{
        width: 342px;
        padding: 10px 16px;
        border-radius: 12px;
        border: 1px solid rgba(106, 153, 78, 0.39);
        background: #FFF;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: normal;
    }
    .switcher{
        display: flex;
        justify-content: space-between;
        width: 100%;
        align-items: center;
        border-bottom: 1px solid #C2C2C2;
        padding: 8px;
        .title{
            font-size: 16px;
            font-style: normal;
            font-weight: 500;
            line-height: 24px; 
        }
    }
`