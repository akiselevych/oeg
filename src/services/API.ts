import axios from "axios";
import { LoginFormInputs } from "types/index";

export const baseUrl = "https://oeeg-api.info";

export const instance = axios.create({
    baseURL: baseUrl,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json",
    },
});
export const fileInstance = axios.create({
    baseURL: baseUrl,
    withCredentials: true,
    headers: {
        "X-CSRFToken": "ptaV9bqn8MPLELLWIWUmgtANqtvKPFERJph6HXMX83qN",
    },
});

instance.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem("access")}`;
    return config;
});
//eslint-disable-next-line
let isFirstTime = true;
instance.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response.status === 401) {
            const originalRequest = error.config;
            if (!originalRequest._retry) {
                originalRequest._retry = true;

                if (!localStorage.getItem("refresh")) {
                    localStorage.clear();
                    alert("Falscher Benutzername oder falsches Passwort");
                    return;
                }

                try {
                    const response = await axios.post(
                        baseUrl + "/auth/jwt/refresh/",
                        { refresh: localStorage.getItem("refresh") },
                        {
                            withCredentials: true,
                            headers: {
                                "Content-Type": "application/json",
                            },
                        }
                    );

                    if (response.status === 200) {
                        localStorage.setItem("access", response.data.access);
                        originalRequest.headers.Authorization = `Bearer ${response.data.access}`;
                        return axios(originalRequest);
                    }
                } catch (refreshError) {
                    localStorage.clear();
                    alert("Session time has expired, please log in again");
                    window.location.href = "/login";
                    return Promise.reject(refreshError);
                }
            } else {
                localStorage.clear();
            }
        }

        return Promise.reject(error);
    }
);

fileInstance.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem("access")}`;
    return config;
});
fileInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response.status === 401) {
            const originalRequest = error.config;
            if (!originalRequest._retry) {
                originalRequest._retry = true;

                try {
                    const response = await axios.post(
                        baseUrl + "/auth/jwt/refresh/",
                        { refresh: localStorage.getItem("refresh") },
                        {
                            withCredentials: true,
                            headers: {
                                "Content-Type": "application/json",
                            },
                        }
                    );

                    if (response.status === 200) {
                        localStorage.setItem("access", response.data.access);
                        originalRequest.headers.Authorization = `Bearer ${response.data.access}`;
                        return axios(originalRequest);
                    }
                } catch (refreshError) {
                    localStorage.clear();
                    alert("Session time has expired, please log in again");
                    window.location.href = "/login";
                    return Promise.reject(refreshError);
                }
            } else {
                localStorage.clear();
            }
        }

        return Promise.reject(error);
    }
);

export const API = {
    async login(userData: LoginFormInputs) {
        const response = await instance.post("/auth/jwt/create/", userData);
        return response.data;
    },
    async getSingleUser(userId: string) {
        const response = await instance.get(`/api/v1/employees/${userId}/`);
        return response.data;
    },
    async getCustomers() {
        const response = await instance.get(`/api/v1/customers/`);
        return response.data;
    },
};
