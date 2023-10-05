const testModule = {
    state: {
        testString: 'Initial test string',
    },
    getters: {
        getTestString(state) {
            return state.testString;
        },
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
};

export default testModule;