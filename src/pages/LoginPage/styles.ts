import { styled } from "styled-components";

export const Container = styled.div`
    background-color: rgba(255, 255, 255, 1);
    display: flex;
    height: 100vh;
    overflow: hidden;
`;

export const LogoWrapper = styled.div`
    display: flex;
    align-items: center;
`;

export const LoginFormWrapper = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

export const LogoText = styled.div`
    color: rgba(106, 153, 78, 1);

    font-size: 14px;
    font-weight: 500;
    line-height: 17px;

    .bold {
        font-size: 14px;
        font-weight: 700;
        line-height: 17px;
    }
`;

export const RightSide = styled.div`
    width: 50%;
    background: rgba(106, 153, 78, 1);
    position: relative;

    .laptop {
        position: absolute;
        top: 54%;
        right: -44%;
        transform: translateY(-50%);
        z-index: 999;

        width: 58vw;
        height: 524px;
    }

    .sun {
        position: absolute;
        right: 0;
    }

    .lines {
        position: absolute;
        bottom: 2%;
        left: -5%;
    }
`;

export const LeftSide = styled.div`
    width: 50%;
    padding-top: 35px;
    padding-left: 35px;

    position: relative;
`;
