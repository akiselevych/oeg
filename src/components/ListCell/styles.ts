import { styled } from "styled-components";

export const Container = styled.div<{
    $width: number;
    $name: string | number | undefined | boolean;
}>`
    width: ${({ $width }) => $width}px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    padding: 10px 16px;
    justify-content: center;
    gap: 4px;
    white-space: nowrap;
    position: relative;
    overflow: visible;
    .btn {
        padding: 4px 16px;
        border-radius: 16px;
        border: 1px solid #6a994e;
        color: #6a994e;
        width: max-content;
    }
    .multiCell {
        display: flex;
        gap: 4px;
        width: 100%;
        overflow-y: visible;
    }
    .title {
        /* width: ${({ $width }) => $width - 20}px; */
        width: ${({ $name }) =>
            $name === "In Arbeit" ||
            $name === "Abgeschlossen" ||
            $name === "Geplant"
                ? "max-content"
                : "auto"};
        display: flex;
        align-items: center;
        gap: 4px;
        padding: ${({ $name }) =>
            $name === "In Arbeit" ||
            $name === "Abgeschlossen" ||
            $name === "Geplant"
                ? "4px 8px"
                : "0px"};
        background-color: ${({ $name }) => {
            switch ($name) {
                case "In Arbeit":
                    return "#E0FBCA";
                case "Abgeschlossen":
                    return "#FFFDCB";
                case "Geplant":
                    return "#CAF2FB";
                default:
                    return "$000";
            }
        }};
        border-radius: ${({ $name }) =>
            $name === "In Arbeit" ||
            $name === "Abgeschlossen" ||
            $name === "Geplant"
                ? "16px"
                : "0px"};
        overflow: hidden;
        &:hover {
            overflow: auto;
        }
    }
    .title::-webkit-scrollbar {
        width: 5px;
        height: 5px;
        border-radius: 5px;
    }

    .title::-webkit-scrollbar-track {
        background: #f1f1f1;
        border-radius: 2px;
    }

    .title {
        scrollbar-width: thin;
        scrollbar-color: #6a994e rgba(1, 1, 1, 0);
    }
    .edit {
        padding: 4px 16px;
        border-radius: 16px;
        border: 1px solid #6a994e;
        color: #6a994e;
        width: max-content;
        cursor: pointer;
    }
    .add {
        border-radius: 16px;
        border: 1px solid #6a994e;
        background: #6a994e;
        color: #fff;
        width: max-content;
        margin: 0 auto;
        padding: 4px 16px;
        font-size: 12px;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
        cursor: pointer;
    }
    .zero {
        color: #8a8a8a;
    }
    input {
        border: none;
        background: rgba(0, 0, 0, 0);
    }
    .listImage {
        width: 21px;
        height: 21px;
        border-radius: 50%;
        object-fit: cover;
    }
    .disabled {
        background-color: #e9e9e9;
        color: #acacac;
        pointer-events: none;
        border: none;
    }
    .fileUploader {
        display: none;
    }
`;

export const PDFloader = styled.label<{ $disabled?: boolean }>`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 4px;
    padding: 4px 16px;
    border-radius: 16px;
    border: 1px solid #6a994e;
    width: max-content;
    background-color: ${({ $disabled }) => ($disabled ? "#E9E9E9" : "none")};
    color: ${({ $disabled }) => ($disabled ? "#ACACAC" : "#6A994E")};
    font-size: 12px;
    font-weight: 500;
    cursor: pointer;
    pointer-events: ${({ $disabled }) => ($disabled ? "none" : "auto")};
    input[type="file"] {
        display: none;
    }
`;
