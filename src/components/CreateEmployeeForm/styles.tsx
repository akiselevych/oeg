import { styled } from "styled-components"
export const Container = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    flex-direction: column;
    align-items: center;
    gap: 24px;
    .changePasswordBtn{
      padding: 6px 10px;
      border-radius: 10px;
      background-color: #DEDEDE;
      border: 1px solid black;
      width: max-content;
      margin: 0 auto;
    }
`

export const Form = styled.form`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap:36px;
    .textInputsBlock{
        display: flex;
        flex-direction: column;
        gap:12px;
    }
    .btnContainer{
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 8px
    }
    .disabled{
        border-radius: 10px;
        background: #E9E9E9;
        color: #ACACAC;
    }


`
export const Photo = styled.div`
    width: 116px;
    height: 116px;
    border-radius: 50%;
    background-color: gray;
   
`
export const InputBlock = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px
`

export const Label = styled.div`
    font-size: 14px;
    font-weight: 500;
    white-space: nowrap;
    span{
        color: red;
    }
`
export const Input = styled.input`
    width: 218px;
    padding: 10px 16px;
    border-radius: 10px;
    border: 1px solid #DEDEDE;
`
export const Select = styled.select`
    padding: 10px 16px;
    border-radius: 10px;
    border: 1px solid #DEDEDE;
`

export const SubmitButton = styled.input`
    border: none;
    padding: 10px 16px;
    background-color: #6A994E;
    color: #FFF;
    font-size: 14px;
    font-weight: 500;
    border-radius: 10px;
    width: 218px;
`





