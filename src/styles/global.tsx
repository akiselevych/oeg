import { styled } from "styled-components";
import searchIcon from "assets/icons/searchIcon.svg";



export const PrimaryButton = styled.div<{ $disabled?: boolean }>`
    min-width: 100px;
    width: max-content;
    display: flex;
    justify-content: center;
    align-items: center;
    gap:4px;
    padding: 10px 16px;
    background-color:${({ $disabled }) => $disabled ? "#E9E9E9" : "#6A994E"} ;
    color: ${({ $disabled }) => $disabled ? "#ACACAC" : "#FFF"} ;
    font-size: 14px;
    font-weight: 500;
    border-radius: 10px;
    height: max-content;
    cursor: pointer;
    pointer-events: ${({ $disabled }) => $disabled ? "none" : "auto"} ;

`
export const SecondaryButton = styled.p<{ $disabled?: boolean }>`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 4px;
    min-width: 100px;
    padding: 10px 12px;
    background-color:${({ $disabled }) => $disabled ? "#E9E9E9" : "none"} ;
    color: ${({ $disabled }) => $disabled ? "#ACACAC" : "#6A994E"} ;
    font-size: 12px;
    font-weight: 500;
    border: ${({ $disabled }) => $disabled ? "none" : "1px solid #528435"} ;
    border-radius: 10px;
    width: max-content;
    cursor: pointer;
    pointer-events: ${({ $disabled }) => $disabled ? "none" : "auto"} ;
`
export const PDFloader = styled.label<{ $disabled?: boolean }>`
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 4px;
    min-width: 100px;
    padding: 10px 12px;
    background-color:${({ $disabled }) => $disabled ? "#E9E9E9" : "none"} ;
    color: ${({ $disabled }) => $disabled ? "#ACACAC" : "#6A994E"} ;
    font-size: 12px;
    font-weight: 500;
    border: ${({ $disabled }) => $disabled ? "none" : "1px solid #528435"} ;
    border-radius: 10px;
    width: max-content;
    cursor: pointer;
    pointer-events: ${({ $disabled }) => $disabled ? "none" : "auto"} ;
    input[type="file"] {
            display: none;
        }
`
export const PageTitle = styled.p`
  color: #000;
  font-size: 22px;
  font-weight: 600;
  margin-bottom: 24px;

`;
export const SearchInput = styled.input`
  width: 426px;
  padding: 10px 16px 10px 40px;
  border-radius: 10px;
  border: 1px solid #E9E9E9;
  background-image: url(${searchIcon});
  background-repeat: no-repeat;
  background-size: 18px 18px;
  background-position: 16px 11px;

  &::placeholder {
    color: #ACACAC;
  }

`
export const CheckBox = styled.div`
  .title {
    padding: 10px 16px;
    width: 200px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 10px;
    border: 1px solid #dedede;
    background: #fff;
  }

  .selectWrapper {
    width: 200px;
    padding: 8px 0px;
    display: flex;
    flex-direction: column;
    border-radius: 10px;
    background: #fff;
    box-shadow: 0px 2px 4px 0px rgba(74, 74, 74, 0.15);
    position: absolute;
    z-index: 99;
  }

  label {
    padding: 8px 16px;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  input[type="checkbox"], input[type="radio"] {
    background-color: #6a994e;
  }

  .rotate {
    transform: rotate(180deg);
  }
`;
export const StatusOverlay = styled.div<{ $isNone: boolean }>`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
  opacity: 0.9;
  border-radius: 12px;
  display: ${({ $isNone }) => $isNone ? "none" : "flex"};
  justify-content: center;
  align-items: center;
  font-size: 24px;
  color: #000;
`;

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