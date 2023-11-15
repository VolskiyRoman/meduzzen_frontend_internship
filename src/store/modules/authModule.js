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
        },
        async userCompanies({ commit }) {
            try {
                const response = await axiosInstance.get('/api/companies/my-companies');
                const companies = response.data;
                commit('saveUserCompanies', companies);
            } catch (error) {
                console.error("Error fetching user's companies:", error);
            }
        },
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
            state.user = { ...state.user, accessToken};
        },
        updateUser(state, userInfo) {
            state.user = { ...state.user, ...userInfo }
        },
        saveUserCompanies(state, companies) {
            state.user.companies = companies.map(company => ({ id: company.id, name: company.name }));
        }
    }
};
export default authModule