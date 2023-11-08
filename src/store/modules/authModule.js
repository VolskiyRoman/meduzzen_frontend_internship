import AuthService from "@/services/auth.service";
import axiosInstance from "@/api/api";

const user = JSON.parse(localStorage.getItem('user'));
const initialState = user
    ? { status: { loggedIn: true }, user }
    : { status: { loggedIn: false }, user: null };

const authModule = {
    namespaced: true,
    state: initialState,
    actions: {
        login({ commit }, user) {
            return AuthService.login(user).then(
                user => {
                    commit('loginSuccess', user);
                    return Promise.resolve(user);
                },
                error => {
                    commit('loginFailure');
                    return Promise.reject(error);
                }
            );
        },
        logout({ commit }) {
            AuthService.logout();
            commit('logout');
        },
        register({ commit }, user) {
            return AuthService.register(user)
                .then(response => {
                    commit('registerSuccess');
                    return Promise.resolve(response.data);
                })
                .catch(error => {
                    commit('registerFailure');
                    return Promise.reject(error);
                });
        },
        refreshToken({ commit }, accessToken) {
            commit('refreshToken', accessToken);
        },
        async updateUserInfo({ commit }){
            try {
                const { data } = await axiosInstance.get(`auth/users/me/`);
                commit('updateUser', data)
                localStorage.setItem('user', JSON.stringify(data))
            } catch (error) {
                console.error("Error updating user's info:", error);
            }
        }
    },
    mutations: {
        loginSuccess(state, user) {
            state.status.loggedIn = true;
            state.user = user;
        },
        loginFailure(state) {
            state.status.loggedIn = false;
            state.user = null;
        },
        logout(state) {
            state.status.loggedIn = false;
            state.user = null;
        },
        registerSuccess(state) {
            state.status.loggedIn = false;
        },
        registerFailure(state) {
            state.status.loggedIn = false;
        },
        refreshToken(state, accessToken) {
            state.status.loggedIn = true;
            state.user = { ...state.user, accessToken: accessToken };
        },
        updateUser(state, userInfo) {
            state.user = { ...state.user, ...userInfo }
        }
    }
};
export default authModule