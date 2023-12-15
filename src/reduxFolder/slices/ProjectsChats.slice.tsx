import { LoadingStatusType, MessageStructure, ProjectChat } from "types/index";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useHttp } from "hooks/useHttp";
import { baseUrl } from "../../services/API";

const initialState: {
    fetchProjectsChatsStatus: LoadingStatusType,
    fetchProjectChatStatus: LoadingStatusType,
    sendMessageStatus: LoadingStatusType,
    chats: ProjectChat[],
    currentChat: ProjectChat | null,
} = {
    fetchProjectsChatsStatus: "loading",
    fetchProjectChatStatus: "loading",
    sendMessageStatus: "loading",
    chats: [],
    currentChat: null,
}

export const fetchChats = createAsyncThunk(
    "chats/fetchChats",
    async (employee_id: number | string) => {
        const { request } = useHttp();
        return request(`${baseUrl}/api/v1/chats-for-project/?employee_id=${employee_id}`);
    }
)

export const fetchCurrentChat = createAsyncThunk(
    "chats/fetchCurrentChat",
    async (chat_id: number) => {
        const { request } = useHttp();
        return request(`${baseUrl}/api/v1/chats-for-project/${chat_id}/`);
    }
)


export const sendMessage = createAsyncThunk(
    "chats/sendMessage",
    async ({ messageObj, project_chat_id }: { messageObj: { message: string, by_employee: Partial<MessageStructure>, message_reply_id: number }; project_chat_id: number }) => {
        const { request } = useHttp();
        const mes = {
            message: messageObj.message,
            by_employee_id: messageObj.by_employee?.id,
            project_chat_id: project_chat_id,
            message_reply_id: messageObj.message_reply_id === undefined ? null : messageObj.message_reply_id
        }
        const res = await request(`${baseUrl}/api/v1/messages-for-project-chat/`, "POST", JSON.stringify(mes));

        return await request(`${baseUrl}/api/v1/messages-for-project-chat/${res.id}/`);
    }
)

const projectsChatsSlice = createSlice({
    name: 'chats',
    initialState,
    reducers: {
        resetCurrentProjectChat: (state) => {
            state.currentChat = null
        },
    },
    extraReducers: (builder) => {
        builder
            //chats
            .addCase(fetchChats.pending, (state) => {
                state.fetchProjectsChatsStatus = "loading"
            })
            .addCase(fetchChats.fulfilled, (state, { payload }) => {
                state.fetchProjectsChatsStatus = "idle"
                state.chats = payload.results;
            })
            .addCase(fetchChats.rejected, (state) => {
                state.fetchProjectsChatsStatus = "error";
            })
            //currentChat
            .addCase(fetchCurrentChat.pending, (state) => {
                state.fetchProjectChatStatus = "loading"
            })
            .addCase(fetchCurrentChat.fulfilled, (state, { payload }) => {
                state.fetchProjectChatStatus = "idle"
                state.currentChat = {
                    ...payload,
                    messages: payload.messages.sort((a: MessageStructure, b: MessageStructure) => a.id - b.id),
                }
            })
            .addCase(fetchCurrentChat.rejected, (state) => {
                state.fetchProjectChatStatus = "error";
            })
            //message
            .addCase(sendMessage.pending, (state) => {
                state.sendMessageStatus = "loading"
            })
            .addCase(sendMessage.fulfilled, (state, { payload }) => {
                state.sendMessageStatus = "idle";
                state.currentChat?.messages.push(payload);
            })
            .addCase(sendMessage.rejected, (state) => {
                state.sendMessageStatus = "error";
            })

    },
})

const { reducer, actions } = projectsChatsSlice
export const { resetCurrentProjectChat } = actions;
export default reducer