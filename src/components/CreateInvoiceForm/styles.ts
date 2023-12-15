import {styled} from "styled-components";

export const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 5fr;
  height: 100%;

  @media(max-width: 1020px){
    grid-template-columns: 1fr 4fr;
  }
`;

export const FormSteps = styled.div`
  padding-left: 24px;
  padding-right: 24px;
  padding-top: 20px;
  border-right: 1px solid #DCDCDC;
  width: fit-content;
  
  @media (max-width: 1020px) {
    padding-left: 8px;
    padding-right: 8px;
    
  }
`;

export const StepName = styled.div`
  padding-top: 10px;
  padding-bottom: 10px;
  color: rgba(172, 172, 172, 1);
  margin-bottom: 16px;
  cursor: pointer;
  width: fit-content;
  &.active {
    color: rgba(106, 153, 78, 1);
    font-weight: 600;
  }
  &.previous{
    color: #000;: rgba(0, 0, 0, 1);
    font-weight: 400;
    
  }
  
  @media(max-width: 1020px){
    width: fit-content;
    font-size: 12px;
  }
`;

export const Form = styled.form`
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 12px;

  display: flex;
  flex-direction: column;
  
  @media(max-width: 1020px){
    padding-left: 8px;
    padding-right: 8px;
  }
  
  p {
    font-size: 14px;
    font-weight: 500;
    line-height: 17px;
    margin-bottom: 8px;
  }
  

  .inputWrapper {
    display: none;
    margin-bottom: 12px;

    &.active {
      display: flex;
      flex-direction: column;

      input {
        margin-bottom: 24px;
      }
    }

  }

  .selectWrapper {
    display: none;

    &.active {
      display: grid;
      grid-template-columns: 1fr 4fr;
      align-items: center;
      column-gap: 20px;
      row-gap: 22px;
      margin-bottom: 22px;

      select {
        width: 65%;
      }

      button {
        grid-column-start: 2;
        justify-self: end;
      }
    }

    & p {
      margin: 0;
    }
  }
`;


export const Input = styled.input`
  padding: 12px 16px;
  border: 1px solid rgba(222, 222, 222, 1);
  border-radius: 10px;

  width: 98%;

  &.disabledTotalInput {
    border: none;

    &--totalAmount {
      background-color: transparent;
      border: none;
      font-size: 16px;
      font-weight: 600;
      line-height: 16px;
    }
  }
  

  &::placeholder {
    color: rgba(172, 172, 172, 1);
  }
`;

export const Select = styled.select`
  border: 1px solid rgba(222, 222, 222, 1);
  border-radius: 10px;
  padding: 12px 16px;
  width: 53%;
`;

export const Option = styled.option`

`;

export const NextButton = styled.button`
  padding: 12px 27px;
  background: rgba(106, 153, 78, 1);
  color: rgb(255, 255, 255);
  align-self: end;
  border-radius: 10px;
  cursor: pointer;

  &:disabled{
    background: rgba(233, 233, 233, 1);
    cursor: not-allowed;
  }
`;
