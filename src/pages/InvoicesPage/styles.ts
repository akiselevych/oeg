import { styled } from "styled-components";

export const Container = styled.div`
    padding: 72px 96px 0px 96px;
    width: max-content;
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 24px;
    .btnGroup {
        display: flex;
        justify-content: flex-end;
    }
    .createProject {
        padding: 10px 16px;
        background-color: #6a994e;
        color: #fff;
        font-size: 14px;
        font-weight: 500;
        border-radius: 10px;
        height: max-content;
    }
`;
