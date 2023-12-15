import { styled } from "styled-components";

export const Container = styled.div`
    padding: 52px 56px;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 16px;
    .tableWrapper {
        display: flex;
        flex-direction: column;
        gap: 16px;
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
