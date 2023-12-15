import { styled } from "styled-components";

export const Container = styled.div`
    padding: 24px 32px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    background-color: white;
    border-radius: 12px;
    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .cardBlock {
        display: flex;
        justify-content: center;
        gap: 16px;
        position: relative;
    }
    .title {
        font-size: 24px;
        font-weight: 600;
    }
    .body {
        border-radius: 12px;
        border: 1px solid #dedede;
        padding: 10px;
        display: flex;
        align-items: center;
        gap: 4px;
    }
    .dataBlock {
        width: 100%;
        display: flex;
        align-items: space-between;
        justify-content: space-between;
        gap: 16px;
    }
    .datePicker {
        padding: 10px 24px;
        border-radius: 12px;
        border: 1px solid #dedede;
        background: #fff;
        font-size: 14px;
        font-style: normal;
        font-weight: 400;
        line-height: 20px;
    }
`;

export const Card = styled.div<{
    $color: string;
    $bgColor: string;
    $arrPosition?: string;
}>`
    width: 332px;
    padding: 20px;
    border-radius: 12px;
    border: 1px solid #d8d8d8;
    background: #fff;
    display: flex;
    flex-direction: column;
    gap: 4px;
    svg {
        transform: ${(props) => props.$arrPosition || "none"};
    }
    .title {
        color: #084d9f;
        font-size: 16px;
        font-weight: 400;
    }
    .value {
        color: #000;
        font-size: 32px;
        font-weight: 600;
        line-height: 32px;
        white-space: nowrap;
    }
    .percentBlock {
        padding: 6px 8px;
        border-radius: 10px;
        display: flex;
        align-items: center;
        gap: 4px;
        border: 1px solid ${(props) => props.$color};
        background: ${(props) => props.$bgColor};
        .text {
            color: ${(props) => props.$color};
            font-size: 12px;
            font-weight: 500;
            line-height: 16px;
        }
    }
`;
