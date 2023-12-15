import {FC, useState} from "react";
import {
    BodyWrapper,
    Container,
    Date,
    HeaderWrapper,
    LogoWrapper,
    Message, MessageWrapper,
    Name
} from "components/Inbox/PreShowChat/styles";
import moment from "moment";
import ImageViewer from "components/ImageViewer/ImageViewer";


interface PreShowChatProps{
    image: string;
    name: string;
    date: string;
    message: string;
    unread_messages: number | null;
    click: () => void
}

const PreShowChat: FC<PreShowChatProps> = ({image, name, date, message,unread_messages,click}) => {
    const [imageHover, setImageHover] = useState<boolean>(false);
  return(
      <Container>
          <LogoWrapper>
              <div className="imageWrapper"
                   onMouseLeave={() => setImageHover(false)}
                   onMouseEnter={() => setImageHover(true)}
              >
                  <img src={image} alt="avatar"/>
                  {imageHover &&
                      <ImageViewer image={image} hideElement={() => setImageHover(false)}/>
                  }
              </div>
          </LogoWrapper>
          <BodyWrapper onClick={() => click()}>
              <HeaderWrapper>
                  <Name>{name}</Name>
                  <Date>{moment(date).format('MMM D, h:mm A')}</Date>
              </HeaderWrapper>
              <MessageWrapper>
                  <Message>
                      {message}
                      {unread_messages && unread_messages !== 0 && <div className="oval">
                          {unread_messages}
                      </div>}
                  </Message>
              </MessageWrapper>
          </BodyWrapper>
      </Container>
  )
}

export default PreShowChat;