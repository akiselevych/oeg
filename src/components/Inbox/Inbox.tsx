import { FC, useEffect, useMemo, useState } from "react";
import {
    ChatsWrapper, ChatWrapper,
    Container,
    Filter,
    FilterWrapper,
    HeaderWrapper,
    Search, SearchResult, SearchResultsWrapper,
    Title,
    TitleWrapper
} from "components/Inbox/styles";
import PreShowChat from "components/Inbox/PreShowChat/PreShowChat";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootStateType } from "types/index";
import Chat from "components/ProjectCreatingComponents/Chat/Chat";
import {
    createNewChat,
    fetchCurrentInboxChats,
    fetchInboxChats, setFixOpenProjectChatFromInbox, setIsIboxChatOpen,
} from "reduxFolder/slices/Inbox.slice";
import moment from "moment/moment";
import { fetchCurrentChat } from "reduxFolder/slices/ProjectsChats.slice";
import { baseUrl } from "../../services/API";


const Inbox: FC = () => {
    const chats = useSelector((state: RootStateType) => state.InboxChats.chats);
    const projectChats = useSelector((state: RootStateType) => state.InboxChats.projectChats);
    const employee = useSelector((state: RootStateType) => state.Employees.employees);
    const currentChat = useSelector((state: RootStateType) => state.InboxChats.currentChat);
    const currentProjectChat = useSelector((state: RootStateType) => state.ProjectsChats.currentChat);
    const user = useSelector((state: RootStateType) => state.Login.user);
    const projects = useSelector((state: RootStateType) => state.Projects.projects);
    const isChatOpen = useSelector((state: RootStateType) => state.InboxChats.isChatOpen);
    const proposition = useSelector((state: RootStateType) => state.ProjectProposition.proposition);
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
    const [isInsideProject, setIsInsideProject] = useState<boolean>(false);
    const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
    const [searchValue, setSearchValue] = useState<string>("");
    const [filterValue, setFilterValue] = useState<string>("all");
    const dispatch = useDispatch<AppDispatch>();


    useEffect(() => {
        let interval: any;

        dispatch(fetchInboxChats());
        interval = setInterval(() => {
            dispatch(fetchInboxChats());
        }, 30000);


        return () => {
            clearInterval(interval);
            dispatch(setFixOpenProjectChatFromInbox(false));
        };
        // eslint-disable-next-line
    }, []);


    const handleReplyMesEmp = (fromUser: number, emp1: any, emp2: any) => {
        return user?.id === fromUser ? emp2 : emp1;
    }

    const allChatsNames = useMemo(() => {
        return [
            ...employee.map(emp => user?.id !== emp.id ? { id: emp.id, name: emp.name, employee: true } : {})
        ]
        // eslint-disable-next-line
    }, [chats, projectChats])

    const filteredBySearchNames = allChatsNames.filter(obj => obj.name?.toLowerCase().includes(searchValue.toLowerCase()));

    const handleMessageReply = (message_reply: any, message: any) => {
        if (message_reply) {
            return {
                by_employee: handleReplyMesEmp(message?.message_reply?.from_user, currentChat?.employee_1, currentChat?.employee_2),
                message: message.message_reply.message,
                id: message.message_reply.id,
                created_at: moment(message.message_reply.created_at).format('ddd / H:mm'),
            }
        } else return null;
    }
    const messages = currentChat?.messages.map(message => {
        const employee = currentChat.employee_2.id === message.from_user ? currentChat.employee_2 : currentChat.employee_1;

        return {
            by_employee: employee,
            message: message.message,
            id: message.id,
            created_at: message.created_at,
            message_reply: handleMessageReply(message.message_reply, message),
        }
    })

    return (
        <>
            {isChatOpen && !proposition &&
                <Container>
                    {!currentChat && !currentProjectChat && (
                        <>
                            <HeaderWrapper>
                                <TitleWrapper>
                                    <Title>Posteingang</Title>
                                    <div className="container" onClick={() => {
                                        setIsDialogOpen(false);
                                        dispatch(setIsIboxChatOpen(false));
                                    }}>
                                        <div className="cross-icon"></div>
                                    </div>
                                </TitleWrapper>
                                <Search
                                    placeholder="Suchen"
                                    onFocus={() => setIsSearchOpen(true)}
                                    onChange={(e) => setSearchValue(e.target.value)}
                                    value={searchValue}
                                />
                                {isSearchOpen && <SearchResultsWrapper>
                                    {filteredBySearchNames.map((receiver, index) => (
                                        <SearchResult key={index} onClick={() => {
                                            if (receiver.employee) {
                                                // eslint-disable-next-line array-callback-return
                                                const chatId = chats.find(ch => {
                                                    if (ch.employee_1 && user && ch.employee_2) {
                                                        return receiver.id === (ch.employee_1.id === user.id ? ch.employee_2.id : ch.employee_1.id);
                                                    }
                                                }) || null;


                                                if (chatId != null && chatId.id) {
                                                    setIsDialogOpen(true);
                                                    dispatch(fetchCurrentInboxChats(chatId.id));
                                                    setIsSearchOpen(false);
                                                } else if (user != null) {
                                                    dispatch(createNewChat({ emp1_id: Number(receiver.id), emp2_id: Number(user.id) }))
                                                        .then(({ payload }) => {
                                                            if (payload !== undefined) {
                                                                dispatch(fetchCurrentInboxChats(payload));
                                                                setIsDialogOpen(true);
                                                            }
                                                        });
                                                    setIsSearchOpen(false)
                                                }
                                            }
                                        }}>{receiver.name}</SearchResult>
                                    ))}
                                </SearchResultsWrapper>}
                                <FilterWrapper>
                                    <Filter
                                        className={filterValue === "all" ? "active" : ""}
                                        onClick={() => setFilterValue("all")}
                                    >Alle</Filter>
                                    <Filter
                                        className={filterValue === "company" ? "active" : ""}
                                        onClick={() => setFilterValue("company")}
                                    >Unternehmen</Filter>
                                    <Filter
                                        className={filterValue === "project" ? "active" : ""}
                                        onClick={() => setFilterValue("project")}
                                    >Projekt</Filter>
                                </FilterWrapper>
                            </HeaderWrapper>
                            <ChatsWrapper>
                                {(filterValue === "all" || filterValue === "company") && chats.map(({ id, employee_1, employee_2, messages, unread_messages, created_at }) => {
                                    if (id != null && employee_1 != null && employee_2 != null && messages != null && created_at != null) {
                                        const image = user?.id === employee_1.id ? employee_2.image : employee_1.image;
                                        const name = user?.id === employee_1.id ? employee_2.name : employee_1.name;
                                        const date = messages.length !== 0 ? messages[0].created_at : created_at;
                                        const message = messages.length !== 0 ? messages[0].message : "";

                                        return (
                                            <ChatWrapper
                                                key={id}
                                            >
                                                <PreShowChat
                                                    image={image ?? 'https://cdn-icons-png.flaticon.com/512/3607/3607444.png'}
                                                    name={name}
                                                    date={date}
                                                    message={message}
                                                    unread_messages={unread_messages || null}
                                                    click={() => {
                                                        setIsDialogOpen(true);
                                                        dispatch(fetchCurrentInboxChats(id));
                                                    }}
                                                />
                                            </ChatWrapper>
                                        );
                                    }
                                    return null;
                                })}
                                {(filterValue === "all" || filterValue === "project") &&
                                    // @ts-ignore
                                    // eslint-disable-next-line array-callback-return
                                    projectChats.map(({ id, messages, last_message, project: projectID }) => {
                                        if (id != null && messages != null && projects != null && projectID != null) {
                                            // @ts-ignore
                                            const image = messages.length !== 0 ? `${baseUrl}${messages.by_employee.image}` : 'https://cdn-icons-png.flaticon.com/512/3607/3607444.png';
                                            const name = projects.find(project => {
                                                return project.id === projectID
                                            });
                                            // @ts-ignore
                                            const date = messages.created_at;
                                            return (
                                                <ChatWrapper
                                                    key={id}
                                                >
                                                    <PreShowChat
                                                        image={image}
                                                        name={name != null ? `${name.name} PROJECT` : 'NAME'}
                                                        date={date}
                                                        message={last_message == null ? "" : last_message}
                                                        unread_messages={null}
                                                        click={() => {
                                                            setIsDialogOpen(true);
                                                            setIsInsideProject(true);
                                                            dispatch(setFixOpenProjectChatFromInbox(true));
                                                            dispatch(fetchCurrentChat(id));
                                                        }}
                                                    />
                                                </ChatWrapper>
                                            );
                                        }
                                    })}
                            </ChatsWrapper>
                        </>
                    )}
                    {(!!currentChat || !!currentProjectChat) && isDialogOpen && (
                        <Chat
                            insideProject={isInsideProject}
                            messages={messages}
                            closeChatHandler={(arg: boolean) => {
                            setIsDialogOpen(arg);
                            dispatch(setIsIboxChatOpen(arg));
                        }} />
                    )}
                </Container>
            }
        </>
    );
}

export default Inbox
