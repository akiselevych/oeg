import { styled } from "styled-components";
import { PageTitle, SearchInput } from "styles/global";

export const Container = styled.div`
    position: absolute;
    z-index: 1000;
    right: 0.2%;
    top: 0;
    padding-top: 16px;
    box-shadow: 0px 4px 20px 0px #5f63cf26;
    width: 374px;
    height: 690px;
    border-radius: 0px 0px 12px 12px;
    display: flex;
    flex-direction: column;
    background-color: #ffffff;
`;

export const HeaderWrapper = styled.div`
    position: relative;
    margin-bottom: 10px;
`;
export const Title = styled(PageTitle)`
    margin: 0;
`;

export const TitleWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 12px;
    padding-left: 24px;
    padding-right: 24px;

    .container {
        width: 27px;
        height: 27px;
        background-color: #6a994e;
        border-radius: 5px;
        position: relative;

        cursor: pointer;
    }

    .cross-icon:before,
    .cross-icon:after {
        content: "";
        display: block;
        width: 1.5px;
        height: 12px;
        background-color: #ffffff;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    .cross-icon:before {
        transform: translate(-50%, -50%) rotate(45deg);
    }

    .cross-icon:after {
        transform: translate(-50%, -50%) rotate(-45deg);
    }
`;
export const Search = styled(SearchInput)`
    max-width: 320px;

    &::placeholder {
        font-family: Montserrat;
        font-size: 14px;
        font-weight: 400;
        line-height: 18px;
    }

    margin-left: 24px;
    margin-right: 24px;
    margin-bottom: 16px;
`;

export const SearchResultsWrapper = styled.div`
    position: absolute;
    z-index: 9999;
    width: 390px;
    max-height: 688px;
    overflow: auto;
    background-color: #ffffff;
    padding-top: 15px;
    padding-bottom: 15px;
`;

export const SearchResult = styled.div`
    text-align: center;
    padding-top: 6px;
    padding-bottom: 6px;
    cursor: pointer;
    border: 1px solid black;
`;

export const FilterWrapper = styled.div`
    display: flex;
`;

export const Filter = styled.div`
    flex-grow: 1;
    text-align: center;
    font-size: 13px;
    font-weight: 600;
    line-height: 18px;
    color: #acacac;
    padding-bottom: 6px;
    padding-top: 6px;
    border-bottom: 2px solid #d5d5d5;
    cursor: pointer;

    &.active {
        color: #6a994e;
        border-bottom: 2px solid #6a994e;
    }
`;

export const ChatsWrapper = styled.div`
    overflow: auto;
`;

export const ChatWrapper = styled.div``;
