import { styled } from "styled-components";

export const Container = styled.div`
    border-radius: 12px;
    background: #fff;
    box-shadow: 0px 4px 20px 0px rgba(104, 107, 184, 0.15);
    padding: 24px 40px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-bottom: 12px;
    width: max-content;
`;
export const H3 = styled.h3`
    color: #000;
    font-size: 20px;
    font-weight: 600;
    line-height: 28px;
`;
export const CardContainer = styled.div`
    display: flex;
    gap: 32px;
`;
export const Card = styled.div<{ $bgColor: string }>`
    width: 196px;
    height: 164px;
    background-color: ${({ $bgColor }) => $bgColor};
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 16px;
`;
export const CardValue = styled.p`
    color: #000;
    font-size: 40px;
    font-weight: 500;
    line-height: 28px;
`;
export const CardName = styled.p`
    color: #000;
    text-align: center;
    font-size: 24px;
    font-weight: 400;
    line-height: 28px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;
