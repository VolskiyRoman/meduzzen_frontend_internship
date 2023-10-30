import { createStore } from 'vuex';
import authModule from './modules/authModule'
import testModule from './modules/testModule';


const store = createStore({
    modules: {
        testModule,
        authModule,
    },
});

export default store