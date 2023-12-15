import { styled } from "styled-components";
import { PageTitle } from "styles/global";

export const ChatWrapper = styled.div`
    padding-top: 16px;
    box-shadow: 0px 4px 20px 0px #5f63cf26;
    width: 374px;
    height: 80vh;
    border-radius: 12px;
    display: flex;
    flex-direction: column;
    background-color: #ffffff;
`;

export const HeaderWrapper = styled.div`
    display: flex;
    justify-content: space-between;
  align-items: center;
    border-bottom: 1px solid #d5d5d5;
    padding-bottom: 10px;
    padding-left: 24px;
    padding-right: 24px;
    margin-bottom: 24px;

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

  .back-chat-icon {
    width: 27px;
    height: 27px;
    background-color: #6A994E;
    border-radius: 5px; 
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }

  .back-arrow {
    width: 0;
    height: 0;
    border-top: 6px solid transparent; 
    border-bottom: 6px solid transparent; 
    border-right: 10px solid white; /* База стрелки */
  }
`;

export const MessagesWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    overflow: auto;

    padding-left: 24px;
    padding-right: 24px;
    height: 100%;
`;

export const MessageFooterContainer = styled.div`
    border-radius: 12px;
    padding-bottom: 16px;

    &.replying {
        border: 1px solid #e5e5e5;
        border-radius: 0 0 12px 12px;
    }
`;

export const MessageInputWrapper = styled.div`
    border: 1px solid #e5e5e5;
    border-radius: 12px;
    background-color: #ffffff;
    padding: 8px 20px 12px;
    margin-right: 24px;
    margin-left: 24px;
`;

export const ReplyingMessage = styled.div`
    padding: 0 37px 12px 46px;
    margin-top: 24px;

    display: flex;
    justify-content: space-between;
    align-items: center;
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

export const MessageInput = styled.textarea`
    resize: none;
    width: 100%;
    border: none;
`;

export const MessageInputActions = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const AttachWrapper = styled.div`
    visibility: hidden;
    input {
        display: none;
    }

    .attachIcon {
        cursor: pointer;
    }
`;

export const SendButton = styled.button`
    padding: 9px 20px;
    cursor: pointer;
    font-family: Montserrat, sans-serif;
    font-size: 12px;
    font-weight: 500;
    line-height: 15px;
    border-radius: 10px;

    color: #ffffff;
    background-color: #6a994e;

    &:disabled {
        color: #acacac;
        background: #e9e9e9;
        cursor: not-allowed;
    }
`;

export const Title = styled(PageTitle)`
    margin: 0;
`;

export const BtnWarpper = styled.div`
    position: relative;
    z-index: 10;
    background-color: #f8f8f8;
`;
