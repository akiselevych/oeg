import { ChangeEvent, FC, useEffect, useMemo, useRef, useState } from "react";
import {
    AttachWrapper,
    ChatWrapper,
    HeaderWrapper, MessageFooterContainer,
    MessageInput, MessageInputActions, MessageInputWrapper,
    MessagesWrapper, ReplyingMessage, SendButton,
    Title,
    BtnWarpper
} from "components/ProjectCreatingComponents/Chat/styles";
import MessageComp from "components/ProjectCreatingComponents/Chat/Message/MessageComp";
import { ReactComponent as AttachIcon } from "assets/icons/attach.svg";
import { AppDispatch, MessageStructure, ProjectChat, RootStateType } from "types/index";
import { useDispatch, useSelector } from "react-redux";
import {
    MessageBody,
    MessageHeader, RepliedMessageWrapper,
    SenderName,
    SentTime
} from "components/ProjectCreatingComponents/Chat/Message/style";
import {
    fetchCurrentChat,
    resetCurrentProjectChat,
    sendMessage
} from "reduxFolder/slices/ProjectsChats.slice";
import { fetchCurrentInboxChats, resetCurrentInboxChat, sendInboxMessage } from "reduxFolder/slices/Inbox.slice";
import { SecondaryButton } from "styles/global";



const Chat: FC<Partial<ProjectChat>> = ({ insideProject, messages: messagesProp, closeChatHandler }) => {
    const [messageValue, setMessageValue] = useState<string>('');
    const [isHidden, setIsHidden] = useState<boolean>(true);
    const [replyingMessage, setReplyingMessage] = useState<{ name: string, message: string, created_at: string, id: number } | null>(null);
    const messages = useSelector((state: RootStateType) => state.ProjectsChats.currentChat?.messages);
    const currentChatProject = useSelector((state: RootStateType) => state.ProjectsChats.currentChat);
    const currentChatInbox = useSelector((state: RootStateType) => state.InboxChats.currentChat);
    const fixOpenProjectChatFromInbox = useSelector((state: RootStateType) => state.InboxChats.fixOpenProjectChatFromInbox);
    const user = useSelector((state: RootStateType) => state.Login.user);
    const dispatch = useDispatch<AppDispatch>();
    const lastMessageRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        scrollToBottom();
    }, [messages, lastMessageRef, replyingMessage, messagesProp, isHidden]); // Пустой массив зависимостей

    useEffect(() => {
        if (fixOpenProjectChatFromInbox){
            setIsHidden(false);
        }
    }, []);

    const scrollToBottom = () => {
        lastMessageRef.current?.scrollTo(0, lastMessageRef.current?.scrollHeight);
    }


    useEffect(() => {
        let interval: any;

        if (!!currentChatInbox) {
            setIsHidden(false);
            interval = setInterval(() => {
                dispatch(fetchCurrentInboxChats(currentChatInbox.id));
            }, 15000);

        }

        return () => {
            if (!!currentChatInbox) {
                clearInterval(interval);
            }
        };
        // eslint-disable-next-line
    }, [currentChatInbox]);

    useEffect(() => {
        let interval: any;

        if (!!currentChatProject) {
            interval = setInterval(() => {
                dispatch(fetchCurrentChat(currentChatProject.id));
            }, 15000);

        }

        return () => {
            if (!!currentChatProject) {
                clearInterval(interval);
            }
        };
        // eslint-disable-next-line
    }, [currentChatProject]);

    const renderLogin = insideProject ? messages : messagesProp;
    const renderMessages = useMemo(() => {
        return renderLogin?.map(({ by_employee, message, id, created_at, message_reply }, index) => {
            if (index === renderLogin.length - 1) {
                return (
                    <MessageComp
                        by_employee={by_employee}
                        setReplyingMessage={setReplyingMessage}
                        created_at={created_at}
                        message={message}
                        message_reply={message_reply}
                        key={id}
                        lastMessageRef={lastMessageRef}
                        id={id}
                    />
                )
            }
            return (<MessageComp
                by_employee={by_employee}
                setReplyingMessage={setReplyingMessage}
                created_at={created_at}
                message={message}
                message_reply={message_reply}
                key={id}
                id={id}
            />)
        })
    }, [renderLogin]);

    const handleSendMessage = () => {
        if (user) {
            if (currentChatProject && insideProject) {
                const message = {
                    messageObj: {
                        message: messageValue,
                        by_employee: user,
                        message_reply_id: replyingMessage?.id
                    },
                    project_chat_id: currentChatProject?.id,
                }
                // @ts-ignore
                dispatch(sendMessage(message))
            } else {
                const message = {
                    chat_id: currentChatInbox?.id,
                    message: messageValue,
                    from_user_id: user.id,
                    to_user_id: user?.id === currentChatInbox?.employee_1.id ? currentChatInbox?.employee_2.id : currentChatInbox?.employee_1.id,
                    message_reply_id: replyingMessage?.id
                }
                dispatch(sendInboxMessage(message))
            }

            setReplyingMessage(null);
            setMessageValue('');
        }
    }

    const handleReturnFromDialog = () => {
        if (currentChatInbox) {
            dispatch(resetCurrentInboxChat())
        }
    }

    return (
        <>
            {!isHidden && <ChatWrapper>
                <HeaderWrapper>
                    {!currentChatProject && <div className="back-chat-icon" onClick={handleReturnFromDialog}>
                        <div className="back-arrow"></div>
                    </div>}
                    <Title>Chat</Title>

                    <div className="container" onClick={() => {
                        setIsHidden(true);
                        if (closeChatHandler) {
                            closeChatHandler(false);
                            dispatch(resetCurrentProjectChat());
                            dispatch(resetCurrentInboxChat());
                        }
                    }}>
                        <div className="cross-icon"></div>
                    </div>
                </HeaderWrapper>

                <MessagesWrapper ref={lastMessageRef}>
                    {renderMessages}
                </MessagesWrapper>


                <MessageFooterContainer className={!!replyingMessage ? "replying" : ""}>
                    {!!replyingMessage && <ReplyingMessage>
                        <RepliedMessageWrapper>
                            <MessageHeader>
                                <SenderName>{replyingMessage.name}</SenderName>

                            </MessageHeader>
                            <MessageBody>
                                {replyingMessage.message}
                            </MessageBody>
                        </RepliedMessageWrapper>
                        <div className="container" onClick={() => setReplyingMessage(null)}>
                            <div className="cross-icon"></div>
                        </div>
                    </ReplyingMessage>}

                    <MessageInputWrapper>
                        <MessageInput
                            placeholder="Etwas eingeben"
                            value={messageValue}
                            onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
                                setMessageValue(e.target.value)
                            }}
                        />

                        <MessageInputActions>
                            <AttachWrapper>
                                <input type="file" id="attachInput" />
                                <AttachIcon className="attachIcon" onClick={() => {
                                    document.getElementById("attachInput")?.click();
                                }} />
                            </AttachWrapper>

                            <SendButton
                                disabled={messageValue.length === 0}
                                onClick={() => handleSendMessage()}
                            >Senden</SendButton>
                        </MessageInputActions>
                    </MessageInputWrapper>
                </MessageFooterContainer>

            </ChatWrapper >}
            {
                isHidden &&
                <BtnWarpper>
                    <SecondaryButton $disabled={!currentChatProject} onClick={() => setIsHidden(false)}>Offenen Chat</SecondaryButton>
                </BtnWarpper>
            }
        </>
    )
}

export default Chat;