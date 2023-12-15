import { styled } from "styled-components";

export const Container = styled.div`
    border-radius: 12px;
    border: 1px solid #dedede;
    background-color: #fff;
    width: max-content;
    overflow: auto;
    max-width: 100%;
    position: relative;
    overflow: visible;
    box-shadow: 0px 2px 23px 0px rgba(116, 120, 215, 0.15);
    .errorsBlock {
        display: flex;
        flex-direction: column;
        gap: 8px;
    }
`;
export const Form = styled.form`
    border-radius: 12px;
    display: flex;
    flex-wrap: nowrap;
    overflow: hidden;
    .inputWrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
        background-color: #f5f5f5;
        p {
            padding: 4px;
        }
    }
`;
export const Input = styled.input`
    border: none;
    box-sizing: border-box;
    padding: 10px 16px;
    white-space: nowrap;
    position: relative;
    overflow: auto;
    color: #000;
    font-size: 14px;
    font-weight: 400;
`;
export const SubmitButton = styled.input<{ $disabled: boolean }>`
    position: absolute;
    right: 0;
    top: 78px;
    border: none;
    box-sizing: border-box;
    padding: 10px 16px;
    font-size: 14px;
    font-weight: 400;
    background-color: ${({ $disabled }) => ($disabled ? "#e9e9e9" : "#6a994e")};
    color: ${({ $disabled }) => ($disabled ? "#acacac" : "#fff")};
    border-radius: 12px;
`;
export const Select = styled.select`
    padding: 10px 16px;
    border: none;
`;
