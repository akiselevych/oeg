import { styled } from "styled-components";

export const Container = styled.div`
    padding: 60px 40px 40px 40px;
    min-width: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 20px;
    overflow: hidden;
    .filtersGroup {
        display: flex;
        gap: 12px;
    }
`;
