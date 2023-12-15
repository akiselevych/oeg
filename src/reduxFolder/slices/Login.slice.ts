// Libs
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { API, baseUrl } from "services/API";
import jwt_decode from "jwt-decode";
import { LoginFormInputs, EmployeeType } from "types";
import axios from "axios";

type InitialStateType = {
    user: null | EmployeeType;
    isLoginLoading: boolean;
};

const initialState: InitialStateType = {
    user: null,
    isLoginLoading: false,
};

export const loginUser = createAsyncThunk(
    "user/loginUser",
    async (userData: LoginFormInputs) => {
        try {
            const response = await API.login(userData);
            localStorage.setItem("access", response.access);
            localStorage.setItem("refresh", response.refresh);
        } catch (error) {
            
        }
    }
);
export const getAuthUser = createAsyncThunk("user/getSingleUser", async () => {
    try {
        const accessToken = localStorage.getItem("access");
        if (accessToken) {
            const decoded = jwt_decode(accessToken) as any;
            if (decoded.user_id) {
                const response = await API.getSingleUser(decoded.user_id);
                return response;
            }
        }
    } catch (error) {
        
    }
});

export const User = createSlice({
    name: "User",
    initialState,
    reducers: {
        setUser(state, action: PayloadAction<null>) {
            state.user = action.payload;
        },
    },

    extraReducers(builder) {
        builder.addCase(loginUser.pending, (state) => {
            state.isLoginLoading = true;
        });
        builder.addCase(loginUser.fulfilled, (state) => {
            state.isLoginLoading = false;
        });
        builder.addCase(getAuthUser.pending, (state) => {
            state.isLoginLoading = true;
        });
        builder.addCase(getAuthUser.fulfilled, (state, action) => {
            state.user = action.payload ? action.payload : null;
            state.isLoginLoading = false;
        });
    },
});

export default User.reducer;
