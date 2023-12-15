import { styled } from "styled-components"
export const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-top: 20px;
    padding-right: 100px;
    width: max-content;
    .spiner{
        width: 40px;
        height: 40px;
        margin: 0 auto;
    }
    .headerWrapper{
        width: 100%;
        display: flex;
        justify-content: space-between;
        gap: 10px
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
`


