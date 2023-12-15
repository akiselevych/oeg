import { styled } from "styled-components";

export const Container = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;
    width: 98%;
    .imageBlock {
        width: 58px;
        height: 58px;
        border-radius: 50%;
        position: relative;
    }
    .userImg {
        width: 58px;
        height: 58px;
        border-radius: 50%;
        object-fit: cover;
    }
`;
export const TextContainer = styled.div`
    display: flex;
    gap: 20px;
    align-items: center;
`;
export const Button = styled.div`
    padding: 10px 16px;
    border-radius: 10px;
    background: #6a994e;
    color: #fff;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
`;
export const TextBlock = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
`;

export const H2 = styled.h2`
    color: #101010;
    font-size: 24px;
    font-weight: 600;
`;

export const P = styled.p`
    color: #595959;
    font-size: 14px;
    font-weight: 500;
`;
