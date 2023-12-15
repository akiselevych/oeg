import {styled} from "styled-components";
import {Select} from "components/CreateInvoiceForm/styles";

export const OptionsWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;


export const PositionsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  margin-bottom: 8px;
`;

export const PositionTitlesWrapper = styled.div`

  display: grid;
  column-gap: 8px;
  grid-template-columns: 4.5fr 4fr 2fr 3fr 3fr 3fr 2.5fr 3fr;
  margin-bottom: 8px;

  @media (max-width: 1020px) {
    grid-template-columns: 2fr 2fr 1fr 1fr 1fr 1fr 1fr 1fr;
  }

  p {
    margin-bottom: 0;
    @media (max-width: 1020px) {
      width: fit-content;
      font-size: 12px;
    }
  }

`;

export const FamilyPositionsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 5fr;
  column-gap: 8px;

  position: relative;

`;


export const RemoveIcon = styled.div`
  .remove-container {
    width: 20px;
    height: 20px;
    border: 1px solid rgba(233, 233, 233, 1);
    border-radius: 4px;
    cursor: pointer;

    position: absolute;
    top: 20%;
    right: -3%;
  }

  .line-horizontal,
  .line-vertical {
    position: absolute;
    background-color: rgba(106, 153, 78, 1);
  }

  .line-horizontal {
    width: 80%;
    height: 2px;
    top: 50%;
    left: 10%;
    transform: translate(0, -50%) rotate(45deg);
  }

  .line-vertical {
    width: 2px;
    height: 80%;
    top: 10%;
    left: 50%;
    transform: translate(-50%, 0) rotate(45deg);
  }
`;

export const CloseBtn = styled.div`
  position: absolute;
  top: 5px;
  right: -12px;

  .container {
    width: 27px;
    height: 27px;
    background-color: #6A994E;
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
    background-color: #FFFFFF;
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

export const ParentPositionInputsWrapper = styled.div`

  margin-bottom: 8px;

  .positionInput {
    position: relative;

    .arrow-wrapper {
      position: absolute;
      top: 22%;
      right: 10%;

      border: 1px solid rgba(233, 233, 233, 1);
      padding: 0 5px 3px;
      border-radius: 3px;

      pointer-events: none;
    }
  }


  .typeInputWrapper {
    position: relative;

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

export const PositionItemsWrapper = styled.div`

`;

export const ChildPositionInputsWrapper = styled(ParentPositionInputsWrapper)`
  display: grid;
  column-gap: 8px;
  grid-template-columns: 4fr 2fr 3fr 3fr 3fr 3fr 3fr;

  .childPositionName {
    visibility: hidden;
  }

  input:disabled, select:disabled {
    background-color: #f1f1f1;
  }
`;

export const VatSelect = styled(Select)`
  width: 100%;

  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  cursor: pointer;

`;

export const NotesWrapper = styled.div`
  margin-bottom: 8px;
`;

export const TitleWrapper = styled.div`
  margin-bottom: 8px;
`;
export const Notes = styled.textarea`
  width: 100%;
  border: 1px solid rgba(222, 222, 222, 1);
  resize: none;
  padding-top: 12px;
  padding-left: 12px;
  border-radius: 12px;

  &::placeholder {
    font-family: Montserrat, sans-serif;
    font-size: 14px;
    font-weight: 400;
    line-height: 17px;
  }
`;

export const TitleArea = styled(Notes)`

`;

export const TotalCalcWrapper = styled.div`
  margin-bottom: 8px;

  input.disabledTotalInput {
    background-color: transparent;
  }

  .totalCalcInputWrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 0 8px 12px;

    border-bottom: 1px solid rgba(153, 153, 153, 0.39);

    h3 {

      font-size: 16px;
      font-weight: 600;
      line-height: 16px;
    }

    p {
      font-size: 14px;
      font-weight: 400;
      line-height: 16px;
    }

    input {
      text-align: right;
      width: fit-content;
    }
  }
`;