import {styled} from "styled-components";
import {PageTitle, PrimaryButton} from "styles/global";

export const Container = styled.div`
  padding: 20px;
  box-shadow: 0px 4px 30px 0px rgba(61, 66, 189, 0.15);
  width: 510px;
  background-color: #ffffff;

  position: absolute;
  z-index: 999;
`;

export const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;

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
  }

  .cross-icon:before {
    transform: translate(-50%, -50%) rotate(45deg);
  }

  .cross-icon:after {
    transform: translate(-50%, -50%) rotate(-45deg);
  }
`;
export const Title = styled(PageTitle)`
  font-size: 20px;
`;

export const EventForm = styled.form`
  padding-top: 26px;
  padding-right: 32px;
  padding-left: 32px;

  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const FormLabel = styled.label`
  font-size: 14px;
  font-weight: 500;
  line-height: 17px;
`;

export const InputsWrapper = styled.div``;

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  .employeeWrapper,
  .supplierWrapper {
    display: flex;
    gap: 16px;
    flex-direction: column;
    
    
  }
  
  .header{
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  
  .informBlock {
    display: flex;
    align-items: center;
    gap: 4px;
  }

  .select-wrapper {
    position: relative;
    width: 100%;

    .plus-container {
      width: 20px;
      height: 20px;
      border: 1px solid rgba(233, 233, 233, 1);
      border-radius: 4px;
      cursor: pointer;

      position: absolute;
      top: 25%;
      right: 10%;
    }

    .plus-horizontal,
    .plus-vertical {
      position: absolute;
      background-color: rgba(106, 153, 78, 1);
    }

    .plus-horizontal {
      width: 80%;
      height: 2px;
      top: 50%;
      left: 10%;
      transform: translate(0, -50%);
    }

    .plus-vertical {
      width: 2px;
      height: 80%;
      top: 10%;
      left: 50%;
      transform: translate(-50%, 0);
    }
  }
`;

export const Input = styled.input`
  border: 1px solid #dedede;
  padding: 10px 16px;
  border-radius: 10px;

  &::placeholder {
    font-family: Montserrat;
    font-size: 12px;
    font-weight: 400;
    line-height: 15px;
    color: #acacac;
  }
`;

export const Description = styled(Input).attrs({
    as: "textarea",
})`
  resize: none;
  height: 125px;
`;

export const SubmitButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const SubmitButton = styled(PrimaryButton).attrs({
    as: "button",
})`
  font-size: 14px;
  font-weight: 500;
  line-height: 17px;

  &:disabled {
    background-color: #e9e9e9;
    color: #acacac;
  }
`;

export const Select = styled.select`
  width: 100%;
  padding: 10px 16px;
  border-radius: 10px;
  border: 1px solid #dedede;

  .option {
    padding: 8px 0;
    gap: 8px;
    display: flex;
    align-items: center;
    overflow: auto;
  }

  &:disabled {
    background-color: #dadada;
    color: black;
  }
`;

export const DateTimeWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 16px;
  #time {
    max-width: 150px;
  }
`;

export const DatePickerWrapper = styled.div`
  width: 100%;
`;
