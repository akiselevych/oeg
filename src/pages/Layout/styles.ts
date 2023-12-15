import { styled } from "styled-components";

export const Main = styled.main<{ $zoomForMainScreen: number }>`
    display: flex;
    min-height: calc(100vh - 76px);
    background-color: "#F5F5F5";
    min-width: 100%;
    overflow: auto;
    position: relative;
    .OutletWrapper {
        flex: 1 1 auto;
        zoom: ${({ $zoomForMainScreen }) => $zoomForMainScreen}%; /* Для IE */
        -ms-zoom: ${({ $zoomForMainScreen }) =>
            $zoomForMainScreen}%; /* Для IE */
        -webkit-zoom: ${({ $zoomForMainScreen }) =>
            $zoomForMainScreen}%; /* Для WebKit-браузеров */
        transform: scale(1);
        transform-origin: left top;
    }

    /* Вложенные элементы, которые не должны масштабироваться */
    .OutletWrapper > * {
        transform: scale(
            ${({ $zoomForMainScreen }) => $zoomForMainScreen / 100}
        );
        -moz-transform: scale(
            ${({ $zoomForMainScreen }) => ($zoomForMainScreen - 20) / 100}
        );
        transform-origin: left top;
    }
`;
