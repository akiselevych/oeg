import { styled } from "styled-components";

export const Container = styled.div`
    padding: 64px 64px 0px 48px;
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 20px;
    width: 100%;
    .btnGroup {
        display: flex;
        justify-content: flex-end;
    }
    .SupplierstTableSwitcher {
        display: flex;
        width: 100%;
        border-radius: 12px;
        border: 1px solid #6a994e;
        .item {
            flex: 1 0 auto;
            padding: 10px;
            border-radius: 12px;
            color: #0d0d0d;
            font-size: 14px;
            font-style: normal;
            font-weight: 500;
            line-height: normal;
            background-color: #fff;
            text-align: center;
        }
        .active {
            background-color: #6a994e;
            color: #fff;
        }
    }
`;
