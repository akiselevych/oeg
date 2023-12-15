import { styled } from "styled-components";

export const Container = styled.div`
    background-color: #fff;
    width: 100%;
    height: calc(100vh -76px);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    .textwrapp {
        margin-top: -20px;
        margin-bottom: 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 12px;
    }
    img {
        width: 537px;
        height: 405px;
    }
    .title {
        font-size: 24px;
        font-weight: 700;
    }
    .descr {
        color: rgba(0, 0, 0, 0.64);
        font-size: 16px;
        font-weight: 500;
    }
`;
