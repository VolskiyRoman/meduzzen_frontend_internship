import axios from 'axios';
import store from "../store/store";

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8000',
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = JSON.parse(localStorage.getItem("tokens"))?.access;
        if (token) {
            config.headers["Authorization"] = 'Bearer ' + token;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (res) => {
        return res;
    },
    async (err) => {
        const originalConfig = err.config;

        if (originalConfig.url !== "/auth/jwt/create/" && err.response) {
            if (err.response.status === 401 && !originalConfig._retry) {
                originalConfig._retry = true;

                try {
                    const token = JSON.parse(localStorage.getItem("tokens"))?.refresh;
                    const rs = await axiosInstance.post("/auth/jwt/refresh/", {
                        refresh: token,
                    });

                    const {access} = rs.data;

                    await store.dispatch('authModule/refreshToken', access);
                    let tokens = JSON.parse(localStorage.getItem("tokens"));
                    tokens.access = access;
                    localStorage.setItem("tokens", JSON.stringify(tokens));

                    return axiosInstance(originalConfig);
                } catch (_error) {
                    return Promise.reject(_error);
                }
            }
        }

        return Promise.reject(err);
    }
);

export default axiosInstance;
