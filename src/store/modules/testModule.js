const testModule = {
    state: {
        testString: 'Initial test string',
    },
    actions: {
        updateTestString({ commit }, newString) {
            commit('setTestString', newString);
        },
    },
    mutations: {
        setTestString(state, newString) {
            state.testString = newString;
        },
    },
    getters: {
        getTestString(state) {
            return state.testString;
        },
    },
};

export default testModule;