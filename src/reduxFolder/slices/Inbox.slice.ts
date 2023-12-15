import { InboxChat, LoadingStatusType, MessageStructure } from "types/index";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useHttp } from "hooks/useHttp";
import { baseUrl } from "../../services/API";
import moment from "moment";

const initialState: {
    fetchInboxChatsStatus: LoadingStatusType;
    fetchCurrentInboxChatsStatus: LoadingStatusType;
    sendMessageStatus: LoadingStatusType;
    chats: Partial<InboxChat>[];
    projectChats: Partial<InboxChat>[];
    currentChat: InboxChat | null;
    isChatOpen: boolean;
    fixOpenProjectChatFromInbox: boolean;
} = {
    fetchInboxChatsStatus: "loading",
    fetchCurrentInboxChatsStatus: "loading",
    sendMessageStatus: "loading",
    chats: [],
    projectChats: [],
    currentChat: null,
    isChatOpen: false,
    fixOpenProjectChatFromInbox: false,
};

export const fetchInboxChats = createAsyncThunk(
    "inbox/fetchInboxChats",
    async () => {
        const { request } = useHttp();
        const token = localStorage.getItem("access");
        return request(`${baseUrl}/api/v1/inbox`, "GET", null, {
            Authorization: `Bearer ${token}`,
        });
    }
);

export const fetchInboxProjectChats = createAsyncThunk(
    "inbox/fetchInboxProjectChats",
    async () => {
        const { request } = useHttp();
        const token = localStorage.getItem("access");
        return request(`${baseUrl}/api/v1/inbox/project`, "GET", null, {
            Authorization: `Bearer ${token}`,
        });
    }
);

export const createNewChat = createAsyncThunk(
    "inbox/createNewChat",
    async ({ emp1_id, emp2_id }: { emp1_id: number; emp2_id: number }) => {
        const { request } = useHttp();
        const token = localStorage.getItem("access");
        const res = await request(
            `${baseUrl}/api/v1/chats/`,
            "POST",
            { employee_1_id: emp1_id, employee_2_id: emp2_id },
            {
                Authorization: `Bearer ${token}`,
            }
        );

        return res.id;
    }
);

export const fetchCurrentInboxChats = createAsyncThunk(
    "inbox/fetchCurrentInboxChats",
    async (chat_id: number) => {
        const { request } = useHttp();
        const token = localStorage.getItem("access");

        await request(
            `${baseUrl}/api/v1/chats/marked-as-read/${chat_id}`,
            "GET",
            null,
            {
                Authorization: `Bearer ${token}`,
            }
        );

        return await request(
            `${baseUrl}/api/v1/chats/${chat_id}`,
            "GET",
            null,
            {
                Authorization: `Bearer ${token}`,
            }
        );
    }
);

export const patchCurrentInboxChats = createAsyncThunk(
    "inbox/patchCurrentInboxChats",
    async (chat_id: number) => {
        const { request } = useHttp();
        const token = localStorage.getItem("access");
        return request(
            `${baseUrl}/api/v1/chats/${chat_id}`,
            "PATCH",
            { unread_messages: 0 },
            {
                Authorization: `Bearer ${token}`,
            }
        );
    }
);

export const sendInboxMessage = createAsyncThunk(
    "inbox/sendInboxMessage",
    async (message: Partial<MessageStructure>, { dispatch }) => {
        const { request } = useHttp();

        const res = await request(
            `${baseUrl}/api/v1/messages/`,
            "POST",
            JSON.stringify(message)
        );

        return request(`${baseUrl}/api/v1/chats/${message.chat_id}`).then(
            (payload) => {
                return payload.messages.sort(
                    (
                        a: Partial<MessageStructure>,
                        b: Partial<MessageStructure>
                    ) => a.id! - b.id!
                )[payload.messages.length - 1];
            }
        );
    }
);

const inboxChatsSlice = createSlice({
    name: "inbox",
    initialState,
    reducers: {
        resetCurrentInboxChat: (state) => {
            state.currentChat = null;
        },
        setIsIboxChatOpen: (state, { payload }) => {
            state.isChatOpen = payload;
        },
        setFixOpenProjectChatFromInbox: (state, {payload}) => {
            state.fixOpenProjectChatFromInbox = payload;
        },
    },
    extraReducers: (builder) => {
        builder
            //chats
            .addCase(fetchInboxChats.pending, (state) => {
                state.fetchInboxChatsStatus = "loading";
            })
            .addCase(fetchInboxChats.fulfilled, (state, { payload }) => {
                state.fetchInboxChatsStatus = "idle";
                state.chats = payload.results.sort(
                    (a: InboxChat, b: InboxChat) => {
                        const aLastMessageTime =
                            a.messages.length > 0
                                ? moment(
                                      a.messages[a.messages.length - 1]
                                          .created_at
                                  )
                                : moment(a.created_at);
                        const bLastMessageTime =
                            b.messages.length > 0
                                ? moment(
                                      b.messages[b.messages.length - 1]
                                          .created_at
                                  )
                                : moment(b.created_at);

                        return bLastMessageTime.diff(aLastMessageTime);
                    }
                );
            })
            .addCase(fetchInboxChats.rejected, (state) => {
                state.fetchInboxChatsStatus = "error";
            })
            .addCase(fetchInboxProjectChats.pending, (state) => {
                state.fetchInboxChatsStatus = "loading";
            })
            .addCase(fetchInboxProjectChats.fulfilled, (state, { payload }) => {
                state.fetchInboxChatsStatus = "idle";
                state.projectChats = payload.results;
            })
            .addCase(fetchInboxProjectChats.rejected, (state) => {
                state.fetchInboxChatsStatus = "error";
            })
            //current inbox chat
            .addCase(fetchCurrentInboxChats.pending, (state) => {
                state.fetchInboxChatsStatus = "loading";
            })
            .addCase(fetchCurrentInboxChats.fulfilled, (state, { payload }) => {
                state.fetchInboxChatsStatus = "idle";
                state.currentChat = {
                    ...payload,
                    messages: payload.messages.sort(
                        (a: MessageStructure, b: MessageStructure) =>
                            a.id - b.id
                    ),
                };
            })
            .addCase(fetchCurrentInboxChats.rejected, (state) => {
                state.fetchInboxChatsStatus = "error";
            })
            //message
            .addCase(sendInboxMessage.pending, (state) => {
                state.sendMessageStatus = "loading";
            })
            .addCase(sendInboxMessage.fulfilled, (state, { payload }) => {
                state.sendMessageStatus = "idle";
                state.currentChat?.messages.push(payload);
            })
            .addCase(sendInboxMessage.rejected, (state) => {
                state.sendMessageStatus = "error";
            });
    },
});

const { reducer, actions } = inboxChatsSlice;
export const { resetCurrentInboxChat, setIsIboxChatOpen,setFixOpenProjectChatFromInbox } = actions;
export default reducer;
