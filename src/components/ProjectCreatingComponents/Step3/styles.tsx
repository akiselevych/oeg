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
        width: 974px;
        display: flex;
        flex-direction: column;
        gap: 12px;
        .add{
            margin-top: 12px;
        }
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
    .events{
        display: flex;
        flex-direction: column;
        width: 100%;
        gap:12px;
        .tableTitle{
            width: 100%;
            font-size: 20px;
            font-style: normal;
            font-weight: 500;
            line-height: normal;
            border-bottom: 1px solid #C2C2C2;
            padding: 8px;
        }
    }
    .spiner{
        width: 40px;
        height: 40px;
        margin: 0 auto;
    }
`