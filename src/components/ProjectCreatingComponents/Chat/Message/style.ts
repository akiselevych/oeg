import {styled} from "styled-components";


export const Message = styled.div`
    border: 1px solid #E2E2E2;
  border-radius: 10px;
  
  &:last-child{
    margin-bottom: 5px;
  }
  
`;
export const MessageWrapper = styled.div`
  padding: 10px;
`;

export const MessageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  
  
`;

export const SenderName = styled.div`
  font-size: 16px;
  font-weight: 600;
  line-height: 20px;

  span{
    color: #6A994E;
  }
`;


export const SentTime = styled.div`
  color: #999999;
  font-size: 12px;
  font-weight: 400;
  line-height: 18px;
`;

export const MessageBody = styled.div`
  font-size: 12px;
  font-weight: 400;
  line-height: 18px;
  
`;

export const MessageReply = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  
  background: linear-gradient(0deg, #F2F2F2, #F2F2F2);
  border-top: 2px solid #E0E0E0;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  padding: 10px;
  
  cursor: pointer;
`;

export const RepliedMessage = styled.div`
  background: linear-gradient(0deg, #F2F2F2, #F2F2F2);
  border-top: 2px solid #E0E0E0;
  padding: 7px 10px 7px 22px;
`;

export const RepliedMessageWrapper = styled(MessageWrapper)`

  padding: 3px 0 3px 8px;
  border-left: 2px solid black;
`;

