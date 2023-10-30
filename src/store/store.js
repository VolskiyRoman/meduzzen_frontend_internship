import { createStore } from 'vuex';
import authModule from './modules/authModule'
import testModule from './modules/testModule';


export default createStore({
    modules: {
        testModule,
        authModule,
    },
});
