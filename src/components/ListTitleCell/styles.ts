import { styled } from "styled-components";

export const Container = styled.div<{
    $width: number;
    $type?: "sort" | "filter";
    $name: string | number;
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
    border-right: 1px solid #dedede;
    .selectWrapper {
        width: 100%;
        display: flex;
        flex-direction: column;
        padding: 8px 16px;
        border-radius: 0px 0px 10px 10px;
        background: #fff;
        box-shadow: 0px 2px 4px 0px rgba(74, 74, 74, 0.15);
        position: absolute;
        z-index: 999999;
        top: 42px;
        font-size: 14px;
        font-weight: 400;
        margin: 0 -16px;
    }
    .title {
        width: ${({ $width }) => $width - 20}px;
        overflow: auto;
        display: flex;
        justify-content: ${({ $type }) =>
            $type === "filter"
                ? "space-between"
                : $type === "sort"
                ? "flex-start"
                : "flex-start"};
        background-color: ${({ $name }) => {
            switch ($name) {
                case "In progress":
                    return "#E0FBCA";
                case "Completed":
                    return "#FFFDCB";
                case "Planned":
                    return "#CAF2FB";
                default:
                    return "none";
            }
        }};
        padding: ${({ $name }) =>
            $name === "In progress" ||
            $name === "Completed" ||
            $name === "Planned"
                ? "4px 8px"
                : "0px"};
        border-radius: ${({ $name }) =>
            $name === "In progress" ||
            $name === "Completed" ||
            $name === "Planned"
                ? "16px"
                : "0px"};
    }

    .filterOption {
        padding: 8px 0;
        gap: 8px;
        display: flex;
        align-items: center;
        overflow: hidden;
        &:hover {
            overflow: auto;
        }
    }
    .active {
        color: #6a994e;
    }
    .icon {
        width: 18px;
        height: 18px;
        object-fit: cover;
    }
    .zero {
        color: #8a8a8a;
    }
    .search {
        padding: 4px 0;
        border: none;
        border-bottom: 1px solid #e0e0e0;
    }
`;
