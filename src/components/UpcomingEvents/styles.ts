import {styled} from "styled-components";
import {PageTitle} from "styles/global";


export const Container = styled.div`

  background-color: rgba(255, 255, 255, 1);
  padding: 20px;

  border: 1px solid rgba(218, 218, 218, 1);
  border-radius: 12px;

  height: 650px;
  overflow-y: auto;
`;

export const Title = styled(PageTitle)`
  font-size: 18px;
  font-weight: 600;
  line-height: 28px;

  padding: 4px 0 4px 6px;
  border-bottom: 1px solid rgba(210, 210, 210, 1);

  margin-bottom: 12px;
`;

export const SubTitle = styled.div`
  font-size: 14px;
  font-weight: 600;
  line-height: 28px;
  margin-bottom: 12px;
`;

export const DayEventsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

export const EventWrapper = styled.div`
  padding: 10px 12px;
  border: 1px solid rgba(153, 187, 132, 1);
  border-radius: 12px;
`;

export const EventTitle = styled.div`
  font-size: 15px;
  font-weight: 500;
  line-height: 18px;
  margin-bottom: 8px;
`;

export const StartedDate = styled.div`
  color: rgba(113, 113, 113, 1);

  font-size: 12px;
  font-weight: 500;
  line-height: 18px;
`;

