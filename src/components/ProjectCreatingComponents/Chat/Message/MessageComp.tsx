import { FC } from "react";
import { ReactComponent as ReplyIcon } from 'assets/icons/reply.svg'
import {
    Message,
    MessageHeader,
    MessageWrapper,
    SenderName,
    SentTime,
    MessageBody,
    MessageReply, RepliedMessage, RepliedMessageWrapper,
} from "components/ProjectCreatingComponents/Chat/Message/style";
import { MessageStructure, RootStateType } from "types/index";
import moment from "moment";
import { useSelector } from "react-redux";


const MessageComp: FC<Partial<MessageStructure>> = ({ by_employee, setReplyingMessage, created_at, message, message_reply, id }) => {
    const user = useSelector((state: RootStateType) => state.Login.user);
    return (
        <Message >
            <MessageWrapper>
                <MessageHeader>
                    <SenderName>{by_employee?.name === user?.name ? <span>Sie</span> : by_employee?.name}</SenderName>
                    <SentTime>{moment(created_at).format('ddd / H:mm')}</SentTime>
                </MessageHeader>
                <MessageBody>
                    {message}
                </MessageBody>
            </MessageWrapper>
            {!!message_reply && <RepliedMessage>
                <RepliedMessageWrapper>
                    <MessageHeader>
                        <SenderName>{message_reply?.by_employee?.name}</SenderName>
                        <SentTime>{message_reply.created_at}</SentTime>
                    </MessageHeader>
                    <MessageBody>
                        {message_reply.message}
                    </MessageBody>
                </RepliedMessageWrapper>
            </RepliedMessage>}
            <MessageReply onClick={() => {
                if (setReplyingMessage && message && by_employee && created_at && id) {
                    setReplyingMessage({ name: by_employee.name, message: message, created_at: moment(created_at).format('ddd / H:mm'), id: id })
                }
            }}>
                <ReplyIcon />
                Antwort
            </MessageReply>
        </Message>
    )
}

export default MessageComp;