import { styled } from "styled-components";
import searchIcon from "assets/icons/searchIcon.svg";

export const Container = styled.header`
    background-color: #fff;
    height: 76px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    gap: 12px;
    padding: 16px 48px;
    border-bottom: 1px solid #cbcbcb;
    .highlight {
        font-weight: 800;
    }

    .logo-block {
        display: flex;
        align-items: center;
        gap: 4px;
        color: #6a994e;
        font-weight: 700;

        img {
            width: 36px;
            height: 36px;
        }

        .logo-text {
            display: flex;
            flex-direction: column;
            gap: 4px;
        }

        p:nth-child(2) {
            font-weight: 400;
        }
    }
    .searchContainer {
        position: relative;
        max-width: 613px;
        flex: 1 1 auto;
        @media (max-width: 768px) {
            display: none;
        }
        .search {
            position: relative;
            padding: 10px 16px 10px 44px;
            color: #424242;
            border-radius: 16px;
            border: 1px solid #e9e9e9;
            background-color: #fff;
            width: 100%;
            height: 44px;
            &::placeholder {
                color: #acacac;
            }

            background-image: url(${searchIcon});
            background-repeat: no-repeat;
            background-size: 20px 20px;
            background-position: 16px 12px;
        }
        .searchResults {
            box-shadow: 0px 2px 4px 0px rgba(74, 74, 74, 0.15);
            background-color: white;
            border-radius: 12px;
            width: 613px;
            max-height: 800px;
            padding: 12px 16px;
            position: absolute;
            display: flex;
            gap: 19px;
            flex-direction: column;
            overflow: auto;
            z-index: 100;
        }
        .resultItem {
            text-decoration: none;
            color: #101010;
            &:hover {
                text-decoration: underline;
            }
        }
    }
    .userContainer {
        position: relative;
        .dropdown {
            background-color: #fff;
            border-radius: 0 0 12px 12px;
            width: 100%;
            color: red;
            position: absolute;
            top: 56px;
            z-index: 100;
        }
        .dropdownOption {
            padding: 8px 16px;
        }
    }
    .user {
        display: flex;
        align-items: center;
        gap: 8px;
        @media (max-width: 425px) {
            display: none;
        }
        .imageWrapper {
            width: 36px;
            height: 36px;
            border-radius: 18px;
            position: relative;
        }
        .urerImg {
            width: 36px;
            height: 36px;
            border-radius: 18px;
            object-fit: cover;
        }
    }
    .user-info {
    }
    .user-name {
        color: #101010;
        font-size: 15px;
        font-weight: 600;
    }
    .user-position {
        color: #595959;
        font-size: 11px;
        font-weight: 500;
    }
    .scalePicker {
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 4px 10px;
        border-radius: 6px;
        border: 1px solid #e9e9e9;
    }
    .openChat {
        cursor: pointer;
        width: 36px;
        height: 36px;
    }
`;
