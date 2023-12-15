import { styled } from "styled-components";

export const Container = styled.div`
    display: flex;
    align-items: center;
    gap: 2px;
    input {
        width: 60px;
    }
    .submit {
        display: none;
        padding: 2px 4px;
        color: #fff;
        background-color: #6a994e;
        border-radius: 4px;
        cursor: pointer;
    }
    &:hover .submit {
        display: block;
    }
`;