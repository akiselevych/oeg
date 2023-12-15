import {styled} from "styled-components";

export const DaysNamesWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  background-color: rgba(255, 255, 255, 1);
`;

export const DayName = styled.div`
  display: flex;
  justify-content: end;
  padding: 10px 12px;
  box-sizing: border-box;
`;

