import { styled } from "styled-components";

export const Container = styled.div`
    min-width: 684px;
    width: 98%;
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 24px;
    border-radius: 12px;
    background: #fff;
    box-shadow: 0px 4px 20px 0px rgba(104, 107, 184, 0.15);
    .header {
        display: flex;
        justify-content: space-between;
        select {
            padding: 10px 16px;
            border-radius: 12px;
            width: 200px;
            border: 1px solid #dedede;
            font-family: Montserrat;
            font-size: 12px;
            font-style: normal;
            font-weight: 400;
            line-height: normal;
        }
    }
    .spiner {
        width: 40px;
        height: 40px;
        margin: 0 auto;
    }
`;
export const H3 = styled.h3`
    color: #000;
    font-size: 20px;
    font-weight: 600;
    line-height: 28px;
`;
