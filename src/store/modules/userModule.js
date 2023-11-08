import axiosInstance from "@/api/api";

const userModule = {
    namespaced: true,
    state: {
        users: [],
    },
    mutations: {
        SET_USERS(state, users) {
            state.users = users;
        },
    },
    actions: {
        async fetchAndSetUsers({ commit }) {
            try {
                const response = await axiosInstance.get('auth/users');
                commit('SET_USERS', response.data.results);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        },
    },
};

export default userModule;
