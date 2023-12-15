import { styled } from "styled-components"

export const Container = styled.div`
    padding: 24px 32px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    background-color: white;
    border-radius: 12px;
    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
    .cardBlock {
        display: flex;
        gap: 16px;
    }
    .blockTitlr {
        font-size: 24px;
        font-weight: 600;
    }
    .timePicker {
        border-radius: 12px;
        border: 1px solid #dedede;
        padding: 10px;
        display: flex;
        align-items: center;
        gap: 4px;
    }
    .btnGroup{
        display: flex;
        align-items: center;
        gap: 12px;
    }
    .main{
        position: relative;
        padding: 24px 0px;
    }
    .timePicker {
        border-radius: 12px;
        border: 1px solid #dedede;
        padding: 10px;
        display: flex;
        align-items: center;
        gap: 4px;
        width: max-content;
        background-color: white;
    }
    .spiner{
        width: 40px;
        height: 40px;
    }
`