import {styled} from "styled-components";


export const Container = styled.div`
  border: 1px solid #DEDEDE;
  border-radius: 12px;

  padding: 12px 16px;
  width: 242px;
  display: flex;
  justify-content: space-evenly;
  position: relative;

  .react-datepicker{
    border: 1px solid #DEDEDE;
    &__input {
      background-color: transparent;
      border: none;

      width: 100%;
      cursor: pointer;
    }
    &__tab-loop{
      position: absolute;
      inset: 43px auto auto 0px;
    }
    &-popper{
      padding: 0 !important;
      position: static;
      transform: none !important;
    }
    &__triangle{
      display: none;
    }
    &__header {
      background-color: transparent;
      border: none;
      padding-top: 15px;
      padding-bottom: 0;
    }
    &__current-month{
      color: #6A994E;
      margin-bottom: 10px;
      font-family: Montserrat, sans-serif;
      font-size: 12px;
      font-weight: 600;
      line-height: 16px;
    }
    &__day{
      font-family: Montserrat, sans-serif;
      font-size: 12px;
      font-weight: 400;
      line-height: 16px;
      padding-top: 5px;
      padding-bottom: 5px;
      margin: 2px 2.5px;
      cursor: pointer;
      &:hover{
        background-color: rgba(106, 153, 78, 0.3);
      }
      &--selected{
        background-color: #6A994E;
      }
      &--disabled:hover{
        background-color: rgba(178, 178, 178, 0.3);
      }
    }
    &__day-names{
      margin-bottom: 10px;
    }
    &__day-name{
      color: #ACACAC;
      font-family: Montserrat, sans-serif;
      font-size: 12px;
      font-weight: 400;
      line-height: 16px;
      margin: 2px 2.5px;
    }
    &__navigation {
      &--previous {
        top: 5px;

      }

      &--next {
        top: 5px;

      }
    }
    &__today-button{
      background-color: transparent;
      border: none;
      margin-bottom: 10px;
      font-family: Montserrat, sans-serif;
      font-size: 12px;
      font-weight: 500;
      line-height: 16px;
    }
  }
`;

