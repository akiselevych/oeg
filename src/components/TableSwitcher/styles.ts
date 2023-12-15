import { styled } from "styled-components";

export const Container = styled.div<{
    $activeColor: string;
    $activeBGColor: string;
}>`
    display: flex;
    border-radius: 10px;
    border: 1px solid #e3e3e3;
    background: #fff;
    width: max-content;
    .item {
        padding: 10px 16px;
    }
    .active {
        border-radius: 10px;
        border-right: 1px solid #dedede;
        border-left: 1px solid #dedede;
        background: ${({ $activeColor }) => $activeColor};
        color: ${({ $activeBGColor }) => $activeBGColor};
    }
`;
