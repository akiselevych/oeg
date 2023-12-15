import {styled} from "styled-components";

export const Container = styled.div`
  display: flex;
  gap: 8px;

  padding: 16px 16px 16px 18px;
  
  cursor: pointer;
`;

export const LogoWrapper = styled.div`
    .imageWrapper{
      width: 58px;
      height: 58px;
      position: relative;
    }
    img{
      border-radius: 50%;
      width: 58px;
      height: 58px;
    }
`;

export const BodyWrapper = styled.div`
    width: 100%;
`;

export const HeaderWrapper = styled.div`
    display: flex;
  justify-content: space-between;
  margin-bottom: 4px;
`;

export const Name = styled.div`
  font-size: 14px;
  font-weight: 600;
  line-height: 18px;

  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 60%;
`;

export const Date = styled.div`
  font-size: 12px;
  font-weight: 500;
  line-height: 18px;
  color: #717171;
`;


export const MessageWrapper = styled.div`

`;
export const Message = styled.div`
  font-size: 12px;
  font-weight: 400;
  line-height: 18px;
  height: 36px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  position: relative;
  padding-right: 35px;
  .oval {
    position: absolute;
    top: 15%;
    right: 0;
    
    width: 30px;
    height: 21px;
    background-color: #6A994E;
    color: white;
    
    border-radius: 50%;
    
    display: flex;
    justify-content: center;
    align-items: center;

    
    font-size: 12px;
    font-weight: 500;
    line-height: 18px;
  }
`;