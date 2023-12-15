import { styled } from "styled-components";

export const PreviewWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    height: 100%;
    justify-content: space-between;

    .prdWrapper {
        min-width: 800px;
        height: 380px;
        padding-top: 12px;
        position: relative;

        .rpv-core__inner-page {
            background-color: rgba(222, 221, 221, 1);
        }
        .zoomIcons {
            position: absolute;
            top: 22px;
            right: 25px;

            display: flex;

            background-color: white;
            border: 1px solid rgba(172, 172, 172, 1);
            border-radius: 6px;

            .zoomIn,
            .zoomOut,
            .zoomPopover {
                cursor: pointer;
            }
        }
    }

    .documentWrapper {
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .buttonsWrapper {
        display: flex;
        justify-content: end;
        gap: 16px;
    }
    .spiner {
        width: 40px;
        height: 40px;
        margin: 100px auto;
    }
`;
