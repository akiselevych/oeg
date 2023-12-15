import {styled} from "styled-components";
import {PrimaryButton} from "styles/global";

export const LoginFormWrapper = styled.div`
  max-width: 300px;
  
`;

export const LoginForm = styled.form`

  .form-header {
    margin-bottom: 21px;
  }

  .form-title {
    font-size: 24px;
    font-weight: 700;
    line-height: 29px;
  }

  .form-desc {
    font-size: 14px;
    font-weight: 400;
    line-height: 17px;
  }
`;

export const FieldsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  
  margin-bottom: 24px;
`;

export const InputWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;


  label {
    font-size: 12px;
    font-weight: 500;
    line-height: 15px;

    margin-bottom: 8px;
  }

  .passIcon {
    position: absolute;
    top: 58%;
    right: 4%;

    cursor: pointer;
  }
`;

export const Input = styled.input`
  border: 1px solid rgba(222, 222, 222, 1);
  border-radius: 10px;
  padding: 10px 16px;
  
  &:focus{
    border: 1px solid rgba(106, 153, 78, 1)
  }
  &.error{
    border-color: red;
  }
  
  &::placeholder {
    color: rgba(172, 172, 172, 1);
    font-family: Montserrat;
    font-size: 12px;
    font-weight: 400;
    line-height: 15px;
  }
`;

export const SubmitButton = styled(PrimaryButton).attrs(() => ({
    as: "button",
}))`
    width: 100%;
`;